interface props{
  search: string
  setSearch: (value: string) => void
  filterTipo: string
  setFilterTipo: (value: string) => void
  filterStatus: string
  setFilterStatus: (value: string) => void
}

export function PecasTableControls({search, setSearch, filterTipo, setFilterTipo, filterStatus, setFilterStatus}: props){
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
        value={filterTipo}
        onChange={(e) => setFilterTipo(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="Nacional">Nacional</option>
        <option value="Importada">Importada</option>
      </select>

      <select
        className={`form-select`}
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="Em Produção">Em Produção</option>
        <option value="Em Transporte">Em Transporte</option>
        <option value="Pronta">Pronta</option>
      </select>
    </div>
  )
}