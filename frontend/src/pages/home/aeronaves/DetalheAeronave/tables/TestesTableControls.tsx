import { ResultadoTeste, TipoTeste } from "../../../../../utils/enums"

interface props{
  filterTipo: TipoTeste | ""
  setFilterTipo: (value: TipoTeste | "") => void
  filterStatus: ResultadoTeste | ""
  setFilterStatus: (value: ResultadoTeste | "") => void
}

export function TestesTableControls({filterTipo, setFilterTipo, filterStatus, setFilterStatus}: props){
  return(
    <div className={`d-flex flex-row column-gap-2`}>

      <select
        className={`form-select`}
        value={filterTipo}
        onChange={(e) => setFilterTipo(e.target.value as TipoTeste)}
      >
        <option value="">Todos</option>
        <option value={TipoTeste.Elétrico}>Elétrico</option>
        <option value={TipoTeste.Hidráulico}>Hidráulico</option>
        <option value={TipoTeste.Aerodinâmico}>Aerodinâmico</option>
      </select>

      <select
        className={`form-select`}
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value as ResultadoTeste)}
      >
        <option value="">Todos</option>
        <option value={ResultadoTeste.Aprovado}>Aprovado</option>
        <option value={ResultadoTeste.Reprovado}>Reprovado</option>
      </select>
    </div>
  )
}