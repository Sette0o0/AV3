import { useState } from "react";
import { AeronavesTableColtrols } from "./AeronavesTableControls";
import { AeronavesTableLista } from "./AeronavesTableLista";
import { ModalCadastroAeronave } from "../modals/ModalCadastroAeronave";
import { useAuth } from "../../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { NivelPermissao } from "../../../../utils/enums";

export default function AeronavesTable(){
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [showModal, setShowModal] = useState(false)
  const { user } = useAuth()

  if (!user) return <Navigate to={"/login"} replace />

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
          <AeronavesTableLista search={search} filterTipo={filterTipo} />
        </div>
      </div>
      {user.nivel_permissao !== NivelPermissao.Operador && (
        <ModalCadastroAeronave show={showModal} onClose={() => setShowModal(false)}/>
      )}
    </>
  )
}