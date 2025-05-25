import TransactionsItem from '../TransactionsItem/TransactionsItem';
import s from './TransactionsList.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoading, selectTransactions } from '../../../redux/transactions/transactionsSelectors';

const TransactionsList = () => {
  const data = useSelector(selectTransactions);
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) return <p className={s.placeholder}>Loading...</p>;
  if (!data.length) {
    return <p className={s.placeholder}>No transactions yet</p>;
  }
  return (
    <div>
      <ul className={s.list}>
        <ul className={s.header}>
          <li>
            <div className={s.date}>Date</div>
          </li>
          <li>Type</li>
          <li>Category</li>
          <li>Comment</li>
          <li>Sum</li>
        </ul>
        {data.map((item, index) => (
          <TransactionsItem key={item.id} {...item} isEven={index % 2 === 1} />
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
