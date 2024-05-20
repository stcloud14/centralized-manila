import axios from 'axios';
import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import PasswordRuleIcon from '../partials/register/PasswordRuleIcon';
import Flatpickr from 'react-flatpickr';

import SexDropdown from '../partials/profile/SexDropdown';
import SuffixDropdown from '../partials/profile/SuffixDropdown';
import CitizenshipDropdown from '../partials/profile/CitizenshipDropdown';
import CivilStatusDropdown from '../partials/profile/CivilStatusDropdown';
import ResidencyDropdown from '../partials/profile/ResidencyDropdown';
import ApplyVerificationModal from '../partials/business/ApplyVerificationModal';

const SignUpForm =()=>{
    const [userReg, setUserReg] = useState({
        f_name:"",
        m_name:"",
        l_name:"",
        birth_date:"",
        birth_place:"",
        sex_type:"",
        suffix_type:"",
        cvl_status:"",
        czn_status:"",
        res_status:"",
        user_email:"",
        mobile_no:"",
        user_pass:"",
        user_valid_id_name:"",
        user_valid_id_short:"",
    });

    const [selectedFiles, setSelectedFiles] = useState([
      { fieldName: 'user_valid_id', value: null },
    ]);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleProceedClick = () => {
    if (isChecked) {
      onProceed();
    } else {
      alert('Please accept the terms and conditions before proceeding.');
    }
  };

      // Apply for Verification Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleApplyModal = () => {
      setIsModalOpen(true);
    }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

const navigate = useNavigate()
const [isSuccess, setIsSuccess] = useState(false);
const [passwordError, setPasswordError] = useState('');
const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#\$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
const [loading, setLoading] = useState(false);

const Base_Url = process.env.Base_Url;


const [passwordCriteria, setPasswordCriteria] = useState({
  length: false,
  uppercase: false,
  lowercase: false,
  symbol: false,
  number: false,
});


useEffect(() => {
  // Check each requirement and update the state
  setPasswordCriteria({
    length: /^.{8,}$/.test(userReg.user_pass),
    uppercase: /[A-Z]/.test(userReg.user_pass),
    lowercase: /[a-z]/.test(userReg.user_pass),
    symbol: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(userReg.user_pass),
    number: /\d/.test(userReg.user_pass),
  });
}, [userReg.user_pass]);


const handleUploadFile = (file) => {
  
  setUserReg((prevUserReg) => ({
    ...prevUserReg,
    user_valid_id_name: file.name, 
    user_valid_id_short: getShortName(file.name, 25) 
  }));

  setSelectedFiles([
    {
      fieldName: 'user_valid_id',
      value: file,
    },
  ]);
}


function getShortName(longName, maxCharacters) {
  if (!longName) {
      return '-';
  }

  const fileNameWithoutExtension = longName.split('.').slice(0, -1).join('.');
  const extension = longName.split('.').pop();

  const truncatedName = fileNameWithoutExtension.length > maxCharacters - extension.length - 5
      ? fileNameWithoutExtension.substring(0, maxCharacters - extension.length - 5) + '..'
      : fileNameWithoutExtension;

  return extension ? truncatedName + '.' + extension : truncatedName;
}


const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === 'f_name' || name === 'm_name' || name === 'l_name' || name === 'birth_place') {

    const uppercasedValue = (name === 'f_name' || name === 'm_name' || name === 'l_name' || name === 'birth_place') ? value.toUpperCase() : value;

    setUserReg((prev) => ({ ...prev, [name]: uppercasedValue }));

  } else if (name === 'mobile_no') {

    if (value.startsWith('+63 - ')) {
      const rawValue = value.replace('+63 - ', '');
      const formattedValue = rawValue.trim() ? rawValue.replace(/\D/g, '') : '';

      setUserReg((prev) => ({ ...prev, [name]: formattedValue }));

    } else if (value === '+63 -') {
      setUserReg((prev) => ({ ...prev, [name]: '' }));
      
    } else {
      setUserReg((prev) => ({ ...prev, [name]: `+63 - ${prev[name] || ''}` }));
    }

  } else {
    setUserReg((prev) => ({ ...prev, [name]: value }));
  }
};

const [showWarning, setShowWarning] = useState(false);

const [isDeclined, setisDeclined] = useState();


