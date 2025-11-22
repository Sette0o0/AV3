import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { NivelPermissao } from "../../../../utils/permissions";
import { formatarTelefone } from "../../../../utils/coisas";

interface Props {
  show: boolean;
  onClose: () => void;
}

export function ModalCadastroFuncionario({ show, onClose }: Props) {
  const initialForm = {
    nome: "",
    usuario: "",
    senha: "",
    endereco: "",
    telefone: "",
    cargo: NivelPermissao.Administrador,
  };

  const [form, setForm] = useState(initialForm);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    let { name, value }: { name: string; value: string | number } = e.target;

    switch (name) {
      case "cargo":
        value = Number(value);
        break;
      case "telefone":
        value = formatarTelefone(value);
        break;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Cadastrar o funcionário", form);
    handleClose();
  }

  function handleClose() {
    setForm(initialForm);
    onClose();
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro de Funcionário</Modal.Title>
      </Modal.Header>

      <Form id="form-cadastro" onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              placeholder="Nome..."
              value={form.nome}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="usuario">
            <Form.Label>Usuário</Form.Label>
            <Form.Control
              type="text"
              name="usuario"
              placeholder="Usuário..."
              value={form.usuario}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="senha">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              name="senha"
              placeholder="Senha..."
              value={form.senha}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="endereco">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              type="text"
              name="endereco"
              placeholder="Endereço..."
              value={form.endereco}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="telefone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="text"
              name="telefone"
              placeholder="Telefone..."
              maxLength={15}
              value={form.telefone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="cargo">
            <Form.Label>Cargo</Form.Label>
            <Form.Select
              name="cargo"
              value={form.cargo}
              onChange={handleChange}
              required
            >
              <option value={NivelPermissao.Administrador}>Administrador</option>
              <option value={NivelPermissao.Engenheiro}>Engenheiro</option>
              <option value={NivelPermissao.Operador}>Operador</option>
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
