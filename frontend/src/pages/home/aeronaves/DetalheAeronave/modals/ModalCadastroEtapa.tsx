import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onClose: () => void;
}

export function ModalCadastroEtapa({ show, onClose }: Props) {
  const initialForm = {
    nome: "",
    prazo: "",
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
    console.log("Cadastrar a Etapa na Aeronave com o status inicial", form);
    handleClose();
  }

  function handleClose() {
    setForm(initialForm);
    onClose();
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro de Etapa</Modal.Title>
      </Modal.Header>

      <Form id="form-cadastro" onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome da Etapa</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              placeholder="Nome da Etapa..."
              value={form.nome}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="prazo">
            <Form.Label>Prazo</Form.Label>
            <Form.Control
              type="date"
              name="prazo"
              placeholder="Prazo..."
              value={form.prazo}
              onChange={handleChange}
              required
            />
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
