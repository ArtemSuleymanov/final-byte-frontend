import css from './Table.module.css';

const Table = ({ data, setTotal }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0).toFixed(2);
  
  setTotal(total);
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

      <div className={css.total}>
        <span className={css.expenses}>Expenses:</span>
        <span className={css.expense}>{total}</span>
      </div>
    </div>
  );
};

export default Table;
