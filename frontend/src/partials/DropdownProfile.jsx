import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../utils/Transition';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import defaultImage from '../images/default_img.png';

const DropdownProfile = ({ align }) => {
  
  const location = useLocation();
  const { pathname } = location;
  const user_id = pathname.split("/")[2];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  const [userPersonal, setUserPersonal]=useState({})

  const [defaultImg, setDefaultImg] = useState(defaultImage);

  const [storedImage, setStoredImage] = useState('');
  const [userImage, setUserImage] = useState('');

    useEffect(()=>{
        const fetchUserPersonal= async()=>{
            try{
                const res= await axios.get(`http://localhost:8800/profile/${user_id}`)
                setUserPersonal((prevData) => {
                  if (prevData.f_name !== res.data.user_personal[0].f_name) {
                    return res.data.user_personal[0];
                  }
                  return prevData;
                });

            }catch(err){
                console.log(err)
            }
        }
        fetchUserPersonal()
    },[userPersonal])


    useEffect(()=>{
      const fetchUserImage= async()=>{
          try{
              const res= await axios.get(`http://localhost:8800/usersettings/${user_id}`)
              setStoredImage(res.data[0])
  
          }catch(err){
              console.log(err)
          }
      }
      fetchUserImage()
    },[])
  
  
    const checkUserImage = async () => {
      try {
        const imagePath = '../uploads/profileImage/';
        const imageName = storedImage.user_image;
    
        if (imageName === undefined || imageName === null) {
          // console.log('User image name is undefined or null.');
          return;
        }
    
        const isFileExists = await checkFileExists(imagePath, imageName);
    
        if (isFileExists !== null && isFileExists !== undefined) {
          if (isFileExists) {
            const fileData = await fetchFileData(`${imagePath}${imageName}`);
            if (fileData) {
              setUserImage(fileData);
              // console.log(`File ${imageName} exists.`);
            } else {
              // console.log(`File data for ${imageName} is empty or undefined.`);
            }
          } else {
            // console.log(`File: ${imageName} does not exist.`);
          }
        }
      } catch (error) {
        console.error('Error checking user image path:', error);
      }
    };
  
    useEffect(() => {
      checkUserImage();
    }, [storedImage]);
  
    const checkFileExists = async (folderPath, fileName) => {
      try {
        const filePath = `${folderPath}/${fileName}`;
        const response = await fetch(filePath);
  
        return response.ok;
      } catch (error) {
        console.error('Error checking file existence:', error);
        return false;
      }
    };
  
    const fetchFileData = async (filePath) => {
      try {
        const response = await fetch(filePath);
    
        if (!response.ok) {
          if (response.status === 404) {
            console.log('File not found.');
          } else {
            throw new Error(`Failed to fetch file from ${filePath}`);
          }
          return null;
        }
    
        const fileData = await response.blob();
    
        if (!fileData || fileData.size === 0) {
          console.log('File data is empty or undefined.');
          return null;
        }
    
        const dataUrl = URL.createObjectURL(fileData);
    
        return dataUrl;
      } catch (error) {
        console.error('Error fetching file data:', error);
        return null;
      }
    };


  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        
        <img
          name='userImage' 
          className="inline-block h-10 w-10 rounded-full object-cover object-center"
          src={userImage ? userImage : defaultImg}
          onError={(e) => console.error('Error loading image:', e)}
        />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 mr-1 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">{userPersonal.f_name}</span>
          <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#3d3d3d] py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-[#3d3d3d]">
            <div className="flex font-medium text-slate-800 dark:text-slate-100">{userPersonal.f_name} {userPersonal.l_name} 
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 pb-3 text-blue-500" viewBox="0 0 841.89 595.28">
  <path fill="currentColor" d="M351.54,516.77l-39.52-67.9l-78.54-16.17l8.83-76.77l-49.93-58.5l49.93-57.98l-8.83-76.75l78.54-16.21
    l39.52-68.39l69.71,32.39l69.71-32.39l40.05,68.41l78.01,16.19l-8.8311,76.77l49.93,57.96l-49.93,58.5l8.83,76.77l-78.01,16.17
    l-40.05,67.9l-69.71-32.39L351.54,516.77z M398.88,366.9l118.08-117.51l-23.4-21.42l-94.68,94.01l-49.4-51.69l-23.94,23.48
    C325.55,293.77,398.88,366.9,398.88,366.9z"/>
</svg>

            
            
            
            
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 italic">User</div>
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-slate-400 hover:text-blue-500 dark:hover:text-blue-600 flex items-center py-1 px-3"
                to={`/usersettings/${user_id}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-slate-400 hover:text-blue-500 dark:hover:text-blue-600 flex items-center py-1 px-3"
                to="/"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default DropdownProfile;