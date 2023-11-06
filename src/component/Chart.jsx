import ReactApexChart from "react-apexcharts";
import { chartDataDummy } from "./dummyData";
import { useEffect, useState } from "react";

const Chart = (props) => {
  const { isDarkTheme } = props;
   // Define state to hold chart colors
   const [chartColors, setChartColors] = useState(isDarkTheme ? ["#2DAAE1", "#19B747"] : ["#FF5733", "#FFC300"]);
   const [chartLabelsColors, setChartLabelsColors] = useState(isDarkTheme ? ["#000"] : ["#fff"]);

  // Chart data
  const chartData = [
    {
      name: "CE",
      data: chartDataDummy.CE,
    },
    {
      name: "PE",
      data: chartDataDummy.PE,
    },
  ];

  // Chart options
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    colors: chartColors, // Use the dynamically defined colors
    xaxis: {
      categories: [
        "19,550",
        "19,600",
        "19,650",
        "19,700",
        "19,750",
        "19,800",
        "19,850",
        "19,000",
        "19,950",
        "20,000",
      ],
      labels: {
        style: {
          fontSize: "1rem",
          fontWeight: "bold",
          colors: chartLabelsColors
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value?.toLocaleString();
        },
        style: {
          fontSize: "1rem",
          fontWeight: "bold",
        },
      },
    },
    title: {
      align: "center",
    },
    legend: {
      position: "top",
      markers: {
        width: 20,
        height: 20,
      },
      itemMargin: {
        vertical: 20,
        horizontal: 10,
      },
      fontSize: "1rem",
      fontWeight: "bold",
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: "1rem",
        colors: chartLabelsColors,
      },
      formatter: function (val) {
        return val.toLocaleString();
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        colors: {},
      },
    },
    fill: {
      opacity: 70,
    },
  };

  useEffect(() => {
    setChartColors(isDarkTheme ? ["#2DAAE1", "#19B747"] : ["#FF5733", "#FFC300"]);
    setChartLabelsColors(isDarkTheme ? ["#fff"] : ["#000"]);
  }, [isDarkTheme]);

  return (
    <div className="bar-chart-container">
      <h3>CE vs PE OI</h3>
      <ReactApexChart
        options={chartOptions}
        series={chartData}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default Chart;
