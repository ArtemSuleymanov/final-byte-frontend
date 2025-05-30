import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencyIfNeeded } from '../../../redux/currency/currencyOperations';
import { formatValue } from '../../../utils/helpers';

import Loader from '../../common/Loader/Loader';
import s from './BalanceCurrencyDesktop.module.css';

const BalanceCurrencyDesktop = () => {
  const dispatch = useDispatch();

  const balance = useSelector((state) => state.auth.user.balance);

  const formattedBalance = Number(balance).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const { data: currency, loading, error } = useSelector((state) => state.currency);

  useEffect(() => {
    dispatch(fetchCurrencyIfNeeded());
  }, [dispatch]);

  return (
    <div className={s.balanceCurrencyWrapper}>
      <div className={s.balanceWrapper}>
        <p className={s.balanceText}>Your balance:</p>
        <p className={s.balanceValue}>{formattedBalance} UAH</p>
      </div>
      <section className={s.container}>
        {loading && <Loader />}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
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
                  <td>{!error ? item.currencyCodeA : '-'}</td>
                  <td>{!error ? formatValue(item.rateBuy) : '-'}</td>
                  <td>{!error ? formatValue(item.rateSell) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <img
          src={'/img/wallet_hand_up_1x.webp'}
          srcSet={`/img/wallet_hand_up_2x.webp 2x`}
          alt={'wallet'}
          className={s.walletImg}
        />
      </section>
    </div>
  );
};

export default BalanceCurrencyDesktop;
