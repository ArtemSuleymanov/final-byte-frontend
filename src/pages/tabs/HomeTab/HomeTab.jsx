import TransactionsList from '../../../components/transactions/TransactionsList/TransactionsList';
import ButtonAddTransaction from '../../../components/transactions/ButtonAddTransaction/ButtonAddTransaction';
import { fetchTransactions } from '../../../redux/transactions/transactionsOperations.js';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const HomeTab = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  return (
    <div>
      <TransactionsList />
      <ButtonAddTransaction onClick={() => setIsOpen(true)} />
    </div>
  );
};

export default HomeTab;
