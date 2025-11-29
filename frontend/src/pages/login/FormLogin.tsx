import { useState } from "react"
import { type FormLogintype } from "../../utils/types"
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function FormLogin(){
  const { login } = useAuth()
  const navigate = useNavigate();
  const [ form, setForm ] = useState<FormLogintype>({
    usuario: "",
    senha: ""
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
      const res = await login({usuario: form.usuario, senha: form.senha})
      if (res.ok) {
        navigate("/")
      } else {
        alert(res.mensagem)
      }
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
        <button className={`btn btn-primary mt-3 w-100`} type="submit">
          Entrar
        </button>
      </form>
    </>
  )
}