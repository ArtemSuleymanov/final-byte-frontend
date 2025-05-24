import s from './TransactionsItem.module.css';
import { useState } from 'react';
import sprite from '../../../assets/sprite.svg';

const TransactionsItem = ({ date, type, category, comment, sum, isEven }) => {
  const typeClass = type === '+' ? s.income : s.expense;
  const evenClass = isEven ? s.even : '';

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className={`${s.card} ${typeClass} ${evenClass}`}>
      <div className={s.div}>
        <span className={s.label}>Date</span>
        <span className={s.value}>{date}</span>
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
        <button className={s.editBtn}>
          <svg className={s.icon}>
            <use href={`${sprite}#icon-edit`} />
          </svg>
          <span className={s.editSpan}>Edit</span>
        </button>
        <button className={s.deleteBtn}>Delete</button>
      </div>
    </li>
  );
};

export default TransactionsItem;
