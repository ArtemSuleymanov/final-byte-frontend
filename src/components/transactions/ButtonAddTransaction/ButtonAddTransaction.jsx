import s from './ButtonAddTransaction.module.css';
import sprite from '../../../assets/sprite.svg';

const ButtonAddTransaction = ({ onClick }) => {
  return (
    <div>
      <button type="button" onClick={onClick} className={s.btn}>
        <svg className={s.icon}>
          <use href={`${sprite}#icon-plus`} />
        </svg>
      </button>
    </div>
  );
};

export default ButtonAddTransaction;
