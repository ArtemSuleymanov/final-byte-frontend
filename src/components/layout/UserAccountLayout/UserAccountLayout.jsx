import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"

import css from "./UserAccountLayout.module.css"

const UserAccountLayout = () => {
  return (
    <div className={css["user-layout"]}>
      <Header />
      <div className={css["layout-body"]}>
        <Sidebar />
        <main className={css["main-content"]}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default UserAccountLayout