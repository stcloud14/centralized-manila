import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/login", {
        mobile_no: username,
        user_pass: password,
      });
      if (response.data.message === "Authentication successful") {
        // Authentication successful, navigate to the dashboard
        navigate("/dashboard");
      } else {
        // Authentication failed, show an error message
        setLoginError("Authentication failed");
      }
    } catch (error) {
      // Handle any network or server errors
      console.error(error);
      setLoginError("Authentication failed. Please check your credentials.");
    }
  };
    
  return (
    <div className='bg-white'>
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 items-center">
        <div className="md:w-1/3 max-w-sm lg:me-4 md:me-4 sm:me-1">
            <img
            src="../src/images/mnl.svg"
            className="lg:h-60 md:h-60 sm:h-28 h-28" />
        </div>

        <div className="md:w-1/3 max-w-sm lg:me-4 md:me-4 sm:me-1">
        <form onSubmit={handleSubmit}>
                <h1 className='text-center mb-10 text-black text-slate-600'>Welcome to <span className='font-medium text-blue-500'>Centralized</span><span className='font-medium text-red-500'> Manila</span></h1>
                <div className="grid md:grid-cols-1 md:gap-6">
                  <div className="relative z-0 w-full group">
                    <input type="text" id="login_mobile" name="login_mobile" placeholder=' ' className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="login_mobile" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mobile Number</label>
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <input type="password" id="login_pass" name="login_pass" placeholder=' ' className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="login_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>  
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between font-semibold text-sm">
                    <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                        <input className="mr-2 mt-0.5" type="checkbox" />
                        <span>Remember Me</span>
                    </label>
                    <a className="text-yellow-500 hover:text-blue-700 hover:text-yellow-600" href="#">Forgot Password?</a>
                </div>

                <div className="text-center my-5">
                  <button
                    className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 mt-5 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                    type="submit"
                  >
                    Login
                  </button>
                  {loginError && (
                    <p className="text-red-600">{loginError}</p>
                  )}
                </div>
            </form>
            

            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
            </div>
            <div className="mt-4 text-sm text-slate-500 text-center md:text-left">
                Don't have an account? <a className="text-emerald-500 font-bold hover:text-emerald-700" href="../register">Register Here!</a>
            </div>
        </div>
        </section>
    </div>
    
  );
}
 
export default Login;