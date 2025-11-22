import { useState } from "react";
import { FuncionariosTableLista } from "./FuncionariosTableLista";
import { FuncionariosTableControls } from "./FuncionariosTableControls";
import { ModalCadastroFuncionario } from "../modals/ModalCadastroFuncionario";

export default function FuncionariosTable(){
  const [search, setSearch] = useState("");
  const [filterPermissao, setFilterPermissao] = useState("");
  const [showModal, setShowModal] = useState(false)

  return(
    <>
      <div className="py-3 p-3">
        <div className={`d-flex flex-column flex-md-row row-gap-2`}>
          <div className={`d-flex flex-row align-items-center`}>
            <h1>Funcionarios</h1>
            <button className={`btn btn-primary ms-auto ms-md-2`} onClick={() => setShowModal(true)}>+ Funcionário</button>
          </div>
          <div className={`ms-0 ms-md-auto d-flex`}>
            <FuncionariosTableControls search={search} setSearch={setSearch} filterPermissao={filterPermissao} setFilterPermissao={setFilterPermissao} />
          </div>
        </div>
        <div className={`w-100 mt-3 table-responsive`}>
          <FuncionariosTableLista search={search} filterPermissao={filterPermissao} />
        </div>
      </div>
      <ModalCadastroFuncionario onClose={() => setShowModal(false)} show={showModal} />
    </>
  )
}