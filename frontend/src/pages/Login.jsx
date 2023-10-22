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
      const response = await axios.get(`http://localhost:8800/login/${username}/${password}`);
      if (response.status === 200) {
        // Authentication successful, navigate to the dashboard
        const {user_id} = response.data[0];
        navigate(`/dashboard/${user_id}`);
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
    
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white justify-center items-center">
      {/* Left Side*/}
      <div className="lg:w-1/2 lg:ms-20">
        <img src="../src/images/mnl.svg" alt="Centralized Manila Logo" className="lg:h-60 md:h-40 sm:h-28 h-28 mx-auto" />
        <h1 className='text-center font-medium text-slate-600 text-2xl'>Centralized Manila</h1>
        <h1 className='text-center text-slate-600 px-10'>Welcome! Sign up to stay tuned about the updates.</h1>
      </div>

      {/* Right Side*/}
      <div className="lg:w-1/2">
      <div className='p-8 lg:me-40 lg:ms-4 lg:pt-10'>
      <form onSubmit={handleSubmit}>
        <h1 className='text-center mb-10 text-black text-slate-600'>Welcome to <span className='font-medium text-blue-500'>Centralized</span><span className='font-medium text-red-500'> Manila</span></h1>
                <div className="grid md:grid-cols-1 md:gap-6">
                  <div className="relative z-0 w-full group">
                    <input type="text" id="login_mobile" name="login_mobile" placeholder=' ' className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete='off'/>
                    
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
                        <p className="text-red-600 p-2 text-xs rounded-full mt-5">{loginError}</p>
                      )}
                </div>

            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
            </div>

            <div className="mt-4 text-sm text-slate-500 text-center">
              Don't have an account? <a className="text-emerald-500 font-bold hover:text-emerald-700" href="../register">Register Here!</a>
            </div>
        </form>
        </div>
        
      </div>
    </div>
  );
}

export default Login