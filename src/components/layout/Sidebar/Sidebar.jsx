import Navigation from '../Navigation/Navigation.jsx';
import Balance from '../Balance/Balance.jsx';
import Currency from '../Currency/Currency.jsx';
import BalanceCurrencyDesktop from '../BalanceCurrencyDesktop/BalanceCurrencyDesktop.jsx';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import s from './Sidebar.module.css';

const Sidebar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1279px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  return (
    <aside className={s.sidebar}>
      <div className={s.leftColumn}>
        <Navigation />
        {isTablet && (
          <div className={s.balanceWrapper}>
            <Balance />
          </div>
        )}
        {!isTablet && !isDesktop && isHomePage && <Balance />}
        {isDesktop && <BalanceCurrencyDesktop />}
      </div>
      {isTablet && (
        <div className={s.rightColumn}>
          <Currency />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
