import Toggle from '../../common/Toggle/Toggle';
import TransactionForm from '../TransactionForm/TransactionForm';
import CustomModal from '../../common/Modal/Modal';
import { useEffect, useRef, useState } from 'react';
import { typeList } from '../../../utils/constants';

export default function ModalAddTransaction({
  isOpen,
  onClose,
  onConfirm,
  title = 'Add transaction',
  actionBtn = 'Add',
  initialValues,
  showToast,
}) {
  const initialType = initialValues?.type === typeList[0] ? false : true;
  const [isToggleChecked, setIsToggleChecked] = useState(initialType);

  const formikRef = useRef();

  const handleConfirm = () => {
    if (formikRef.current) {
      const values = formikRef.current.values;
      onConfirm(values);
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
      <Toggle checked={isToggleChecked} handleChange={() => setIsToggleChecked((prev) => !prev)} disabled={false} />

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
