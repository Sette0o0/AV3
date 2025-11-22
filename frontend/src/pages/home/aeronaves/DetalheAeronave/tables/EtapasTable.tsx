import { useState } from "react";
import { EtapasTableControls } from "./EtapasTableControls";
import type { Aeronave } from "../../../../../utils/types";
import { ModalCadastroEtapa } from "../modals/ModalCadastroEtapa";
import { EtapasTableList } from "./EtapasTableList";
import { NivelPermissao } from "../../../../../utils/permissions";
import { useAuth } from "../../../../../hooks/useAuth";

interface props{
  aeronave: Aeronave
}

export function EtapasTable({aeronave}: props){
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showModal, setShowModal] = useState(false)
  const { user } = useAuth()

  return(
    <>
      <div className="">
        <div className={`d-flex flex-column flex-md-row row-gap-2`}>
          <div className={`d-flex flex-row align-items-center`}>
            <h1>Etapas</h1>
            {user?.cargo !== NivelPermissao.Operador && (
              <button className={`btn btn-primary ms-auto ms-md-2`} onClick={() => setShowModal(true)}>+ Etapa</button>
            )}
          </div>
          <div className={`ms-0 ms-md-auto d-flex`}>
            <EtapasTableControls search={search} setSearch={setSearch} filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
          </div>
        </div>
        <div className={`w-100 mt-3 table-responsive`}>
          <EtapasTableList search={search} filterStatus={filterStatus} etapas={aeronave.etapas} />
        </div>
      </div>
      {user?.cargo !== NivelPermissao.Operador && (
        <ModalCadastroEtapa onClose={() => setShowModal(false)} show={showModal} />
      )}
    </>
  )
}