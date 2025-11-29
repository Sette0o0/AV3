import { Outlet, useParams } from "react-router-dom";
import type { Aeronave } from "../../../../utils/types";
import { useEffect, useState } from "react";
import api from "../../../../utils/api";

export default function DetalheAeronaveLayout() {
  const { codigo } = useParams<{ codigo: string }>();
  const [ aeronave, setAeronave ] = useState<Aeronave | null>(null)

  async function carregarAeronave() {
    try {
      const res = await api.get(`/aeronave/codigo/${codigo}`)

      setAeronave(res.data.aeronave)

    } catch (error: any) {
      console.error(error.message)
      alert(error.response.data.erro)
    }
  }

  useEffect(() => {
    carregarAeronave()
  }, [])

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
          <Outlet context={{aeronave, carregarAeronave}}></Outlet>
        </div>
      </div>
    </>
  );
}
