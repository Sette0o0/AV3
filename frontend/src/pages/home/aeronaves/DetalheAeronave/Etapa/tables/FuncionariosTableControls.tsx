import { NivelPermissao } from "../../../../../../utils/enums"

interface props{
  search: string
  setSearch: (value: string) => void
  filterPermissao: string
  setFilterPermissao: (value: string) => void
}

export function FuncionariosTableControls({search, setSearch, filterPermissao, setFilterPermissao}: props){
  return(
    <div className={`d-flex flex-row column-gap-2`}>
      <input
        className={`form-control`}
        type="text"
        placeholder="Pesquisar por nome ou usuário..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className={`form-select`}
        value={filterPermissao}
        onChange={(e) => setFilterPermissao(e.target.value)}
      >
        <option value="">Todos os níveis</option>
        <option value={NivelPermissao.Administrador}>Administrador</option>
        <option value={NivelPermissao.Engenheiro}>Engenheiro</option>
        <option value={NivelPermissao.Operador}>Operador</option>
      </select>
    </div>
  )
}