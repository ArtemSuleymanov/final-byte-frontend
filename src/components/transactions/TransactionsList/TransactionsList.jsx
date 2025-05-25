import TransactionsItem from '../TransactionsItem/TransactionsItem';
import { getTransactions } from '../../../redux/transactions/transactionsOperations';
import s from './TransactionsList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoading, selectTransactions } from '../../../redux/transactions/transactionsSelectors';
import { useEffect } from 'react';

const TransactionsList = () => {
  const data = useSelector(selectTransactions);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    dispatch(getTransactions({ signal: abortController.signal }));
    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  if (isLoading) return <p className={s.placeholder}>Loading...</p>;
  if (!data.length) {
    return <p className={s.placeholder}>No transactions yet</p>;
  }
  return (
    <div>
      <ul className={s.list}>
        <div className={s.header}>
          <li>
            <div className={s.date}>Date</div>
          </li>
          <li>Type</li>
          <li>Category</li>
          <li>Comment</li>
          <li>Sum</li>
        </div>
        {data?.map((item, index) => (
          <TransactionsItem key={index} {...item} isEven={index % 2 === 1} />
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
