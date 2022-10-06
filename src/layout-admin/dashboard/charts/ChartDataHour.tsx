const chartData = {
  height: 335,
  type: "area",
  options: {
    chart: {
      id: "area-chart",
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "5m",
        "10m",
        "15m",
        "20m",
        "25m",
        "30m",
        "35m",
        "40m",
        "45m",
        "50m",
        "55m",
        "1h",
      ],
    },
    fill: {
      type: "solid",
      colors: ["#4D4F80"],
    },
    dataLabels: {
      enabled: false,
    },
    // markers: {
    //   colors: ["#F44336", "#E91E63", "#9C27B0"],
    // },
    grid: {
      show: true,
      borderColor: "#181919",
    },
  },
  fill: {
    colors: ["#4D4F80"],
  },
  series: [
    {
      name: "Investment",
      data: [5, 50, 35, 35, 35, 40, 35, 20, 35, 45, 5, 50],
    },
  ],
};

export default chartData;
