import TransactionsItem from '../TransactionsItem/TransactionsItem';
import { getTransactions } from '../../../redux/transactions/transactionsOperations';
import s from './TransactionsList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsLoading,
  selectTransactions,
  selectPagination,
} from '../../../redux/transactions/transactionsSelectors';
import Loader from '../../common/Loader/Loader';
import { useEffect } from 'react';
import NoData from '../../common/NoData/NoData';

const TransactionsList = () => {
  const data = useSelector(selectTransactions);
  // const isLoading = useSelector(selectIsLoading);
  const paginationInfo = useSelector(selectPagination);
  const dispatch = useDispatch();
  // const isLoading = useSelector((state) => state.loader.isLoading);
  const { page, hasNextPage } = paginationInfo || {};

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getTransactions(1));
    }
  }, [dispatch, data.length]);

  const handleLoadMore = () => {
    if (hasNextPage) {
      dispatch(getTransactions(page + 1));
    }
  };

  if (Array.isArray(data) && data.length === 0) {
    return <NoData text="No transactions found" />;
  }

  return (
    <section className={!(Array.isArray(data) && data.length === 0) ? s.section : s.sectionNoData}>
      <Loader />

      {/* {Array.isArray(data) && data.length === 0 && !isLoading && <NoData text="No transactions found" />} */}
      {Array.isArray(data) && data.length > 0 && (
        <>
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
                Show more
              </button>
            )}
          </ul>
        </>
      )}
    </section>
  );
};

export default TransactionsList;
