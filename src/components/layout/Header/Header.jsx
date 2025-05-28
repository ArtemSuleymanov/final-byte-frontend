import { useSelector } from 'react-redux';
import s from './Header.module.css';

import sprite from '../../../assets/sprite.svg';
import LogoutModal from '../LogoutModal/LogoutModal';

export default function Header({ logoutClick }) {
  const user = useSelector((state) => state.auth.user);

  const userName = user?.name || 'User';

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.logo}>
          <svg className={s.icon} width="32" height="32">
            <use href={`${sprite}#icon-wallet`} />
          </svg>
          <p className={s.text}>Spendy</p>
        </div>
        <div className={s.userInfo}>
          <span className={s.userName}>{userName}</span>
          <div className={s.divider} />
          <button className={s.exitBtn} onClick={logoutClick}>
            <svg className={s.exitIcon} width="18" height="18">
              <use href={`${sprite}#icon-exit-1`} />
            </svg>
            Exit
          </button>
        </div>
      </div>
    </header>
  );
}
