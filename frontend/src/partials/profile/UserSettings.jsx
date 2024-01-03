import React, { useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar';
import Header from '../Header';
import defaultImage from '../../images/default_img.png';

const UserSettings =()=>{
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user_id } = useParams();
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      // Display a confirmation dialog
      const confirmDelete = window.confirm('Are you sure you want to delete your account?');
      if (confirmDelete) {
        // Make a DELETE request to the server endpoint
        await axios.delete(`http://localhost:8800/profile/accdelete/${user_id}`);

        // Redirect to the login or landing page after successful deletion
        window.location.replace = '/';
      }
    } catch (error) {
      console.error('Error deleting account:', error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const [file, setFile] = useState(defaultImage);
  const handleChange = (e) => {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleRemovePicture = () => {
    // Set the file state back to the default image path when the remove button is clicked
    setFile(defaultImage);
     // Clear the selected file in the input
    const fileInput = document.getElementById('user_img');
    if (fileInput) {
      fileInput.value = ''; // Reset the input value
    }
  }

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/*  Content Area */}
        <main className="overflow-y-auto">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
                <form className="max-w-md mx-auto">

                  {/* {isSuccess && (
                  <div className="text-emerald-500 bg-emerald-100 md:text-sm text-xs text-center rounded-full py-1.5 mb-5">
                    Password changed successfully!
                  </div>
                  )}

                  {showWarning && (
                    <div className="text-yellow-600 bg-yellow-100 md:text-sm text-xs text-center rounded-full py-1.5 mb-5">
                      Please fill in all required fields before proceeding.
                    </div>
                  )} */}

                  <div className="grid gap-6">
                    <h1 className='font-medium text-center text-slate-700 dark:text-white'>Profile Picture</h1>
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-6">
                        <img
                          className="inline-block h-72 w-72 rounded-full border-2 border-black dark:border-white p-1"
                          src={file}
                        />
                      </div>
                      <div className="flex flex-col items-center w-full mb-4">
                        <input
                          className="w-full border-gray-500 border rounded-full text-sm file:px-4 file:py-1.5 text-black dark:text-white file:cursor-pointer file:border-none file:text-white file:bg-[#212121] file:hover:bg-zinc-700 file:dark:bg-white file:dark:text-black file:dark:hover:bg-slate-400"
                          id="user_img"
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          onClick={handleRemovePicture}
                          className="w-full text-red-500 hover:text-white border border-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-normal rounded-full text-sm py-1.5 text-center my-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                          Remove Profile Picture
                        </button>
                      </div>
                    </div>


                    <h1 className='font-medium text-center text-slate-700 dark:text-white mt-10'>Password</h1>
                    <div className="relative z-0 w-full mb-2 group">
                      <input type="text" name="current_pass" id="current_pass" placeholder=" "className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                      <label htmlFor="current_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Current Password
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-2 group">
                      <input type="text" name="new_pass" id="new_pass" placeholder=" "className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                      <label htmlFor="new_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        New Password
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-2 group">
                      <input type="text" name="confirm_pass" id="confirm_pass" placeholder=" "className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                      <label htmlFor="confirm_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Confirm New Password
                      </label>
                    </div>

                      {/* Submit Button */}
                    <div className="flex flex-col justify-center mb-4">
                      <button 
                          type="submit" 
                          onClick={handleSubmit}
                          className="w-full sm:w-auto text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                            Change Password
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center mt-4 mb-4">
                    <h1 className='font-medium text-center text-slate-700 dark:text-white mt-10 mb-4'>Account Deletion</h1>
                    <span className='text-sm mb-4'>Are you sure you want to permanently delete your account?</span>
                    <button
                        type="submit"
                        onClick={handleDelete}
                        className="w-full sm:w-auto text-red-500 hover:text-white border border-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-normal rounded-full text-sm px-10 py-2.5 text-center md:mb-2 mb-3.5 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800"
                      >
                        Delete Account
                      </button>
                  </div>
                </form>
              </div>
            </div>
        </main>


      </div>
    </div>
  );
}

export default UserSettings;