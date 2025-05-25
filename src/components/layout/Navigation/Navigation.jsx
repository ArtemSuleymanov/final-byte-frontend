import { NavLink } from 'react-router-dom';
import sprite from '../../../assets/sprite.svg';
import s from './Navigation.module.css';

const navItems = [
  { to: '/home', label: 'Home', iconId: 'icon-home', isCurrency: false },
  { to: '/stats', label: 'Statistics', iconId: 'icon-stats', isCurrency: false },
  { to: '/currency', label: 'Currency', iconId: 'icon-currency', isCurrency: true },
];

const Icon = ({ id, isActive }) => (
  <svg className={`${s.icon} ${isActive ? s.iconActive : ''}`} aria-hidden="true">
    <use href={`${sprite}#${id}`} />
  </svg>
);

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <ul className={s.list}>
        {navItems.map(({ to, label, iconId, isCurrency }) => (
          <li key={to} className={`${s.item} ${isCurrency ? s.currencyItem : ''}`}>
            <NavLink to={to} className={({ isActive }) => (isActive ? `${s.link} ${s.active}` : s.link)} end>
              <Icon id={iconId} />
              <span className={s.label}>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
