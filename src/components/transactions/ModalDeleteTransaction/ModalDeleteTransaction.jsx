import s from './ModalDeleteTransaction.module.css';
import { keyDown } from '../../../utils/keyDown';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction, getTransactions } from '../../../redux/transactions/transactionsOperations';
import toast from 'react-hot-toast';
import { selectIsLoading } from '../../../redux/transactions/transactionsSelectors';
import Loader from '../../common/Loader/Loader';
import sprite from '../../../assets/sprite.svg';

const ModalDeleteTransaction = ({ isOpen, onClose, transactionId }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);

  const handleDelete = async (id) => {
    if (!id) return toast.error('Transaction not found!');
    try {
      const response = await dispatch(deleteTransaction({ id }));

      if (deleteTransaction.fulfilled.match(response)) {
        toast.success('Transaction successfully deleted!');
        dispatch(getTransactions({ signal: null }));
        onClose();
      }
    } catch (error) {
      toast.error(error.message || 'Error while deleting transaction');
    }
  };

  keyDown(onClose);

  if (!isOpen) return null;

  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeIconBtn} onClick={onClose}>
          <svg className={s.closeSvg}>
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>
        <div className={s.logoWrapper}>
          <svg className={s.logoSvg}>
            <use href={`${sprite}#icon-wallet`} />
          </svg>
          <p className={s.logoText}>Spendy</p>
        </div>
        <p className={s.deleteConfirmParagraph}>Are you sure you want to Delete?</p>
        <div className={s.btnsWrapper}>
          {loading ? (
            <Loader />
          ) : (
            <button className={s.deleteBtn} onClick={() => handleDelete(transactionId)} disabled={loading}>
              Delete
            </button>
          )}

          <button className={s.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteTransaction;
