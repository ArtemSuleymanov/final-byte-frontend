import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import css from './UserAccountLayout.module.css';
import { useState } from 'react';
import LogoutModal from '../LogoutModal/LogoutModal';

const UserAccountLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Header logoutClick={() => setIsModalOpen(true)} />
      <main className={css['main-content']}>
        <div className={css['layout-body']}>
          <Sidebar />
          <Outlet />
        </div>
        <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </main>
    </>
  );
};

export default UserAccountLayout;
