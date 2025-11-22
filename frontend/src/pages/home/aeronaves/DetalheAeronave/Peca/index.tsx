import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import type { Aeronave, Peca } from "../../../../../utils/types";
import { Button } from "react-bootstrap";

export default function Peca(){
  const { id, pecaId } = useParams<{ id: string; pecaId: string }>();
  const aeronave = useOutletContext<Aeronave>();
	const navigate = useNavigate()
	
  const peca: Peca | undefined = aeronave?.pecas?.find(p => p.nome === pecaId);

  if (!peca) {
    return <p>Peça não encontrada para a aeronave {id}</p>;
  }

	return(
		<>
			<div className={`d-flex flex-column my-4`}>
				<div className={`mb-4`}>
					<button className={`btn btn-gray`} onClick={() => navigate(`/aeronaves/${id}`)}>
						Voltar
					</button>
				</div>
				<div>
					<h2>{pecaId}</h2>
					<div className={`row text-center text-nowrap mt-3 row-gap-3`}>
						<div className={`col`}>
							Tipo de peça: <strong>{peca.tipo}</strong>
						</div>
						<div className={`col`}>
							Fornecedor: <strong>{peca.fornecedor}</strong>
						</div>
						<div className={`col`}>
							Status Atual: <strong>{peca.status}</strong>
						</div>
					</div>
					<div className={`column-gap-3 d-flex flex-row mt-4 justify-content-center`}>
						{
							peca.status === "Em Produção" ? (
								<Button variant="secondary" style={{cursor: "default", pointerEvents: "none"}}>Em Produção</Button>
							) : (
								<Button variant="secondary" disabled>Em Produção</Button>
							)
						}
						<div className={`align-content-center fs-3`}>{">"}</div>
						{
							peca.status === "Em Produção" ? (
								<Button onClick={() => console.log("Agora a peça está em transporte")}>Em Transporte</Button>
							) : peca.status === "Em Transporte" ? (
								<Button variant="secondary" style={{cursor: "default", pointerEvents: "none"}}>Em Transporte</Button>
							) : (
								<Button variant="secondary" disabled>Em Transporte</Button>
							)
						}
						<div className={`align-content-center fs-3`}>{">"}</div>
						{
							peca.status === "Em Produção" ? (
								<Button disabled>Pronta</Button>
							) : peca.status === "Em Transporte" ? (
								<Button onClick={() => console.log("Agora a peça está pronta")}>Pronta</Button>
							) : (
								<Button variant="secondary" style={{cursor: "default", pointerEvents: "none"}}>Pronta</Button>
							)
						}
					</div>
				</div>
			</div>
		</>
	)
}