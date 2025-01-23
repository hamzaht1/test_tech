const express = require('express');
const axios = require('axios');
const polyline = require('@mapbox/polyline');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',   
  user: 'root',        
  password: '',        
  database: 'logistics_db'  
});


db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});
app.get('/deliveries', (req, res) => {
    const query = 'SELECT * FROM deliveries';  // Récupérer toutes les livraisons
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des livraisons:', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
  
      res.json(results);  // Renvoie les résultats sous forme de JSON
    });
  });


app.get('/overview', (req, res) => {
  const query = 'SELECT * FROM overview_data'; 

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    
    res.json(results);  
  });
});
app.get('/traffic', (req, res) => {
    const query = 'SELECT * FROM vehicle_traffic_data'; // Remplace par ta table et ta requête appropriée
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des données:', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
  
      res.json(results);  // Renvoie les résultats sous forme de JSON
    });
  });
  app.get('/doughnut-data', (req, res) => {
    const query = 'SELECT *  FROM parking_data1 ';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des données:', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
  
      const data = {
        permanent: 0,
        temporaire: 0,
      };
  
      // Parcourir les résultats pour répartir les valeurs entre permanent et temporaire
      results.forEach((row) => {
        if (row.type === 'Permanent') {
          data.permanent = row.total;
        } else if (row.type === 'Temporaire') {
          data.temporaire = row.total;
        }
      });
  
      res.json(data);  // Renvoie les résultats sous forme de JSON
    });
  });
  app.get('/historique', (req, res) => {
    const query = 'SELECT * FROM historique ORDER BY timestamp DESC LIMIT 5';  // Récupérer les 5 derniers événements
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des données:', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
  
      res.json(results);  // Renvoie les résultats sous forme de JSON
    });
  });
  app.get('/livraisons/programmees', (req, res) => {
    const query = "SELECT * FROM livraisons WHERE statut = 'programmée'";
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des livraisons programmées:', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      res.json(results);  // Renvoie les livraisons programmées
    });
  });

app.get('/route', async (req, res) => {
    const { start, end } = req.query;
    console.log('Received query:', { start, end })

    if (!start || !end) {
        return res.status(400).json({ error: 'Start and end coordinates are required.' });
    }

    
    const [startLat, startLon] = start.split(',').map(coord => parseFloat(coord));
    const [endLat, endLon] = end.split(',').map(coord => parseFloat(coord));

   
    const tolerance = 0.0001;

    
    if (Math.abs(startLat - endLat) < tolerance && Math.abs(startLon - endLon) < tolerance) {
        return res.status(400).json({ error: 'Start and end coordinates are essentially the same. No route needed.' });
    }

    try {
        const osrmUrl = `https://routing.openstreetmap.de/routed-car/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=false&geometries=polyline&steps=true`;
        console.log('OSRM API URL:', osrmUrl); 

        const response = await axios.get(osrmUrl);

       
        console.log('OSRM Response:', response.data);

        
        if (!response.data.routes || response.data.routes.length === 0) {
            return res.status(404).json({ error: 'No route found.' });
        }

        const route = response.data.routes[0];

      
        if (!route.geometry) {
            console.log('No polyline found, returning route details without geometry.');
            return res.json(response.data);
        }

       
        const encodedPolyline = route.geometry;
        console.log('Encoded polyline:', encodedPolyline);

        const decodedRoute = polyline.decode(encodedPolyline);
        res.json({ route: decodedRoute });
    } catch (error) {
        console.error('Error fetching route:', error);
        res.status(500).json({ error: 'Failed to fetch route.' });
    }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend démarré sur http://localhost:${PORT}`);
});
