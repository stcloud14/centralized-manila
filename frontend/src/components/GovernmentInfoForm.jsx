import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import {Link} from "react-router-dom"

import { useLocation } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

import 'flatpickr/dist/themes/airbnb.css';

const GovernmentInfoForm =()=>{

  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);
  const user_id = pathname.split("/")[2];

  const [userPersonal, setUserPersonal]=useState({})
  // const id = 'RL1741';

    console.log(userPersonal)
      
    useEffect(()=>{
        const fetchUserPersonal= async()=>{
            try{
                const res= await axios.get(`http://localhost:8800/profile/govinfo/${user_id}`);
                setUserPersonal(res.data[0]);
            }catch(err){
                console.log(err)
            }
        }
        fetchUserPersonal();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserPersonal((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [isSuccess, setIsSuccess] = useState(false); // New state for success message

  const contentRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(`http://localhost:8800/profile/govinfo/${user_id}`, userPersonal)
        .then((res) => {
          setIsSuccess(true);
          handleCloseModal();
          contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          console.log('User credentials updated successfully');

          setTimeout(() => {
            setIsSuccess(false);
          }, 3000);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProceed = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


    // const handleDelete= async(id)=>{
    //     try{
    //         await axios.delete("http://localhost:8800/furns/" +id)
    //         window.location.reload()
    //     }catch(err){
    //         console.log(err)
    //     }
    // }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [birthdate, setBirthdate] = useState(new Date());

return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main ref={contentRef} className="overflow-y-auto">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
              
            <form onSubmit={handleSubmit}>
            <h1 className='font-medium text-center text-slate-700 dark:text-white'>Profile</h1>
            <h1 className='mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300'>Government Information</h1>    

              {isSuccess && (
              <div className="text-emerald-700 md:text-sm text-xs bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                Success! Your changes have been saved.
              </div>
              )}       

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value={userPersonal.user_tin_id} type="text" name="user_tin_id" id="user_tin_id" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="user_tin_id" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tax Identification Number (TIN)</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value={userPersonal.user_pgb_id} type="text" name="user_pgb_id" id="user_pgb_id" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                  <label htmlFor="user_pgb_id" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">PAG-IBIG Number (PIN)</label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value={userPersonal.user_philh_id} type="text" name="user_philh_id" id="user_philh_id" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                  <label htmlFor="user_philh_id" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Philhealth Number</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value={userPersonal.user_sss_id} type="text" name="user_sss_id" id="user_sss_id" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                  <label htmlFor="user_sss_id" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">UMID/SSS Number</label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value={userPersonal.user_gsis_id} type="text" name="user_gsis_id" id="user_gsis_id" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                  <label htmlFor="user_gsis_id" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">GSIS Number</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value={userPersonal.user_natl_id} type="text" name="user_natl_id" id="user_natl_id" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                  <label htmlFor="user_natl_id" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">National ID</label>
                </div>
              </div>
           
              <div className="flex flex-col items-center md:flex-row md:justify-end mt-7">
                  <button type="submit" onClick={handleProceed} className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Save Changes</button>
              </div>
            </form>


            </div>
          </div>
        </main>

        {isModalOpen && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white dark:bg-[#212121] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mx-auto mt-4">
                    <span className="font-medium text-slate-700 dark:text-white sm:mt-0 text-xs md:text-sm" id="modal-headline">
                      Are you sure you want to save these changes?
                    </span>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#212121] px-4 py-3 gap-3 sm:px-6 flex justify-end">
                  <button
                    onClick={handleCloseModal}
                    type="button"
                    className="text-slate-500 text-xs md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                  >
                    <p>Cancel</p>
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="text-white text-xs md:text-sm bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <p>Proceed</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )} 



      </div>
    </div>
  );
}

export default GovernmentInfoForm;
