import React from "react";
// Import chart dependancies
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// Import hooks
import useEnergyBreakdownChart from "./useEnergyBreakdownChart";

function EnergyBreakdownChart() {
  const { options } = useEnergyBreakdownChart();

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default EnergyBreakdownChart;
