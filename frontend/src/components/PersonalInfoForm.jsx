import React, { useState, useEffect, useRef } from 'react';
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
  const user_id = pathname.split("/")[2];
  const [editMode, setEditMode] = useState(false);

  const [userPersonal, setUserPersonal]=useState({})
  const [userBirth, setUserBirth]=useState({})

  const [userName, setUserName] = useState({
    f_name: '',
    l_name: '',
  });


  console.log(userName)
  
    useEffect(()=>{
        const fetchUserPersonal= async()=>{
            try{
                const res= await axios.get(`http://localhost:8800/profile/${user_id}`)
                setUserPersonal(res.data.user_personal[0])
                setUserBirth(res.data.birth_info[0])
                setUserName({
                  f_name: res.data.user_personal[0].f_name,
                  l_name: res.data.user_personal[0].l_name,
                });
                

            }catch(err){
                console.log(err)
            }
        }
        fetchUserPersonal()
    },[])
    
    const handleEdit = () => {
      setEditMode(!editMode);
    };

  const handleChangePersonal = (e) => {
  const { name, value } = e.target;

  const updatedValue = isNaN(value) ? value.toUpperCase() : value;

  const finalValue = updatedValue === "0" ? null : updatedValue;

  if (name === 'cvl_status' || name === 'czn_status' || name === 'res_status') {

    setUserPersonal((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  } else {
  
    setUserPersonal((prevData) => ({
      ...prevData,
      [name]: finalValue,
    }));
  }
      
    };

    const handleChangeBirth = (e) => {
      const { name, value } = e.target;

      const updatedValue = isNaN(value) ? value.toUpperCase() : value;
  
      setUserBirth((prevData) => ({
        ...prevData,
        [name]: updatedValue,
      }));
      
    };

    const [isSuccess, setIsSuccess] = useState(false); // New state for success message
    
    const contentRef = useRef(null);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const userData = {
        ...userPersonal,
        ...userBirth
      };

      setUserName({
        f_name: userPersonal.f_name,
        l_name: userPersonal.l_name,
      });
      

      try {
        await axios
          .post(`http://localhost:8800/profile/${user_id}`, userData)
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

    console.log(userPersonal)
    console.log(userBirth)

    const handleProceed = (e) => {
      e.preventDefault();
      
      const requiredFields = ['f_name', 'l_name', 'sex_type', 'cvl_status', 'czn_status', 'res_status'];
      const requiredFields1 = ['birth_date', 'birth_place'];

      const isIncompletePersonal = requiredFields.some((field) => {
        const value = userPersonal[field];
        return value == null || value.trim() === "";
      });
      

      const isIncompleteBirth = requiredFields1.some((field) => {
        const value = userBirth[field];
        return value == null || value.trim() === "";
      });

      const scrollToTop = () => {
        contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      };

      if (isIncompletePersonal || isIncompleteBirth) {
        scrollToTop();
        setShowWarning(true);
        setTimeout(() => {
          setShowWarning(false);
        }, 4000);
      } else {
        scrollToTop();
        setIsModalOpen(true);
      }

    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} userName={userName} />

        <main ref={contentRef} className="overflow-y-auto">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
                 
           
            <form onSubmit={handleSubmit}>
            <h1 className='font-medium text-center text-slate-700 dark:text-white'>Profile</h1>
            <h1 className='mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300'>Personal Information</h1>

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

            
              {/* Row 1 */}
              <div className="grid md:grid-cols-3 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleChangePersonal} value={userPersonal.f_name} type="text" name="f_name" id="f_name" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      !editMode && 'border-slate-200 dark:border-gray-700 cursor-not-allowed text-slate-500 dark:text-zinc-400'
                    }`}
                    placeholder=" "
                    required
                    disabled={!editMode}
                  />
                  <label htmlFor="f_name" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                      !editMode && 'text-gray-500'
                    }`}
                  >First Name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleChangePersonal} value={userPersonal.m_name} type="text" name="m_name" id="m_name" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      !editMode && 'border-slate-200 dark:border-gray-700 cursor-not-allowed text-slate-500 dark:text-zinc-400'
                    }`}
                    placeholder=" "
                    required
                    disabled={!editMode}/>
                  <label htmlFor="m_name" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                      !editMode && 'text-gray-500'
                    }`}>Middle Name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleChangePersonal} value={userPersonal.l_name} type="text" name="l_name" id="l_name" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      !editMode && 'border-slate-200 dark:border-gray-700 cursor-not-allowed text-slate-500 dark:text-zinc-400'
                    }`}
                    placeholder=" "
                    required
                    disabled={!editMode}/>
                  <label htmlFor="l_name" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                      !editMode && 'text-gray-500'
                    }`}>Last Name</label>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid md:grid-cols-4 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                <select onChange={handleChangePersonal} value={userPersonal.suffix_type} defaultValue={0} name="suffix_type" id="suffix_type" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      !editMode && 'border-slate-200 dark:border-gray-700 cursor-not-allowed text-slate-500 dark:text-zinc-400'
                    }`}
                    placeholder=" "
                    required
                    disabled={!editMode}>
                    <option value="0" className='dark:bg-[#3d3d3d]'>Select Suffix</option>
                    <option value="Sr."className='dark:bg-[#3d3d3d]'>Sr.</option>
                    <option value="Jr."className='dark:bg-[#3d3d3d]'>Jr.</option>
                    <option value="II"className='dark:bg-[#3d3d3d]'>II</option>
                    <option value="III"className='dark:bg-[#3d3d3d]'>III</option>
                    <option value="IV"className='dark:bg-[#3d3d3d]'>IV</option>
                    <option value="V"className='dark:bg-[#3d3d3d]'>V</option>
                    <option value="VI"className='dark:bg-[#3d3d3d]'>VI</option>
                    <option value="VII"className='dark:bg-[#3d3d3d]'>VII</option>
                    <option value="VIII"className='dark:bg-[#3d3d3d]'>VIII</option>
                    <option value="IX"className='dark:bg-[#3d3d3d]'>IX</option>
                    <option value="X"className='dark:bg-[#3d3d3d]'>X</option>
                  </select>
                  <label htmlFor="suffix_type" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                      !editMode && 'text-gray-500'
                    }`}>Suffix</label>
                </div>

                <div className="relative z-0 w-full mb-6 group" >
                  <select onChange={handleChangePersonal} value={userPersonal.sex_type} defaultValue={0} name="sex_type" id="sex_type" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      !editMode && 'border-slate-200 dark:border-gray-700 cursor-not-allowed text-slate-500 dark:text-zinc-400'
                    }`}
                    placeholder=" "
                    required
                    disabled={!editMode}>
                    <option value="0" className='dark:bg-[#3d3d3d]'>Select Sex</option>
                    <option value="Male" className='dark:bg-[#3d3d3d]'>Male</option>
                    <option value="Female"className='dark:bg-[#3d3d3d]'>Female</option>
                  </select>
                  <label htmlFor="sex_type" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sex</label>
                </div>
                
                <div
                  className={`relative z-0 w-full mb-6 group ${
                    !editMode ? 'border-slate-200 dark:border-gray-700 cursor-not-allowed text-slate-500 dark:text-zinc-400' : '' // Apply cursor-not-allowed class when not in edit mode
                  }`}
                >
                  {editMode ? (
                    <Flatpickr
                      id='birth_date'
                      name='birth_date'
                      value={userBirth.birth_date}
                      onChange={(date) => {
                        const formattedDate =
                          date.length > 0
                            ? (() => {
                                const originalDate = new Date(date[0]);
                                originalDate.setDate(originalDate.getDate() + 1);
                                return originalDate.toISOString().split('T')[0];
                              })()
                            : '';

                        setUserBirth((prevData) => ({
                          ...prevData,
                          birth_date: formattedDate,
                        }));
                      }}
                      options={{
                        dateFormat: 'Y-m-d',
                        altInput: true,
                        altFormat: 'F j, Y',
                        placeholder: ' ', // Set an empty space as the initial placeholder
                      }}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                  ) : (
                    <div className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                      {userBirth.birth_date}
                    </div>
                  )}
                  <label
                    htmlFor="birth_date"
                    className={`peer-focus:font-medium absolute bg-transparent text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 ${
                      !editMode && 'text-gray-500'
                    } ${
                      userBirth.birth_date
                        ? 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0'
                        : 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    }`}
                  >
                    Date of Birth
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleChangeBirth} value={userBirth.birth_place} type="text" name="birth_place" id="birth_place" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      !editMode && 'border-slate-200 dark:border-gray-700 cursor-not-allowed text-slate-500 dark:text-zinc-400'
                    }`}
                    placeholder=" "
                    required
                    disabled={!editMode} />
                  <label htmlFor="birth_place" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Place of Birth</label>
                </div>
              </div>
              
              {/* Row 3 */}
              <div className="grid md:grid-cols-3 md:gap-6">

                <div className="relative z-0 w-full mb-6 group">
                  <select onChange={handleChangePersonal} value={userPersonal.cvl_status} defaultValue={0} name="cvl_status" id="cvl_status" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      !editMode && 'border-slate-200 dark:border-gray-700 cursor-not-allowed text-slate-500 dark:text-zinc-400'
                    }`}
                    placeholder=" "
                    required
                    disabled={!editMode}>
                    <option value="0" className='dark:bg-[#3d3d3d]'>Select Civil Status</option>
                    <option value="Single" className='dark:bg-[#3d3d3d]'>Single</option>
                    <option value="Married" className='dark:bg-[#3d3d3d]'>Married</option>
                    <option value="Separated" className='dark:bg-[#3d3d3d]'>Separated</option>
                    <option value="Widowed" className='dark:bg-[#3d3d3d]'>Widowed</option>
                  </select>
                  <label htmlFor="cvl_status" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Civil Status</label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <select onChange={handleChangePersonal} value={userPersonal.czn_status} defaultValue={0} name="czn_status" id="czn_status" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      !editMode && 'border-slate-200 dark:border-gray-700 cursor-not-allowed text-slate-500 dark:text-zinc-400'
                    }`}
                    placeholder=" "
                    required
                    disabled={!editMode}>
                    <option value="0" className='dark:bg-[#3d3d3d]'>Select Citizenship</option>
                    <option value="Citizen" className='dark:bg-[#3d3d3d]'>Citizen</option>
                    <option value="Permanent Resident" className='dark:bg-[#3d3d3d]'>Permanent Resident</option>
                    <option value="Temporary Resident" className='dark:bg-[#3d3d3d]'>Temporary Resident</option>
                  </select>
                  <label htmlFor="czn_status" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Citizenship</label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <select onChange={handleChangePersonal} value={userPersonal.res_status} defaultValue={0} name="res_status" id="res_status" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      !editMode && 'border-slate-200 dark:border-gray-700 cursor-not-allowed text-slate-500 dark:text-zinc-400'
                    }`}
                    placeholder=" "
                    required
                    disabled={!editMode}>
                    <option value="0" className='dark:bg-[#3d3d3d]'>Select Residency Status</option>
                    <option value="Resident" className='dark:bg-[#3d3d3d]'>Resident</option>
                    <option value="Non-Resident" className='dark:bg-[#3d3d3d]'>Non-Resident</option>
                  </select>
                  <label htmlFor="res_status" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Residency Status</label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center md:justify-end mt-7">
                <button
                  type="button"
                  onClick={handleEdit}
                  className={`flex items-center w-full sm:w-auto justify-center text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-8 py-2.5 text-center md:mb-2 mb-3.5 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 ${
                    !editMode
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                  </svg>
                  <span>Edit Profile</span>
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

export default PersonalInfoForm;