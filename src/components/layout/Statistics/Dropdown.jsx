import React, { useState } from 'react';
import css from './Dropdown.module.css';

const Dropdown = ({ title, items, set }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

    const handleSelect = (item) => {
    set(item);             
    setSelected(item);     
    setIsOpen(false);      
  };

  return (
    <div className={css.dropdown}>
      <button onClick={toggleDropdown}>
        {selected || title}
        <div className={`${css.arrow} ${isOpen ? css.open : ''}`}>{'>'}</div>
      </button>
      {isOpen && (
        <div className={css.content}>
          {items.map(item => (
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
