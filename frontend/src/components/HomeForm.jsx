import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import WelcomeBanner from '../partials/home/WelcomeBanner';
import Section1 from '../partials/home/Section1';
import Section2 from '../partials/home/Section2';
import Section3 from '../partials/home/Section3';
import Section4 from '../partials/home/Section4';
import AboutSection from '../partials/home/AboutSection';
// import baseUrl from '../../../backend/';

const HomeForm = () => {


  const Base_Url = process.env.Base_Url;

  console.log("Base_Url", Base_Url)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user_id } = useParams();



  const logoSrc = '../src/images/mnl.png';


  useEffect(() => {
    const token = localStorage.getItem('token');
  
    const checkToken = async (token) => {
        try {
            // Make a request to backend API to verify token and check user access
            const response = await axios.get(`${Base_Url}token/protect-token/${user_id}`, {
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




  useEffect(() => {
    // Check if the script is already appended
    if (!window.watsonAssistantChatScriptAppended) {
      window.watsonAssistantChatOptions = {
        integrationID: "de2fe5df-48e1-4da9-8410-d789a72fe146",
        region: "jp-tok",
        serviceInstanceID: "e50214bf-cd1a-4ede-bc0c-52e7e8ff8c9e",
        onLoad: async (instance) => { await instance.render(); console.log('Chatbot rendered') }
      };
  
      const t = document.createElement('script');
      t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
      document.head.appendChild(t);
  
      // Set the flag to prevent duplicate appending
      window.watsonAssistantChatScriptAppended = true;
    }
  }, []);
 

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />
            <AboutSection />

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <Section1 />
              <Section2 />
              <Section3 />
              <Section4 />
            </div>
          </div>
          <Footer logo={logoSrc} />
        </main>
      </div>
    </div>
  );
};

export default HomeForm;
