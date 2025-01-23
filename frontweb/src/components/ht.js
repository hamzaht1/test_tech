import React, { useEffect, useState } from 'react';
import './style/ht.css';

const History = () => {
  const [historique, setHistorique] = useState([]);

  useEffect(() => {
    // Appel à l'API pour récupérer l'historique
    const fetchHistorique = async () => {
      try {
        const response = await fetch('http://localhost:5000/historique');
        const data = await response.json();
        setHistorique(data);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique:', error);
      }
    };

    fetchHistorique();
  }, []);  

  return (
    <div className="history">
  <div className="history-header">
    <h2>Historique</h2>
    <p className="view-all">Voir tous</p>
  </div>
  <ul className="history-list">
    {historique.map((event, index) => (
      <li
        key={index}
        className={`history-item ${
          event.message.includes("dépasse") ? "alert" : ""
        }`}
      >
        {event.message} -{" "}
        <span className="timestamp">
          {new Date(event.timestamp).toLocaleTimeString()}
        </span>
      </li>
    ))}
  </ul>
</div>

  );
};

export default History;

  