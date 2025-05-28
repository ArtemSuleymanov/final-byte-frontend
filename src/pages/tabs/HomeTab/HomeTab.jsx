import TransactionsList from '../../../components/transactions/TransactionsList/TransactionsList';
import ButtonAddTransaction from '../../../components/transactions/ButtonAddTransaction/ButtonAddTransaction';
import { getTransactions, addTransaction } from '../../../redux/transactions/transactionsOperations.js';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Currency from '../../../components/layout/Currency/Currency.jsx';
import Balance from '../../../components/layout/Balance/Balance.jsx';
import ModalAddTransaction from '../../../components/transactions/ModalAddTransaction/ModalAddTransaction.jsx';
import { toggleReset } from '../../../redux/toggle/toggleSlice';

const HomeTab = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const handleAddTransaction = async (values) => {
    try {
      const result = await dispatch(addTransaction(values)).unwrap();
      dispatch(getTransactions());
      setIsOpen(false);
    } catch (error) {}
  };

  return (
    <>
      {/* <Balance /> */}
      <TransactionsList />
      <ButtonAddTransaction
        onClick={() => {
          setIsOpen(true);
          dispatch(toggleReset());
        }}
      />
      <ModalAddTransaction
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          dispatch(toggleReset());
        }}
        onConfirm={handleAddTransaction}
      />
    </>
  );
};

export default HomeTab;
