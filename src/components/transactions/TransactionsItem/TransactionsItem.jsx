import s from './TransactionsItem.module.css';

const TransactionsItem = ({ date, type, category, comment, sum, isEven }) => {
  const typeClass = type === '+' ? s.income : s.expense;
  const evenClass = isEven ? s.even : '';

  return (
    <div className={s.wrapper}>
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
          <span className={s.value}>{comment}</span>
        </div>
        <div className={s.div}>
          <span className={s.label}>Sum</span>
          <span className={`${s.value} ${s.sum}`}>{sum},00</span>
        </div>
        <div className={s.btn}>
          <button className={s.editBtn}>
            <svg className={s.icon}>
              <use href="/src/assets/sprite.svg#icon-edit" />
            </svg>
            <span className={s.editSpan}>Edit</span>
          </button>
          <button className={s.deleteBtn}>Delete</button>
        </div>
      </li>
    </div>
  );
};

export default TransactionsItem;
