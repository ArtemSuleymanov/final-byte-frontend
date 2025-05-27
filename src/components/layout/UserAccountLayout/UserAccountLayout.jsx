import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"

import css from "./UserAccountLayout.module.css"

const UserAccountLayout = () => {
  return (
    <>
      <Header />
      <main className={css["main-content"]}>
        <div className={css["layout-body"]}>
          <Sidebar />
          <Outlet />
        </div>
      </main>
    </>
  );
};




export default UserAccountLayout

