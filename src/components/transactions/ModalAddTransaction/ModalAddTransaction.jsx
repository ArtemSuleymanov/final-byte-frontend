import Toggle from '../../common/Toggle/Toggle';
import TransactionForm from '../TransactionForm/TransactionForm';
import CustomModal from '../../common/Modal/Modal';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

export default function ModalAddTransaction({
  isOpen,
  onClose,
  onConfirm,
  title = 'Add transaction',
  actionBtn = 'Add',
  categories = [],
  initialValues,
  showToast,
}) {
  const formikRef = useRef();

  const transactionType = useSelector((state) => state.toggle.checked);

  const handleConfirm = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      type="transaction"
      actionBtn={actionBtn}
      onConfirm={handleConfirm}
    >
      <Toggle />
      <TransactionForm
        innerRef={formikRef}
        initialValues={initialValues}
        onSubmit={onConfirm}
        categories={categories}
        transactionType={transactionType}
        onClose={onClose}
        showToast={showToast}
      />
    </CustomModal>
  );
}
