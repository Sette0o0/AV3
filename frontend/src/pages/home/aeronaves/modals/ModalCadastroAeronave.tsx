import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onClose: () => void;
}

export function ModalCadastroAeronave({ show, onClose }: Props) {
  const initialForm = {
    codigo: "",
    modelo: "",
    tipo: "Comercial",
    capacidade: "",
    alcance: "",
  };

  const [form, setForm] = useState(initialForm);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    let { name, value }: { name: string; value: string | number } = e.target;
    switch (name) {
      case "capacidade":
        value = Number(value);
        break;
      case "alcance":
        value = Number(value);
        break;
    }
    
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Cadastrar a aeronave", form);
    handleClose();
  }

  function handleClose() {
    setForm(initialForm);
    onClose();
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro de Aeronave</Modal.Title>
      </Modal.Header>

      <Form id="form-cadastro" onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="codigo">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              name="codigo"
              placeholder="Código..."
              value={form.codigo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="modelo">
            <Form.Label>Modelo</Form.Label>
            <Form.Control
              type="text"
              name="modelo"
              placeholder="Modelo..."
              value={form.modelo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="tipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              required
            >
              <option value="Comercial">Comercial</option>
              <option value="Militar">Militar</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="capacidade">
            <Form.Label>Capacidade</Form.Label>
            <Form.Control
              type="number"
              name="capacidade"
              placeholder="Capacidade..."
              value={form.capacidade}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="alcance">
            <Form.Label>Alcance</Form.Label>
            <Form.Control
              type="number"
              name="alcance"
              placeholder="Alcance..."
              maxLength={15}
              value={form.alcance}
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
