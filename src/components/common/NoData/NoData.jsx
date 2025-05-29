import React from 'react';
import s from './NoData.module.css';

export default function NoData({ text }) {
  return <p className={s.placeholder}>{text}</p>;
}
