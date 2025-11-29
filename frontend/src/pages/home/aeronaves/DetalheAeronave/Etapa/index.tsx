import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { type Aeronave, type Etapa, type Funcionario } from "../../../../../utils/types";
import { Button } from "react-bootstrap";
import FuncionariosTable from "./tables/FuncionariosTable";
import { StatusEtapa } from "../../../../../utils/enums";
import { useEffect, useState } from "react";
import api from "../../../../../utils/api";
import { formatarData, tirarUnderline } from "../../../../../utils/coisas";

export default function Etapa(){
	const [ etapa, setEtapa ] = useState<Etapa | null>(null)
	const [ funcionarios, setFuncionarios] = useState<Funcionario[] | null>(null)
  const { codigo, etapaId } = useParams<{ codigo: string; etapaId: string }>();
  const { aeronave, carregarAeronave } = useOutletContext<{aeronave: Aeronave, carregarAeronave: () => void}>();

	const navigate = useNavigate()
	
	useEffect(() => {
		setEtapa(aeronave.etapas.find(e => e.id_eta === Number(etapaId)) ?? null)
	}, [aeronave])

	useEffect(() => {
		setFuncionarios(etapa?.funcionario ?? [])
	}, [etapa])

  if (!etapa) {
    return <p>Etapa não encontrada para a aeronave {codigo}</p>;
  }

	async function alterarStatus(status: StatusEtapa) {
		if (!etapa) return
		try {
			const res = await api.put("/etapa/status/" + etapa.id_eta, {status})

			carregarAeronave()
			alert(res.data.mensagem)

		} catch (error: any) {
			console.error(error.message);
			alert(error.response.data.erro)
		}
	}

	return(
		<>
			<div className={`d-flex flex-column my-5 row-gap-5`}>
				<div>
					<button className={`btn btn-gray`} onClick={() => navigate(`/aeronaves/${codigo}`)}>
						Voltar
					</button>
				</div>
				<div>
					<h2>{etapa.nome}</h2>
					<div className={`row text-center text-nowrap mt-3 row-gap-3`}>
						<div className={`col`}>
							Prazo: <strong>{formatarData(etapa.prazo)}</strong>
						</div>
						<div className={`col`}>
							Status Atual: <strong>{tirarUnderline(etapa.status)}</strong>
						</div>
					</div>
					<div className={`column-gap-3 d-flex flex-row mt-4 justify-content-center`}>
						{
							etapa.status === "Pendente" ? (
								<Button variant="secondary" style={{cursor: "default", pointerEvents: "none"}}>Pendente</Button>
							) : (
								<Button variant="secondary" disabled>Pendente</Button>
							)
						}
						<div className={`align-content-center fs-3`}>{">"}</div>
						{
							etapa.status === StatusEtapa.Pendente ? (
								<Button onClick={() => alterarStatus(StatusEtapa.Em_Andamento)}>Em Andamento</Button>
							) : etapa.status === StatusEtapa.Em_Andamento ? (
								<Button variant="secondary" style={{cursor: "default", pointerEvents: "none"}}>Em Andamento</Button>
							) : (
								<Button variant="secondary" disabled>Em Andamento</Button>
							)
						}
						<div className={`align-content-center fs-3`}>{">"}</div>
						{
							etapa.status === "Pendente" ? (
								<Button disabled>Concluída</Button>
							) : etapa.status === StatusEtapa.Em_Andamento ? (
								<Button onClick={() => alterarStatus(StatusEtapa.Concluída)}>Concluída</Button>
							) : (
								<Button variant="secondary" style={{cursor: "default", pointerEvents: "none"}}>Concluída</Button>
							)
						}
					</div>
				</div>
				<div className={``}>
					<FuncionariosTable refetch={carregarAeronave} funcionarios={funcionarios} />
				</div>
			</div>
		</>
	)
}