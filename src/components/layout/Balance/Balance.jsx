import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/auth/authSelectors';
import s from './Balance.module.css';

const Balance = () => {
  const user = useSelector(selectUser);
  const balance = user?.balance ?? 0;

  const formattedBalance = balance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className={s.balanceWrapper}>
      <p className={s.balanceText}>Your balance:</p>
      <p className={s.balanceValue}>{formattedBalance} UAH</p>
    </div>
  );
};

export default Balance;
