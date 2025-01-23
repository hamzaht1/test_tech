import React, { useState, useEffect } from 'react';
import Mp from './mp';

function Feet() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
  
    const fetchDeliveries = async () => {
      try {
        const response = await fetch('http://localhost:5000/deliveries');
        const data = await response.json();
        setDeliveries(data);
      } catch (error) {
        console.error('Error fetching deliveries data:', error);
      }
    };

    fetchDeliveries();
  }, []);
  

  return (
    <div>
      <div className="container1">
        <div className="delivery-list">
        <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Rechercher..."
        
      />
      
    </div>
          <h4 >Ongoing Delivery</h4>
          {deliveries.map((delivery) => (
  <div className="delivery-card" key={delivery.id}>
    <div className="delivery-header">
      <p className="delivery-truck">🚚 Truck: {delivery.truck}</p>
      <p className={`delivery-status ${delivery.status.toLowerCase()}`}>Status: {delivery.status}</p>
    </div>
    <div className="delivery-details">
      <div className="driver-info">
        <img className="driver-image" src={delivery.driver_image} alt={delivery.driver} />
        <div>
          <p className="driver-name">👤 Driver: {delivery.driver}</p>
        </div>
      </div>
      <div className="route-info">
        <p>📍 Pickup: {delivery.pickup}</p>
        <p>📦 Destination: {delivery.destination}</p>
      </div>
    </div>
  </div>
))}

        </div>
        <div className="map-container1">
          <Mp />
        </div>
      </div>
    </div>
  );
}

export default Feet;
