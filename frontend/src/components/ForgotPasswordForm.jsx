import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PasswordRuleIcon from '../partials/register/PasswordRuleIcon';

const ForgotPasswordForm = () => {
  const [stage, setStage] = useState('enterMobile'); // 'enterMobile', 'enterOTP', 'enterNewPassword'
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleContinueClick = () => {
    if (stage === 'enterMobile') {
      setStage('enterOTP');
    } else if (stage === 'enterOTP') {
      setStage('enterNewPassword');
    }
  };

  const togglePasswordVisibility = (passwordType) => {
    if (passwordType === 'new') {
      setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
    } else if (passwordType === 'confirm') {
      setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    }
  };


  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white justify-center items-center">
      {/* Go Back Button */}
      <NavLink end to="/" className="absolute top-6 left-6 text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" strokeWidth={1} fill="currentColor" className="w-5 h-5">
          <path className="stroke-slate-500" fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
        </svg>
      </NavLink>

      {/* Left Side */}
      <div className="lg:w-1/2 lg:ms-20">
        <img src="../src/images/mnl.svg" alt="Centralized Manila Logo" className="lg:h-60 md:h-40 sm:h-28 h-28 mx-auto" />
        <h1 className="text-center font-medium text-slate-700 text-2xl">Centralized
          <span className="text-blue-500"> M</span>
          <span className="text-red-500">a</span>
          <span className="text-yellow-500">n</span>
          <span className="text-emerald-500">i</span>
          <span className="text-blue-500">l</span>
          <span className="text-red-500">a</span>
        </h1>
      </div>

      {/* Right Side */}
      <div className="lg:w-1/2">
        <div className="p-8 lg:me-40 lg:ms-4 lg:pt-10">
          <form>
            {stage === 'enterMobile' ? (
              
              <div className="grid md:grid-cols-1">
                <h1 className='md:text-start text-center text-black text-3xl font-bold md:mt-0 mt-5'>Forgot password</h1>
                <h1 className='md:text-start text-center text-black text-sm mb-7'>Enter the mobile number linked to your account.</h1>
                <div className="relative z-0 w-full lg:mb-0 group">
                  <input
                    type="text"
                    id="mobile_no"
                    name="mobile_no"
                    placeholder=' '
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-400 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum"
                    maxLength={14}
                  />
                  <label
                    htmlFor="mobile_no"
                    className="peer-focus:font-medium appearance-none absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Mobile Number (+63)
                  </label>
                </div>
              </div>
            ) : null}

            {stage === 'enterOTP' ? (
              <div className="grid grid-cols-1 items-center">
                <h1 className='md:text-start text-center text-black text-3xl font-bold md:mt-0 mt-5'>OTP Verification</h1>
                <h1 className='md:text-start text-center text-black text-sm mb-5'>Enter the OTP code sent to your mobile number.</h1>
                <div className="mx-auto mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                    <path className='fill-yellow-500' fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex justify-center space-x-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="w-10 h-10 text-center border border-gray-300 rounded-lg dark:border-slate-400 dark:text-slate-700 bg-transparent"
                    />
                  ))}
                </div>
            </div>
            ) : null}

            {stage === 'enterNewPassword' ? (
              <div className="grid md:grid-cols-1">
                <h1 className='md:text-start text-center text-black text-3xl font-bold md:mt-0 mt-5'>Reset your password</h1>
                <h1 className='md:text-start text-center text-black text-sm mb-3'>Create your new password, it must be:</h1>
                <div className='mb-5'>  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-4 h-4">
                      <path className="stroke-emerald-500" strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                    <h1 className="italic text-xs">Minimum of 8 Characters</h1>
                  </div>

                  <div className="flex items-center">
                    <PasswordRuleIcon />
                    <h1 className="italic text-xs">At Least one uppercase and lowercase letter</h1>
                  </div>

                  <div className="flex items-center">
                    <PasswordRuleIcon />
                    <h1 className="italic text-xs">At least one symbol (ex. !@#$%^&*.,-=)</h1>
                  </div>

                  <div className="flex items-center">
                    <PasswordRuleIcon />
                    <h1 className="italic text-xs">At least one number</h1>
                  </div>
                </div>
                {/* New Password */}
                <div className="relative z-0 w-full lg:mb-0 group">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="new_password"
                    name="new_password"
                    placeholder=" "
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-400 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum"
                  />
                  <label
                    htmlFor="new_password"
                    className="peer-focus:font-medium appearance-none absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    New Password
                  </label>
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-4 cursor-pointer"
                  >
                    {showNewPassword ? (

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  ) : (

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                  )}
                  </button>
                </div>

                {/* Confirm New Password */}
                <div className="relative z-0 w-full lg:mb-0 group mt-4">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirm_password"
                    name="confirm_password"
                    placeholder=" "
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-400 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum"
                  />
                  <label
                    htmlFor="confirm_password"
                    className="peer-focus:font-medium appearance-none absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Confirm New Password
                  </label>
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-4 cursor-pointer"
                  >
                    {showConfirmPassword ? (

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    ) : (

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                    )}
                  </button>
                </div>
              </div>
            ) : null}

            {stage === 'enterMobile' && (
              <div className="text-center">
                <button
                  className="w-full text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 mt-5"
                  type="button" 
                  onClick={handleContinueClick}
                >
                  Continue
                </button>
              </div>
            )}

            {stage === 'enterOTP' && (
              <div className="text-center">
                <button
                  className="w-full text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 mt-5"
                  type="button" 
                  onClick={handleContinueClick}
                >
                  Verify
                </button>
              </div>
            )}

            {stage === 'enterNewPassword' && (
              <div className="text-center">
                <button
                  className="w-full text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 mt-5"
                  type="button" 
                >
                  Submit
                </button>
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
