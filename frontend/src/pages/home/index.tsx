import { Outlet } from "react-router-dom";
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";

export default function HomeLayout(){
  return (
    <>
      <div className={`page`}>
        <Navbar></Navbar>
        <main className="container-fluid p-0 mb-auto">
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}