import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import type { Aeronave, Peca } from "../../../../../utils/types";
import { Button } from "react-bootstrap";
import { StatusPeca } from "../../../../../utils/enums";
import { tirarUnderline } from "../../../../../utils/coisas";
import api from "../../../../../utils/api";
import { useEffect, useState } from "react";

export default function Peca(){
	const [ peca, setPeca ] = useState<Peca | null>(null)
  const { codigo, pecaId } = useParams<{ codigo: string; pecaId: string }>();
  const { aeronave, carregarAeronave } = useOutletContext<{aeronave: Aeronave, carregarAeronave: () => void}>();
	const navigate = useNavigate()
	
	useEffect(() => {
  	setPeca(aeronave.pecas.find(p => p.id_pec === Number(pecaId)) ?? null)
	}, [aeronave])

  if (!peca) {
    return <p>Peça não encontrada para a aeronave {codigo}</p>;
  }

	async function alterarStatus(status: StatusPeca) {
		if (!peca) return
		try {
			const res = await api.put("/peca/status/" + peca.id_pec, {status})

			carregarAeronave()
			alert(res.data.mensagem)

		} catch (error: any) {
			console.error(error.message);
			alert(error.response.data.erro)
		}
	}

	return(
		<>
			<div className={`d-flex flex-column my-4`}>
				<div className={`mb-4`}>
					<button className={`btn btn-gray`} onClick={() => navigate(`/aeronaves/${codigo}`)}>
						Voltar
					</button>
				</div>
				<div>
					<h2>{peca.nome}</h2>
					<div className={`row text-center text-nowrap mt-3 row-gap-3`}>
						<div className={`col`}>
							Tipo de peça: <strong>{peca.tipo}</strong>
						</div>
						<div className={`col`}>
							Fornecedor: <strong>{peca.fornecedor}</strong>
						</div>
						<div className={`col`}>
							Status Atual: <strong>{tirarUnderline(peca.status)}</strong>
						</div>
					</div>
					<div className={`column-gap-3 d-flex flex-row mt-4 justify-content-center`}>
						{
							peca.status === StatusPeca.Em_Produção ? (
								<Button variant="secondary" style={{cursor: "default", pointerEvents: "none"}}>Em Produção</Button>
							) : (
								<Button variant="secondary" disabled>Em Produção</Button>
							)
						}
						<div className={`align-content-center fs-3`}>{">"}</div>
						{
							peca.status === StatusPeca.Em_Produção ? (
								<Button onClick={() => alterarStatus(StatusPeca.Em_Transporte)}>Em Transporte</Button>
							) : peca.status === StatusPeca.Em_Transporte ? (
								<Button variant="secondary" style={{cursor: "default", pointerEvents: "none"}}>Em Transporte</Button>
							) : (
								<Button variant="secondary" disabled>Em Transporte</Button>
							)
						}
						<div className={`align-content-center fs-3`}>{">"}</div>
						{
							peca.status === StatusPeca.Em_Produção ? (
								<Button disabled>Pronta</Button>
							) : peca.status === StatusPeca.Em_Transporte ? (
								<Button onClick={() => alterarStatus(StatusPeca.Pronta)}>Pronta</Button>
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