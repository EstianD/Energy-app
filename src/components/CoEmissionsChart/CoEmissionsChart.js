import React from "react";
// Import chart dependancies
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// Import hooks
import useCoEmissionsChart from "./useCoEmissionsChart";

function CoEmissionsChart() {
  const { options } = useCoEmissionsChart();
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default CoEmissionsChart;
