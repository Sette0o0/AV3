interface props{
  search: string
  setSearch: (value: string) => void
  filterStatus: string
  setFilterStatus: (value: string) => void
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
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="Pendente">Pendente</option>
        <option value="Em Andamento">Em Andamento</option>
        <option value="Concluída">Concluída</option>
      </select>
    </div>
  )
}