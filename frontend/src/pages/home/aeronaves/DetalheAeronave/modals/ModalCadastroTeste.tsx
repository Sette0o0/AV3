import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ResultadoTeste, TipoTeste } from "../../../../../utils/enums";
import api from "../../../../../utils/api";

interface Props {
  aero_id: number
  show: boolean;
  onClose: () => void;
}

export function ModalCadastroTeste({ aero_id, show, onClose }: Props) {
  const initialForm = {
    tipo: TipoTeste.Elétrico,
    resultado: ResultadoTeste.Aprovado,
    aero_id: aero_id,
  };

  const [form, setForm] = useState(initialForm);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    let { name, value } = e.target;
    
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await api.post(`/teste`, form)

      handleClose();
      alert(res.data.mensagem)

    } catch (error: any) {
      console.error(error.message);
      alert(error.response.data.erro)
    }
  }

  function handleClose() {
    setForm(initialForm);
    onClose();
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro de Teste</Modal.Title>
      </Modal.Header>

      <Form id="form-cadastro" onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="tipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              required
            >
              <option value={TipoTeste.Elétrico}>Elétrico</option>
              <option value={TipoTeste.Hidráulico}>Hidráulico</option>
              <option value={TipoTeste.Aerodinâmico}>Aerodinâmico</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="resultado">
            <Form.Label>Resultado</Form.Label>
            <Form.Select
              name="resultado"
              value={form.resultado}
              onChange={handleChange}
              required
            >
              <option value={ResultadoTeste.Aprovado}>Aprovado</option>
              <option value={ResultadoTeste.Reprovado}>Reprovado</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" type="submit" form="form-cadastro">
            Confirmar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
