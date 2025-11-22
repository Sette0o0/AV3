import { useState } from "react"
import { type FormLogintype } from "../../utils/types"
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { NivelPermissao } from "../../utils/permissions";

export function FormLogin(){
  const { login } = useAuth()
  const navigate = useNavigate();
  const [ form, setForm ] = useState<FormLogintype>({
    usuario: "",
    senha: "",
    cargo: NivelPermissao.Administrador,
  })

  function handleChage(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: (name === "cargo" ? Number(value) : value)
    }))
  }

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    try {
      login({usuario: form.usuario, cargo: form.cargo})
      navigate("/")
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };


  return(
    <>
      <form onSubmit={handleSubmit} className={`w-100`}>
        <div className="mb-2">
          <label className={`form-label`} htmlFor="usuario">Usuário</label>
          <input className={`form-control`} type="text" name="usuario" id="usuario" onChange={handleChage} placeholder="Usuário..." required/>
        </div>
        <div className="mb-2">
          <label className={`form-label`} htmlFor="senha">Senha</label>
          <input className={`form-control`} type="password" name="senha" id="senha" onChange={handleChage} placeholder="Senha..." required/>
        </div>
        {/* Temporario */}
        <div className="mb-2">
          <label className={`form-label`} htmlFor="cargo">Cargo</label>
          <select className={`form-select`} name="cargo" id="cargo" onChange={handleChage} required>
            <option value={NivelPermissao.Administrador}>Administrador</option>
            <option value={NivelPermissao.Engenheiro}>Engenheiro</option>
            <option value={NivelPermissao.Operador}>Operador</option>
          </select>
        </div>
        <button className={`btn btn-primary mt-3 w-100`} type="submit">
          Entrar
        </button>
      </form>
    </>
  )
}