import { formatarTelefone } from "../../../../utils/coisas"
import type { Funcionario } from "../../../../utils/types"
import { Modal, Button, ListGroup } from "react-bootstrap"

interface Props {
  show: boolean
  funcionario: Funcionario | null
  onClose: () => void
}

export function ModalFuncionario({ show, funcionario, onClose }: Props) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Informações do Funcionário</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {funcionario ? (
          <ListGroup variant="flush">
            {Object.entries(funcionario)
              .map(([chave, valor]) => (
                <ListGroup.Item key={chave} className="d-flex">
                  <strong className="text-capitalize me-2">{chave}</strong>
                  <span>
                    {chave === "telefone"
                      ? formatarTelefone(String(valor))
                      : String(valor)}
                  </span>
                </ListGroup.Item>
              ))}
          </ListGroup>
        ) : (
          <p className="text-muted">Nenhum funcionário selecionado</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="gray" onClick={onClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
