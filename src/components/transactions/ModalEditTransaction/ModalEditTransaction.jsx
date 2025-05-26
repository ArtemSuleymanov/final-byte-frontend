import { useRef } from 'react';
import CustomModal from '../../common/Modal/Modal';
import Toggle from '../../common/Toggle/Toggle';
import TransactionForm from '../TransactionForm/TransactionForm';
import { useSelector } from 'react-redux';

export default function ModalEditTransaction({
  isOpen,
  onClose,
  onConfirm,
  title = 'Edit transaction',
  actionBtn = 'Save',
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
