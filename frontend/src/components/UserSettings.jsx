import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import defaultImage from '../images/default_img.png';
import ApplyVerificationModal from '../partials/business/ApplyVerificationModal';
import PasswordRuleIcon from '../partials/register/PasswordRuleIcon';
import Loading from '../partials/Loading';



const UserSettings =()=>{

  const Base_Url = process.env.Base_Url;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user_id } = useParams();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSuccessUpload, setIsSuccessUpload] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  const contentRef = useRef(null);
  const contentRef1 = useRef(null);

  const [verifiedStatus, setVerifiedStatus] = useState();
  const [isVerifiedStatus, setIsVerifiedStatus] = useState();
  const [isRequestVerified, setisRequestVerified] = useState();


  const [defaultImg, setDefaultImg] = useState(defaultImage);

  const [storedImage, setStoredImage] = useState('');

  const [userImage, setUserImage] = useState('');

  const [selectedFile, setSelectedFile] = useState();
  const [preSelectedFile, setPreSelectedFile] = useState();

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const [continueButtonDisabled, setContinueButtonDisabled] = useState(true); // Initialize with true assuming initially "Select Cause" is selected


  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    const checkToken = async (token) => {
        try {
            // Make a request to backend API to verify token and check user access
            const response = await axios.get(`${Base_Url}token/protect-token/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (error) {
          // window.location.reload();
          navigate(`/`);
        }
    };
  
    checkToken(token); // Pass the token to the checkToken function
}, [navigate, user_id]);


useEffect(() => {
  // Fetch verification status from the database using the user_id
  const fetchVerificationStatus = async () => {
    try {
      const response = await axios.get(`${Base_Url}usersettings/check_verification_status/${user_id}`);
      
      // Check if response is successful (status code 2xx)
      if (response.status = 200) {
        // Check if verification status exists and handle accordingly
        if (response.data && response.data.verification === 'Verified') {
          setIsVerifiedStatus(true);
        } else {
          setIsVerifiedStatus(false);
        }
      } else {
        // Handle non-successful response
        console.error('Error fetching verification status. Status:', response.status);
      }
      
      // Log the entire response for debugging
      console.log("response", response);
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error fetching verification status:', error);
    }
  };

  fetchVerificationStatus();
}, [user_id]);

useEffect(() => {
  // Fetch verification status from the database using the user_id
  const fetchApplicationStatus = async () => {
    try {
      const response = await axios.get(`${Base_Url}usersettings/check_application_status/${user_id}`);
      
      // Check if response is successful (status code 2xx)
      if (response.status = 200) {
        // Check if verification status exists and handle accordingly
        if (response.data && response.data.application === 'Applying') {
          setisRequestVerified(true);
        } else {
          setisRequestVerified(false);
        }
      } else {
        // Handle non-successful response
        console.error('Error fetching verification status. Status:', response.status);
      }
      
      // Log the entire response for debugging
      console.log("Apply:", response);
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error fetching verification status:', error);
    }
  };

  fetchApplicationStatus();
}, [user_id]);


  const handleDelete = async (e) => {
    e.preventDefault();
    try {
        const confirmDelete = window.confirm('Are you sure you want to delete your account?');
        if (confirmDelete) {
            await axios.delete(`${Base_Url}usersettings/accdelete/${user_id}`);
            // Set the new URL using window.location.href
            localStorage.removeItem('token');
            navigate('/')
          }
        console.log(confirmDelete);
    } catch (error) {
        console.error('Error deleting account:', error.message);
    }
  };

  const handleButtonClick = () => {
    setIsInputVisible(true);
    setIsButtonVisible(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
  
    if (!file) {
      setSelectedFile(null);
      window.alert('Please select a file.');
      return;
    }
  
    // Check if the file size exceeds 3MB
    if (file.size > 3 * 1024 * 1024) {
      setSelectedFile(null);
      window.alert('File size exceeds the 3MB limit. Please select a smaller file.');
      return;
    }
  
    const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedFormats.includes(file.type)) {
      setSelectedFile(null);
      window.alert('Please select a valid image file (JPEG or PNG).');
      return;
    }
  
    // setUserImage(null);
    setSelectedFile(file);
  
    const reader = new FileReader();
    reader.onload = () => {
      setPreSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);
  };
  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyModal = () => {
      setIsModalOpen(true);
    }
  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };


  useEffect(()=>{
    const fetchUserImage= async()=>{
      try {
        const res = await axios.get(`${Base_Url}usersettings/${user_id}`);
        const fetchedUserImage = res.data[0].user_image;
        const fetchedImageURL = res.data[0].image_url;
        const verificationStatus = res.data[0].verification_status;

        console.log(fetchedImageURL)
  
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
  
        setVerifiedStatus(verificationStatus);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserImage()
  },[])



  const location = useLocation();
  const [highlightButton, setHighlightButton] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has('unverified') && contentRef1.current) {
      setTimeout(() => {
        contentRef1.current.scrollIntoView({ behavior: 'smooth' });
      }, 0);
      setTimeout(() => {
        setHighlightButton(true);
      }, 1000);
      setTimeout(() => {
        setHighlightButton(false);
      }, 1400);
    }
  }, [location.search]);



  // const checkUserImage = async () => {
  //   try {
  //     const imagePath = '../uploads/profileImage/';
  //     const imageName = storedImage;
  
  //     if (imageName === undefined || imageName === null) {
  //       console.log('User image name is undefined or null.');
  //       return;
  //     }
  
  //     const isFileExists = await checkFileExists(imagePath, imageName);
  
  //     if (isFileExists !== null && isFileExists !== undefined) {
  //       if (isFileExists) {
  //         const fileData = await fetchFileData(`${imagePath}${imageName}`);
  //         if (fileData) {
  //           setUserImage(fileData);
  //           console.log(`File ${imageName} exists.`);
  //         } else {
  //           console.log(`File data for ${imageName} is empty or undefined.`);
  //         }
  //       } else {
  //         console.log(`File: ${imageName} does not exist.`);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error checking user image path:', error);
  //   }
  // };

  // useEffect(() => {
  //   checkUserImage();
  // }, [storedImage]);

  // const checkFileExists = async (folderPath, fileName) => {
  //   try {
  //     // Trim any trailing slashes from folderPath
  //     const trimmedFolderPath = folderPath.replace(/\/+$/, '');
  //     // Remove any leading slashes from fileName
  //     const trimmedFileName = fileName.replace(/^\/+/, '');
  //     const filePath = `${trimmedFolderPath}/${trimmedFileName}`;
  //     const response = await axios.head(filePath);
  
  //     return response.status === 200;
  //   } catch (error) {
  //     console.error('Error checking file existence:', error);
  //     return false;
  //   }
  // };
  
  // const fetchFileData = async (filePath) => {
  //   try {
  //     const response = await fetch(filePath);
  
  //     if (!response.ok) {
  //       if (response.status === 404) {
  //         console.log('File not found.');
  //       } else {
  //         throw new Error(`Failed to fetch file from ${filePath}`);
  //       }
  //       return null;
  //     }
  
  //     const fileData = await response.blob();
  
  //     if (!fileData || fileData.size === 0) {
  //       console.log('File data is empty or undefined.');
  //       return null;
  //     }
  
  //     const dataUrl = URL.createObjectURL(fileData);
  
  //     return dataUrl;
  //   } catch (error) {
  //     console.error('Error fetching file data:', error);
  //     return null;
  //   }
  // };


  // const handleUploadImage = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const formData = new FormData();
  //     formData.append('user_img', selectedFile);

  //     const response = await axios.post(`${Base_Url}usersettings/uploadimage/${user_id}`, formData);

  //     if (response.status === 200) {
  //       window.location.reload();
  //         setIsSuccess(true);
  //         setSelectedFile(null);
  //         setIsButtonVisible(true);
  //         setIsInputVisible(false);
  //         contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  //         console.log('Upload successful');

  //         setTimeout(() => {
  //             setIsSuccess(false);
  //         }, 3000);
  //     } else {
  //         console.error('Transaction error:', response.statusText);
  //     }
        
  //   } catch (error) {
  //       console.error('Error Uploading Image:', error.message);
  //   }
  // };


  const checkUserImage = async () => {
    try {
      const imagePath = '/uploads/profileImage/'; // Adjusted the imagePath
      const imageName = storedImage;
  
      if (!imageName) {
        console.log('User image name is undefined or null.');
        return;
      }
  
      const isFileExists = await checkFileExists(imagePath, imageName);
  
      if (isFileExists) {
        const fileData = await fetchFileData(`${imagePath}${imageName}`);
        if (fileData) {
          setUserImage(fileData);
          console.log(`File ${imageName} exists.`);
        } else {
          console.log(`File data for ${imageName} is empty or undefined.`);
        }
      } else {
        console.log(`File: ${imageName} does not exist.`);
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
      const response = await axios.head(`${folderPath}${fileName}`); // Simplified path concatenation
  
      return response.status === 200;
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
  
  const handleUploadImage = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('user_img', selectedFile);
  
      const response = await axios.post(`${Base_Url}usersettings/uploadimage/${user_id}`, formData);
  
      if (response.status === 200) {
        window.location.reload();
        setIsSuccess(true);
        setSelectedFile(null);
        setIsButtonVisible(true);
        setIsInputVisible(false);
        contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('Upload successful');
  
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        console.error('Transaction error:', response.statusText);
      }
  
    } catch (error) {
      console.error('Error Uploading Image:', error.message);
    }
  };
  

  const handleRemoveImage = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.delete(`${Base_Url}usersettings/removeimage/${user_id}`);

      if (response.status === 200) {
          const fileInput = document.getElementById('user_img');
          if (fileInput) {
            fileInput.value = '';
          }
          window.location.reload();
          setSelectedFile(null);
          setPreSelectedFile(null);
          setStoredImage(null);

          setIsRemove(true);
          setIsButtonVisible(true);
          setIsInputVisible(false);
          contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          console.log('Remove successful');

          setTimeout(() => {
              setIsRemove(false);
          }, 3000);
      } else {
          console.error('Transaction error:', response.statusText);
      }
        
    } catch (error) {
        console.error('Error Removing Image:', error.message);
    }

  }
  

  const [isloading, setIsLoading] = useState(false)

  const [isSuccess1, setIsSuccess1] = useState(false); 

  const [passwordError, setPasswordError] = useState('');
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    symbol: false,
    number: false,
  });

  const [current_password, setCurrentPassword] = useState("");
  const [new_user_pass, setNewUserPass] = useState("");
  const [confirm_user_pass, setConfirmUserPass] = useState("");
  

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    switch(name) {
      case 'current_password':
        setCurrentPassword(value);
        break;
      case 'new_user_pass':
        setNewUserPass(value);
        break;
      case 'confirm_user_pass':
        setConfirmUserPass(value);
        break;
      default:
        break;
    }
  };

  
  useEffect(() => {
    setPasswordCriteria({
      length: /^.{8,}$/.test(new_user_pass), 
      uppercase: /[A-Z]/.test(new_user_pass), 
      lowercase: /[a-z]/.test(new_user_pass), 
      symbol: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(new_user_pass), 
      number: /\d/.test(new_user_pass), 
    });
  }, [new_user_pass]);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#\$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
    console.log("current_password", current_password)
  
    if (current_password && new_user_pass && passwordRule.test(new_user_pass)) {
      try {
        // Verify current password
        const verifyResponse = await axios.post(`${Base_Url}forgotpass/verify_pass/${user_id}`, {
          current_password: current_password,
        });
        console.log("verifyResponse", verifyResponse)
        
  
        if (verifyResponse.status === 200 && verifyResponse.data.isValid) {
          // Current password is correct
          if (new_user_pass !== confirm_user_pass) {
            setPasswordError("The new password and the confirmed password do not match.");
            setTimeout(() => {
              setPasswordError('');
            }, 4000);
          } else {
            try {
              const response = await axios.put(`${Base_Url}forgotpass/reset_password/${user_id}`, {
                new_user_pass: new_user_pass,
              });
              if (response.status === 200) {
                try {
                  const res = await axios.get(`${Base_Url}email/regis/${user_id}`);
                  
                  const date = new Date();
                  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    
                  if (res.data.user_email) {
                    const updatedUserEmail = res.data.user_email;
                    const f_name = res.data.f_name;
                    const l_name = res.data.l_name;
    
        
                    console.log('FETCHED USER EMAIL:', updatedUserEmail);
        
                    const user_email = updatedUserEmail;
        
                    const trans_type = 'Reset Password';
        
                    const rowData = { trans_type, formattedDate};
    
                    // const status_type = 'P E N D I N G';
        
                    const body = {
                      data: rowData,
                      formattedDate: formattedDate,
                      // status_type: status_type,
                      // f_name: f_name,
                      l_name: l_name
                    };
      
                      const emailResponse = await axios.post(`${Base_Url}email/reset-email/${user_email}`, body);
          
                      if (emailResponse.data && emailResponse.data.message) {
                        console.log('SENT EMAIL');
                        // alert(emailResponse.data.message);
                      } else {
                        console.log("Failed to send email.");
                      }
                  } else {
                    console.error('Transaction error:', res.statusText);
                  }
                } catch (fetchError) {
                  console.log('NOT FETCHING EMAIL');
                  console.error(fetchError);
                }

                setIsLoading(true);

                setTimeout(() => {
                  setIsLoading(false);
                  setIsSuccess1(true);
                    setTimeout(() => {
                      setIsSuccess1(false);
                      setIsLoading(true);
                        setTimeout(() => {
                          window.location.reload();
                        }, 1000);
                    },2000);
                }, 3000);

                console.log('Password reset successful!');
              }
            } catch (error) {
              console.error(error);
              // Handle error during password change
            }
          }
        } else {
          // Current password is incorrect
          setPasswordError('The current password is incorrect.');
          setTimeout(() => {
            setPasswordError('');
          }, 4000);
        }
      } catch (error) {
        console.error(error);
        // Handle error in password verification
        setPasswordError('The current password is incorrect.');
        setTimeout(() => {
          setPasswordError('');
        }, 4000);
      }
    } else {
      // Password doesn't meet the rule or current password is missing
      setPasswordError(
        'Password must be at least 8 characters long, including at least one uppercase letter, one lowercase letter, one symbol, and one number.'
      );
      setTimeout(() => {
        setPasswordError('');
      }, 5500);
    }
  };



  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (passwordType) => {
    if (passwordType === 'new') {
      setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
    } else if (passwordType === 'confirm') {
      setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    } else if (passwordType === 'current') {
      setShowCurrentPassword((prevShowCurrentPassword) => !prevShowCurrentPassword);
    }
  };

  const isEdge = window.navigator.userAgent.includes('Edg');

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/*  Content Area */}
        <main ref={contentRef} className="overflow-y-auto">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
                <form className="max-w-md mx-auto">
                  
                  
                  {isSuccess && (
                    <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                      Upload Successful!
                    </div>
                  )}  

                  {isRemove && (
                    <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                      Remove Successful!
                    </div>
                  )}  

                  {/* {isSuccess && (
                  <div className="text-emerald-500 bg-emerald-100 md:text-sm text-xs text-center rounded-full py-1.5 mb-5">
                    Password changed successfully!
                  </div>
                  )}


                  {showWarning && (
                    <div className="text-yellow-600 bg-yellow-100 md:text-sm text-xs text-center rounded-full py-1.5 mb-5">
                      Please fill in all required fields before proceeding.
                    </div>
                  )} */}

                  <div className="grid gap-6">
                    <h1 className='font-medium text-center text-slate-700 dark:text-white'>Profile Picture</h1>
                    <div className="flex flex-col items-center justify-center">
                    <div className="mb-6 relative">
                    <img
                      name='userImage' 
                      className="inline-block h-72 w-72 rounded-full border-2 border-black dark:border-white p-1 object-cover object-center relative z-1"
                      src={preSelectedFile || userImage || defaultImg}
                      alt="User Profile"
                      onError={(e) => {
                        console.error('Error loading image for user profile:', e);
                      }}
                    />
         
                    {/* Verified Check Mark */}
                    {verifiedStatus === 'Verified' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[125px] h-[125px] pb-3 text-blue-400 absolute bottom-10 right-9 z-10 transform translate-x-1/2 translate-y-1/2" viewBox="0 0 841.89 595.28">
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

                      <div className="flex flex-col items-center w-full mb-4">

                      
                      {isButtonVisible ? (
                      <button
                        type="button"
                        className="w-full text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm py-1.5 text-center my-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        onClick={handleButtonClick}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                        </svg>
                        { (preSelectedFile || userImage || defaultImg) === defaultImg ? 'Upload Profile Photo' : 'Change Profile Photo' }
                      </button>
                      ) : null}


                      {isInputVisible ? (
                        <input
                          className="w-full border-gray-500 border rounded-full text-sm file:px-4 file:py-1.5 text-black dark:text-white file:cursor-pointer file:border-none file:text-white file:bg-[#212121] file:hover:bg-zinc-700 file:dark:bg-white file:dark:text-black file:dark:hover:bg-slate-400"
                          id="user_img"
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          onChange={handleFileChange}
                        />
                      ) : null}
            
                          
                          {selectedFile ? (
                            <button
                              type="button"
                              onClick={handleUploadImage}
                              className="w-full text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm py-1.5 text-center my-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                            >
                              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-0.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg> */}
                              Save Changes
                            </button>
                          ) : null}

                          { (preSelectedFile || userImage || defaultImg) !== defaultImg && isButtonVisible ? (
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="w-full text-red-500 hover:text-white border border-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-normal rounded-full text-sm py-1.5 text-center my-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-0.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                              Remove Profile Photo
                            </button>
                          ) : null}

                      </div>
                    </div>


                    {isloading && (
                    <div className="pt-3 font-medium flex  dark:bg-[#2b2b2b] text-slate-700 dark:text-white pb-2 sm:mt-0 text-xs md:text-sm items-center justify-center">
                    <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                    Please wait for a moment...
                    </span>
                    </div>
                )}
                    {isSuccess1 && (
                      <div className="text-emerald-700 md:text-sm text-xs bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                        Password reset success!
                      </div>
                    )}

                    {passwordError && <h3 className="text-red-500 text-xs md:text-sm text-justify mb-1">{passwordError}</h3>}

                    <h1 className='font-medium text-center text-slate-700 dark:text-white mt-10'>Password</h1>
                    <div className='mb-0'>
                      <h1 className='italic text-xs'>Password must be:</h1>
                      <div className="flex items-center">
                        <PasswordRuleIcon  isValid={passwordCriteria.length} />
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
                        <PasswordRuleIcon  isValid={passwordCriteria.number} />
                        <h1 className="italic text-xs">At least one number</h1>
                      </div>
                    </div>

                    <div className="relative z-0 w-full mb-2 group">
                      <input type={showCurrentPassword ? 'text' : 'password'} 
                      name="current_password" 
                      id="current_password" 
                      placeholder=" "
                      value={current_password}
                      onChange={handleChange}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                      <label htmlFor="current_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Current Password
                      </label>
                      {isEdge ? (
                      null
                      ) : (
                        <button type="button" className="absolute right-3 top-4 cursor-pointer" onClick={() => togglePasswordVisibility('current')}>
                          {showCurrentPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-700 dark:text-slate-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-700 dark:text-slate-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                          )}
                        </button>
                      )}
                    </div>

                    {/* New Password */}
                    <div className="relative z-0 w-full mb-2 group">
                      <input 
                      type={showNewPassword ? 'text' : 'password'} 
                      name="new_user_pass" 
                      id="new_user_pass" 
                      placeholder=" "
                      value={new_user_pass}
                      onChange={handleChange}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                      <label htmlFor="new_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        New Password
                      </label>
                      {isEdge ? (
                      null
                      ) : (
                        <button type="button" className="absolute right-3 top-4 cursor-pointer" onClick={() => togglePasswordVisibility('new')}>
                          {showNewPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-700 dark:text-slate-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-700 dark:text-slate-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Confirm New Password */}
                    <div className="relative z-0 w-full mb-2 group">
                      <input type={showConfirmPassword ? 'text' : 'password'} 
                      name="confirm_user_pass" 
                      id="confirm_user_pass" 
                      onChange={handleChange}
                      placeholder=" "
                      value={confirm_user_pass}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                      <label htmlFor="confirm_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Confirm New Password
                      </label>
                      {isEdge ? (
                      null
                      ) : (
                        <button type="button" className="absolute right-3 top-4 cursor-pointer" onClick={() => togglePasswordVisibility('confirm')}>
                          {showConfirmPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-700 dark:text-slate-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-700 dark:text-slate-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                          )}
                        </button>
                      )}
                    </div>

                      {/* Submit Button */}
                    <div className="flex flex-col justify-center mb-4">
                      <button 
                          type="submit" 
                          onClick={handleSubmit}
                          className="w-full sm:w-auto text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                            Change Password
                      </button>
                    </div>
                  </div>

                  <div ref={contentRef1} className="flex flex-col justify-center mt-4 mb-4">
                    <h1 className='font-medium text-center text-slate-700 dark:text-white mt-10 mb-4'>Account Verification</h1>
                    <button
                        type="button"
                        onClick={handleApplyModal}
                        disabled={isVerifiedStatus || isRequestVerified}
                        className={`w-full sm:w-auto text-blue-500 border border-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 dark:focus:ring-blue-800 ${
                          (isVerifiedStatus || isRequestVerified)  
                          ? "bg-gray-400 text-gray-700 border-gray-400 cursor-not-allowed"
                          : "border hover:text-white hover:bg-blue-500 dark:hover:bg-blue-500 dark:hover:text-white"
                        }`}           >  
                        Apply for Account Verification
                      </button>

                      {isSuccessUpload && (
                        <div className="text-emerald-700 text-sm bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                          Application for verification is successful!
                        </div>
                      )}
                     
                     {/* Conditional rendering for the warning message if isVerifiedStatus is defined */}
                  {/* {isVerifiedStatus && isVerifiedStatus === 'Verified' && (
                    <div className="text-red-700 text-sm bg-red-200 text-center rounded-full py-1.5 mb-5">
                      Warning: Your account is already verified!
                    </div>
                  )} */}

                </div>

                  <div className="flex flex-col justify-center mt-4 mb-4">
                    <h1 className='font-medium text-center text-slate-700 dark:text-white mt-10 mb-4'>Account Deletion</h1>
                    <span className='text-sm mb-4'>Are you sure you want to permanently delete your account?</span>
                    <button
                        type="submit"
                        onClick={handleDelete}
                        className="w-full sm:w-auto text-red-500 hover:text-white border border-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-normal rounded-full text-sm px-10 py-2.5 text-center md:mb-2 mb-3.5 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800"
                      >
                        Delete Account
                      </button>
                  </div>
                </form>
              </div>
            </div>
        </main >
        
        <ApplyVerificationModal
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
          setIsSuccessUpload={setIsSuccessUpload}
          userID={user_id}
        />

      </div>
    </div>
  );
}

export default UserSettings;