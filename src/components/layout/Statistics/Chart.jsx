import { useEffect, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";
import css from "./Chart.module.css";


const Chart = ({ data, total }) => {
  const [size, setSize] = useState(264);



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
          ₴{formatTotal(total)}
        </text>
      </PieChart>
    </div>
  );
};

export default Chart;