const handleClick = async (e) => {
  e.preventDefault();

  const { user_pass } = userReg;
  const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#\$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;

  if (user_pass && !passwordRule.test(user_pass)) {
    setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one symbol, and one number.');
    setTimeout(() => {
      setPasswordError('');
    }, 3000);
  } else {
    const requiredFields = ['f_name', 'l_name', 'user_email', 'mobile_no', 'user_pass'];
    const isIncomplete = requiredFields.some((field) => !userReg[field]);

    if (isIncomplete) {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 4000);
      return;
    }

    try {
      // Check if the user already exists
      const existenceCheckResponse = await axios.post(`${Base_Url}register/check-existence`, {
        mobile_no: userReg.mobile_no,
      });


      if (existenceCheckResponse.data.exists) {
        // User exists, display a message or redirect to the login page
        setisDeclined(true)
        setTimeout(() => {
          setisDeclined(false)
          setLoading(true)
          // alert(existenceCheckResponse.data.message);
          setTimeout(() => {
            setLoading(false);
            navigate("/");
            // window.location.reload();
          }, 4000);
        }, 4000);

      } 
      else {
        setLoading(true)
        setIsSuccess(true);
        const formData = new FormData();

        selectedFiles.forEach((fileInfo) => {
          const { fieldName, value } = fileInfo;
          formData.append(fieldName, value);
        });


        const response = await axios.post(`${Base_Url}register`, userReg);

        const user_id = response.data.user_id;

        const response1 = await fetch(`${Base_Url}register/valid-id/${user_id}`, {
          method: 'POST',
          body: formData,
        });


        if (response.status === 200 || response1.status === 200) {
          const user_id = response.data.user_id;
          try {
            const res = await axios.get(`${Base_Url}email/regis/${user_id}`);

            if (res.data.user_email) {
              const updatedUserEmail = res.data.user_email;
              const f_name = res.data.f_name;
              const l_name = res.data.l_name;

  
              console.log('FETCHED USER EMAIL:', updatedUserEmail);
  
              const user_email = updatedUserEmail;
  
              const trans_type = 'Welcome New User';
  
              const rowData = { ...userReg, trans_type};
  
              const body = {
                data: rowData,
                l_name: l_name
              };
    
              // Proceed with additional logic after updating state
              try {
                const emailResponse = await axios.post(`${Base_Url}email/registered-send-email/${user_email}`, body);
    
                if (emailResponse.data && emailResponse.data.message) {
                  console.log('SENT EMAIL');
                } else {
                  console.log("Failed to send email.");
                }
              } catch (emailError) {
                //
              }
            } else {
              console.error('Transaction error:', res.statusText);
            }
          } catch (fetchError) {
            console.log('NOT FETCHING EMAIL');
            console.error(fetchError);
          }
        }
        setLoading(false)

        console.log('Successful Register');
        
        const res = await axios.post(`${Base_Url}token/generate-token`, { user_id });
        const { token } = res.data;

      // Store the token securely (consider using HttpOnly cookies for better security)
        localStorage.setItem('token', token);
        
        setTimeout(() => {
          setIsSuccess(false);
          navigate(`/home/${user_id}`);
        }, 5000);

      }
    } catch (err) {
      console.log(err);
    }
  }
};


const [showPassword, setShowPassword] = useState(false);
const handleTogglePassword = () => {
  setShowPassword((prevShowPassword) => !prevShowPassword);
};

const isEdge = window.navigator.userAgent.includes('Edg');

