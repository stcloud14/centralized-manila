import React, { useState, useRef, useEffect } from 'react';

import axios from 'axios';

import Footer from '../partials/Footer';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { useParams, useNavigate } from 'react-router-dom';

const PrivacyPolicyForm =()=>{

  const { user_id } = useParams();
  const navigate = useNavigate();

  const contentRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logoSrc = '../src/images/mnl_footer.svg';


  useEffect(() => {
    const token = localStorage.getItem('token');
  
    const checkToken = async (token) => {
        try {
            // Make a request to backend API to verify token and check user access
            const response = await axios.get(`http://localhost:8800/token/protect-token/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (error) {
          window.location.reload();
          navigate(`/`);
        }
    };
  
    checkToken(token); // Pass the token to the checkToken function
}, [navigate, user_id]);

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
      {/* Sidebar */}
      {user_id && (
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      {user_id && (
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}

        {/*  Content Area of 3rd Button */}
        <main ref={contentRef} className="overflow-y-auto">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-10 py-5">
              <h1 className="font-medium text-center text-slate-700 dark:text-white">Privacy Policy</h1>
                <br/>
                  <h1 className="text-slate-800 dark:text-slate-100 font-medium">
                     Welcome to Centralized
                    <span className='text-blue-600'> M</span>
                    <span className='text-red-500'>a</span>
                    <span className='text-yellow-500'>n</span>
                    <span className='text-green-500'>i</span>
                    <span className='text-blue-600'>l</span>
                    <span className='text-red-500'>a</span>
                   </h1>
                  <br/>
              <span className="text-left text-slate-700 dark:text-white">
                Centralized<span className="text-slate-800 dark:text-slate-100 font-medium">
                    <span className='text-blue-600'> M</span>
                    <span className='text-red-500'>a</span>
                    <span className='text-yellow-500'>n</span>
                    <span className='text-green-500'>i</span>
                    <span className='text-blue-600'>l</span>
                    <span className='text-red-500'>a</span>
                   </span> acknowledges its obligations under Republic Act No. 10173, commonly referred to as the Data Privacy Act of 2012, and is dedicated to safeguarding your Personal Information.
                </span>
              <h1 className="text-slate-800 dark:text-slate-100 font-medium">Coverage</h1>
                <br/>
              <span className="text-left text-slate-700 dark:text-white">
                Your Personal Information is required for registration on our web application, which includes, at a minimum, your full name, address, email, and contact number. Your Personal Information is additionally necessary for the billing company or government agency to process your payments through the Centralized Manila System. This encompasses your full name, account number, date of birth, address, contact number, and Government ID details (where applicable).
              </span>
                <br/><br/>
              <h1 className="text-slate-800 dark:text-slate-100 font-medium">Data Collection and Utilization</h1>
                <br/>
              <span className="text-left text-slate-700 dark:text-white">
              We gather your personal information primarily to verify your identity and ensure the accuracy of your payment details. Your payment data is encrypted through our secure payment system and then uploaded for your payment/s. Moreover, your information may and will only be utilized for the following purposes:
              </span>
                <br/><br/>
            <div className="ml-3">
              <span className="text-left text-slate-700 dark:text-white">
                Inquiry into payment history;
                <br/><br/>
                Processing of document request;
                <br/><br/>
                Centralized Manila advisories and updates;
                <br/><br/>
                Centralized Manila will not disclose your personal information to third parties without your consent, except when such disclosure or data sharing is mandated by applicable laws necessary for the aforementioned purposes.
              </span>
                <br/><br/>
              </div>
              <div>
              <span className="text-left text-slate-700 dark:text-white">
              Please direct any complaints to the DATA PROTECTION OFFICER via this email: centralizedmanila@gmail.com
              </span>
              <br/><br/>
              <h1 className="text-slate-800 dark:text-slate-100 font-medium">Data Retention</h1>
                <br/>
              <span className="text-left text-slate-700 dark:text-white">
              Your registered Personal Information and payment information will be retained in our database for as long as required by National laws, regulations, and guidelines. Centralized Manila has implemented suitable organizational, physical, and technical security measures to ensure the safeguarding of your personal information.
              </span>
                <br/><br/>
                <h1 className="text-slate-800 dark:text-slate-100 font-medium">Customer Consent and Declaration</h1>
                <br/>
              <span className="text-left text-slate-700 dark:text-white">
              The Personal and Payment Information I provide will be made in good faith, verified to the best of my knowledge, pursuant to any applicable Laws and Regulations. I fully understand that Centralized Manila is authorized to accept and process payments and documents submitted through its web application.
              </span>
                <br/><br/>
              <span className="text-left text-slate-700 dark:text-white">
              Furthermore, I have reviewed Centralized Manila’s Data Privacy Statement and hereby voluntarily and freely provide my consent for Centralized Manila to collect, encrypt, transmit, process, analyze, retrieve, update, or modify my personal data for registration on Centralized Manila’s online portal and processing of my bills payment. I also affirm my rights:
              </span>
              <br/><br/>
              <div className="ml-3">
              <span className="text-left text-slate-700 dark:text-white">
                • Right to be informed,
                <br/>
                • Right to access,
                <br/>
                • Right to object,
                <br/>
                • Right to erase or block,
                <br/>
                • Right to rectify,
                <br/>
                • Right to damages,
                <br/>
                • Right to data portability.
              </span>
                <br/>
                </div>
            </div>  
            </div>
          </div>
          {user_id && (
          <Footer logo={logoSrc} />
          )}
        </main>


      </div>
    </div>
  );
}

export default PrivacyPolicyForm;