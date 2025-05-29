import React, { useState } from 'react';
import css from './Dropdown.module.css';
import sprite from '../../../../assets/sprite.svg';

const Dropdown = ({ title, items, set, isOpen, onToggle }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
<<<<<<< HEAD:src/components/layout/Statistics/Dropdown/Dropdown.jsx
  const toggleDropdown = () => setIsOpen(prev => !prev);
=======
>>>>>>> 1d1d53be065320aa5a8607d80ea19850694ef84b:src/components/layout/Statistics/Dropdown.jsx

  // const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleSelect = (item) => {
    set(item);
    setSelected(item);
    onToggle(null);
  };

  return (
    <div className={css.dropdown}>
      <button onClick={onToggle}>
        {selected || title}
        <svg className={`${css.icon} ${isOpen ? css.open : ''}`}>
          <use href={`${sprite}#icon-Arrow-up`} />
        </svg>
      </button>
      {isOpen && (
        <div className={css.content}>
          {items.map((item) => (
            <a key={item} href="#" onClick={() => handleSelect(item)}>
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
