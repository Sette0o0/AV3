import { useState } from "react";
import { TestesTableControls } from "./TestesTableControls";
import type { Aeronave } from "../../../../../utils/types";
import { TestesTableList } from "./TesteTableList";
import { ModalCadastroTeste } from "../modals/ModalCadastroTeste";

interface props{
  aeronave: Aeronave
}

export function TestesTable({aeronave}: props){
  const [filterTipo, setFilterTipo] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showModal, setShowModal] = useState(false)

  return(
    <>
      <div className="">
        <div className={`d-flex flex-column flex-md-row row-gap-2`}>
          <div className={`d-flex flex-row align-items-center`}>
            <h1>Testes</h1>
            <button className={`btn btn-primary ms-auto ms-md-2`} onClick={() => setShowModal(true)}>+ Testes</button>
          </div>
          <div className={`ms-0 ms-md-auto d-flex`}>
            <TestesTableControls filterTipo={filterTipo} setFilterTipo={setFilterTipo} filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
          </div>
        </div>
        <div className={`w-100 mt-3 table-responsive`}>
          <TestesTableList filterTipo={filterTipo} filterStatus={filterStatus} testes={aeronave.testes} />
        </div>
      </div>
      <ModalCadastroTeste onClose={() => setShowModal(false)} show={showModal} />
    </>
  )
}