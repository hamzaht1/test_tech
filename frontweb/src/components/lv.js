import React, { useState, useEffect } from 'react';
import './style/lv.css';
const Livraison = () => {
  const [livraisonsEnCours, setLivraisonsEnCours] = useState([]);
  const [livraisonsProgrammees, setLivraisonsProgrammees] = useState([]);

  useEffect(() => {
    
    const fetchLivraisonsEnCours = async () => {
      try {
        const response = await fetch('http://localhost:5000/livraisons/en-cours');
        const data = await response.json();
        setLivraisonsEnCours(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des livraisons en cours:', error);
      }
    };

    
    const fetchLivraisonsProgrammees = async () => {
      try {
        const response = await fetch('http://localhost:5000/livraisons/programmees');
        const data = await response.json();
        setLivraisonsProgrammees(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des livraisons programmées:', error);
      }
    };

    fetchLivraisonsEnCours();
    fetchLivraisonsProgrammees();
  }, []);  

  return (
    <div className="livraisons">
  <div className="livraisons-header">
    <h3>Livraisons</h3>
    <a href="#" className="view-all">Voir tous</a>
  </div>
  <div className="tabs">
    <button className="tab active">Encours</button>
    <button className="tab">Programmer</button>
  </div>
  <div className="delivery-items">
    {livraisonsEnCours.map((livraison, index) => (
      <div className="delivery-item in-progress" key={index}>
        Commande #{livraison.numero_commande}
      </div>
    ))}
    {livraisonsProgrammees.map((livraison, index) => (
      <div className="delivery-item scheduled" key={index}>
        Commande #{livraison.numero_commande}
      </div>
    ))}
  </div>
</div>

  );
};

export default Livraison;
