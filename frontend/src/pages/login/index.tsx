import { useState } from "react"
import ThemeToggle from "../../components/themeToggle/ThemeToggle"
import styles from "./index.module.css"
import { FormLogin } from "./FormLogin"

export default function Login(){
  useState()

  return (
    <>
      <div className={`container-fluid ${styles.background} py-4`}>
        <div className={styles['theme-switch']}>
          <ThemeToggle scale={1.3}></ThemeToggle>
        </div>
        <div className={` d-flex flex-column`}>
          <div className={`my-5`}>
            <h1 className={styles.titulo}>Gerencie sua produção com a Aerocode</h1>
          </div>
          <div className={`${styles["login-card"]}`}>
            <FormLogin></FormLogin>
          </div>
        </div>
      </div>
    </>
  )
}