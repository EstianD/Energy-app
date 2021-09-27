import React from "react";
// Import chart dependancies
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// Import hook
import useTotalEnergyChart from "./useTotalEnergyChart";

function TotalEnergyChart() {
  const { options } = useTotalEnergyChart();

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default TotalEnergyChart;
