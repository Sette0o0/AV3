import { Outlet, useParams } from "react-router-dom";
import dados from "../../../../dadosTeste.json";
import type { Aeronave } from "../../../../utils/types";

export default function DetalheAeronaveLayout() {
  const { id } = useParams<{ id: string }>();
  const aeronave: Aeronave | undefined = (dados.aeronaves as Aeronave[]).find(a => a.codigo === id);

  if (!aeronave) return <p>Aeronave não encontrada</p>;

  return (
    <>
      <div className={`p-3`}>
        <div>
          <h1>Detalhes da Aeronave {aeronave.codigo}</h1>
          <p>Modelo: {aeronave.modelo}</p>
          <p>Capacidade: {aeronave.capacidade}</p>
          <p>Alcance: {aeronave.alcance}</p>
          <p>Tipo: {aeronave.tipo}</p>
        </div>
        <div className={`d-flex flex-column`}>
          <Outlet context={aeronave}></Outlet>
        </div>
      </div>
    </>
  );
}
