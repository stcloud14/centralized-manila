import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image01 from '../../images/resources/welcome_01.png';
AOS.init();

function WelcomeBanner() {

  const { user_id } = useParams();

  const [userName, setUserName]=useState();

  console.log(userName)

  useEffect(()=>{
    const fetchUserName= async()=>{
        try{
            const res= await axios.get(`http://localhost:8800/profile/username/${user_id}`)
            setUserName(res.data)            

        }catch(err){
            console.log(err)
        }
    }
    fetchUserName()
},[])

const toNameCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

  return (
    <div className="relative bg-white dark:bg-[#181818] p-6 mb-6 rounded-sm shadow-md flex items-center justify-between" data-aos="zoom-in" data-aos-duration="1500">
      <div className='md:ml-16'>
        <h1 className="text-xl lg:text-3xl md:text-3xl text-slate-800 dark:text-slate-100 font-medium mb-1">
          Welcome to Centralized
          <span className='text-blue-600'> M</span>
          <span className='text-red-500'>a</span>
          <span className='text-yellow-500'>n</span>
          <span className='text-green-500'>i</span>
          <span className='text-blue-600'>l</span>
          <span className='text-red-500'>a</span>
          {userName && <span className='pl-1'>, {toNameCase(userName[0]?.f_name)}!</span>}
        </h1>
        <p className="lg:text-sm dark:text-slate-400 font-thin text-xs">Your portal to an amazing new world filled with efficient digital services.</p>
      </div>
      <img src={Image01} alt="Banner Image" className='md:w-60 md:h-60 w-44 h-44 object-contain md:pl-0 pl-10 pr-2 md:mr-16'/>
    </div>
  );
}

export default WelcomeBanner;
