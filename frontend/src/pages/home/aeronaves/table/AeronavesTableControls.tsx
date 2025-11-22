interface props{
  search: string
  setSearch: (value: string) => void
  filterTipo: string
  setFilterTipo: (value: string) => void
}

export function AeronavesTableColtrols({search, setSearch, filterTipo, setFilterTipo}: props){
  return(
    <div className={`d-flex flex-row column-gap-2`}>
      <input
        className={`form-control`}
        type="text"
        placeholder="Pesquisar por código ou modelo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className={`form-select`}
        value={filterTipo}
        onChange={(e) => setFilterTipo(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="Comercial">Comercial</option>
        <option value="Militar">Militar</option>
      </select>
    </div>
  )
}