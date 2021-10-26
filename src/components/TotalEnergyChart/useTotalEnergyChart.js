import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";

function useTotalEnergyChart(props) {
  const [options, setOptions] = useState(null);

  const chartOptions = {
    chart: {
      zoomType: "x",
    },
    title: {
      text: "Total Electricity consumption and Population",
    },
    subtitle: {
      text: "Source: eia.gov",
    },
    xAxis: [
      {
        categories: [],
        crosshair: true,
      },
    ],
    yAxis: [
      {
        // Primary yAxis - right
        labels: {
          format: "",
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        title: {
          text: "",
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
      },
      {
        // Secondary yAxis - left
        title: {
          text: "",
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
        labels: {
          format: "",
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      layout: "vertical",
      align: "left",
      x: 120,
      verticalAlign: "top",
      y: 100,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || // theme
        "rgba(255,255,255,0.25)",
    },
    series: [
      {
        name: "",
        type: "column",
        yAxis: 1,
        data: [],
        tooltip: {
          valueSuffix: "",
        },
      },
      {
        name: "",
        type: "spline",
        data: [],
        tooltip: {
          valueSuffix: "",
        },
      },
    ],
  };
  // console.log(chartOptions);

  const { totalElectricity, totalPopulation } = props;

  useEffect(() => {
    console.log("rerendering props: ", props);

    // 1. Add categories for the years, check which array between the 2 data sets has more entries and add them to the xAxis
    const electricityYears = [];
    const populationYears = [];
    const electricityData = [];
    const populationData = [];

    // Loop through electricity data
    totalElectricity.data.forEach((entry) => {
      electricityYears.push(entry[0]);
      electricityData.push(parseInt(entry[1]));
    });

    totalPopulation.data.forEach((entry) => {
      populationYears.push(entry[0]);
      populationData.push(parseInt(entry[1]));
    });

    // Set categories axis to the larger dataset
    electricityYears.length > populationYears.length
      ? (chartOptions["xAxis"][0]["categories"] = [...electricityYears])
      : (chartOptions["xAxis"][0]["categories"] = [...populationYears]);

    console.log("electricity: ", electricityYears, electricityData);
    console.log("population: ", populationYears, populationData);

    // 2. Primary yAxis = electricity usage
    chartOptions["yAxis"][0]["labels"]["format"] = "{value}";
    chartOptions["yAxis"][0]["title"][
      "text"
    ] = `${totalElectricity.unit}(BkWh)`;

    // 3. Secondary yAxis = population
    chartOptions["yAxis"][1]["labels"]["format"] = "{value}";
    chartOptions["yAxis"][1]["title"]["text"] = `${totalPopulation.unit}`;

    // 5. series[1] = population
    chartOptions["series"][0]["data"] = [...populationData];
    chartOptions["series"][0]["name"] = totalPopulation.id;
    chartOptions["series"][0]["tooltip"]["valueSuffix"] = " Thousand";

    // 4. series[0] = electricity
    chartOptions["series"][1]["data"] = [...electricityData];
    chartOptions["series"][1]["name"] = totalElectricity.id;
    chartOptions["series"][1]["tooltip"]["valueSuffix"] = " BkWh";

    console.log(totalElectricity);
    console.log(totalPopulation);

    console.log("CHART OPTIONS IN HOOK: ", chartOptions);

    setOptions(chartOptions);
  }, [props]);

  return { options };
}

export default useTotalEnergyChart;
