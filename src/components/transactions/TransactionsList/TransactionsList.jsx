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
  // if (!data.length) {
  //   return <p className={s.placeholder}>No transactions yet</p>;
  // }
  if (!Array.isArray(data) || data.length === 0) {
    return <p className={s.placeholder}>No transactions yet</p>;
  }
  return (
    <div className={s.div}>
      <ul className={s.ul}>
        <li className={s.header}>
          <div className={s.wrapper}>
            <div className={s.date}>Date</div>
          </div>
          <div className={s.wrapper}>Type</div>
          <div className={s.wrapper}>Category</div>
          <div className={s.wrapper}>Comment</div>
          <div className={s.wrapper}>Sum</div>
        </li>
      </ul>
      <ul className={s.list}>
        {data?.map((item, index) => (
          <TransactionsItem key={index} {...item} isEven={index % 2 === 1} />
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
