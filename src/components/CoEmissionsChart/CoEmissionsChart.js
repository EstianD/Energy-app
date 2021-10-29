import React from "react";
// Import chart dependancies
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// Import hooks
import useCoEmissionsChart from "./useCoEmissionsChart";

function CoEmissionsChart(props) {
  const { options } = useCoEmissionsChart(props);
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default CoEmissionsChart;
