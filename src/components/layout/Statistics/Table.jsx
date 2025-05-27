import css from './Table.module.css';

const Table = ({ data, transactionType }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const formatTotal = (value) => {
    const parts = value.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };
  return (
    <div className={css.table}>
      <div className={css.header}>
        <span>Category</span>
        <span>Sum</span>
      </div>

      {data.map((item) => (
        <div className={css.row} key={item.category}>
          <div className={css.cell}>
            <span
                className={css.color}
                style={{ backgroundColor: item.color }}
            />
                <div className={css.cellData}>
                  <span>{item.category}</span>
                  <span>{item.amount.toLocaleString()}</span>
                </div>  
          </div>
        </div>
      ))}
{transactionType ?
      <div className={css.total}>
        <span className={css.expenses}>Expenses:</span>
        <span className={css.expense}>{formatTotal(total)}</span>
        </div> :
      <div className={css.total}>
      <span className={css.expenses}>Incomes:</span>
      <span className={css.income}>{formatTotal(total)}</span>
      </div>
      }
    </div>
  );
};

export default Table;
