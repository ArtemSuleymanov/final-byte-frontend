import s from './TransactionsItem.module.css';
import { useState } from 'react';
import sprite from '../../../assets/sprite.svg';
import ModalEditTransaction from '../ModalEditTransaction/ModalEditTransaction';
import ModalDeleteTransaction from '../ModalDeleteTransaction/ModalDeleteTransaction';
import { typeList } from '../../../utils/constants';
import { useDispatch } from 'react-redux';
import { updateTransaction } from '../../../redux/transactions/transactionsOperations';
import { toggleReset } from '../../../redux/toggle/toggleSlice';
import { toast } from 'react-hot-toast';

const TransactionsItem = ({ date, type, category, comment, amount, isEven, _id }) => {
  const typeClass = type === 'income' ? s.income : s.expense;
  const evenClass = isEven ? s.even : '';
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const formattedDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  };

  const dispatch = useDispatch();

  const handleEditConfirm = (updatedTransaction) => {
    dispatch(updateTransaction({ id: _id, ...updatedTransaction }))
      .unwrap()
      .then(() => {
        setIsModalEditOpen(false);
      })
      .catch((error) => {
        toast.error(`Update failed: ${error.message || 'Something went wrong'}`);
      });
  };

  return (
    <>
      <li className={`${s.card} ${typeClass} ${evenClass}`}>
        <div className={s.div}>
          <span className={s.label}>Date</span>
          <span className={`${s.value} ${s.data}`}>{formattedDate(date)}</span>
        </div>

        <div className={s.div}>
          <span className={s.label}>Type</span>
          <span className={`${s.value} ${s.type}`}>{type === typeList[0] ? '+' : '-'}</span>
        </div>

        <div className={s.div}>
          <span className={s.label}>Category</span>
          <span className={s.value}>{category}</span>
        </div>

        <div className={s.div}>
          <span className={s.label}>Comment</span>
          <span
            className={`${s.value} ${s.comment} ${isExpanded ? s.expanded : ''}`}
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Click to collapse' : 'Click to expand'}
          >
            {comment}
            <span className={s.arrow}>{isExpanded ? ' ' : ' '}</span>
          </span>
        </div>

        <div className={s.div}>
          <span className={s.label}>Sum</span>
          <span className={`${s.value} ${type === '+' ? s.positive : s.negative}`}>
            {Number(amount).toFixed(2).replace('.', ',')}
          </span>
        </div>

        <div className={s.btn}>
          <button
            className={s.editBtn}
            onClick={() => {
              setIsModalEditOpen(true);
              dispatch(toggleReset());
            }}
          >
            <svg className={s.icon}>
              <use href={`${sprite}#icon-edit`} />
            </svg>
            <span className={s.editSpan}>Edit</span>
          </button>
          <button className={s.deleteBtn} onClick={() => setIsOpen(true)}>
            Delete
          </button>
        </div>
      </li>
      <ModalEditTransaction
        transactionId={_id}
        initialValues={{ date, type, category, comment, amount }}
        isOpen={isModalEditOpen}
        onClose={() => {
          setIsModalEditOpen(false);
          dispatch(toggleReset());
        }}
        onConfirm={handleEditConfirm}
      />

      <ModalDeleteTransaction transactionId={_id} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default TransactionsItem;
