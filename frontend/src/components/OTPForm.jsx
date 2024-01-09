import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../partials/ThemeToggle';


import { useLocation } from 'react-router-dom';

const OTPForm =()=>{

  
  const location = useLocation();
  const { pathname } = location;
  const user_id = pathname.split("/")[2];

  const [userAuth, setUserAuth] = useState({
      mobile_no:"",
      user_pass:"",
  });

  const navigate = useNavigate();

  const { mobile_no, user_pass } = userAuth;
  console.log(mobile_no);
  console.log(user_pass);
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8800/login//${user_id}`);
      if (response.status === 200) {
        // Authentication successful, navigate to the dashboard
        const {user_id} = response.data[0];
        navigate(`/home/${user_id}`);
      } else {
        // Authentication failed, show an error message
        setLoginError("Authentication failed");
      }
      console.log(response);
    } catch (error) {
      // Handle any network or server errors
      console.error(error);
      setLoginError("Authentication failed. Please check your credentials.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'mobile_no') {
  
      const rawValue = value.replace('+63 ', '');
  
      const formattedValue = rawValue.replace(/\D/g, '');
  
      setUserAuth((prev) => ({ ...prev, [name]: formattedValue }));
      
    } else {
      setUserAuth((prev) => ({ ...prev, [name]: [value] }));
    }
  };
    
  return (
    <div className="relative lg:h-screen md:h-screen min-h-screen bg-[url('./src/images/manila-hd.png')] dark:bg-[url('./src/images/manila-v2.jpg')] bg-cover bg-no-repeat bg-top">
      <div className="flex flex-col md:flex-row h-full">
        
        {/* Left Section */}
        <div className="md:w-1/2 flex items-center justify-center lg:mb-0 mb-5">
          <div className="text-center lg:pt-0 pt-20">
            <img
              src="./src/images/mnl.svg"
              alt="Centralized Manila Logo" className="lg:h-60 md:h-40 sm:h-28 h-28 mx-auto"
            />
            <span className="text-2xl text-white font-semibold tracking-wide">
              <span className="font-medium">Centralized </span>
              <span className="text-blue-500 text-shadow-[0_0px_4px_var(--tw-shadow-color)] shadow-blue-500/100">M</span>
              <span className="text-red-500 text-shadow-[0_0px_4px_var(--tw-shadow-color)] shadow-red-500/100">a</span>
              <span className="text-yellow-500 text-shadow-[0_0px_4px_var(--tw-shadow-color)] shadow-yellow-500/100">n</span>
              <span className="text-emerald-500 text-shadow-[0_0px_4px_var(--tw-shadow-color)] shadow-emerald-500/100">i</span>
              <span className="text-blue-500 text-shadow-[0_0px_4px_var(--tw-shadow-color)] shadow-blue-500/100">l</span>
              <span className="text-red-500 text-shadow-[0_0px_4px_var(--tw-shadow-color)] shadow-red-500/100">a</span>
            </span>
            
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 flex items-center justify-center lg:mx-auto mx-5">
          <div className="bg-white bg-opacity-95 lg:p-16 p-10 rounded-3xl shadow-lg">
          <h1 className='text-center mb-10 lg:text-lg text-md tracking-[.020em]'>
            <span className='font-medium text-slate-600'>"Maligayang pagdating, </span>
              <span className='font-bold text-blue-500'>Manileño!"</span>
          </h1>
              <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-1 md:gap-6">
                      {/* <div className="relative z-0 w-full lg:mb-0 mb-4 group">
                        <input type="text" id="mobile_no" name="mobile_no" placeholder=' ' className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-400 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum" 
                        value={`+63 ${userAuth.mobile_no}`} maxLength={14} onChange={handleChange}/>           
                        <label htmlFor="mobile_no" className="peer-focus:font-medium appearance-none absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mobile Number (+63)</label>
                      </div> */}

                      {/* <div className="relative z-0 w-full group">
                        <input type="password" id="user_pass" name="user_pass" placeholder=' ' className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-400 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        value={userAuth.user_pass} onChange={handleChange} />
                        <label htmlFor="user_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>  
                      </div> */}
                    <div/>
                  </div>

                  <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full group">
                        <input type="password" id="user_pass" name="user_pass" placeholder=' ' className="block py-2.5 px-0 w-full md:w-[147.5px] text-sm bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-400 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        value={userAuth.user_pass} onChange={handleChange} />
                        <label htmlFor="user_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">OTP</label>  
                      </div>

                      <div className="text-center">
                      <button
                        className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        type="submit"
                      >
                        Verify
                      </button>
                      {loginError && (
                            <p className="text-red-600 p-2 text-xs rounded-full mt-5">{loginError}</p>
                          )}
                    </div>
                    </div>

                    {/* <div className="mt-4 flex justify-between font-semibold text-sm">
                        <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                            <input className="mr-1.5 shrink-0 mt-0.5 border-2 border-gray-300 dark:border-gray-400 rounded bg-transparent text-emerald-600 pointer-events-none focus:ring-emerald-500" type="checkbox" />
                            <span>Remember Me</span>
                        </label>
                        <a className="text-yellow-500 hover:text-blue-700 hover:text-yellow-600" href="#">Forgot Password?</a>
                    </div> */}
{/* 
                    <div className="text-center my-5">
                      <button
                        className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 mt-5 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        type="submit"
                      >
                        Login
                      </button>
                      {loginError && (
                            <p className="text-red-600 p-2 text-xs rounded-full mt-5">{loginError}</p>
                          )}
                    </div> */}
{/* 
                <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
                </div> */}

                {/* <div className="mt-4 text-sm text-slate-500 text-center">
                  Don't have an account? <a className="text-emerald-500 font-bold hover:text-emerald-700" href="../register">Register Here!</a>
                </div> */}
            </form>
            <div className="absolute top-4 right-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="md:absolute relative bottom-0 w-full text-center text-sm text-gray-500 py-3 drop-shadow-xl">
          Copyright &copy; {new Date().getFullYear()} |
          <a href="/indexadmin" className='hover:text-white'>
              <span className="hover:font-medium hover:text-blue-500"> B</span>
              <span className="hover:font-medium hover:text-blue-500">S</span>
              <span className="hover:font-medium hover:text-yellow-500">I</span>
              <span className="hover:font-medium hover:text-purple-500">T</span>
              <span className="hover:font-medium hover:text-emerald-500"> 4</span>
              <span className="hover:font-medium hover:text-red-500">B</span>
          </a>
        </div>
      
      </div>
    </div>
  );
}

export default OTPForm;
