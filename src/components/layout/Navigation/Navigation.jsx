import { NavLink } from 'react-router-dom';
import sprite from '../../../assets/sprite.svg';
import s from './Navigation.module.css';
import useIsMobile from '../../../hooks/useIsMobile';

const navItems = [
  { to: '/home', label: 'Home', iconId: 'icon-home' },
  { to: '/stats', label: 'Statistics', iconId: 'icon-stats' },
  { to: '/currency', label: 'Currency', iconId: 'icon-currency', hideOnTablet: true },
];

const Icon = ({ id, isActive }) => (
  <svg className={`${s.icon} ${isActive ? s.iconActive : ''}`} aria-hidden="true">
    <use href={`${sprite}#${id}`} />
  </svg>
);

const Navigation = () => {
  const isMobile = useIsMobile();

  return (
    <nav className={s.nav}>
      <ul className={s.list}>
        {navItems.map(({ to, label, iconId, hideOnTablet }) => {
          if (hideOnTablet && !isMobile) return null;

          return (
            <li key={to} className={s.item}>
              <NavLink to={to} className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}>
                {({ isActive }) => (
                  <>
                    <Icon id={iconId} isActive={isActive} />
                    <span className={`${s.label} ${isActive ? s.active : ''}`}>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
