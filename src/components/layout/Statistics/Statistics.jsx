import { useState } from 'react';
import css from './Statistics.module.css';
import Chart from './Chart';
import Dropdown from './Dropdown';
import Table from './Table';
import Toggle from '../../common/Toggle/Toggle';
import { useSelector } from 'react-redux';
import { selectIsLoading, selectTransactions } from '../../../redux/transactions/transactionsSelectors';
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
const COLORS = ['#dfad3f', '#ffd8d0', '#fd9498', '#c5baff', '#6e78e8', '#4a56e2', '#81e1ff', '#24cca7', '#00ad84'];

const Statistics = () => {
  const [transactionType, setTransactionType] = useState(true);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const data = useSelector(selectTransactions);

  const getProcessedData = (data, year = null, month = null, transactionType) => {
    if (!data) return [];

    let filtered = data.filter((item) => (transactionType ? item.type === 'expense' : item.type === 'income'));

    if (year !== null) {
      filtered = filtered.filter((item) => {
        const itemYear = new Date(item.date).getFullYear();
        return itemYear === year;
      });
    }

    if (month !== null) {
      let monthNumber;

      if (typeof month === 'string') {
        monthNumber = MONTHS.findIndex((m) => m.toLowerCase() === month.toLowerCase()) + 1;
        if (monthNumber === 0) monthNumber = null;
      } else {
        monthNumber = month >= 1 && month <= 12 ? month : null;
      }

      if (monthNumber) {
        filtered = filtered.filter((item) => {
          const itemMonth = new Date(item.date).getMonth() + 1;
          return itemMonth === monthNumber;
        });
      }
    }

    const categoryMap = {};
    for (const item of filtered) {
      const cat = item.category || 'Unknown';
      if (!categoryMap[cat]) {
        categoryMap[cat] = {
          category: cat,
          amount: 0,
        };
      }
      categoryMap[cat].amount += item.amount || 0;
    }

    return Object.values(categoryMap)
      .sort((a, b) => b.amount - a.amount)
      .map((item, index) => ({
        ...item,
        color: COLORS[index % COLORS.length],
      }));
  };

  const handleToggleChange = (value) => {
    setTransactionType(value);
  };

  const handleDropdownToggle = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const processedData = getProcessedData(data, year, month, transactionType);
  console.log(processedData);

  const currDate = new Date();

  if (Array.isArray(data) && data.length === 0) {
    return <NoData text="No transactions found. Please add at least one to view statistics." />;
  }

  return (
    <>
      <div className={css.container}>
        <div className={css.toggle}>
          <Toggle
            style={{ marginTop: 0, marginBottom: 0 }}
            checked={transactionType}
            handleChange={handleToggleChange}
          />
          <Chart data={processedData} />
        </div>
        <div style={{ width: '100%' }}>
          <div className={css.dropdown}>
            <Dropdown
              title={currDate.getFullYear()}
              items={YEARS}
              set={setYear}
              isOpen={openDropdown === 'year'}
              onToggle={() => handleDropdownToggle('year')}
            />
            <Dropdown
              title={MONTHS[currDate.getMonth()]}
              items={MONTHS}
              set={setMonth}
              isOpen={openDropdown === 'month'}
              onToggle={() => handleDropdownToggle('month')}
            />
          </div>
          <Table data={processedData} transactionType={transactionType} />
        </div>
      </div>
    </>
  );
};

export default Statistics;
