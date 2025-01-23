import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update to use Routes
import Navbar from './components/nb';
import Overview from './components/ov';
import Statistics from './components/stat';
import LineChart from './components/lc';
import DoughnutChart from './components/dg';
import History from './components/ht';
import Livraison from './components/lv';
import Feet from './components/ft';


import { FiMessageSquare, FiBell, FiSettings } from "react-icons/fi"; 


const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="app1">
          <Navbar />
          
          <Routes>  
          <Route path="/" element={ <div className="b1">
            <div className="header-container">
              <div className="header-content">
                <div className="greeting">
                  <h1>Good afternoon, <span>Karim</span></h1>
                  <p>Let's take a look at today's current events.</p>
                </div>
                <div className="icons">
                  <FiMessageSquare className="icon" />
                  <FiBell className="icon" />
                  <FiSettings className="icon" />
                </div>
              </div>
            </div>
            
              
                  <table>
                    <tr>
                      <td className='col1'>
                        <Overview />
                      </td>
                      <td className='col2'>
                        <DoughnutChart />
                      </td>
                    </tr>
                    <tr>
                      <td className='col1'>
                        <LineChart />
                      </td>
                      <td className='col2'>
                        <Statistics />
                      </td>
                    </tr>
                    <tr>
                      <td className='col1'>
                        <History />
                      </td>
                      <td className='col2'>
                        <Livraison />
                      </td>
                    </tr>
                  </table></div>
                } />
                
               
                <Route path="/fleet-tracking" element={Feet()} />
              </Routes>
            
          </div>
        </div>
      
    </Router>
  );
};

export default App;
