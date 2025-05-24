import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencyIfNeeded } from '../../../redux/currency/currencySlice';
import { formatValue } from '../../../utils/helpers';

import Loader from '../../common/Loader/Loader';
import s from './Currency.module.css';

const Currency = () => {
  const dispatch = useDispatch();
  const { data: currency, loading, error } = useSelector((state) => state.currency);

  useEffect(() => {
    dispatch(fetchCurrencyIfNeeded());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={s.container}>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Purchase</th>
            <th>Sale</th>
          </tr>
        </thead>
        <tbody>
          {currency.map((item, index) => (
            <tr key={index}>
              <td>{item.currencyCodeA}</td>
              <td>{formatValue(item.rateBuy)}</td>
              <td>{formatValue(item.rateSell)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <img
        src={'/img/wallet_hand_up_1x.webp'}
        srcSet={`/img/wallet_hand_up_2x.webp 2x`}
        alt={'wallet'}
        className={s.walletImg}
      />
    </section>
  );
};

export default Currency;
