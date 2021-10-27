import React, { useEffect } from "react";
// Import chart dependancies
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// Import hook
import useTotalEnergyChart from "./useTotalEnergyChart";

function TotalEnergyChart(props) {
  const { options } = useTotalEnergyChart(props);
  console.log("CHART OPTIONS: ", options);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        allowChartUpdate={true}
      />
    </div>
  );
}

export default TotalEnergyChart;
