import { useSelector } from 'react-redux';
import { selectTransactions } from '../../../redux/transactions/transactionsSelectors';
import s from './Balance.module.css';

const Balance = () => {
  const transactions = useSelector(selectTransactions);

  const balance = transactions.reduce((acc, item) => {
    return item.type === 'income' ? acc + item.amount : acc - item.amount;
  }, 0);

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
