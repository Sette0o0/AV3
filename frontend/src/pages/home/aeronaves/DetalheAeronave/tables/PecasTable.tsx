import { useState } from "react";
import { PecasTableControls } from "./PecasTableControls";
import type { Aeronave } from "../../../../../utils/types";
import { PecasTableList } from "./PecasTableList";
import { ModalCadastroPeca } from "../modals/ModalCadastroPeca";
import { useAuth } from "../../../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { NivelPermissao } from "../../../../../utils/enums";

interface props{
  aeronave: Aeronave
}

export function PecasTable({aeronave}: props){
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showModal, setShowModal] = useState(false)
  const { user } = useAuth()
  
  if (!user) return <Navigate to={"/login"} replace />

  return(
    <>
      <div className="">
        <div className={`d-flex flex-column flex-md-row row-gap-2`}>
          <div className={`d-flex flex-row align-items-center`}>
            <h1>Peças</h1>
            {user.nivel_permissao !== NivelPermissao.Operador && (
              <button className={`btn btn-primary ms-auto ms-md-2`} onClick={() => setShowModal(true)}>+ Peça</button>
            )}
          </div>
          <div className={`ms-0 ms-md-auto d-flex`}>
            <PecasTableControls search={search} setSearch={setSearch} filterTipo={filterTipo} setFilterTipo={setFilterTipo} filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
          </div>
        </div>
        <div className={`w-100 mt-3 table-responsive`}>
          <PecasTableList search={search} filterTipo={filterTipo} filterStatus={filterStatus} pecas={aeronave.pecas} />
        </div>
      </div>
      {user.nivel_permissao !== NivelPermissao.Operador && (
        <ModalCadastroPeca onClose={() => setShowModal(false)} show={showModal} />
      )}
    </>
  )
}