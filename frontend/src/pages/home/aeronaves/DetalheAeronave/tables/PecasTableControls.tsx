import { StatusPeca, TipoPeca } from "../../../../../utils/enums"

interface props{
  search: string
  setSearch: (value: string) => void
  filterTipo: TipoPeca | ""
  setFilterTipo: (value: TipoPeca | "") => void
  filterStatus: StatusPeca | ""
  setFilterStatus: (value: StatusPeca | "") => void
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
        onChange={(e) => setFilterTipo(e.target.value as TipoPeca)}
      >
        <option value="">Todos</option>
        <option value={TipoPeca.Nacional}>Nacional</option>
        <option value={TipoPeca.Importada}>Importada</option>
      </select>

      <select
        className={`form-select`}
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value as StatusPeca)}
      >
        <option value="">Todos</option>
        <option value={StatusPeca.Em_Produção}>Em Produção</option>
        <option value={StatusPeca.Em_Transporte}>Em Transporte</option>
        <option value={StatusPeca.Pronta}>Pronta</option>
      </select>
    </div>
  )
}