import { useState } from "react";
import { FuncionariosTableLista } from "./FuncionariosTableLista";
import { FuncionariosTableControls } from "./FuncionariosTableControls";
import { ModalSelecionarFuncionario } from "../modals/ModalSelecionarFuncionario";
import type { Funcionario } from "../../../../../../utils/types";
import { useAuth } from "../../../../../../hooks/useAuth";
import { NivelPermissao } from "../../../../../../utils/enums";
import { Navigate } from "react-router-dom";

interface props{
  refetch: () => void
  funcionarios: Funcionario[] | null
}

export default function FuncionariosTable({refetch, funcionarios}: props){
  const [search, setSearch] = useState("");
  const [filterPermissao, setFilterPermissao] = useState("");
  const [showModal, setShowModal] = useState(false)
  const { user } = useAuth()
  
  if (!user) return <Navigate to={"/login"} replace />

  return(
    <>
      <div className="">
        <div className={`d-flex flex-column flex-md-row row-gap-2`}>
          <div className={`d-flex flex-row align-items-center`}>
            <h1>Funcionarios</h1>
            {user.nivel_permissao !== NivelPermissao.Operador && (
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
      {user.nivel_permissao !== NivelPermissao.Operador && (
        <ModalSelecionarFuncionario
          onClose={() => {
            setShowModal(false)
            refetch()
          }}
          show={showModal}
          funcionariosAssociados={funcionarios}
        />
      )}
    </>
  )
}