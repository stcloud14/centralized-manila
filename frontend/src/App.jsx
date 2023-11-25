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
import LoginAdmin from './pages/LoginAdmin';
import Register from './pages/Register';
import Home from './pages/Home';
import PersonalInfo from './pages/PersonalInfo';
import ContactInfo from './pages/ContactInfo';
import GovernmentInfo from './pages/GovernmentInfo';
import News from './pages/News';
import RPTaxPayment from './pages/RPTaxPayment';
import RPTaxClearance from './pages/RPTaxClearance';
import TransactionHistory from './pages/TransactionHistory';

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
        <Route exact path="/indexadmin" element={<LoginAdmin />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/home/:user_id" element={<Home />} />
        <Route exact path="/personalinfo/:user_id" element={<PersonalInfo />} />
        <Route exact path="/contact/:user_id" element={<ContactInfo />} />
        <Route exact path="/govinfo/:user_id" element={<GovernmentInfo />} />
        <Route exact path="/news" element={<News />} />
        <Route exact path="/rptaxpayment/:user_id" element={<RPTaxPayment/>} />
        <Route exact path="/rptaxclearance/:user_id" element={<RPTaxClearance/>} />
        <Route exact path="/transachistory/:user_id" element={<TransactionHistory/>} />
      </Routes>
    </>
  );
}

export default App;
