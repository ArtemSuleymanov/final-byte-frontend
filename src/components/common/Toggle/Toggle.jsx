import clsx from 'clsx';
import Switch from 'react-switch';

import s from './Toggle.module.css';
import sprite from '../../../assets/sprite.svg';
// import { useDispatch, useSelector } from 'react-redux';
// import { setChecked } from '../../../redux/toggle/toggleSlice';

export default function Toggle({ className, style, checked, handleChange, disabled = false }) {
  return (
    <label className={clsx(s.label, className)} style={style}>
      <span className={s.labelText}>Income</span>
      <Switch
        onChange={handleChange}
        checked={checked}
        checkedIcon={false}
        uncheckedIcon={false}
        checkedHandleIcon={
          <svg className={s.icon}>
            <use href={`${sprite}#icon-minus`} />
          </svg>
        }
        uncheckedHandleIcon={
          <svg className={s.icon}>
            <use href={`${sprite}#icon-plus`} />
          </svg>
        }
        handleDiameter={44}
        height={40}
        width={80}
        offColor="#FCFCFC"
        onColor="#FCFCFC"
        onHandleColor="#B20202"
        offHandleColor="#dfad3f"
        className={s.switch}
        disabled={disabled}
      />
      <span className={s.labelText}>Expense</span>
    </label>
  );
}
