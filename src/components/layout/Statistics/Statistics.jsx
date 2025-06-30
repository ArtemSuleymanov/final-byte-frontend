import { useEffect, useState } from 'react';
import css from './Statistics.module.css';
import Chart from './Chart/Chart';
import Dropdown from './Dropdown/Dropdown';
import Table from './Table/Table';
import Toggle from '../../common/Toggle/Toggle';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsStatistic } from '../../../redux/stats/statisticsOperations';
import { selectIsLoading, selectStatistics } from '../../../redux/stats/statisticsSelector';
import Loader from '../../common/Loader/Loader';
import NoData from '../../common/NoData/NoData';

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
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

const Statistics = () => {
  const [transactionType, setTransactionType] = useState(true);
  const currDate = new Date();
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const data = useSelector(selectStatistics);
  const [year, setYear] = useState(currDate.getFullYear());
  const [month, setMonth] = useState(currDate.getMonth());
  const [openDropdown, setOpenDropdown] = useState(null);

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

  const handleDropdownToggle = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  if (loading) return <Loader />;

  const hasData = Object.keys(data).length > 0 && !(data.totals.income === 0 && data.totals.expense === 0);

  return (
    <div className={css.div}>
      <div className={css.container}>
        <div className={css.toggle}>
          <Toggle style={{ marginTop: 0 }} checked={transactionType} handleChange={handleToggleChange} />
          {hasData ? <Chart transactionType={transactionType} /> : null}
        </div>
        <div style={{ width: '100%' }}>
          <div className={css.dropdown}>
            <Dropdown
              title={year}
              items={YEARS}
              set={setYear}
              isOpen={openDropdown === 'year'}
              onToggle={() => handleDropdownToggle('year')}
            />
            <Dropdown
              title={MONTHS[month]}
              items={MONTHS}
              set={handleSelectMonth}
              isOpen={openDropdown === 'month'}
              onToggle={() => handleDropdownToggle('month')}
            />
          </div>

          {hasData ? (
            <Table transactionType={transactionType} />
          ) : (
            <NoData className={css.noData} text="No transactions found. Please add at least one to view statistics." />
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
