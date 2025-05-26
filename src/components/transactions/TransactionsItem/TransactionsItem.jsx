import s from './TransactionsItem.module.css';
import { useState, useEffect } from 'react';
import sprite from '../../../assets/sprite.svg';
import ModalEditTransaction from '../ModalEditTransaction/ModalEditTransaction';
import ModalDeleteTransaction from '../ModalDeleteTransaction/ModalDeleteTransaction';

const TransactionsItem = ({ date, type, category, comment, sum, isEven, _id }) => {
  const typeClass = type === '+' ? s.income : s.expense;
  const evenClass = isEven ? s.even : '';
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    if (isModalEditOpen || isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalEditOpen, isOpen]);
  // const formattedDate = (date) => {
  //   const d = new Date(date);
  //   const day = String(d.getDate()).padStart(2, '0');
  //   const month = String(d.getMonth() + 1).padStart(2, '0');
  //   const year = String(d.getFullYear()).slice(-2);
  //   return `${day}.${month}.${year}`;
  // };

  return (
    <>
      {' '}
      <li className={`${s.card} ${typeClass} ${evenClass}`}>
        <div className={s.div}>
          <span className={s.label}>Date</span>
          <span className={`${s.value} ${s.data}`}>{date}</span>
        </div>

        <div className={s.div}>
          <span className={s.label}>Type</span>
          <span className={`${s.value} ${s.type}`}>{type}</span>
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
          <span className={`${s.value} ${type === '+' ? s.positive : s.negative}`}>{sum},00</span>
        </div>

        <div className={s.btn}>
          <button className={s.editBtn} onClick={() => setIsModalEditOpen(true)}>
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
      {selectedTransaction && (
        <div className={s.modalOverlay}>
          <ModalEditTransaction
            transactionId={selectedTransaction._id}
            isOpen={true}
            onClose={() => setSelectedTransaction(null)}
          />
        </div>
      )}
      {isOpen && (
        <div className={s.modalOverlay}>
          <ModalDeleteTransaction transactionId={_id} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
};

export default TransactionsItem;