console.log(userReg)
console.log(selectedFiles)

  return (
          <div className='bg-white'>
            <div className='flex justify-center'>
              <div className='flex flex-col items-center'>
                <img src='https://i.ibb.co/12J7JDk/mnl.png' width="100" height="100" className='mt-10' />
                <h1 className='font-normal mb-16 text-slate-500'>Centralized Manila</h1>
              </div>
            </div>
   
            <div className='form px-6 sm:px-6 md:px-12 lg:px-64'>
            {isSuccess && (
              <div className="text-emerald-500 bg-emerald-100 md:text-sm text-xs text-center rounded-full py-1.5 mb-5">
                Registration successful!
              </div>
            )}
            {showWarning && (
              <div className="text-yellow-600 bg-yellow-100 md:text-sm text-xs text-center rounded-full py-1.5 my-5">
                Please fill in all required fields before proceeding.
              </div>
            )}
                <div className="grid md:grid-cols-3 md:gap-6 sm:grid-cols-1">
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleChange} value={userReg.f_name} type="text" name="f_name" id="f_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum" placeholder=" " required />
                    <label htmlFor="f_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleChange} value={userReg.m_name} type="text" name="m_name" id="m_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum" placeholder=" " required />
                    <label htmlFor="m_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Middle Name</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleChange} value={userReg.l_name} type="text" name="l_name" id="l_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum" placeholder=" " required />
                    <label htmlFor="l_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 md:gap-6 gap-x-4 sm:grid-cols-1">
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleChange} value={userReg.suffix_type} defaultValue={0} name="suffix_type" id="suffix_type" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum cursor-pointer">
                      <SuffixDropdown/>
                    </select>
                    <label htmlFor="suffix" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Suffix</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleChange} value={userReg.sex_type} defaultValue={0} name="sex_type" id="sex_type"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum cursor-pointer">
                      <SexDropdown/>
                    </select>
                    <label htmlFor="sex" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sex</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <Flatpickr
                      id='birth_date'
                      name='birth_date'
                      value=""
                      onChange={(date) => {
                        const formattedDate = date.length > 0 ? (() => {
                          const originalDate = new Date(date[0]);
                          originalDate.setDate(originalDate.getDate() + 1);
                          return originalDate.toISOString().split('T')[0];
                        })() : '';
                        
                        setUserReg((prevData) => ({
                          ...prevData,
                          birth_date: formattedDate,
                        }))
                      }}
                      options={{
                        dateFormat: 'Y-m-d',
                        altInput: true,
                        altFormat: 'F j, Y',
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum"
                    />
                    <label
                      htmlFor="birth_date"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Date of Birth
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleChange} value={userReg.birth_place} type="text" name="birth_place" id="birth_place" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum" placeholder=" " required />
                    <label htmlFor="birth_place" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Place of Birth</label>
                  </div>
                </div>
         
                <div className="grid md:grid-cols-3 md:gap-6 sm:grid-cols-1">
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleChange} value={userReg.cvl_status} defaultValue={0} name="cvl_status" id="cvl_status" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum cursor-pointer" >
                      <option value="0" className='dark:bg-[#3d3d3d] dark:text-white'>Select Civil Status</option>
                      <option value="1" className='dark:bg-[#3d3d3d] dark:text-white'>Single</option>
                      <option value="2" className='dark:bg-[#3d3d3d] dark:text-white'>Married</option>
                      <option value="3" className='dark:bg-[#3d3d3d] dark:text-white'>Separated</option>
                      <option value="4" className='dark:bg-[#3d3d3d] dark:text-white'>Widowed</option>
                    </select>
                    <label htmlFor="cvl_status" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Civil Status</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleChange} value={userReg.czn_status} defaultValue={0} name="czn_status" id="czn_status" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum cursor-pointer">
                      <option value="0" className='dark:bg-[#3d3d3d] dark:text-white'>Select Citizenship</option>
                      <option value="1" className='dark:bg-[#3d3d3d] dark:text-white'>Citizen</option>
                      <option value="2" className='dark:bg-[#3d3d3d] dark:text-white'>Permanent Resident</option>
                      <option value="3" className='dark:bg-[#3d3d3d] dark:text-white'>Temporary Resident</option>
                    </select> 
                    <label htmlFor="czn_status" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Citizenship</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={handleChange} value={userReg.res_status} defaultValue={0} name="res_status" id="res_status" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum cursor-pointer">
                      <option value="0" className='dark:bg-[#3d3d3d] dark:text-white'>Select Residency Status</option>
                      <option value="1" className='dark:bg-[#3d3d3d] dark:text-white'>Resident</option>
                      <option value="2" className='dark:bg-[#3d3d3d] dark:text-white'>Non-Resident</option>
                    </select> 
                    <label htmlFor="res_status" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Residency Status</label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6 sm:grid-cols-1">
                  <div className="relative z-0 w-full mb-6 group ">
                      <input onChange={handleChange} value={userReg.user_email} type="email" name="user_email" id="user_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum" placeholder=" " required />
                      <label htmlFor="user_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group ">
                      <input onChange={handleChange} value={userReg.mobile_no ? `+63 - ${userReg.mobile_no}` : '+63 - '} maxLength={16} type="text" name="mobile_no" id="mobile_no" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum" placeholder=" " required />
                      <label htmlFor="mobile_no" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mobile Number (+63)</label>
                  </div>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleChange} value={userReg.user_pass}  type={showPassword ? 'text' : 'password'} name="user_pass" id="user_pass" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum" placeholder=" " required />
                    <label htmlFor="user_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    {isEdge ? (
                    null
                    ) : (
                      <button type="button" className="absolute right-3 top-4 cursor-pointer" onClick={handleTogglePassword}>
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-700">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-700">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                        )}
                      </button>
                    )}
                </div>

                {passwordError && <h3 className="text-red-500 text-xs md:text-sm">{passwordError}</h3>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                  <div className="relative z-0 w-full group">
                    <h1 className="italic text-xs text-slate-400">Password must be:</h1>
                    
                    <div className="flex items-center">
                      <PasswordRuleIcon isValid={passwordCriteria.length} />
                      <h1 className="italic text-xs">Minimum of 8 Characters</h1>
                    </div>

                    <div className="flex items-center">
                      <PasswordRuleIcon isValid={passwordCriteria.uppercase && passwordCriteria.lowercase} />
                      <h1 className="italic text-xs">At Least one uppercase and lowercase letter</h1>
                    </div>

                    <div className="flex items-center">
                      <PasswordRuleIcon isValid={passwordCriteria.symbol} />
                      <h1 className="italic text-xs">At least one symbol (ex. !@#$%^&*.,-=)</h1>
                    </div>

                    <div className="flex items-center">
                      <PasswordRuleIcon isValid={passwordCriteria.number} />
                      <h1 className="italic text-xs">At least one number</h1>
                    </div>
                  </div>

                  <div className="relative z-0 w-full group flex flex-col items-start">         
                    <p className="md:ml-auto md:mr-0 mr-auto mb-2.5 text-xs sm:text-sm text-slate-700 pointer-events-none">
                      Would you like to speed up the verification process?
                    </p>
                    <p className="flex mt-0.5 md:ml-auto md:mr-0 mr-auto mb-3">
                      <p className="ml-auto text-xs sm:text-sm text-slate-600 text-justify pointer-events-none">
                        <span className="font-medium">Yes</span>
                      </p>
                        <input
                          id="bus_terms"
                          className="ml-1 mt-0.5 w-4 h-4 border-2 border-gray-400 rounded bg-transparent text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                    </p>
                    {isChecked && (
                    <button
                      onClick={handleApplyModal}
                      type="button"
                      className="ml-auto text-slate-500 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-slate-300 font-normal rounded-full text-sm w-auto px-4 sm:w-[200px] sm:px-0 py-1 text-center"
                    >
                      Upload Valid ID
                    </button>
                    )}
                  </div>
                </div>

                {isDeclined && (
                    <div className="my-5 text-center">
                      <div className="text-red-700 text-sm bg-red-200 text-center rounded-full py-1.5 mb-5">
                        <h1>Account already exists. redirecting to login.</h1> 
                      </div>
                    </div>
                  )} 
   
                <div className="text-center">
                  
                  {loading ? (
                    <div className="pt-3 font-medium flex pb-2 sm:mt-0 text-xs md:text-sm items-center justify-center">
                    <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin fill-blue-600"
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
                  <span className="pl-2">
                    Redirecting to login, please wait for a moment...
                  </span>
                  </div>
                  ) : (
                <div className="flex flex-col items-center mt-8">
                  <button onClick={handleClick} type="submit" className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-16 md:py-2.5 py-2 text-center mb-5">Register</button>
                </div>
                 )}
                 </div>
            </div>

            <div className="pt-2 pb-16 text-sm text-slate-500 text-center">
                Already have an account? <a className="text-emerald-500 font-bold hover:text-emerald-700" href="../">Login Here</a>
            </div>
            
            {/* APPLY FOR VERIFICATION MODAL */}
            <ApplyVerificationModal
            isOpen={isModalOpen}
            onFileSelect={handleUploadFile}
            handleClose={handleCloseModal}
            buttonType={'register'}
        />
    </div>
  );
}

export default SignUpForm;