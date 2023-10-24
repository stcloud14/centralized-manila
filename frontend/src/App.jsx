import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import LoginAdmin from './pages/LoginAdmin';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PersonalInfo from './pages/PersonalInfo';
import ContactInfo from './pages/ContactInfo';
import GovernmentInfo from './pages/GovernmentInfo';
import News from './pages/News';
import RPTaxPayment from './pages/RPTaxPayment';
import Blank from './pages/Blank';

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
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/indexuser" element={<Login />} />
        <Route exact path="/indexadmin" element={<LoginAdmin />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard/:user_id" element={<Dashboard />} />
        <Route exact path="/personalinfo/:user_id" element={<PersonalInfo />} />
        <Route exact path="/contact/:user_id" element={<ContactInfo />} />
        <Route exact path="/govinfo/:user_id" element={<GovernmentInfo />} />
        <Route exact path="/news" element={<News />} />
        <Route exact path="/rptaxpayment/:user_id" element={<RPTaxPayment />} />
        <Route exact path="/blank" element={<Blank />} />
      </Routes>
    </>
  );
}

export default App;
