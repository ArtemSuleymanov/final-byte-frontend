import CustomModal from '../../common/Modal/Modal';
import { keyDown } from '../../../utils/keyDown';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction, getTransactions } from '../../../redux/transactions/transactionsOperations';
import toast from 'react-hot-toast';
import { selectIsLoading } from '../../../redux/transactions/transactionsSelectors';
import Loader from '../../common/Loader/Loader';

const ModalDeleteTransaction = ({ isOpen, onClose, transactionId }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);

  keyDown(onClose);

  const handleDelete = async () => {
    if (!transactionId) return toast.error('Transaction not found!');
    try {
      const response = await dispatch(deleteTransaction({ id: transactionId }));
      if (deleteTransaction.fulfilled.match(response)) {
        toast.success('Transaction successfully deleted!');
        dispatch(getTransactions({ signal: null }));
        onClose();
      }
    } catch (error) {
      toast.error(error.message || 'Error while deleting transaction');
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Spendy"
      text="Are you sure you want to Delete?"
      actionBtn="Delete"
      onConfirm={handleDelete}
      modalType="delete"
    >
      {loading && <Loader />}
    </CustomModal>
  );
};

export default ModalDeleteTransaction;
