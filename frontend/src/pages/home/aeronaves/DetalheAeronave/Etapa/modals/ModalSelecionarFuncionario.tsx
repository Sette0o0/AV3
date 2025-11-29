import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import type { Funcionario } from "../../../../../../utils/types";
import api from "../../../../../../utils/api";
import { useParams } from "react-router-dom";

interface Props {
  show: boolean;
  onClose: () => void;
  funcionariosAssociados: Funcionario[] | null;
}

export function ModalSelecionarFuncionario({ show, onClose, funcionariosAssociados }: Props) {
  const { etapaId } = useParams<{etapaId: string}>()
  const [ idsAssociados, setIdsAssociados ] = useState<number[] | null>(null)
  const [ todosFuncionarios, setTodosFuncionarios ] = useState<Funcionario[] | null>(null)
  const [ funcionariosDisponiveis, SetFuncionariosDisponiveis ] = useState<Funcionario[] | null>(null)
  const [selecionados, setSelecionados] = useState<number[]>([]);

  async function carregarTodosFuncionarios() {
    try {
      const res = await api.get("/funcionario")
      setTodosFuncionarios(res.data.funcionarios)

    } catch (error: any) {
      console.error(error.message)
      alert(error.response.data.erro)
    }
  }

  useEffect(() => {
    carregarTodosFuncionarios()
  }, [])

  useEffect(() => {    
    setIdsAssociados(funcionariosAssociados?.map((f) => f.id_func) ?? null)
  }, [funcionariosAssociados])

  useEffect(() => {
    (async () => {
      SetFuncionariosDisponiveis(todosFuncionarios?.filter(
    (f) => !idsAssociados?.includes(f.id_func)) ?? null)
    })()
  }, [todosFuncionarios, idsAssociados])

  function handleToggle(id: number) {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const dataEnvio = {
      funcionarios: selecionados
    }
    try {
      const res = await api.put("/etapa/funcionarios/" + etapaId, dataEnvio)
      
      alert(res.data.mensagem)
      handleClose();

    } catch (error: any) {
      console.error(error.message)
      alert(error.response.data.erro)
    }
  }

  function handleClose() {
    onClose();
    setSelecionados([]);
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Selecionar Funcionários</Modal.Title>
      </Modal.Header>

      <Form id="form-selecionar-func" onSubmit={handleSubmit}>
        <Modal.Body>
          {funcionariosDisponiveis ? (
            funcionariosDisponiveis.map((f) => (
              <Form.Check
                key={f.id_func}
                type="checkbox"
                id={`${f.id_func}`}
                label={`${f.nome} (${f.usuario})`}
                checked={selecionados.includes(f.id_func)}
                onChange={() => handleToggle(f.id_func)}
              />
            ))
          ) : (
            <p className="mb-0">Todos os funcionários já estão associados à etapa.</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="gray" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            form="form-selecionar-func"
            disabled={selecionados.length === 0}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
