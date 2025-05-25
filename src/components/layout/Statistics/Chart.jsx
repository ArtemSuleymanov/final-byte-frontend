import { useEffect, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";
import css from "./Chart.module.css";

const Chart = ({ data, total }) => {
  const [size, setSize] = useState(264);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth === 1280) {
        setSize(288);
      } else {
        setSize(264);
      }
    };

    updateSize(); 
    window.addEventListener("resize", updateSize); 

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div>
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
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#FCFCFC"
          fontSize={18}
          className={css.centerLabel}
        >
          ₴{total}
        </text>
      </PieChart>
    </div>
  );
};

export default Chart;
