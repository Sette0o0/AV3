import { useEffect, useState } from "react";
import { AeronavesTableColtrols } from "./AeronavesTableControls";
import { AeronavesTableLista } from "./AeronavesTableLista";
import { ModalCadastroAeronave } from "../modals/ModalCadastroAeronave";
import { useAuth } from "../../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { NivelPermissao } from "../../../../utils/enums";
import api from "../../../../utils/api";
import type { Aeronave } from "../../../../utils/types";

export default function AeronavesTable(){
  const [ aeronaves, setAeronaves] = useState<Aeronave[] | null>(null)
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [showModal, setShowModal] = useState(false)
  const { user } = useAuth()

  if (!user) return <Navigate to={"/login"} replace />

  async function carregarAeronave() {
    try {
      const res = await api.get("/aeronave")

      setAeronaves(res.data.aeronaves)
    } catch (error: any) {
      console.error(error.message)
      alert(error.response.data.erro)
    }
  }

  useEffect(() => {
    carregarAeronave()
  }, [])

  return(
    <>
      <div className="py-3 p-3">
        <div className={`d-flex flex-column flex-md-row row-gap-2`}>
          <div className={`d-flex flex-row align-items-center`}>
            <h1>Aeronaves</h1>
            {user.nivel_permissao !== NivelPermissao.Operador && (
              <button className={`btn btn-primary ms-auto ms-md-2`} onClick={() => setShowModal(true)}>+ Aeronaves</button>
            )}
          </div>
          <div className={`ms-0 ms-md-auto d-flex`}>
            <AeronavesTableColtrols search={search} setSearch={setSearch} filterTipo={filterTipo} setFilterTipo={setFilterTipo} />
          </div>
        </div>
        <div className={`w-100 mt-3 table-responsive`}>
          <AeronavesTableLista aeronaves={aeronaves} search={search} filterTipo={filterTipo} />
        </div>
      </div>
      {user.nivel_permissao !== NivelPermissao.Operador && (
        <ModalCadastroAeronave refetch={carregarAeronave} show={showModal} onClose={() => setShowModal(false)}/>
      )}
    </>
  )
}