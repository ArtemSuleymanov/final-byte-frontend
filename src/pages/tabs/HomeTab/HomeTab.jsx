import TransactionsList from '../../../components/transactions/TransactionsList/TransactionsList';
import ButtonAddTransaction from '../../../components/transactions/ButtonAddTransaction/ButtonAddTransaction';
import { getTransactions, addTransaction } from '../../../redux/transactions/transactionsOperations.js';
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

  const handleAddTransaction = async (values) => {
    console.log('Submitted values:', values);
    try {
      const result = await dispatch(addTransaction(values)).unwrap();
      console.log('Result from addTransaction:', result);
      dispatch(getTransactions());
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  return (
    <>
      {/* <Balance /> */}
      <TransactionsList />
      <ButtonAddTransaction onClick={() => setIsOpen(true)} />
      <ModalAddTransaction isOpen={isOpen} onClose={() => setIsOpen(false)} onConfirm={handleAddTransaction} />
    </>
  );
};

export default HomeTab;
