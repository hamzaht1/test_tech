import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './style/dg.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [doughnutData, setDoughnutData] = useState({ permanent: 0, temporaire: 0 });

  useEffect(() => {

    const fetchDoughnutData = async () => {
      try {
        const response = await fetch('http://localhost:5000/doughnut-data');
        const data = await response.json();
        setDoughnutData(data);
      } catch (error) {
        console.error('Error fetching doughnut data:', error);
      }
    };

    fetchDoughnutData();
  }, []);

  const doughnutChartData = {
    labels: ['Permanent', 'Temporaire'],
    datasets: [
      {
        backgroundColor: ['#0332c0', '#b8c5ff'],
        hoverBackgroundColor: ['#4338CA', '#10B981'],
        data: [40, 60],
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  return (
    <div className="dgc">
      <h3 className="t1">Traffic</h3>
      <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
    </div>
  );
};

export default DoughnutChart;
