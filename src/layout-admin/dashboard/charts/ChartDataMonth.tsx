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
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
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
      data: [
        5, 50, 35, 35, 35, 40, 35, 20, 35, 45, 5, 50, 35, 35, 35, 40, 35, 20,
        35, 45, 5, 50, 35, 35, 35, 40, 35, 20, 35, 45,
      ],
    },
  ],
};

export default chartData;
