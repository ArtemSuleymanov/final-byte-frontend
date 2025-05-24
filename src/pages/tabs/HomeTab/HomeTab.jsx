import TransactionsList from '../../../components/transactions/TransactionsList/TransactionsList';
import ButtonAddTransaction from '../../../components/transactions/ButtonAddTransaction/ButtonAddTransaction';
import { fetchTransactions } from '../../../redux/transactions/transactionsOperations.js';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Currency from '../../../components/layout/Currency/Currency.jsx';
import Balance from '../../../components/layout/Balance/Balance.jsx';

const HomeTab = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <>
      <Balance />
      <TransactionsList />
      <ButtonAddTransaction onClick={() => setIsOpen(true)} />
    </>
  );
};

export default HomeTab;
