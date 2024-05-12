import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PasswordRuleIcon from '../partials/register/PasswordRuleIcon';
import axios from 'axios';
import auth from '../../firebase.config';  // Updated import statement
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

const ForgotPasswordForm = () => {

  const Base_Url = process.env.Base_Url;

  const [authenticated, setAuthenticated] = useState(true); //set false and later remove it so that it will works place true
  const [isSendOTP, setSendOTP] = useState(true); //set false and later remove it so that it will works place true
  const [isResetPassword, setResetPassword] = useState(false); //set it false when you are done configure
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  /////UPDATE
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const [loadingOTP, setLoadingOTP] = useState(false); // New state for loading indicator
  const [userReg, setUserReg] = useState({
    mobile_no: "",
    user_pass:"",
    new_user_pass:"",
    confirm_user_pass:"",
});
  const [isSuccess, setIsSuccess] = useState(false); 
  const [isSuccess1, setIsSuccess1] = useState(false); 
  const [countdown, setCountdown] = useState(false);
  const [countdown1, setCountdown1] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [wrong_otp, setWrongOtp] = useState(false);
  const [Many_Request, setManyRequest] = useState(false);
  const successTimeoutRef = useRef(null);
  const { mobile_no } = userReg;
  const [verification_code, setVerificationCode] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));
  


  console.log(mobile_no)

  useEffect(() => {
    // Focus on the first input when the component mounts
    if (otpInputRefs.current[0].current) {
      otpInputRefs.current[0].current.focus();
    }
  }, []);

  const handleOtpInputChange = (index, value) => {
    const newOtpDigits = [...otpDigits];
  
    // If the input value is empty and Backspace is pressed, move focus to the previous input
    if (value === '' && index > 0 && otpInputRefs.current[index - 1].current) {
      otpInputRefs.current[index - 1].current.focus();
    } else {
      // Move focus to the next input if the current input is not empty
      if (index < otpDigits.length - 1 && otpInputRefs.current[index + 1].current) {
        otpInputRefs.current[index + 1].current.focus();
      }
    }
  
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);
  
    // Update the verification_code state
    const newVerificationCode = newOtpDigits.join('');
    setVerificationCode(newVerificationCode);
  };

  const handleKeyDown = (index, e) => {
    // Handle Backspace key to prevent browser navigation
    if (e.key === 'Backspace' && index > 0 && otpInputRefs.current[index - 1].current) {
      e.preventDefault();

      // Clear the value of the current input and move focus to the previous input
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = '';
      setOtpDigits(newOtpDigits);

      otpInputRefs.current[index - 1].current.focus();
    }
  };

  const handleVerificationSubmit = async () => {
    try {
      setLoading(true);
      console.log("Verification process started...");
      // Assuming confirmationResult is declared and set elsewhere in your component
      const codeConfirmation = await confirmationResult.confirm(verification_code);
      console.log("User signed in successfully:", codeConfirmation.user);
      setSendOTP(false)
        setLoading(false);
      setResetPassword(true)
      console.log(verification_code);
      // Now you can update the state or perform any other actions as needed
    } catch (error) {
      console.error("Error verifying code:", error);
      if (error.code === "auth/invalid-verification-code") {
        // Resend verification code or take appropriate action
        console.log("Resending verification code...");
        console.log(verification_code);
        setLoading(false);
        console.log("Verification process completed.");
        setWrongOtp(true);
        setTimeout(() => {
          setWrongOtp(false);
        }, 4000);
      }
    }finally {
      setLoading(false);
      console.log("Verification process completed.");
    }
  };

  
  const ResendOTP = async () => {
    try {
      const phoneNumber = `+63${userReg.mobile_no}`;
      const appVerifier = window.recaptchaVerifier;
      setIsSuccess(true);
  
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;

        const countdownInterval1 = setInterval(() => {
          setCountdown1((prevCountdown1) => prevCountdown1 - 1);
        }, 1000);

      setTimeout(() => {
        setLoadingOTP(false);
        setIsButtonDisabled(true)
        setCountdown1(30);
        setIsSuccess(false);
      }, 1000);


    setTimeout(() => {
      clearInterval(countdownInterval1);
      setIsButtonDisabled(false)
    }, 46000);


    } catch (error) {
      console.error('Error resending OTP:', error);
  
      if (error.code === 'auth/too-many-requests') {
        console.log('Too many requests');
        setManyRequest(true);
        setTimeout(() => {
        setLoadingOTP(false);
        setManyRequest(false);
      }, 3000);
      setIsButtonDisabled(true)
      setTimeout(() => {
        setIsButtonDisabled(false)
      }, 60000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      const recaptchaOptions = {
        size: 'invisible',
        callback: (response) => onSignup(response),
        expiredCallback: () => console.log('Recaptcha expired'),
      };
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', recaptchaOptions);
    }
    window.recaptchaVerifier.verify().catch((error) => {
      console.error('Error verifying reCAPTCHA:', error);
    });
  };


  
  const onSignup = async (recaptchaToken) => {
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = `+63${userReg.mobile_no}`;
    setIsSuccess(true);
    try {
      // Only proceed with SMS verification if reCAPTCHA verification is successful
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier, recaptchaToken);
      window.confirmationResult = confirmationResult;
        const countdownInterval1 = setInterval(() => {
          setCountdown1((prevCountdown1) => prevCountdown1 - 1);
        }, 1000);

      setTimeout(() => {
        setIsButtonDisabled(true)
        setLoadingOTP(true)
        setCountdown1(30);
        setIsSuccess(false);
      }, 1000);
      setTimeout(() => {
        clearInterval(countdownInterval1);
        setIsButtonDisabled(false)
        setLoadingOTP(false)
      }, 46000);


    } catch (error) {
      console.error('Error signing in:', error);
      if (error.code === 'auth/too-many-requests') {
        console.log('Too many requests');
        setManyRequest(true);
        setIsButtonDisabled(true)
        setTimeout(() => {
          setManyRequest(false);
        }, 3000);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Base_Url}forgotpass/forgot-pass/${userReg.mobile_no}`);
      if (response.status === 200) {
        if (isSubmitting) {
          return;
        }
        setAuthenticated(false);
        const user_id = response.data.results[0].user_id
        setUserReg((prev) => ({ ...prev, user_id }));
        console.log(response)
        if (authenticated) {
          setIsSubmitting(true); 
          onCaptchaVerify();
        }
      } else {
        setLoginError("Authentication failed. Please check .");
      }
    } catch (error) {
      console.error(error);
      setLoginError("Authentication failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const togglePasswordVisibility = (passwordType) => {
    if (passwordType === 'new') {
      setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
    } else if (passwordType === 'confirm') {
      setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    }
  };


  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    symbol: false,
    number: false,
  });



const [passwordError, setPasswordError] = useState('');
const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#\$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
const navigate = useNavigate();


  useEffect(() => {
    setPasswordCriteria({
      length: /^.{8,}$/.test(userReg.new_user_pass),
      uppercase: /[A-Z]/.test(userReg.new_user_pass),
      lowercase: /[a-z]/.test(userReg.new_user_pass),
      symbol: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(userReg.new_user_pass),
      number: /\d/.test(userReg.new_user_pass),
    });
  }, [userReg.new_user_pass]);


    
  const handleClick = async (e) => {
    e.preventDefault();
  
    const { new_user_pass, confirm_user_pass, user_id } = userReg;
    const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#\$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
  
    if (new_user_pass && passwordRule.test(new_user_pass)) {
      // Password meets the rule
      if (new_user_pass !== confirm_user_pass) {
        // Confirm password doesn't match
        setPasswordError("The new password and the confirmed password do not match.");
        setTimeout(() => {
          setPasswordError('');
        }, 4000);
      } else {
        try {
          const response = await axios.put(`${Base_Url}forgotpass/reset_pass/${userReg.mobile_no}`, {
            new_user_pass: userReg.new_user_pass,
            user_id: userReg.user_id,
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
    
                const rowData = { ...userReg, trans_type, formattedDate};

                // const status_type = 'P E N D I N G';
    
                const body = {
                  data: rowData,
                  formattedDate: formattedDate,
                  // status_type: status_type,
                  // f_name: f_name,
                  l_name: l_name
                };
      
                // Proceed with additional logic after updating state
                try {
                  const emailResponse = await axios.post(`${Base_Url}email/reset-email/${user_email}`, body);
      
                  if (emailResponse.data && emailResponse.data.message) {
                    console.log('SENT EMAIL');
                    // alert(emailResponse.data.message);
                  } else {
                    console.log("Failed to send email.");
                  }
                } catch (emailError) {
                  //
                }
              } else {
                console.error('Transaction error:', res.statusText);
              }
            } catch (fetchError) {
              console.log('NOT FETCHING EMAIL');
              console.error(fetchError);
            }

            setIsSuccess1(true);
            console.log('Password reset successful!');
    
            const countdownInterval = setInterval(() => {
              setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
    
            setTimeout(() => {
              setIsSuccess1(false);
              setCountdown(5);
            }, 1000);
    
            setTimeout(() => {
              clearInterval(countdownInterval);
              navigate('/');
            }, 6000);
          
          }
        } catch (error) {
          console.error(error);
          // Handle error during password change
        }
      }
    } else {
      // Password doesn't meet the rule
      setPasswordError(
        'Password must be at least 8 characters long, including at least one uppercase letter, one lowercase letter, one symbol, and one number.'
      );
      setTimeout(() => {
        setPasswordError('');
      }, 5500);
    }
  };

      const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'mobile_no') {
          const rawValue = value.replace('+63 ', '');
          const formattedValue = rawValue.replace(/\D/g, '');
          setUserReg((prev) => ({ ...prev, [name]: formattedValue }));
        } else {
          setUserReg((prev) => ({ ...prev, [name]: value }));
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
           <form onSubmit={handleSubmit}>
            {authenticated ? (
              
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
                    value={`+63 ${userReg.mobile_no}`}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="mobile_no"
                    className="peer-focus:font-medium appearance-none absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Mobile Number (+63)
                  </label>
                </div>
                <div className="text-center">
                <button
                  className="w-full text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 mt-5"
                  type="submit" 
                  disabled={isSubmitting}
                >
                  Continue
                </button>
                {authenticated && loginError && (
                <p className="text-red-600 p-2 text-xs rounded-full mt-5">{loginError}</p>
              )}
              </div>
              </div>
            ) : null}

            <div id="recaptcha-container"></div>

          {isSuccess && (
          <div className="text-emerald-700 md:text-sm text-xs bg-emerald-200 text-center rounded-full py-1.5 mb-5">
            Success! OTP sent to your number.
          </div>
          )}

          {isSuccess1 && (
            <div className="text-emerald-700 md:text-sm text-xs bg-emerald-200 text-center rounded-full py-1.5 mb-5">
              Password reset success!
            </div>
          )}

          {Many_Request && (
            <div className="text-red-700 md:text-sm text-xs bg-red-200 text-center rounded-full px-1.5 py-1.5 mb-5">
                Too many request, please try again later.
              </div>
            )}  

          {wrong_otp && (
            <div className="text-red-700 md:text-sm text-xs bg-red-200 text-center rounded-full px-1.5 py-1.5 mb-5">
                Incorrect OTP. Please input a valid OTP.
              </div>
            )} 

          {countdown > 0 && (
        <div className="text-blue-700 md:text-sm text-xs bg-blue-200 text-center rounded-full px-1.5 py-1.5 mb-5">

          Redirecting to the Home Page in <span className='font-bold'>{countdown}</span>

        </div>
      )}

            {!authenticated && isSendOTP ? (
              <div className="grid grid-cols-1 items-center">
                <h1 className='md:text-start text-center text-black text-3xl font-bold md:mt-0 mt-5'>OTP Verification</h1>
                <h1 className='md:text-start text-center text-black text-sm mb-5'>Enter the OTP code sent to your mobile number.</h1>
                <div className="mx-auto mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                    <path className='fill-yellow-500' fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex justify-center space-x-2">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 h-10 text-center border border-gray-300 rounded-lg dark:border-slate-400 dark:text-slate-700 bg-transparent"
                    ref={otpInputRefs.current[index]}
                  />
                ))}
                </div>

                {loadingOTP ? (
                      <div className="pt-3 font-medium flex pb-2 sm:mt-0 text-xs md:text-sm items-center justify-center">
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
                      Resend OTP in <span className='font-bold'>00:{countdown1} </span>seconds
                      </span>
                    </div>
                    ) : (
                      <button
                        className="flex items-center pt-5 justify-center w-full text-teal-500 hover:text-teal-600 focus:ring-4 focus:outline-none font-normal rounded-full text-sm"
                        onClick={ResendOTP}
                        disabled={isButtonDisabled}
                      >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                      </svg>
                      <span className='font-semibold'>
                        Resend OTP
                      </span>
                      </button>
                      )}

                <div className="text-center">
                {loading ? (
                <div className="pt-3 font-medium flex  dark:text-black pb-2 sm:mt-0 text-xs md:text-sm items-center justify-center">
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
                ) : (
                <button
                  className="w-full text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 mt-5"
                  type="button" 
                   onClick={handleVerificationSubmit}
                >
                  Verify
                </button>
                )}
              </div>
            </div>
            ) : null}

            {isResetPassword && !authenticated && !isSendOTP ? (
              
              <div className="grid md:grid-cols-1">

                {passwordError && <h3 className="text-red-500 text-xs md:text-sm text-justify mb-1">{passwordError}</h3>}
                <h1 className='md:text-start text-center text-black text-3xl font-bold md:mt-0 mt-5'>Reset your password</h1>
                <h1 className='md:text-start text-center text-black text-sm mb-3'>Create your new password, it must be:</h1>
                <div className='mb-5'>  
                  
                  <div className="flex items-center">
                    <PasswordRuleIcon isValid={passwordCriteria.length} />
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
                    <PasswordRuleIcon isValid={passwordCriteria.number} />
                    <h1 className="italic text-xs">At least one number</h1>
                  </div>
                </div>
                {/* New Password */}
                <div className="relative z-0 w-full lg:mb-0 group">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="new_user_pass"
                    name="new_user_pass"
                    placeholder=" "
                    onChange={handleChange}
                    value={userReg.new_user_pass}
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-400 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum"
                  />
                  <label
                    htmlFor="user_pass"
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
                   id="confirm_user_pass"
                   name="confirm_user_pass"
                   placeholder=" "
                   onChange={handleChange}
                   value={userReg.confirm_user_pass}
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-400 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum"
                  />
                  <label
                    htmlFor="user_pass"
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


                
                
                <div className="text-center">
                <button
                  className="w-full text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 mt-5"
                  type="button"
                  onClick={handleClick}
                >
                  Submit
                </button>


              </div>
              
              </div>
            ) : null}


          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
