import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import jsPDF from "jspdf";
import type { Aeronave } from "../../../../../utils/types";

interface Props {
  show: boolean;
  onClose: () => void;
  aeronave: Aeronave;
}

export function ModalGerarRelatorio({ show, onClose, aeronave }: Props) {
  const [form, setForm] = useState({ cliente: "", dataEntrega: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function gerarRelatorio() {
    const doc = new jsPDF();

    let texto = `Relatório de Entrega da Aeronave\n\n`;
    texto += `Cliente: ${form.cliente}\n`;
    texto += `Data de entrega: ${form.dataEntrega}\n\n`;

    texto += `Código: ${aeronave.codigo}\n`;
    texto += `Modelo: ${aeronave.modelo}\n`;
    texto += `Tipo: ${aeronave.tipo}\n`;
    texto += `Capacidade: ${aeronave.capacidade}\n`;
    texto += `Alcance: ${aeronave.alcance}\n\n`;

    texto += `Peças:\n`;
    if (aeronave.pecas?.length) {
      aeronave.pecas.forEach((p, i) => {
        texto += `${i + 1}. ${p.nome} | Tipo: ${p.tipo} | Fornecedor: ${p.fornecedor} | Status: ${p.status}\n`;
      });
    } else {
      texto += "Nenhuma peça cadastrada.\n";
    }

    texto += `\nEtapas:\n`;
    if (aeronave.etapas?.length) {
      aeronave.etapas.forEach((e, i) => {
        const funcionarios = e.funcionarios.map(f => f.nome).join(", ") || "Nenhum";
        texto += `${i + 1}. ${e.nome} | Prazo: ${e.prazo} | Status: ${e.status} | Funcionários: ${funcionarios}\n`;
      });
    } else {
      texto += "Nenhuma etapa cadastrada.\n";
    }

    texto += `\nTestes:\n`;
    if (aeronave.testes?.length) {
      aeronave.testes.forEach((t, i) => {
        texto += `${i + 1}. Tipo: ${t.tipo} | Resultado: ${t.resultado}\n`;
      });
    } else {
      texto += "Nenhum teste cadastrado.\n";
    }

    const lines = doc.splitTextToSize(texto, 180);
    doc.text(lines, 15, 15);

    doc.save(`relatorio_${aeronave.codigo}_${form.dataEntrega}.pdf`);
    onClose();
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Gerar Relatório</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="cliente">
            <Form.Label>Nome do Cliente</Form.Label>
            <Form.Control
              type="text"
              name="cliente"
              placeholder="Cliente..."
              value={form.cliente}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="dataEntrega">
            <Form.Label>Data de Entrega</Form.Label>
            <Form.Control
              type="date"
              name="dataEntrega"
              value={form.dataEntrega}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="gray" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={gerarRelatorio}>
          Baixar Relatório
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
