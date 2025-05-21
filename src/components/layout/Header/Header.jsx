import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import LogoutModal from './LogoutModal';

import sprite from '../../../assets/sprite.svg';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const userName = user?.name || 'Guest';

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <svg className={styles.icon} width="32" height="32">
            <use href={`${sprite}#icon-wallet`} />
          </svg>
          <p className={styles.text}>Spendy</p>
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{userName}</span>
          <div className={styles.divider}></div>
          <button className={styles.exitBtn} onClick={() => setIsModalOpen(true)}>
            <svg className={styles.exitIcon} width="18" height="18">
              <use href={`${sprite}#icon-exit-1`} />
            </svg>
            Exit
          </button>
        </div>
      </div>

      <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}
