import { useRef } from 'react';
import CustomModal from '../../common/Modal/Modal';
import Toggle from '../../common/Toggle/Toggle';
import EditTransactionForm from '../EditTransactionForm/EditTransactionForm';

export default function ModalEditTransaction({
  isOpen,
  onClose,
  onConfirm,
  title = 'Edit transaction',
  actionBtn = 'Save',
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
      <EditTransactionForm
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
