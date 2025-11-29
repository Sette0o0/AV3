import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import jsPDF from "jspdf";
import type { Aeronave } from "../../../../../utils/types";
import { formatarData, tirarUnderline } from "../../../../../utils/coisas";

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
    const doc = new jsPDF({ unit: "pt" });

    let conteudo = "";
    const add = (linha: string = "") => (conteudo += linha + "\n");

    add("Relatório de Entrega da Aeronave");
    add("");
    add(`Cliente: ${form.cliente}`);
    add(`Data de Entrega: ${formatarData(form.dataEntrega)}`);
    add("");

    add("=== Informações da Aeronave ===");
    add(`Código: ${aeronave.codigo}`);
    add(`Modelo: ${aeronave.modelo}`);
    add(`Tipo: ${aeronave.tipo}`);
    add(`Capacidade: ${aeronave.capacidade}`);
    add(`Alcance: ${aeronave.alcance} pés`);
    add("");

    add("=== Peças da Aeronave ===");
    aeronave.pecas.forEach((p, i) => {
      add(`Peça ${i + 1}: ${p.nome}`);
      add(`  Tipo: ${p.tipo}`);
      add(`  Fornecedor: ${p.fornecedor}`);
      add(`  Status: ${tirarUnderline(p.status)}`);
      add("");
    });

    add("=== Etapas da Produção ===");
    aeronave.etapas.forEach((etapa, i) => {
      add(`Etapa ${i + 1}: ${etapa.nome}`);
      add(`  Status: ${tirarUnderline(etapa.status)}`);
      add(`  Prazo: ${formatarData(etapa.prazo)}`);

      if (etapa.funcionario.length > 0) {
        add("  Funcionários:");
        etapa.funcionario.forEach((f) => {
          add(`    • [${f.id_func}] ${f.nome} — ${f.nivel_permissao}`);
        });
      } else {
        add("  Nenhum funcionário responsável");
      }

      add("");
    });

    add("=== Testes Realizados ===");
    aeronave.testes.forEach((t) => {
      add(`• Teste ${t.id_tes}: ${t.tipo} — Resultado: ${t.resultado}`);
    });

    const lines = doc.splitTextToSize(conteudo, 540);

    let y = 40;
    const lineHeight = 16;
    const pageHeight = doc.internal.pageSize.height - 40;

    lines.forEach((linha: any) => {
      if (y > pageHeight) {
        doc.addPage();
        y = 40;
      }
      doc.text(linha, 40, y);
      y += lineHeight;
    });

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
