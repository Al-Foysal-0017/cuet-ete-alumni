import { useState } from "react";
import Chart from "react-apexcharts";
import chartDataHour from "./ChartDataHour";
import ChartDataDay from "./ChartDataDay";
import ChartDataWeek from "./ChartDataWeek";
import ChartDataMonth from "./ChartDataMonth";
import ChartDataYear from "./ChartDataYear";
import ChartDataAll from "./ChartDataAll";
import "./_chart.scss";

const BtnValue = [
  {
    id: 1,
    name: "1H",
    chartData: chartDataHour,
  },
  {
    id: 2,
    name: "1D",
    chartData: ChartDataDay,
  },
  {
    id: 3,
    name: "1W",
    chartData: ChartDataWeek,
  },
  {
    id: 3,
    name: "1M",
    chartData: ChartDataMonth,
  },
  {
    id: 4,
    name: "1Y",
    chartData: ChartDataYear,
  },
  {
    id: 5,
    name: "All",
    chartData: ChartDataAll,
  },
];

const BajajAreaChartCard = () => {
  const [selectBtn] = useState(BtnValue[4].name);
  return (
    <div className="chart">
      {BtnValue.map((item, index) => (
        <span key={index}>
          {selectBtn === item.name && <Chart {...item.chartData} />}
        </span>
      ))}
    </div>
  );
};

export default BajajAreaChartCard;
