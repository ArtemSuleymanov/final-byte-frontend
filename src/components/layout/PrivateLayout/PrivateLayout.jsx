import Header from '../Header/Header.jsx';
import { Outlet } from 'react-router-dom';
// <<<<<<< HEAD
// // <<<<<<< HEAD
// import UserAccountLayout from '../UserAccountLayout/UserAccountLayout.jsx';


// export default function PrivateLayout() {
//   return <UserAccountLayout />
// =======
import Sidebar from '../Sidebar/Sidebar.jsx';
import s from './PrivateLayout.module.css';

export default function PrivateLayout() {
  return (
    <>
      <Header />
      <main className={s.container}>
        <Sidebar />
        <div className={s.mainContent}>
          <Outlet />
        </div>
      </main>
    </>
  );
}
