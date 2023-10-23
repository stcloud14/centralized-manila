import React from 'react';
import { NavLink } from 'react-router-dom';

function LoginAdmin() {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[url('./src/images/manila-hd.png')] bg-cover justify-center items-center">
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-medium text-white text-2xl">
            Welcome to <span className='font-medium text-blue-500'>Centralized</span>
            <span className='font-medium text-red-500'> Manila</span>
          </h2>
        </div>
      </div>

      <div className="lg:w-1/3 min-w-max mx-10 px-10 py-10 my-10 rounded-lg shadow-xl transform hover:-translate-y-2 transition-transform duration-500 ease-in-out bg-white opacity-50 hover:opacity-100 mx-auto">
        <NavLink end to="./indexuser">
          <img src="../src/images/mnl.svg" alt="Centralized Manila Logo" className="h-32 mx-auto" />
          <h1 className='text-center font-medium text-slate-600 text-2xl'>User</h1>
        </NavLink>
        <p className="text-center font-medium text-slate-600 text-2xl">Left Side</p>
      </div>

      <div className="lg:w-1/3 min-w-max mx-10 px-10 py-10 my-10 rounded-lg shadow-xl transform hover:-translate-y-2 transition-transform duration-500 ease-in-out bg-white opacity-50 hover:opacity-100 mx-auto">
        <NavLink end to="./indexadmin">
          <img src="../src/images/mnl.svg" alt="Centralized Manila Logo" className="h-32 mx-auto" />
          <h1 className='text-center font-medium text-slate-600 text-2xl'>Admin</h1>
        </NavLink>
        <p className="text-center font-medium text-slate-600 text-2xl">Right Side</p>
      </div>
    </div>
  );
}

export default LoginAdmin;
