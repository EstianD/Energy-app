import React from "react";
// Import chart dependancies
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// Import hooks
import useRenewableChart from "./useRenewableEnergyChart";

function RenewableEnergyChart(props) {
  const { options } = useRenewableChart(props);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default RenewableEnergyChart;
