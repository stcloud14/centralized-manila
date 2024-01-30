import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'

import { useLocation } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

const GovernmentInfoForm =()=>{

  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);
  const user_id = pathname.split("/")[2];
  const [editMode, setEditMode] = useState(false);

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
            setEditMode(false);
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
  const [showWarning, setShowWarning] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleProceed = (e) => {
    e.preventDefault();
    
    // Please fill up the necessary forms
    const requiredFields = ['user_tin_id', 'user_pgb_id', 'user_philh_id', 'user_sss_id', 'user_gsis_id', 'user_natl_id']; //The input fields that is required
    const isIncomplete = requiredFields.some((field) => !userPersonal[field]);

    if (isIncomplete) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });    
      setShowWarning(true); // Show warning message and prevent opening the modal
     
      setTimeout(() => {
        setShowWarning(false); // Set a timer to hide the warning message after 4 seconds
      }, 4000);
    } else {
      
      setIsModalOpen(true);// Proceed to open the modal
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowWarning(false);
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

  const logoSrc = '../src/images/mnl_footer.svg';

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
            <div className="grid grid-cols-5 items-center">

              {/* Description ONLY APPEARS IN DESKTOP VIEW */}
              <div className="hidden sm:flex mb-7">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 flex-shrink-0">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                <h1 className="text-[0.50rem] flex text-gray-500 dark:text-gray-400 pl-1 mt-0.5">Maintain accurate government records by updating your information below. Ensure accuracy in your government-related information to maintain up-to-date records.</h1>
              </div>

              {/* Description Button ONLY APPEARS IN MOBILE VIEW */}
              <div className="flex sm:hidden mb-7">
                <div className="relative inline-block text-left">
                  <button type="button" onClick={() => document.getElementById('popover-click').classList.toggle('hidden')} className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                  </button>

                  {/* POPOVER */}
                  <div id="popover-click" className="text-xs hidden absolute z-10 w-64 px-3 py-3 transition-opacity duration-300 rounded-sm shadow-2xl bg-white dark:bg-[#212121]">
                      <p>Maintain accurate government records by updating your information below. Ensure accuracy in your government-related information to maintain up-to-date records.</p>
                  </div>
                </div>
              </div>

              {/* FORMS TITLE */}
              <div className="flex flex-col col-span-3">
                <h1 className="font-medium text-center text-slate-700 dark:text-white">Profile</h1>
                <h1 className="mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300">Edit Government Information</h1>
              </div>
              </div>

              {isSuccess && (
              <div className="text-emerald-700 md:text-sm text-xs bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                Success! Your changes have been saved.
              </div>
              )}       

              {showWarning && (
                <div className="text-yellow-600 bg-yellow-100 md:text-sm text-xs text-center rounded-full py-1.5 mb-5">
                  Please fill in all required fields before proceeding.
                </div>
              )} 

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value={userPersonal.user_tin_id} type="text" name="user_tin_id" id="user_tin_id" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      !editMode && 'border-slate-200 dark:border-gray-700 cursor-not-allowed text-slate-500 dark:text-zinc-400'
                    }`}
                    placeholder=" "
                    required
                    disabled={!editMode}/>
                  <label htmlFor="user_tin_id" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                      !editMode && 'text-gray-500'
                    }`}>Tax Identification Number (TIN)</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value={userPersonal.user_pgb_id} type="text" name="user_pgb_id" id="user_pgb_id" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      !editMode && 'border-slate-200 dark:border-gray-700 cursor-not-allowed text-slate-500 dark:text-zinc-400'
                    }`}
                    placeholder=" "
                    required
                    disabled={!editMode}/>
                    <label htmlFor="user_pgb_id" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                      !editMode && 'text-gray-500'
                    }`}>PAG-IBIG Number (PIN)</label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value={userPersonal.user_philh_id} type="text" name="user_philh_id" id="user_philh_id" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      !editMode && 'border-slate-200 dark:border-gray-700 cursor-not-allowed text-slate-500 dark:text-zinc-400'
                    }`}
                    placeholder=" "
                    required
                    disabled={!editMode}/>
                    <label htmlFor="user_philh_id" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                      !editMode && 'text-gray-500'
                    }`}>Philhealth Number</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value={userPersonal.user_sss_id} type="text" name="user_sss_id" id="user_sss_id" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      !editMode && 'border-slate-200 dark:border-gray-700 cursor-not-allowed text-slate-500 dark:text-zinc-400'
                    }`}
                    placeholder=" "
                    required
                    disabled={!editMode}/>
                    <label htmlFor="user_sss_id" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                      !editMode && 'text-gray-500'
                    }`}>UMID/SSS Number</label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value={userPersonal.user_gsis_id} type="text" name="user_gsis_id" id="user_gsis_id" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      !editMode && 'border-slate-200 dark:border-gray-700 cursor-not-allowed text-slate-500 dark:text-zinc-400'
                    }`}
                    placeholder=" "
                    required
                    disabled={!editMode}/>
                    <label htmlFor="user_gsis_id" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                      !editMode && 'text-gray-500'
                    }`}>GSIS Number</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value={userPersonal.user_natl_id} type="text" name="user_natl_id" id="user_natl_id" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      !editMode && 'border-slate-200 dark:border-gray-700 cursor-not-allowed text-slate-500 dark:text-zinc-400'
                    }`}
                    placeholder=" "
                    required
                    disabled={!editMode}/>
                    <label htmlFor="user_natl_id" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                      !editMode && 'text-gray-500'
                    }`}>National ID</label>
                </div>
              </div>
           
              <div className="flex flex-col sm:flex-row justify-center items-center md:justify-end mt-7">
                <button
                  type="button"
                  onClick={handleEdit}
                  className={`flex items-center w-full sm:w-auto justify-center ${editMode
                    ? 'text-yellow-500 hover:text-white border border-yellow-400 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-normal rounded-full text-sm px-8 py-2.5 text-center md:mb-2 mb-3.5 dark:border-yellow-400 dark:text-yellow-400 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-800'
                    : 'text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-8 py-2.5 text-center md:mb-2 mb-3.5 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'
                  }`}
                >
                  {editMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                  )}
                  <span>{editMode ? 'Cancel' : 'Edit Profile'}</span>
                </button>

                <button
                  type="submit"
                  onClick={handleProceed}
                  className={`flex items-center w-full sm:w-auto justify-center text-emerald-500 hover:text-white border border-emerald-500 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-normal rounded-full text-sm px-8 py-2.5 text-center  mb-2 md:ml-3 dark:border-emerald-500 dark:text-emerald-500 dark:hover:text-white dark:hover:bg-emerald-500 dark:focus:ring-emerald-800 ${
                    !editMode && 'hidden'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                  </svg>
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
            </div>
          </div>
          <Footer logo={logoSrc} />
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
