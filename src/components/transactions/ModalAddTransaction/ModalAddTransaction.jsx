import Toggle from '../../common/Toggle/Toggle';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';
import CustomModal from '../../common/Modal/Modal';
import { useRef } from 'react';

export default function ModalAddTransaction({
  isOpen,
  onClose,
  onConfirm,
  title = 'Add transaction',
  actionBtn = 'Add',
  categories = [],
  initialValues,
  transactionType,
  showToast,
}) {
  const formikRef = useRef();

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
      <AddTransactionForm
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
