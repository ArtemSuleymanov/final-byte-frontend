import s from './ButtonAddTransaction.module.css';

const ButtonAddTransaction = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick} className={s.btn}>
        <svg className={s.icon}>
          <use href="/src/assets/sprite.svg#icon-plus" />
        </svg>
      </button>
    </div>
  );
};

export default ButtonAddTransaction;
