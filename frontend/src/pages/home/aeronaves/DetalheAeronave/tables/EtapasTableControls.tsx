import { StatusEtapa } from "../../../../../utils/enums"

interface props{
  search: string
  setSearch: (value: string) => void
  filterStatus: StatusEtapa | ""
  setFilterStatus: (value: StatusEtapa | "") => void
}

export function EtapasTableControls({search, setSearch, filterStatus, setFilterStatus}: props){
  return(
    <div className={`d-flex flex-row column-gap-2`}>
      <input
        className={`form-control`}
        type="text"
        placeholder="Pesquisar por nome..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className={`form-select`}
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value as StatusEtapa)}
      >
        <option value="">Todos</option>
        <option value={StatusEtapa.Pendente}>Pendente</option>
        <option value={StatusEtapa.Em_Andamento}>Em Andamento</option>
        <option value={StatusEtapa.Concluída}>Concluída</option>
      </select>
    </div>
  )
}