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
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    fill: {
      type: "solid",
      // colors: ["#4D4F80"],
      colors: ["#05BE71"],
    },
    dataLabels: {
      enabled: false,
    },
    // markers: {
    //   colors: ["#F44336", "#E91E63", "#9C27B0"],
    // },
    grid: {
      show: true,
      // borderColor: "#181919",
      borderColor: "#05BE71",
    },
  },
  fill: {
    // colors: ["#4D4F80"],
    colors: ["#05BE71"],
  },
  series: [
    {
      name: "Events",
      data: [5, 10, 8, 18, 4, 3, 15, 5, 7, 9, 4, 7],
    },
  ],
};

export default chartData;
