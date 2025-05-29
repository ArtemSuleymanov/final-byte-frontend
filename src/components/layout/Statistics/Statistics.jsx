import { useEffect, useState } from 'react';
import css from './Statistics.module.css';
import Chart from './Chart/Chart';
import Dropdown from './Dropdown/Dropdown';
import Table from './Table/Table';
import Toggle from '../../common/Toggle/Toggle';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsStatistic } from '../../../redux/stats/statisticsOperations';
import { selectError, selectIsLoading } from '../../../redux/stats/statisticsSelector';
import Loader from '../../common/Loader/Loader';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];


const Statistics = () => {
  const [transactionType, setTransactionType] = useState(true); 
  const currDate = new Date();
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [year, setYear] = useState(currDate.getFullYear());
  const [month, setMonth] = useState(currDate.getMonth());

  useEffect(() => {
    const paddedMonth = String(month + 1).padStart(2, '0'); 
    const yearMonth = `${year}-${paddedMonth}`;
    dispatch(getTransactionsStatistic(yearMonth));
  }, [dispatch, year, month]);
  const handleToggleChange = (value) => {
    setTransactionType(value);
  };
  const handleSelectMonth = (monthName) => {
    const monthIndex = MONTHS.indexOf(monthName);
    setMonth(monthIndex);
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={css.div}>
      <div className={css.container}>
        <div className={css.toggle}>
          <Toggle style={{ marginTop: 0 }} checked={transactionType} handleChange={handleToggleChange}/>
          <Chart transactionType= {transactionType}/>
        </div>
        <div>
          <div className={css.dropdown}>
            <Dropdown title={year} items={YEARS} set={setYear} />
            <Dropdown title={MONTHS[month]} items={MONTHS} set={handleSelectMonth} />
          </div>
          <Table transactionType={ transactionType} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;