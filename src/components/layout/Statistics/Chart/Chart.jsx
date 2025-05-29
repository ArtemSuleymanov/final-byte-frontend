import { useEffect, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";
import css from "./Chart.module.css";
import { useSelector } from "react-redux";
import { selectStatistics, selectTotals } from "./../../../../redux/stats/statisticsSelector";

const COLORS = [
  '#dfad3f', '#ffd8d0', '#fd9498',
  '#c5baff', '#6e78e8', '#4a56e2',
  '#81e1ff', '#24cca7', '#00ad84',
];

const Chart = ({ transactionType }) => {
  const [size, setSize] = useState(264);
  const statistics = useSelector(selectStatistics);
  const total = useSelector(selectTotals);
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
  
const formatTotal = (value) => {
  const parts = value.toFixed(2).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
};

  useEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth === 768 ? 400 : 264);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className={css.chartWrapper}>
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          outerRadius={100}
          innerRadius={70}
          dataKey="amount"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#FCFCFC"
          fontSize={18}
          className={css.centerLabel}
        >
          ₴{formatTotal(transactionType ? total.expense : total.income)}
        </text>
      </PieChart>
    </div>
  );
};

export default Chart;