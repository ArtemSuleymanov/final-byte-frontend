import TransactionsItem from '../TransactionsItem/TransactionsItem';
import { getTransactions } from '../../../redux/transactions/transactionsOperations';
import s from './TransactionsList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsLoading,
  selectTransactions,
  selectPagination,
} from '../../../redux/transactions/transactionsSelectors';
import { useEffect } from 'react';

const TransactionsList = () => {
  const data = useSelector(selectTransactions);
  // const isLoading = useSelector(selectIsLoading);
  const paginationInfo = useSelector(selectPagination);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loader.isLoading);
  const { page, hasNextPage } = paginationInfo || {};

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(getTransactions(page + 1));
  };

  if (!isLoading && (!Array.isArray(data) || data.length === 0)) {
    return <p className={s.placeholder}>No transactions yet</p>;
  }
  return (
    <section className={s.section}>
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
        {(data || []).map((item, index) => (
          <TransactionsItem key={item._id} {...item} isEven={index % 2 === 1} />
        ))}
        {hasNextPage && (
          <button className={s.moreBtn} onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </ul>
    </section>
  );
};

export default TransactionsList;
