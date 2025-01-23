import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from "chart.js";

// Register the necessary elements for chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [trafficData, setTrafficData] = useState([]);

  useEffect(() => {
    // Fetch traffic data from the backend
    const fetchTrafficData = async () => {
      try {
        const response = await fetch("http://localhost:5000/traffic");
        const data = await response.json();
        setTrafficData(data);
      } catch (error) {
        console.error("Error fetching traffic data:", error);
      }
    };

    fetchTrafficData();
  }, []);

  // Convert the data into the format expected by Chart.js
  const lineChartData = {
    labels: trafficData.map(item => item.month),  // Assuming 'month' is a column in the DB
    datasets: [
      {
        label: "Traffic des véhicules",
        data: trafficData.map(item => item.traffic),  // Assuming 'traffic' is the column in the DB
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="line-chart">
      <h2>Traffic des véhicules</h2>
      <Line data={lineChartData} options={lineChartOptions} />
    </div>
  );
};

export default LineChart;
