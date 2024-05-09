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
import RPTaxClearance from './pages/RPTaxClearance';
import RPTaxPayment from './pages/RPTaxPayment';
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
import ForgotPassword from './pages/ForgotPassword';
import ComingSoon from './partials/ComingSoon';

//Import Dashboard Provider
import { DashboardProvider } from './DashboardContext';

// Import Admin Dashboards
import AdminDashChief from './admin_pages/AdminDashChief';
import AdminDashRP from './admin_pages/AdminDashRP';
import AdminDashBP from './admin_pages/AdminDashBP';
import AdminDashCTC from './admin_pages/AdminDashCTC';
import AdminDashLCR from './admin_pages/AdminDashLCR';
import AdminDashUR from './admin_pages/AdminDashUR';

// Import Admin Pages
import AdminRPTax1 from './admin_pages/AdminRPTax1';
import AdminRPTax2 from './admin_pages/AdminRPTax2';
import AdminBusiness1 from './admin_pages/AdminBusiness1';
import AdminBusiness2 from './admin_pages/AdminBusiness2';
import AdminCedula1 from './admin_pages/AdminCedula1';
import AdminCedula2 from './admin_pages/AdminCedula2';
import AdminLCR1 from './admin_pages/AdminLCR1';
import AdminLCR2 from './admin_pages/AdminLCR2';
import AdminUserList from './admin_pages/AdminUserList';
import AdminVerifyReqs from './admin_pages/AdminVerifyReqs';
import AdminAuditTrail from './admin_pages/AdminAuditTrail';
import AdminSettings from './admin_components/AdminSettings';
import TermsConditions from './pages/TermsConditions';
import AdminContacts from './admin_pages/AdminContacts';


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
        <Route exact path="/privacypolicy" element={<PrivacyPolicy/>} />
        <Route exact path="/termsconditions" element={<TermsConditions/>} />
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
        <Route exact path="/paymentsuccess/:user_id" element={<PaymentSuccess/>} />
        <Route exact path="/forgotpass/" element={<ForgotPassword/>} />
        <Route exact path="/comingsoon/:user_id" element={<ComingSoon/>} />

        {/* Admin Pages */}
        <Route exact path="/indexadmin" element={<LoginAdmin />} />
        <Route exact path="/admin_settings/:admin_type" element={<AdminSettings />} />
        <Route exact path="/admin_rptax1/:admin_type" element={<AdminRPTax1 />} />
        <Route exact path="/admin_rptax2/:admin_type" element={<AdminRPTax2 />} />
        <Route exact path="/admin_business1/:admin_type" element={<AdminBusiness1 />} />
        <Route exact path="/admin_business2/:admin_type" element={<AdminBusiness2 />} />
        <Route exact path="/admin_cedula1/:admin_type" element={<AdminCedula1 />} />
        <Route exact path="/admin_cedula2/:admin_type" element={<AdminCedula2 />} />
        <Route exact path="/admin_lcr1/:admin_type" element={<AdminLCR1 />} />
        <Route exact path="/admin_lcr2/:admin_type" element={<AdminLCR2 />} />
        <Route exact path="/admin_userlist/:admin_type" element={<AdminUserList />} />
        <Route exact path="/admin_verifyreqs/:admin_type" element={<AdminVerifyReqs />} />
        <Route exact path="/admin_audittrail/:admin_type" element={<AdminAuditTrail />} />
        <Route exact path="/admin_contacts/:admin_type" element={<AdminContacts />} />
      </Routes>

      <DashboardProvider>
        <Routes>
          <Route exact path="/admin_dash_chief/:admin_type" element={<AdminDashChief />} />
          <Route exact path="/admin_dash_rp/:admin_type" element={<AdminDashRP />} />
          <Route exact path="/admin_dash_bp/:admin_type" element={<AdminDashBP />} />
          <Route exact path="/admin_dash_ctc/:admin_type" element={<AdminDashCTC />} />
          <Route exact path="/admin_dash_lcr/:admin_type" element={<AdminDashLCR />} />
          <Route exact path="/admin_dash_ur/:admin_type" element={<AdminDashUR />} />
        </Routes>
      </DashboardProvider>
    </>
  );
}

export default App;
