interface props{
  filterTipo: string
  setFilterTipo: (value: string) => void
  filterStatus: string
  setFilterStatus: (value: string) => void
}

export function TestesTableControls({filterTipo, setFilterTipo, filterStatus, setFilterStatus}: props){
  return(
    <div className={`d-flex flex-row column-gap-2`}>

      <select
        className={`form-select`}
        value={filterTipo}
        onChange={(e) => setFilterTipo(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="Elétrico">Elétrico</option>
        <option value="Hidráulico">Hidráulico</option>
        <option value="Aerodinâmico">Aerodinâmico</option>
      </select>

      <select
        className={`form-select`}
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="Aprovado">Aprovado</option>
        <option value="Reprovado">Reprovado</option>
      </select>
    </div>
  )
}