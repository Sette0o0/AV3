import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import type { Funcionario } from "../../../../../../utils/types";
import dados from "../../../../../../dadosTeste.json";

interface Props {
  show: boolean;
  onClose: () => void;
  funcionariosAssociados?: Funcionario[];
}

export function ModalSelecionarFuncionario({ show, onClose, funcionariosAssociados = [] }: Props) {
  const todosFuncionarios: Funcionario[] = dados.funcionarios;
  
  const idsAssociados = funcionariosAssociados.map((f) => f.id);

  const funcionariosDisponiveis = todosFuncionarios.filter(
    (f) => !idsAssociados.includes(f.id)
  );

  const [selecionados, setSelecionados] = useState<number[]>([]);

  function handleToggle(id: number) {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Funcionários selecionados:", selecionados);
    handleClose();
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
          {funcionariosDisponiveis.length > 0 ? (
            funcionariosDisponiveis.map((f) => (
              <Form.Check
                key={f.id}
                type="checkbox"
                id={`func-${f.id}`}
                label={`${f.nome} (${f.usuario})`}
                checked={selecionados.includes(f.id)}
                onChange={() => handleToggle(f.id)}
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
