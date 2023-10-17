import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PersonalInfo from './pages/PersonalInfo';
import ContactInfo from './pages/ContactInfo';
import GovernmentInfo from './pages/GovernmentInfo';
import News from './pages/News';
import RPTaxPayment from './pages/RPTaxPayment';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/personalinfo" element={<PersonalInfo />} />
        <Route exact path="/contact" element={<ContactInfo />} />
        <Route exact path="/govinfo" element={<GovernmentInfo />} />
        <Route exact path="/news" element={<News />} />
        <Route exact path="/rptaxpayment" element={<RPTaxPayment />} />
      </Routes>
    </>
  );
}

export default App;
