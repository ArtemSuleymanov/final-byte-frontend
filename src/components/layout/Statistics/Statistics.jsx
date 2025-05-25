import { useState } from "react";

import css from './Statistics.module.css'


import Chart from "./Chart"
import Dropdown from "./Dropdown"
import Table from "./Table";
import Toggle from "../../common/Toggle/Toggle";

const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
const dummyData = {
  '2023-March': [
    { category: 'Main expenses', amount: 8700, color: '#F4A900' },
    { category: 'Products', amount: 3800.74, color: '#FCDDEC' },
    { category: 'Car', amount: 1500, color: '#FF8A9F' },
    { category: 'Self care', amount: 800, color: '#C1B6FF' },
    { category: 'Child care', amount: 2208.5, color: '#A1A5FF' },
    { category: 'Household products', amount: 300, color: '#554ED7' },
    { category: 'Education', amount: 3400, color: '#9AE3F1' },
    { category: 'Leisure', amount: 1230, color: '#3DC48D' },
    { category: 'Other expenses', amount: 610, color: '#00A86B' },
  ],
  '2023-April': [
    { category: 'Main expenses', amount: 7200, color: '#F4A900' },
    { category: 'Products', amount: 2500.10, color: '#FCDDEC' },
    { category: 'Car', amount: 0, color: '#FF8A9F' },
  ],
};

const Statistics = () => {
  // const [transactionType, setTransactionType] = useState(true);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [total, setTotal] = useState(null);
  let data = [];

  if (!year && !month) {
    Object.values(dummyData).forEach((arr) => {
      data = data.concat(arr);
    });
  } else if (year && !month) {
    Object.entries(dummyData).forEach(([key, arr]) => {
      if (key.startsWith(`${year}-`)) {
        data = data.concat(arr);
      }
    });
  } else if (year && month) {
    const key = `${year}-${month}`;
    data = dummyData[key] || [];
  }
  return (
    <div className={css.container}>
      <div>
        <Toggle/>
        <Chart data={data} total={total} />
        </div>
      <div>
      <div className={css.dropdown}>
        <Dropdown title="Years" items={YEARS} set={setYear} />
        <Dropdown title="Months" items={MONTH} set={setMonth} />
      </div>
        <Table data={data} setTotal={setTotal} />
      </div>
    </div>
  )
}

export default Statistics