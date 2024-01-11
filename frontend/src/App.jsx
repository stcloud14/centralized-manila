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
import RPTaxPayment from './pages/RPTaxPayment';
import RPTaxClearance from './pages/RPTaxClearance';
import TransactionHistory from './pages/TransactionHistory';
import BusinessPermit from './pages/BusinessPermit';
import Cedula from './pages/Cedula';
import BirthCertificate from './pages/BirthCertificate';
import MarriageCertificate from './pages/MarriageCertificate';
import DeathCertificate from './pages/DeathCertificate';
import News from './pages/News';
import UserSettings from './components/UserSettings';
import FAQs from './pages/FAQs';
import About from './pages/About';
import Contacts from './pages/Contacts';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PaymentSuccess from './pages/PaymentSuccess';

// Import Admin Dashboards
import AdminDashChief from './admin_pages/AdminDashChief';
import AdminDashRP from './admin_pages/AdminDashRP';
import AdminDashBP from './admin_pages/AdminDashBP';
import AdminDashCTC from './admin_pages/AdminDashCTC';
import AdminDashLCR from './admin_pages/AdminDashLCR';

// Import Admin Pages
import AdminRPTax from './admin_pages/AdminRPTax';
import AdminBusiness from './admin_pages/AdminBusiness';
import AdminCedula from './admin_pages/AdminCedula';
import AdminLocalCivilRegistry from './admin_pages/AdminLocalCivilRegistry';
import AdminUserList from './admin_pages/AdminUserList';
import AdminVerifyReqs from './admin_pages/AdminVerifyReqs';
import AdminAuditTrail from './admin_pages/AdminAuditTrail';


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
        {/* Client Pages */}
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/home/:user_id" element={<Home />} />
        <Route exact path="/personalinfo/:user_id" element={<PersonalInfo />} />
        <Route exact path="/contact/:user_id" element={<ContactInfo />} />
        <Route exact path="/govinfo/:user_id" element={<GovernmentInfo />} />
        <Route exact path="/rptaxpayment/:user_id" element={<RPTaxPayment/>} />
        <Route exact path="/rptaxclearance/:user_id" element={<RPTaxClearance/>} />
        <Route exact path="/transachistory/:user_id" element={<TransactionHistory/>} />
        <Route exact path="/businesspermit/:user_id" element={<BusinessPermit/>} />
        <Route exact path="/cedula/:user_id" element={<Cedula/>} />
        <Route exact path="/birthcertificate/:user_id" element={<BirthCertificate/>} />
        <Route exact path="/marriagecertificate/:user_id" element={<MarriageCertificate/>} />
        <Route exact path="/deathcertificate/:user_id" element={<DeathCertificate/>} />
        <Route exact path="/news/:user_id" element={<News/>} />
        <Route exact path="/usersettings/:user_id" element={<UserSettings/>} />
        <Route exact path="/faqs/:user_id" element={<FAQs/>} />
        <Route exact path="/about/:user_id" element={<About/>} />
        <Route exact path="/contacts/:user_id" element={<Contacts/>} />
        <Route exact path="/privacypolicy/:user_id" element={<PrivacyPolicy/>} />
        <Route exact path="/paymentsuccess/:user_id" element={<PaymentSuccess/>} />

        {/* Admin Pages */}
        <Route exact path="/indexadmin" element={<LoginAdmin />} />

        <Route exact path="/admin_dash_chief/:admin_type" element={<AdminDashChief />} />
        <Route exact path="/admin_dash_rp/:admin_type" element={<AdminDashRP />} />
        <Route exact path="/admin_dash_bp/:admin_type" element={<AdminDashBP />} />
        <Route exact path="/admin_dash_ctc/:admin_type" element={<AdminDashCTC />} />
        <Route exact path="/admin_dash_lcr/:admin_type" element={<AdminDashLCR />} />

        <Route exact path="/admin_rptax/:admin_type" element={<AdminRPTax />} />
        <Route exact path="/admin_business/:admin_type" element={<AdminBusiness />} />
        <Route exact path="/admin_cedula/:admin_type" element={<AdminCedula />} />
        <Route exact path="/admin_lcr/:admin_type" element={<AdminLocalCivilRegistry />} />
        <Route exact path="/admin_userlist/:admin_type" element={<AdminUserList />} />
        <Route exact path="/admin_verifyreqs/:admin_type" element={<AdminVerifyReqs />} />
        <Route exact path="/admin_audittrail/:admin_type" element={<AdminAuditTrail />} />
  
      </Routes>
    </>
  );
}

export default App;
