import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from "chart.js";

import './style/stat.css';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,  
  Tooltip,
  Legend
);

const Statistics = () => {
     const cardData = [
        {
          title: "Parking",
          value: "916",
          percentage: "+8%",
          color: "#34D399",
          chartData: [50, 100, 75, 125, 150],
        },
        {
          title: "Livraisons",
          value: "1.75k",
          percentage: "+8%",
          color: "#F87171",
          chartData: [25, 50, 75, 100, 125],
        },
        {
          title: "Revenue",
          value: "$2370",
          percentage: "+8%",
          color: "#A78BFA",
          chartData: [20, 40, 60, 80, 100],
        },
        {
          title: "Expenses",
          value: "$425",
          percentage: "+8%",
          color: "#6EE7B7",
          chartData: [30, 60, 90, 120, 150],
        },
      ];
      
    const chartOptions = {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
      };
  return (
    <div className="statistics-section">
      <div className="header">
        <h2>Statistics</h2>
        <div className="dropdown">Dernier Mois</div>
      </div>
      <div className="cards1">
        {cardData.map((card, index) => (
          <div className="card1" key={index}>
            <div className="card-header1">
              <span>{card.title}</span>
              <span className="percentage">{card.percentage}</span>
            </div>
            <h3>{card.value}</h3>
            <div className="chart">
              <Line
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                  datasets: [
                    {
                      data: card.chartData,
                      borderColor: card.color,
                      borderWidth: 2,
                      tension: 0.3,
                      pointBackgroundColor: card.color,
                    },
                  ],
                }}
                options={chartOptions}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
