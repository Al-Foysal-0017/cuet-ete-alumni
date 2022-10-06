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
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
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
      data: [5, 50, 35, 35, 35, 40, 35, 20, 35, 45, 15],
    },
  ],
};

export default chartData;
