import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Link} from "react-router-dom"


import { useLocation } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/themes/airbnb.css';

const PersonalInfoForm =()=>{

  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);
  const user_id = pathname.split("/")[2];

  const [userPersonal, setUserPersonal]=useState({})

    console.log(userPersonal);
    useEffect(()=>{
        const fetchUserPersonal= async()=>{
            try{
                const res= await axios.get(`http://localhost:8800/profile/${user_id}`)
                setUserPersonal(res.data[0])
            }catch(err){
                console.log(err)
            }
        }
        fetchUserPersonal()
    },[])
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
  
      setUserPersonal((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const [isSuccess, setIsSuccess] = useState(false); // New state for success message

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios
          .put(`http://localhost:8800/profile/${user_id}`, userPersonal)
          .then((res) => {
            setIsSuccess(true); // Set success state to true
            handleCloseModal(); // Close the modal
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

        <main>
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
                 
           
            <form onSubmit={handleSubmit}>
              <h1 className='font-medium text-center'>Profile</h1>
              <h1 className='mb-7 text-sm italic text-center'>Personal Information</h1>

              {isSuccess && (
              <div className="text-emerald-500 bg-emerald-100 text-center rounded-full py-1.5 mb-5">
                Success! Your changes have been saved.
              </div>
              )}

            
              <div className="grid md:grid-cols-1 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input value={userPersonal.user_id} type="text" name="user_id" id="user_id" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " readOnly/>
                  <label htmlFor="user_id" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User ID</label>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value={userPersonal.f_name} type="text" name="f_name" id="first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                  <label htmlFor="first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value={userPersonal.m_name} type="text" name="m_name" id="middle_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="middle_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Middle Name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value={userPersonal.l_name} type="text" name="l_name" id="last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                  <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                </div>
              </div>

              {/* Row 3 - Sfu */}
              <div className="grid md:grid-cols-4 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value={userPersonal.suffix_id} type="text" name="suffix" id="suffix" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="suffix" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Suffix</label>
                </div>
                <div className="relative z-0 w-full mb-6 group" >
                  <select onChange={handleInputChange} value={userPersonal.sex_id} name="sex_id" id="sex" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                    <option value="0" disabled selected>Select Sex</option>
                    <option value="1" className='dark:bg-[#3d3d3d]'>Male</option>
                    <option value="2"className='dark:bg-[#3d3d3d]'>Female</option>
                  </select>
                  <label htmlFor="sex" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sex</label>
                </div>
                
                {/* Row 3 - Birthdate input */}
                <div className="relative z-0 w-full mb-6 group">
                  <Flatpickr
                    value={userPersonal.b_date}
                    onChange={(date) =>
                      setUserPersonal((prevData) => ({
                        ...prevData,
                        b_date: date,
                      }))
                    }
                    options={{
                      dateFormat: 'Y-m-d',
                      altInput: true,
                      altFormat: 'F j, Y',
                      altInputClass:
                        'block py-2.5 px-0 w-full bg-transparent text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
                      appendTo: document.body,
                      onOpen: function (selectedDates, dateStr, instance) {
                        if (document.documentElement.classList.contains('dark')) {
                          const monthDropdown = instance.calendarContainer.querySelector(
                            '.flatpickr-monthDropdown-months'
                          );
                          if (monthDropdown) {
                            monthDropdown.style.backgroundColor = '#212121';
                          }
                        }
                      },
                      onClose: function (selectedDates, dateStr, instance) {
                        const monthDropdown = instance.calendarContainer.querySelector(
                          '.flatpickr-monthDropdown-months'
                        );
                        if (monthDropdown) {
                          monthDropdown.style.backgroundColor = '';
                        }
                      },
                    }}
                    
                  />
                  <label
                    htmlFor="birthdate"
                    className={`peer-focus:font-medium absolute bg-transparent text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 ${
                      userPersonal.b_date ? 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0' : ''
                    }`}
                  >
                    {userPersonal.b_date ? 'Birthdate' : 'Birthdate'}
                  </label>
                </div>
                
                {/* Row 3 - Birth Place */}
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleInputChange} value='0' type="text" name="b_place" id="place_of_birth" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                  <label htmlFor="place_of_birth" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Place of Birth</label>
                </div>
              </div>
              
              {/* Row 5 - Civil Status */}
              <div className="grid md:grid-cols-3 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <select onChange={handleInputChange} value={userPersonal.cvl_id} name="cvl_id" id="civil_status" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                    <option value="0" disabled selected>Select Civil Status</option>
                    <option value="1" className='dark:bg-[#3d3d3d]'>Single</option>
                    <option value="2" className='dark:bg-[#3d3d3d]'>Married</option>
                    <option value="3" className='dark:bg-[#3d3d3d]'>Divorced</option>
                    <option value="4" className='dark:bg-[#3d3d3d]'>Widowed</option>
                  </select>
                  <label htmlFor="civil_status" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Civil Status</label>
                </div>

                {/* Row 5 - Citizenship */}
                <div className="relative z-0 w-full mb-6 group">
                <select onChange={handleInputChange} value={userPersonal.czn_id} name="cvl_id" id="citizenship" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                    <option value="0" disabled selected>Select Citizenship</option>
                    <option value="1" className='dark:bg-[#3d3d3d]'>Citizen</option>
                    <option value="2" className='dark:bg-[#3d3d3d]'>Permanent Resident</option>
                    <option value="3" className='dark:bg-[#3d3d3d]'>Temporary Resident</option>
                  </select>
                  <label htmlFor="citizenship" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Citizenship</label>
                </div>

                {/* Row 5 - Residency Status */}
                <div className="relative z-0 w-full mb-6 group">
                <select onChange={handleInputChange} value={userPersonal.res_id} name="cvl_id" id="residency" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                    <option value="0" disabled selected>Select Residency Status</option>
                    <option value="1" className='dark:bg-[#3d3d3d]'>Resident</option>
                    <option value="2" className='dark:bg-[#3d3d3d]'>Non-Resident</option>
                  </select>
                  <label htmlFor="residency" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Residency Status</label>
                </div>
              </div>

              <div className="flex flex-col items-center md:flex-row md:justify-end mt-7">
                <button
                  type="submit"
                  onClick={handleProceed}
                  className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                >
                  Save Changes
                </button>
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-[#181818] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-sm leading-6 font-medium text-gray-900 dark:text-white" id="modal-headline">
                      Are you sure you want to save this changes?
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-[#181818] px-4 py-3 gap-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-5 py-2 text-center mb-2 dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="text-slate-500 ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-5 py-2 text-center mb-2 dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                >
                  Cancel
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

export default PersonalInfoForm;