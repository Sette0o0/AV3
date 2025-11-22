import { useNavigate } from "react-router-dom";
import styles from "./MainSection.module.css"

interface props{
  title: string
  desc: string
  img: string
  link: string
}

export function MainSection({title, desc, img, link}: props){
  const navigate = useNavigate();


  return(
    <>
      <div className={`${styles.card} p-3`} style={{background: `url(${img}) center / cover`}}>
        <h2 className={`${styles.title}`}>{title}</h2>
        <p className={`${styles.desc}`}>{desc}</p>
        <button className={`${styles.btn} btn btn-primary mt-auto p-1`} onClick={() => navigate(link)}>Gerenciar {title}</button>
      </div>
    </>
  )
}