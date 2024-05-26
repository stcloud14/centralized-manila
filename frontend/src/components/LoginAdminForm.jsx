import React, { useState, useEffect  } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginAdminForm = () => {
  const [adminCredentials, setAdminCredentials] = useState({
    admin_name: "",
    admin_pass: "",
  });
  const [authenticated, setAuthenticated] = useState(false);

  const [loginError, setLoginError] = useState(null);
  const [userAuth, setUserAuth] = useState({ admin_type: null }); // Add this line
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };
  const Base_Url = process.env.Base_Url;

  useEffect(() => {
    const token = localStorage.getItem('Admin_token');
    if (token) {
      authenticateWithToken(token);
    }
  }, []);
  
  const authenticateWithToken = async (token) => {
    try {
      const response = await axios.get(`${Base_Url}admintoken/protected-route/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response)
  
      if (response.status === 200) {
        const adminType = response.data.admin_type;
        const adminName = response.data.admin_uname;
  
        // Assuming setAuthenticated is a function to set authentication state
        setAuthenticated(true);
  
        // Navigate based on admin type
        switch (adminType) {
          case 'chief_admin':
            navigate(`/admin_dash_chief/${adminType}/${adminName}`);
            break;
          case 'rptax_admin':
            navigate(`/admin_dash_rp/${adminType}/${adminName}`);
            break;
          case 'business_admin':
            navigate(`/admin_dash_bp/${adminType}/${adminName}`);
            break;
          case 'cedula_admin':
              navigate(`/admin_dash_ctc/${adminType}/${adminName}`);
              break;
          case 'lcr_admin':
              navigate(`/admin_dash_lcr/${adminType}/${adminName}`);
              break;
          case 'registry_admin':
              navigate(`/admin_dash_ur/${adminType}/${adminName}`);
              break;
          default:
            // Handle unknown admin types or show error message
            break;
        }
      }
    } catch (error) {
      // Handle authentication failure here
      console.error('Authentication failed:', error);
      // Assuming setAuthenticated is a function to set authentication state
      setAuthenticated(false);
      localStorage.removeItem('Admin_token');
      // Redirect or show error message as needed
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${Base_Url}login/admin`, adminCredentials);
  
      if (response.data && response.data.message === 'Login successful') {
        const admin = response.data.admin;
        const { admin_type, admin_uname } = admin;
  
        setUserAuth((prev) => ({ ...prev, admin_type }));
  
        // Log the admin_type for debugging
        console.log("Admin Type:", admin_type);
        console.log("Admin Name:", admin_uname);
  
        switch (admin.role) {
          case 'chief_admin':
            try {
              const tokenResponse = await axios.post(`${Base_Url}admintoken/generate-token-admin`, { admin_type, admin_uname });
              const { token } = tokenResponse.data;
              localStorage.setItem('Admin_token', token);
              navigate(`/admin_dash_chief/${admin_type}/${admin_uname}`);
            } catch (error) {
              console.error('Token Generation Error:', error);
              setLoginError("Token generation failed for chief admin.");
            }
            break;
          case 'rptax_admin':
            try {
              const tokenResponse = await axios.post(`${Base_Url}admintoken/generate-token-admin`, { admin_type, admin_uname });
              const { token } = tokenResponse.data;
              localStorage.setItem('Admin_token', token);
              navigate(`/admin_dash_rp/${admin_type}/${admin_uname}`);
            } catch (error) {
              console.error('Token Generation Error:', error);
              setLoginError("Token generation failed for rptax admin.");
            }
            break;
          case 'business_admin':
            try {
              const tokenResponse = await axios.post(`${Base_Url}admintoken/generate-token-admin`, { admin_type, admin_uname });
              const { token } = tokenResponse.data;
              localStorage.setItem('Admin_token', token);
              navigate(`/admin_dash_bp/${admin_type}/${admin_uname}`);
            } catch (error) {
              console.error('Token Generation Error:', error);
              setLoginError("Token generation failed for rptax admin.");
            }
            break;
          case 'cedula_admin':
            try {
              const tokenResponse = await axios.post(`${Base_Url}admintoken/generate-token-admin`, { admin_type, admin_uname });
              const { token } = tokenResponse.data;
              localStorage.setItem('Admin_token', token);
              navigate(`/admin_dash_ctc/${admin_type}/${admin_uname}`);
            } catch (error) {
              console.error('Token Generation Error:', error);
              setLoginError("Token generation failed for rptax admin.");
            }
            break;
          case 'lcr_admin':
            try {
              const tokenResponse = await axios.post(`${Base_Url}admintoken/generate-token-admin`, { admin_type, admin_uname });
              const { token } = tokenResponse.data;
              localStorage.setItem('Admin_token', token);
              navigate(`/admin_dash_lcr/${admin_type}/${admin_uname}`);
            } catch (error) {
              console.error('Token Generation Error:', error);
              setLoginError("Token generation failed for rptax admin.");
            }
            break;
          case 'registry_admin':
            try {
              const tokenResponse = await axios.post(`${Base_Url}admintoken/generate-token-admin`, { admin_type, admin_uname });
              const { token } = tokenResponse.data;
              localStorage.setItem('Admin_token', token);
              navigate(`/admin_dash_ur/${admin_type}/${admin_uname}`);
            } catch (error) {
              console.error('Token Generation Error:', error);
              setLoginError("Token generation failed for rptax admin.");
            }
            break;
          default:
            setLoginError("Unknown or unsupported role");
        }
      } else {
        setLoginError(
          response.data && response.data.message
            ? response.data.message
            : "Authentication failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error('Login Error:', error);
      setLoginError("Authentication failed. Please check your credentials.");
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
        <img src="https://i.ibb.co/12J7JDk/mnl.png" alt="Centralized Manila Logo" className="lg:h-60 md:h-40 sm:h-28 h-28 mx-auto" />
        <h1 className='text-center font-medium text-slate-700 text-2xl'>Centralized Manila</h1>
        <h1 className='text-center font-medium text-red-500 text-xl px-10'>A
          <span className='text-blue-500'>d</span>
          <span className='text-emerald-500'>m</span>
          <span className='text-yellow-500'>i</span>
          <span className='text-blue-500'>n</span>
        </h1>
      </div>

      {/* Right Side */}
      <div className="lg:w-1/2">
        <div className='p-8 lg:me-40 lg:ms-4 lg:pt-10'>
          <form onSubmit={handleLogin}>
            <h1 className='text-center mb-10 text-slate-700'>Welcome to <span className='font-medium text-blue-500'>Centralized</span><span className='font-medium text-red-500'> Manila</span></h1>
            <div className="grid md:grid-cols-1 md:gap-6">
              <div className="relative z-0 w-full lg:mb-0 mb-4 group">
                <input
                  type="text"
                  value={adminCredentials.admin_name}
                  onChange={handleInputChange}
                  id="admin_name"
                  name="admin_name"
                  placeholder=' '
                  className="block py-2.5 px-0 w-full lg:text-sm text-xs bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  autoComplete='off'
                />
                <label htmlFor="admin_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Admin ID</label>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="password"
                  value={adminCredentials.admin_pass}
                  onChange={handleInputChange}
                  id="admin_pass"
                  name="admin_pass"
                  placeholder=' '
                  className="block py-2.5 px-0 w-full lg:text-sm text-xs bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label htmlFor="admin_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
              </div>
            </div>

            {/* Display error message if loginError is not null */}
            {loginError && (
              <div className="text-red-500 text-center mb-4">
                {loginError}
              </div>
            )}

            {/* <div className="mt-4 flex justify-between font-semibold text-sm">
              <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                <input className="mr-2 mt-0.5" type="checkbox" />
                <span className='lg:text-sm text-xs'>Remember Me</span>
              </label>
              <a className="text-yellow-500 hover:text-blue-700 hover:text-yellow-600 lg:text-sm text-xs" href="#">Forgot Password?</a>
            </div> */}

            <div className="text-center my-5">
              <button
                className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 mt-5 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginAdminForm