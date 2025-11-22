import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onClose: () => void;
}

export function ModalCadastroTeste({ show, onClose }: Props) {
  const initialForm = {
    tipo: "Elétrico",
    resultado: "Aprovado",
  };

  const [form, setForm] = useState(initialForm);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    let { name, value } = e.target;
    
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Cadastrar a Teste na Aeronave", form);
    handleClose();
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
              <option value="Elétrico">Elétrico</option>
              <option value="Hidráulico">Hidráulico</option>
              <option value="Aerodinâmico">Aerodinâmico</option>
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
              <option value="Aprovado">Aprovado</option>
              <option value="Reprovado">Reprovado</option>
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
