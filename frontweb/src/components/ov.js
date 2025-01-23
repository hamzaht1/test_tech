import './style/ov.css';
const Overview = () => {
     const overviewData = [
        {
          title: "Camions",
          value: "224",
          trend: "+10",
          icon: "🚚",
          bgColor: "#EFF6FF",
          trendColor: "#3B82F6",
        },
        {
          title: "Livraison en cours",
          value: "17",
          trend: "+0",
          icon: "📦",
          bgColor: "#FEF3C7",
          trendColor: "#F97316",
        },
        {
          title: "Parkings libres",
          value: "197",
          trend: "+5",
          icon: "🏢",
          bgColor: "#D1FAE5",
          trendColor: "#10B981",
        },
        {
          title: "Quais libres",
          value: "10",
          trend: "+2",
          icon: "📍",
          bgColor: "#EDE9FE",
          trendColor: "#8B5CF6",
        },
      ];
      
    return (
      <div className="overview-container">
        <div className="header1">
          <h3>Overview</h3>
          <div className="tabs1">
            <button className="active">Semaine</button>
            <button>Mois</button>
            <button>Année</button>
          </div>
        </div>
        <div className="cards">
          {overviewData.map((item, index) => (
            <div className="card" style={{ backgroundColor: item.bgColor }} key={index}>
              <div className="icon">{item.icon}</div>
              <div className="details">
                <h4>{item.value} {item.title}</h4>
                <span style={{ color: item.trendColor }}>{item.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Overview;
  