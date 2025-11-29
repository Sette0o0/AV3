import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { TipoPeca } from "../../../../../utils/enums";
import api from "../../../../../utils/api";

interface Props {
  refetch: () => void
  aero_id: number
  show: boolean;
  onClose: () => void;
}

export function ModalCadastroPeca({ refetch, aero_id, show, onClose }: Props) {
  const initialForm = {
    nome: "",
    tipo: TipoPeca.Nacional,
    fornecedor: "",
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
      const res = await api.post(`/peca`, form)

      refetch()
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
        <Modal.Title>Cadastro de Peça</Modal.Title>
      </Modal.Header>

      <Form id="form-cadastro" onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome da Peça</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              placeholder="Nome da Peça..."
              value={form.nome}
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
              <option value={TipoPeca.Nacional}>Nacional</option>
              <option value={TipoPeca.Importada}>Importada</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="fornecedor">
            <Form.Label>Fornecedor</Form.Label>
            <Form.Control
              type="text"
              name="fornecedor"
              placeholder="Fornecedor..."
              value={form.fornecedor}
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
