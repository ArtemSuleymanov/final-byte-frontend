// ModalEditTransaction.jsx
import { useRef, useState, useEffect } from 'react';
import CustomModal from '../../common/Modal/Modal';
import Toggle from '../../common/Toggle/Toggle';
import TransactionForm from '../TransactionForm/TransactionForm';
import { typeList } from '../../../utils/constants';

export default function ModalEditTransaction({
  isOpen,
  onClose,
  onConfirm,
  title = 'Edit transaction',
  actionBtn = 'Save',
  initialValues,
  showToast,
}) {
  // Set initial toggle based on initialValues.type (true = expense, false = income)
  const initialType = initialValues?.type === typeList[0] ? false : true;
  const [isToggleChecked, setIsToggleChecked] = useState(initialType);

  const formikRef = useRef();

  const handleConfirm = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  useEffect(() => {
    const newType = initialValues?.type === typeList[0] ? false : true;
    setIsToggleChecked(newType);
  }, [initialValues, isOpen]);

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      type="transaction"
      actionBtn={actionBtn}
      onConfirm={handleConfirm}
    >
      <Toggle checked={isToggleChecked} handleChange={() => setIsToggleChecked((prev) => !prev)} disabled={true} />

      <TransactionForm
        innerRef={formikRef}
        initialValues={initialValues}
        onSubmit={onConfirm}
        transactionType={isToggleChecked}
        onClose={onClose}
        showToast={showToast}
      />
    </CustomModal>
  );
}
