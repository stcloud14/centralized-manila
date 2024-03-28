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

  const [verifiedStatus, setIsVerifiedStatus] = useState();

  const [defaultImg, setDefaultImg] = useState(defaultImage);

  const [storedImage, setStoredImage] = useState(null);
  const [userImage, setUserImage] = useState(null);

  console.log(userImage)
  console.log(storedImage)


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


    useEffect(() => {
      const fetchUserImage = async () => {
        try {
          const res = await axios.get(`http://localhost:8800/usersettings/${user_id}`);
          const fetchedUserImage = res.data[0].user_image;
          const fetchedImageURL = res.data[0].image_url;
          const verificationStatus = res.data[0].verification_status;
    
          if (fetchedImageURL !== null && fetchedImageURL !== undefined && fetchedImageURL !== '') {
            fetch(fetchedImageURL)
              .then(response => response.blob())
              .then(blob => {
                setUserImage(URL.createObjectURL(blob));
              })
              .catch(error => {
                console.error('Error fetching image:', error);

              });
          } else 
          if (fetchedUserImage !== null && fetchedUserImage !== undefined && fetchedUserImage !== '') {
            setStoredImage(fetchedUserImage);
          }
    
          setIsVerifiedStatus(verificationStatus);
        } catch (err) {
          console.log(err);
        }
      };
    
      fetchUserImage();
    }, []);
    
  
  
    const checkUserImage = async () => {
      try {
        const imagePath = '../uploads/profileImage/';
        const imageName = storedImage;
    
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
        
        <div className="relative" style={{ transform: 'translateX(0px)' }}>
          <img
            name="userImage" 
            className="inline-block h-10 w-10 rounded-full object-cover object-center"
            src={userImage ? userImage : defaultImg}
          />

          {/* Verified Check Mark */} 
          {verifiedStatus === 'Verified' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[30px] pb-3 text-blue-400 absolute bottom-[0rem] right-[0.41rem] z-10 transform translate-x-1/2 translate-y-1/2" viewBox="0 0 841.89 595.28">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -6 23 38" fill="white">
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
            <g fill="currentColor">
              <path d="M351.54,516.77l-39.52-67.9l-78.54-16.17l8.83-76.77l-49.93-58.5l49.93-57.98l-8.83-76.75l78.54-16.21
                l39.52-68.39l69.71,32.39l69.71-32.39l40.05,68.41l78.01,16.19l-8.8311,76.77l49.93,57.96l-49.93,58.5l8.83,76.77l-78.01,16.17
                l-40.05,67.9l-69.71-32.39L351.54,516.77z M398.88,366.9l118.08-117.51l-23.4-21.42l-94.68,94.01l-49.4-51.69l-23.94,23.48
                C325.55,293.77,398.88,366.9,398.88,366.9z"/>
            </g>
          </svg>
          ) : null} 
        </div>


        <div className="flex items-center truncate">
          {/* <span className="truncate ml-2 mr-1 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">{userPersonal.f_name}</span> */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 shrink-0 ml-1.5 text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
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
            {/* <div className="flex font-medium text-slate-800 dark:text-slate-100">{userPersonal.f_name} {userPersonal.l_name} 
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 pb-3 text-blue-400" viewBox="0 0 841.89 595.28">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -6 23 38" fill="white">
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                      <g fill="currentColor">
                        <path d="M351.54,516.77l-39.52-67.9l-78.54-16.17l8.83-76.77l-49.93-58.5l49.93-57.98l-8.83-76.75l78.54-16.21
                          l39.52-68.39l69.71,32.39l69.71-32.39l40.05,68.41l78.01,16.19l-8.8311,76.77l49.93,57.96l-49.93,58.5l8.83,76.77l-78.01,16.17
                          l-40.05,67.9l-69.71-32.39L351.54,516.77z M398.88,366.9l118.08-117.51l-23.4-21.42l-94.68,94.01l-49.4-51.69l-23.94,23.48
                          C325.55,293.77,398.88,366.9,398.88,366.9z"/>
                      </g>
                    </svg>
            </div> */}

            <div className="flex sm:flex-row items-start justify-between mb-[-0.90rem] font-medium text-slate-800 dark:text-slate-100">
                  <span className="font-medium whitespace-nowrap">{userPersonal.f_name} {userPersonal.l_name}</span>
                  <span className="whitespace-nowrap">
                    {verifiedStatus === 'Verified' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 pb-3 text-blue-400" viewBox="0 0 841.89 595.28">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -6 23 38" fill="white">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                      </svg>
                      <g fill="currentColor">
                        <path d="M351.54,516.77l-39.52-67.9l-78.54-16.17l8.83-76.77l-49.93-58.5l49.93-57.98l-8.83-76.75l78.54-16.21
                          l39.52-68.39l69.71,32.39l69.71-32.39l40.05,68.41l78.01,16.19l-8.8311,76.77l49.93,57.96l-49.93,58.5l8.83,76.77l-78.01,16.17
                          l-40.05,67.9l-69.71-32.39L351.54,516.77z M398.88,366.9l118.08-117.51l-23.4-21.42l-94.68,94.01l-49.4-51.69l-23.94,23.48
                          C325.55,293.77,398.88,366.9,398.88,366.9z"/>
                      </g>
                      </svg>
                    ) : null}
                  </span>
              </div>
                  {verifiedStatus === 'Verified' ? (
                    <div className="text-xs text-slate-500 dark:text-slate-400 italic">User</div>
                    ) : 
                    <div className="text-xs text-slate-500 dark:text-slate-400 italic mt-2.5">User</div>
                   }
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
                onClick={() => {
                  window.location.reload= (`/`);
                  setDropdownOpen(false);
                }}
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