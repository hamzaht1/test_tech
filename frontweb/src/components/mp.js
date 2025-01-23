import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import polyline from '@mapbox/polyline';

function Mp() {
    const [start, setStart] = useState([51.505, -0.09]); 
    const [end, setEnd] = useState([51.515, -0.1]);     
    const [route, setRoute] = useState([]);              
    const [currentPosition, setCurrentPosition] = useState(null); 
    const [isSimulating, setIsSimulating] = useState(false);       

    const fetchRoute = async () => {
        try {
            const response = await axios.get('http://localhost:5000/route', {
                params: {
                    start: start.join(','),
                    end: end.join(','),
                },
            });

            if (response.data.code === 'Ok') {
                const steps = response.data.routes[0].legs[0].steps;
                const routeCoordinates = steps
                    .map(step => polyline.decode(step.geometry))
                    .flat();

                setRoute(routeCoordinates);
                setCurrentPosition(routeCoordinates[0]); // Set starting point for simulation
            } else {
                console.error('No valid route found');
                setRoute([]);
            }
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    };

    const simulateMovement = () => {
        if (!route.length) return;

        let index = 0;
        setIsSimulating(true);

        const interval = setInterval(() => {
            if (index < route.length) {
                setCurrentPosition(route[index]);
                index++;
            } else {
                clearInterval(interval);
                setIsSimulating(false);
            }
        }, 500); // Update position every 500ms
    };

    return (
        <div>
            <MapContainer center={start} zoom={13} style={{ height: '1000px', width: '800px' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {/* Start and End Markers */}
                <Marker
                    position={start}
                    draggable={true}
                    eventHandlers={{
                        dragend: (event) => {
                            const { lat, lng } = event.target.getLatLng();
                            setStart([lat, lng]);
                            console.log('Updated start position:', [lat, lng]);
                        },
                    }}
                />
                <Marker
                    position={end}
                    draggable={true}
                    eventHandlers={{
                        dragend: (event) => {
                            const { lat, lng } = event.target.getLatLng();
                            setEnd([lat, lng]);
                            console.log('Updated end position:', [lat, lng]);
                        },
                    }}
                />

                {/* Route Polyline */}
                {route.length > 0 && (
                    <Polyline
                        positions={route}
                        color="blue"
                    />
                )}

                {/* Simulated Moving Marker */}
                {currentPosition && (
                    <Marker position={currentPosition} />
                )}
            </MapContainer>

            <div style={{ marginTop: '10px' }}>
                <button onClick={fetchRoute} disabled={isSimulating}>
                    Get Route
                </button>
                <button onClick={simulateMovement} disabled={isSimulating || !route.length}>
                    Start Simulation
                </button>
            </div>
        </div>
    );
}

export default Mp;