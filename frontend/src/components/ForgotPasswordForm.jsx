import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PasswordRuleIcon from '../partials/register/PasswordRuleIcon';
import axios from 'axios';
import auth from '../../firebase.config';  // Updated import statement
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

const ForgotPasswordForm = () => {
  const [authenticated, setAuthenticated] = useState(true);
  const [isSendOTP, setSendOTP] = useState(true);
  const [isResetPassword, setResetPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  /////UPDATE
  const [loading, setLoading] = useState(false); // New state for loading indicator
  
  const [isSuccess, setIsSuccess] = useState(false); 
  const [userAuth, setUserAuth] = useState({
    mobile_no: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const successTimeoutRef = useRef(null);
  const { mobile_no } = userAuth;
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


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'mobile_no') {
      const rawValue = value.replace('+63 ', '');
      const formattedValue = rawValue.replace(/\D/g, '');
      setUserAuth((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setUserAuth((prev) => ({ ...prev, [name]: value }));
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
      setResetPassword(true)
      console.log(verification_code);
      // Now you can update the state or perform any other actions as needed
    } catch (error) {
      console.error("Error verifying code:", error);
      if (error.code === "auth/invalid-verification-code") {
        // Resend verification code or take appropriate action
        console.log("Resending verification code...");
        console.log(verification_code);
        // Implement code resend logic here
      }
    }finally {
      setLoading(false);
      console.log("Verification process completed.");
      // setWrongOtp(true);
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
    const phoneNumber = `+63${userAuth.mobile_no}`;
  
    try {
      // Only proceed with SMS verification if reCAPTCHA verification is successful
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier, recaptchaToken);
      window.confirmationResult = confirmationResult;
      setIsSuccess(true);
      successTimeoutRef.current = setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    } catch (error) {
      console.error('Error signing in:', error);
      if (error.code === 'auth/too-many-requests') {
        console.log('Too many requests');
        setManyRequest(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8800/login/forgot-pass/${userAuth.mobile_no}`);
      if (response.status === 200) {
        if (isSubmitting) {
          return;
        }
        setAuthenticated(false);
        const user_id = response.data.results[0].user_id
        setUserAuth((prev) => ({ ...prev, user_id }));
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

  const [userReg, setUserReg] = useState({
    user_pass:"",
});

const [passwordError, setPasswordError] = useState('');
const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,-=])[A-Za-z\d!@#$%^&*.,-=]{8,}$/;
const navigate = useNavigate();


  useEffect(() => {
    setPasswordCriteria({
      length: /^.{8,}$/.test(userReg.user_pass),
      uppercase: /[A-Z]/.test(userReg.user_pass),
      lowercase: /[a-z]/.test(userReg.user_pass),
      symbol: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(userReg.user_pass),
      number: /\d/.test(userReg.user_pass),
    });
  }, [userReg.user_pass]);


    
const handleClick= async e=>{
  e.preventDefault()

  const { user_pass } = userReg;
  const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,-=])[A-Za-z\d!@#$%^&*.,-=]{8,}$/;

  if (user_pass && !passwordRule.test(user_pass)) {
    setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one symbol, and one number.');
    setTimeout(() => {
      setPasswordError('');
    }, 3000);

  } else {
          await axios.post("http://localhost:8800/register", userReg);
          setIsSuccess(true);
          console.log('Successful Reset password');
          setTimeout(() => {
            setIsSuccess(false);
          }, 3000);
          navigate("/");
        }
      } 
      


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
                    value={`+63 ${userAuth.mobile_no}`}
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
                <div className="text-center">
                {loading ? (
                <div className="spinner-border text-blue-500" role="status">
                  <span className="visually-hidden">Verifying...</span>
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

                {passwordError && <h3 className="text-red-500 text-xs md:text-sm">{passwordError}</h3>}
                <h1 className='md:text-start text-center text-black text-3xl font-bold md:mt-0 mt-5'>Reset your password</h1>
                <h1 className='md:text-start text-center text-black text-sm mb-3'>Create your new password, it must be:</h1>
                <div className='mb-5'>  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-4 h-4">
                      <path className="stroke-emerald-500" strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                  </div>
                  
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
                    id="new_password"
                    name="new_password"
                    placeholder=" "
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-400 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum"
                  />
                  <label
                    htmlFor="new_password"
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
                    id="confirm_password"
                    name="confirm_password"
                    placeholder=" "
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-400 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum"
                  />
                  <label
                    htmlFor="confirm_password"
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
