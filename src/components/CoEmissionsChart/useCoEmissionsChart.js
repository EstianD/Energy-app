import React, { useState, useEffect } from "react";
import { colorCodes } from "../../colorCodes";
import { capitalizeFirstLetter } from "../../Services/globalFunctions";

function useCoEmissionsChart(props) {
  const [options, setOptions] = useState(null);
  console.log("CO2 EMISSIONS: ", props);
  console.log(Number(props["coalEmissions"]["data"][0][0]));

  const chartOptions = {
    title: {
      text: "CO<sub>2</sub> Emissions by source",
    },

    subtitle: {
      text: "Source: thesolarfoundation.com",
    },

    yAxis: {
      title: {
        text: `${props["coalEmissions"]["unit"]}`,
      },
    },

    xAxis: {
      accessibility: {
        // rangeDescription: "Range: 2010 to 2017",
      },
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: true,
        },
        pointStart: Number(props["coalEmissions"]["data"][0][0]),
      },
    },

    series: [],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
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
    const dataArray = [];
    Object.keys(props).forEach((source) => {
      console.log(source);

      dataArray.push({
        name: capitalizeFirstLetter(props[source]["id"]),
        data: [...props[source]["data"]],
        color: colorCodes[props[source].id],
      });
    });

    chartOptions["series"] = [...dataArray];

    setOptions(chartOptions);
  }, [props]);

  return { options };
}

export default useCoEmissionsChart;
