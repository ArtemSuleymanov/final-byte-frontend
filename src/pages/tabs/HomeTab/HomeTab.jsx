import TransactionsList from '../../../components/transactions/TransactionsList/TransactionsList';
import ButtonAddTransaction from '../../../components/transactions/ButtonAddTransaction/ButtonAddTransaction';
import { getTransactions } from '../../../redux/transactions/transactionsOperations.js';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Currency from '../../../components/layout/Currency/Currency.jsx';
import Balance from '../../../components/layout/Balance/Balance.jsx';
import ModalAddTransaction from '../../../components/transactions/ModalAddTransaction/ModalAddTransaction.jsx';

const HomeTab = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <>
      <Balance />
      <TransactionsList />
      <ButtonAddTransaction onClick={() => setIsOpen(true)} />
      <ModalAddTransaction isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default HomeTab;
