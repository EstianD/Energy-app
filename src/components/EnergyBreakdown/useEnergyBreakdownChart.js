import React, { useState, useEffect } from "react";

function useEnergyBreakdownChart(props) {
  const [options, setOptions] = useState(null);

  const { biomass, fossilFuel, geothermal, hydro, solar, nuclear, wind } =
    props;

  console.log("ENERGY BREAKDOWN: ", props);

  const chartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Energy breakdown",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Energy",
        colorByPoint: true,
        data: [
          {
            name: "Chrome",
            y: 61.41,
            // sliced: true,
            // selected: true,
          },
          {
            name: "Internet Explorer",
            y: 11.84,
          },
          {
            name: "Firefox",
            y: 10.85,
          },
          {
            name: "Edge",
            y: 4.67,
          },
          {
            name: "Safari",
            y: 4.18,
          },
          {
            name: "Other",
            y: 7.05,
          },
        ],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            minWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  useEffect(() => {
    // GET LATEST VALUE OF ALL ENERGY SOURCES
    let latestBiomass = parseInt(biomass.data[biomass.data.length - 1][1]);
    let latestFossilFuel = parseInt(
      fossilFuel.data[fossilFuel.data.length - 1][1]
    );
    let latestGeothermal = parseInt(
      geothermal.data[geothermal.data.length - 1][1]
    );
    let latestHydro = parseInt(hydro.data[hydro.data.length - 1][1]);
    let latestSolar = parseInt(solar.data[solar.data.length - 1][1]);
    let latestWind = parseInt(wind.data[wind.data.length - 1][1]);
    let latestNuclear = parseInt(nuclear.data[nuclear.data.length - 1][1]);

    // SUM OF ALL ENERGRY SOURCES
    let totalEnergy =
      latestBiomass +
      latestFossilFuel +
      latestGeothermal +
      latestHydro +
      latestSolar +
      latestWind +
      latestNuclear;

    // CALCULATE PERCENTAGE FOR ALL ENERGY SOURCES
    let biomassPerc = Number(((latestBiomass / totalEnergy) * 100).toFixed(1));
    let fossilFuelPerc = Number(
      ((latestFossilFuel / totalEnergy) * 100).toFixed(1)
    );
    let geothermalPerc = Number(
      ((latestGeothermal / totalEnergy) * 100).toFixed(1)
    );
    let hydroPerc = Number(((latestHydro / totalEnergy) * 100).toFixed(1));
    let solarPerc = Number(((latestSolar / totalEnergy) * 100).toFixed(1));
    let windPerc = Number(((latestWind / totalEnergy) * 100).toFixed(1));
    let nuclearPerc = Number(((latestNuclear / totalEnergy) * 100).toFixed(1));

    console.log(
      "TOTAL PERC: ",
      biomassPerc +
        fossilFuelPerc +
        geothermalPerc +
        hydroPerc +
        solarPerc +
        windPerc +
        nuclearPerc
    );

    // CALCULATE SUM OF ALL ENERGY

    // LOOP THROUGH PROPS AND EXTRACT DATA
    const dataArray = [];
    Object.keys(props).forEach((source) => {
      console.log(props[source]);
    });

    setOptions(chartOptions);
  }, [props]);

  return { options };
}

export default useEnergyBreakdownChart;
