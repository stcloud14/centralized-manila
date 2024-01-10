import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';
import AdminBanner from '../admin_partials/AdminBanner';

import MainCard from '../admin_partials/misc/MainCard';

import BCstats from '../admin_partials/misc/BCstats';
import DCstats from '../admin_partials/misc/DCstats';
import MCstats from '../admin_partials/misc/MCstats';
import TopRegions from '../admin_partials/misc/TopRegions';
import TopProvinces from '../admin_partials/misc/TopProvinces';
import TopCities from '../admin_partials/misc/TopCities';
import Revenue from '../admin_partials/misc/Revenue';

const AdminDashLCRForm =()=>{

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logoSrc = '../src/images/mnl_footer.svg';

  const [isVisible, setIsVisible] = useState(false);
  
  const [birthCert, setBirthCert] = useState({});
  const [deathCert, setDeathCert] = useState({});
  const [marriageCert, setMarriageCert] = useState({});
  const [topRegions, setTopRegions] = useState({});
  

  const [isLoading, setIsLoading] = useState(true);

  const [completedEffects, setCompletedEffects] = useState(0);
  
  console.log(completedEffects)
  const handleEffectCompletion = () => {
    setCompletedEffects((prev) => prev + 1);
  };

  useEffect(() => {
    if (completedEffects > 6) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [completedEffects]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const bth = await axios.get(`http://localhost:8800/admin/birthcert/`);
        setBirthCert(bth.data);
      } catch (err) {
        console.log(err);
      } finally {
        handleEffectCompletion();
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dth = await axios.get(`http://localhost:8800/admin/deathcert/`);
        setDeathCert(dth.data);
      } catch (err) {
        console.log(err);
      } finally {
        handleEffectCompletion();
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mrg = await axios.get(`http://localhost:8800/admin/marriagecert/`);
        setMarriageCert(mrg.data);
      } catch (err) {
        console.log(err);
      } finally {
        handleEffectCompletion();
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topr = await axios.get(`http://localhost:8800/admin/topregions/`);
        setTopRegions(topr.data);
      } catch (err) {
        console.log(err);
      } finally {
        handleEffectCompletion();
      }
    };
    fetchData();
  }, []);




  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
  
      {/* AdminSidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
  
        {/* Site header */}
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  
        {/* Contents Area */}
        <main className="overflow-y-auto">
  
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-[500px]">
            
              <svg
                aria-hidden="true"
                className="w-10 h-10 md:w-15 md:h-15 lg:w-20 lg:h-20 pb-0 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <p className="pt-5 sm:pt-10 font-bold text-lg md:text-xl">Please wait for a moment...</p>
            
            </div>
          )}
  
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {!isLoading && (
              <>
                <AdminBanner />
  
                <div className="grid grid-cols-12 gap-6">
                  <BCstats birthCert={birthCert}/>
                  <DCstats deathCert={deathCert}/>
                  <MCstats marriageCert={marriageCert}/>
                  <TopRegions topRegions={topRegions} />
                  <TopProvinces />
                  <TopCities />
                  <Revenue/>
                </div>
              </>
            )}
          </div>
          <AdminFooter logo={logoSrc} />
        </main>
      </div>
    </div>
  );  
}

export default AdminDashLCRForm;