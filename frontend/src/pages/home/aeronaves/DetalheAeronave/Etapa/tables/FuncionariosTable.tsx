import { useState } from "react";
import { FuncionariosTableLista } from "./FuncionariosTableLista";
import { FuncionariosTableControls } from "./FuncionariosTableControls";
import { ModalSelecionarFuncionario } from "../modals/ModalSelecionarFuncionario";
import type { Funcionario } from "../../../../../../utils/types";
import { NivelPermissao } from "../../../../../../utils/permissions";
import { useAuth } from "../../../../../../hooks/useAuth";

interface props{
  funcionarios: Funcionario[]
}

export default function FuncionariosTable({funcionarios}: props){
  const [search, setSearch] = useState("");
  const [filterPermissao, setFilterPermissao] = useState("");
  const [showModal, setShowModal] = useState(false)
  const { user } = useAuth()

  return(
    <>
      <div className="">
        <div className={`d-flex flex-column flex-md-row row-gap-2`}>
          <div className={`d-flex flex-row align-items-center`}>
            <h1>Funcionarios</h1>
            {user?.cargo !== NivelPermissao.Operador && (
              <button className={`btn btn-primary ms-auto ms-md-2`} onClick={() => setShowModal(true)}>+ Funcionário</button>
            )}
          </div>
          <div className={`ms-0 ms-md-auto d-flex`}>
            <FuncionariosTableControls search={search} setSearch={setSearch} filterPermissao={filterPermissao} setFilterPermissao={setFilterPermissao} />
          </div>
        </div>
        <div className={`w-100 mt-3 table-responsive`}>
          <FuncionariosTableLista funcionarios={funcionarios} search={search} filterPermissao={filterPermissao} />
        </div>
      </div>
      {user?.cargo !== NivelPermissao.Operador && (
        <ModalSelecionarFuncionario onClose={() => setShowModal(false)} show={showModal} funcionariosAssociados={funcionarios} />
      )}
    </>
  )
}