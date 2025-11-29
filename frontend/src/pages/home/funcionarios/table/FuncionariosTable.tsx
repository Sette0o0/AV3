import { useEffect, useState } from "react";
import { FuncionariosTableLista } from "./FuncionariosTableLista";
import { FuncionariosTableControls } from "./FuncionariosTableControls";
import { ModalCadastroFuncionario } from "../modals/ModalCadastroFuncionario";
import type { NivelPermissao } from "../../../../utils/enums";
import type { Funcionario } from "../../../../utils/types";
import api from "../../../../utils/api";

export default function FuncionariosTable(){
  const [ funcionarios, setFuncionarios ] = useState<Funcionario[] | null>(null)
  const [search, setSearch] = useState("");
  const [filterPermissao, setFilterPermissao] = useState<NivelPermissao | "">("");
  const [showModal, setShowModal] = useState(false)

  async function carregarFuncionarios() {
    try {
      const res = await api.get("/funcionario")
      setFuncionarios(res.data.funcionarios)
    } catch (error: any) {
      console.error(error.message)
      alert(error.response.data.erro)
    }
  }
  
  useEffect(() => {
    carregarFuncionarios()
  }, [])

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
          <FuncionariosTableLista funcionarios={funcionarios} search={search} filterPermissao={filterPermissao} />
        </div>
      </div>
      <ModalCadastroFuncionario refetch={carregarFuncionarios} onClose={() => setShowModal(false)} show={showModal} />
    </>
  )
}