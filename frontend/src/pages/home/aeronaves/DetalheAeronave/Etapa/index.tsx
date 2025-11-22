import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import type { Aeronave, Etapa, Funcionario } from "../../../../../utils/types";
import { Button } from "react-bootstrap";
import FuncionariosTable from "./tables/FuncionariosTable";

export default function Etapa(){
  const { id, etapaId } = useParams<{ id: string; etapaId: string }>();
  const aeronave = useOutletContext<Aeronave>();

	const navigate = useNavigate()
	
  const etapa: Etapa | undefined = aeronave?.etapas?.find(p => p.nome === etapaId);

	const funcionarios: Funcionario[] = etapa?.funcionarios ?? [];

  if (!etapa) {
    return <p>Etapa não encontrada para a aeronave {id}</p>;
  }

	return(
		<>
			<div className={`d-flex flex-column my-5 row-gap-5`}>
				<div>
					<button className={`btn btn-gray`} onClick={() => navigate(`/aeronaves/${id}`)}>
						Voltar
					</button>
				</div>
				<div>
					<h2>{etapaId}</h2>
					<div className={`row text-center text-nowrap mt-3 row-gap-3`}>
						<div className={`col`}>
							Prazo: <strong>{etapa.prazo}</strong>
						</div>
						<div className={`col`}>
							Status Atual: <strong>{etapa.status}</strong>
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
							etapa.status === "Pendente" ? (
								<Button onClick={() => console.log("Agora a etapa está em andamento")}>Em Andamento</Button>
							) : etapa.status === "Em Andamento" ? (
								<Button variant="secondary" style={{cursor: "default", pointerEvents: "none"}}>Em Andamento</Button>
							) : (
								<Button variant="secondary" disabled>Em Andamento</Button>
							)
						}
						<div className={`align-content-center fs-3`}>{">"}</div>
						{
							etapa.status === "Pendente" ? (
								<Button disabled>Concluída</Button>
							) : etapa.status === "Em Andamento" ? (
								<Button onClick={() => console.log("Agora a etapa está concluída")}>Concluída</Button>
							) : (
								<Button variant="secondary" style={{cursor: "default", pointerEvents: "none"}}>Concluída</Button>
							)
						}
					</div>
				</div>
				<div className={``}>
					<FuncionariosTable funcionarios={funcionarios} />
				</div>
			</div>
		</>
	)
}