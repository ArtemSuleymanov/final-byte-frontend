import { useSelector } from 'react-redux';
import css from './Table.module.css';
import { selectStatistics, selectTotals } from '../../../../redux/stats/statisticsSelector';

const COLORS = [
  '#dfad3f', '#ffd8d0', '#fd9498',
  '#c5baff', '#6e78e8', '#4a56e2',
  '#81e1ff', '#24cca7', '#00ad84',
];

const Table = ({ transactionType }) => {
  const total = useSelector(selectTotals);
  const statistics = useSelector(selectStatistics);

  const formatTotal = (value) => {
    const parts = value.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };

  const getProcessedData = (categoryData) => {
    if (!categoryData || typeof categoryData !== 'object') {
      return [];
    }

    const categoriesArray = Object.entries(categoryData).map(([name, amount]) => ({
      name,
      amount
    }));

    return categoriesArray
      .sort((a, b) => b.amount - a.amount)
      .map((item, index) => ({
        ...item,
        color: COLORS[index % COLORS.length],
      }));
  };
  
  const categoryData = transactionType ? statistics?.categorySummary?.expense : statistics?.categorySummary?.income;
  const data = getProcessedData(categoryData);

  return (
    <div className={css.table}>
      <div className={css.header}>
        <span>Category</span>
        <span>Sum</span>
      </div>

      {data.map((item, index) => (
        <div className={css.row} key={`${item.name}-${index}`}>
          <div className={css.cell}>
            <span
              className={css.color}
              style={{ backgroundColor: item.color }}
            />
            <div className={css.cellData}>
              <span>{item.name}</span>
              <span>{item.amount.toLocaleString()}</span>
            </div>  
          </div>
        </div>
      ))}

      {transactionType ? (
        <div className={css.total}>
          <span className={css.expenses}>Expenses:</span>
          <span className={css.expense}>{formatTotal(total.expense)}</span>
        </div>
      ) : (
        <div className={css.total}>
          <span className={css.expenses}>Incomes:</span>
          <span className={css.income}>{formatTotal(total.income)}</span>
        </div>
      )}
    </div>
  );
};

export default Table;