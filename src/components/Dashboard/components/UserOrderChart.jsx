/* eslint-disable react/prop-types */
import Chart from "react-apexcharts";
import Loading from "../../ui/Loading";
import { useEffect, useState } from "react";

const UserOrderChart = ({ chartData }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); 
  }, []);

  if (loading) {
    return <Loading />; 
  }

  const chartOptions = {
    chart: {
      id: "user-order-chart",
      type: "bar",
      toolbar: {
        show: false,
      },
      foreColor: "#FFFFFF", // Set all text to white
    },
    xaxis: {
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
      labels: {
        style: {
          fontFamily: "Kanit, sans-serif", // Change x-axis label font
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
    },
    yaxis: [
      {
        title: {
          text: "Number of Users",
          style: {
            color: "#FFFFFF",
            fontFamily: "Kanit, sans-serif", // Change y-axis title font
            fontSize: "16px",
            fontWeight: "bold",
          },
        },
        labels: {
          style: {
            fontFamily: "Kanit, sans-serif", // Change y-axis label font
            fontSize: "14px",
            fontWeight: "bold",
          },
        },
      },
      {
        opposite: true,
        title: {
          text: "Number of Orders",
          style: {
            color: "#FFFFFF",
            fontFamily: "Kanit, sans-serif", // Change opposite y-axis title font
            fontSize: "16px",
            fontWeight: "bold",
          },
        },
        labels: {
          style: {
            fontFamily: "Kanit, sans-serif", // Change opposite y-axis label font
            fontSize: "14px",
            fontWeight: "bold",
          },
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      theme: "dark", // Dark theme for tooltips, white text by default
      style: {
        fontFamily: "Kanit, sans-serif", // Change tooltip font
        fontSize: "12px",
        fontWeight: "normal",
      },
    },
    colors: ["#8A2BE2", "#A2CA71"], // Violet for bar, green for line
    stroke: {
      width: [0, 4],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "top",
        },
        colors: {
          ranges: [
            {
              from: 0,
              to: Infinity,
              color: "#8A2BE2", // Violet as base color
            },
          ],
          backgroundBarColors: [],
          backgroundBarOpacity: 1,
          gradient: {
            enabled: true,
            shade: "light",
            shadeIntensity: 0.25,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.8,
            stops: [0, 90, 100],
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0],
      style: {
        colors: ["#8A2BE2"], // White data labels
        fontFamily: "Kanit, sans-serif", // Change data label font
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
    title: {
      text: "User and Order Statistics",
      align: "left",
      style: {
        color: "#FFFFFF",
        fontFamily: "Kanit, sans-serif", // Change chart title font
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
  };

  const series = [
    {
      name: "Users",
      type: "bar",
      data: chartData.monthlyUsers,
    },
    {
      name: "Orders",
      type: "line",
      data: chartData.monthlyOrders,
    },
  ];

  return (
    <div className="w-full h-full">
      <Chart
        options={chartOptions}
        series={series}
        type="line"
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export default UserOrderChart;
