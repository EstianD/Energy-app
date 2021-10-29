import React, { useState, useEffect } from "react";
import { colorCodes } from "../../colorCodes";
import { capitalizeFirstLetter } from "../../Services/globalFunctions";

function useRenewableChart(props) {
  const [options, setOptions] = useState(null);
  // Destructure energy sources
  const { biomass, hydro, solar, geothermal, wind } = props;

  const totalBiomass = biomass.data.map((entry) => parseInt(entry[1]));
  const totalhydro = hydro.data.map((entry) => parseInt(entry[1]));
  const totalSolar = solar.data.map((entry) => parseInt(entry[1]));
  const totalGeothermal = geothermal.data.map((entry) => parseInt(entry[1]));
  const totalWind = wind.data.map((entry) => parseInt(entry[1]));

  console.log(totalBiomass);

  const chartOptions = {
    title: {
      text: "Renewable Energy",
    },

    subtitle: {
      text: "Source: thesolarfoundation.com",
    },

    yAxis: {
      labels: {
        format: "{value}",
        style: {
          // color: Highcharts.getOptions().colors[1],
        },
      },
      title: {
        text: `${biomass.unit}(BkWh)`,
      },
    },

    xAxis: [
      {
        categories: [],
        crosshair: true,
      },
    ],

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: Number(biomass["data"][0][0]),
      },
    },

    series: [
      {
        name: capitalizeFirstLetter(biomass.id),
        data: [...totalBiomass],
        tooltip: {
          valueSuffix: " BkWh",
        },
        color: colorCodes[biomass.id],
      },
      {
        name: capitalizeFirstLetter(hydro.id),
        data: [...totalhydro],
        tooltip: {
          valueSuffix: " BkWh",
        },
        color: colorCodes[hydro.id],
      },
      {
        name: capitalizeFirstLetter(solar.id),
        data: [...totalSolar],
        tooltip: {
          valueSuffix: " BkWh",
        },
        color: colorCodes[solar.id],
      },
      {
        name: capitalizeFirstLetter(wind.id),
        data: [...totalWind],
        tooltip: {
          valueSuffix: " BkWh",
        },
        color: colorCodes[wind.id],
      },
      {
        name: capitalizeFirstLetter(geothermal.id),
        data: [...totalGeothermal],
        tooltip: {
          valueSuffix: " BkWh",
        },
        color: colorCodes[geothermal.id],
      },
    ],
    tooltip: {
      shared: true,
    },

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
    console.log("DATA IN RENEWABLE CHART", props);

    setOptions(chartOptions);
  }, [props]);

  return { options };
}

export default useRenewableChart;
