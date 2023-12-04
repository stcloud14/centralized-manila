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
  const user_id = pathname.split("/")[2];

  const [userPersonal, setUserPersonal]=useState({})
  const [userBirth, setUserBirth]=useState({})

    useEffect(()=>{
        const fetchUserPersonal= async()=>{
            try{
                const res= await axios.get(`http://localhost:8800/profile/${user_id}`)
                setUserPersonal(res.data.user_personal[0])
                setUserBirth(res.data.birth_info[0])

            }catch(err){
                console.log(err)
            }
        }
        fetchUserPersonal()
    },[])
    
  const handleChangePersonal = (e) => {
  const { name, value } = e.target;

  const updatedValue = isNaN(value) ? value.toUpperCase() : value;

  const finalValue = updatedValue === "0" ? null : updatedValue;

  setUserPersonal((prevData) => ({
    ...prevData,
    [name]: finalValue,
  }));
      
    };

    const handleChangeBirth = (e) => {
      const { name, value } = e.target;
  
      setUserBirth((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      
    };

    const [isSuccess, setIsSuccess] = useState(false); // New state for success message

    const handleSubmit = async (e) => {
      e.preventDefault();

      const userData = {
        ...userPersonal,
        ...userBirth
      };

      try {
        await axios
          .put(`http://localhost:8800/profile/${user_id}`, userData)
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
            <h1 className='font-medium text-center text-slate-700 dark:text-white'>Profile</h1>
            <h1 className='mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300'>Personal Information</h1>

              {isSuccess && (
              <div className="text-emerald-500 bg-emerald-100 text-center rounded-full py-1.5 mb-5">
                Success! Your changes have been saved.
              </div>
              )}

            
              {/* Row 1 */}
              <div className="grid md:grid-cols-3 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleChangePersonal} value={userPersonal.f_name} type="text" name="f_name" id="first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                  <label htmlFor="first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleChangePersonal} value={userPersonal.m_name} type="text" name="m_name" id="middle_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                  <label htmlFor="middle_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Middle Name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleChangePersonal} value={userPersonal.l_name} type="text" name="l_name" id="last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                  <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid md:grid-cols-4 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                <select onChange={handleChangePersonal} value={userPersonal.suffix_type} defaultValue={0} name="suffix_type" id="suffix" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                    <option value="0" className='dark:bg-[#3d3d3d]'>Select Suffix</option>
                    <option value="SR."className='dark:bg-[#3d3d3d]'>Sr.</option>
                    <option value="JR."className='dark:bg-[#3d3d3d]'>Jr.</option>
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
                  <label htmlFor="suffix" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Suffix</label>
                </div>

                <div className="relative z-0 w-full mb-6 group" >
                  <select onChange={handleChangePersonal} value={userPersonal.sex_type} defaultValue={0} name="sex_type" id="sex" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                    <option value="0" className='dark:bg-[#3d3d3d]'>Select Sex</option>
                    <option value="MALE" className='dark:bg-[#3d3d3d]'>Male</option>
                    <option value="FEMALE"className='dark:bg-[#3d3d3d]'>Female</option>
                  </select>
                  <label htmlFor="sex" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sex</label>
                </div>
                
                <div className="relative z-0 w-full mb-6 group">
                  <Flatpickr
                    id='birth_date'
                    value={userBirth.birth_date}
                    onChange={(date) => {
                      const formattedDate = date.length > 0 ? (() => {
                        const originalDate = new Date(date[0]);
                        originalDate.setDate(originalDate.getDate() + 1);
                        return originalDate.toISOString().split('T')[0];
                      })() : '';
                      
                      setUserBirth((prevData) => ({
                        ...prevData,
                        birth_date: formattedDate,
                      }))
                    }}
                    options={{
                      dateFormat: 'Y-m-d',
                      altInput: true,
                      altFormat: 'F j, Y',
                      placeholder: ' ', // Set an empty space as the initial placeholder
                    }}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  />
                  <label
                    htmlFor="birth_date"
                    className={`peer-focus:font-medium absolute bg-transparent text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 ${
                      userBirth.birth_date ? 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0' : 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    }`}
                  >
                    Date of Birth
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input onChange={handleChangeBirth} value={userBirth.birth_place} type="text" name="birth_place" id="birth_place" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="birth_place" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Place of Birth</label>
                </div>
              </div>
              
              {/* Row 3 */}
              <div className="grid md:grid-cols-3 md:gap-6">

                <div className="relative z-0 w-full mb-6 group">
                  <select onChange={handleChangePersonal} value={userPersonal.cvl_status} defaultValue={0} name="cvl_status" id="civil_status" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                    <option value="0" className='dark:bg-[#3d3d3d]'>Select Civil Status</option>
                    <option value="SINGLE" className='dark:bg-[#3d3d3d]'>Single</option>
                    <option value="MARRIED" className='dark:bg-[#3d3d3d]'>Married</option>
                    <option value="SEPARATED" className='dark:bg-[#3d3d3d]'>Separated</option>
                    <option value="WIDOWED" className='dark:bg-[#3d3d3d]'>Widowed</option>
                  </select>
                  <label htmlFor="civil_status" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Civil Status</label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <select onChange={handleChangePersonal} value={userPersonal.czn_status} defaultValue={0} name="czn_status" id="citizenship" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                    <option value="0" className='dark:bg-[#3d3d3d]'>Select Citizenship</option>
                    <option value="CITIZEN" className='dark:bg-[#3d3d3d]'>Citizen</option>
                    <option value="PERMANENT RESIDENT" className='dark:bg-[#3d3d3d]'>Permanent Resident</option>
                    <option value="TEMPORARY RESIDENT" className='dark:bg-[#3d3d3d]'>Temporary Resident</option>
                  </select>
                  <label htmlFor="citizenship" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Citizenship</label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <select onChange={handleChangePersonal} value={userPersonal.res_status} defaultValue={0} name="res_status" id="residency" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                    <option value="0" className='dark:bg-[#3d3d3d]'>Select Residency Status</option>
                    <option value="RESIDENT" className='dark:bg-[#3d3d3d]'>Resident</option>
                    <option value="NON-RESIDENT" className='dark:bg-[#3d3d3d]'>Non-Resident</option>
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