import React from "react";
// Import chart dependancies
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// Import hooks
import useEnergyBreakdownChart from "./useEnergyBreakdownChart";

function EnergyBreakdownChart(props) {
  const { options } = useEnergyBreakdownChart(props);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default EnergyBreakdownChart;
