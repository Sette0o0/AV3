import { Navigate } from "react-router-dom"
import LoadingScreen from "../../components/LoadingScreen"
import { MainSection } from "../../components/mainSection/MainSection"
import AirPlane from "../../components/svgs/AirPlane"
import { useAuth } from "../../hooks/useAuth"
import styles from "./Inicio.module.css"
import { NivelPermissao } from "../../utils/enums"

export default function Inicio(){
  const { user, loading } = useAuth()
  
  if (loading) return <LoadingScreen></LoadingScreen>

  if (!user) return <Navigate to="/login"></Navigate>
  
  return(
    <>
      <section>
        <div className={styles.baner}>
          <div className={styles["baner-img"]}>
            <div className={styles["svg-airplane"]}>
              <AirPlane></AirPlane>
            </div>
            <h1 className={styles.titulo}>Gerenciador de Produção AeroCode</h1>
          </div>
        </div>
      </section>
      <section className={`d-flex flex-column flex-lg-row gap-4 px-3 py-5`}>
        <MainSection title="Aeronaves" desc="Gerencie suas Aeronaves" img="/plane-onHangar.jpg" link="/aeronaves"></MainSection>
        {user.nivel_permissao == NivelPermissao.Administrador && (
          <MainSection title="Funcionários" desc="Gerencie seus Funcionários" img="/workers.jpg" link="/funcionarios"></MainSection>
        )}
      </section>
    </>
  )
}