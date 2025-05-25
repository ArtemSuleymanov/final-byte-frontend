import { useState } from 'react';
import clsx from 'clsx';
import Switch from 'react-switch';

import s from './Toggle.module.css';
import sprite from '../../../assets/sprite.svg';

export default function Toggle({ style }) {
  const [checked, setChecked] = useState(false);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <label className={clsx(s.label, style)}>
      <span className={s.labelText}>Income</span>
      <Switch
        onChange={handleChange}
        checked={checked}
        checkedIcon={false}
        uncheckedIcon={false}
        checkedHandleIcon={
          <svg className={s.icon}>
            <use href={`${sprite}#${'icon-minus'}`} />
          </svg>
        }
        uncheckedHandleIcon={
          <svg className={s.icon}>
            <use href={`${sprite}#${'icon-plus'}`} />
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
      />
      <span className={s.labelText}>Expense</span>
    </label>
  );
}
