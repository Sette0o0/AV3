import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import styles from "./Navbar.module.css"
import ThemeToggle from "../themeToggle/ThemeToggle"
import LoadingScreen from "../LoadingScreen"
import { NivelPermissao } from "../../utils/enums"

export function Navbar(){
  const { user, loading, logout} = useAuth()
  const navigate = useNavigate()

  if (loading) return <LoadingScreen/>

  if (!user) return <Navigate to="/login"></Navigate>

  return(
    <>
      <div className={`${styles.barra} gap-5`}>
        <nav className={`d-flex w-100 column-gap-4 flex-column flex-md-row`}>
          <div className={`d-flex flex-row align-items-center`}>
            <a className={styles.logo} onClick={() => navigate("/")}>AeroCode</a>
            <div className={`d-flex d-md-none ms-auto`}>
              <ThemeToggle scale={1.1}></ThemeToggle>
            </div>
          </div>
          <ul className={`d-flex m-0 mt-2 mt-md-0 w-100 row-gap-1 column-gap-4 align-items-center p-0 flex-column flex-md-row`}>
            <li className={`${styles["li-link"]}`}>
              <a className={styles["nav-links"]} onClick={() => navigate("/aeronaves")}>Aeronaves</a>
            </li>
            {user.nivel_permissao === NivelPermissao.Administrador && (
              <li className={styles["li-link"]}>
                <a className={styles["nav-links"]} onClick={() => navigate("/funcionarios")}>Funcionários</a>
              </li>
            )}
            <li className={`${styles["li-link"]} ms-0 ms-md-auto mt-1 mt-md-0`}>
              <a role="button" className={`${styles["btn-sair"]} ${styles["nav-links"]}`} onClick={logout}>
                Sair
              </a>
            </li>
            <li className={`ms-auto ms-md-2 d-none d-md-flex`}>
              <ThemeToggle scale={1.1}></ThemeToggle>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}