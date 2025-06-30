import React from 'react';
import s from './NoData.module.css';
import clsx from 'clsx';

export default function NoData({ text, className }) {
  return <p className={clsx(s.placeholder, className)}>{text}</p>;
}
