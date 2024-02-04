import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../partials/ThemeToggle';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import auth from '../../firebase.config';  // Updated import statement



const LandingPageForm = () => {
  const [userReg, setUserReg] = useState({
    email: "",
    displayName: "",
  });

  const [userAuth, setUserAuth] = useState({
    mobile_no: "",
    user_pass: "",
  });
  const [loading, setLoading] = useState(false); // New state for loading indicator

  const [isSuccess, setIsSuccess] = useState(false); 
  const successTimeoutRef = useRef(null);
  const FailedTimeoutRef = useRef(null);
  const [Many_Request, setManyRequest] = useState(false);
  const [wrong_otp, setWrongOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isetUserdata, setUserdata] = useState("")

  const [verification_code, setVerificationCode] = useState(""); // Added state for verification code
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const { mobile_no, user_pass } = userAuth;
  const [loginError, setLoginError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const otpInputRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));

  useEffect(() => {
    // Focus on the first input when the component mounts
    if (otpInputRefs.current[0].current) {
      otpInputRefs.current[0].current.focus();
    }
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider(); // Declare the provider
  
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;
      console.log("User:", displayName, email);
      setUserReg({ displayName, email });
      const userReg = {
        displayName: displayName,
        email: email,
      };

      const existenceCheckResponse = await axios.post("http://localhost:8800/register/check-existence/email", {
        email: email,
      });
  
      if (existenceCheckResponse.data.exists) {
        // User exists, retrieve user_id from the response and redirect
        const user_id = existenceCheckResponse.data.user_id; // Replace with the actual property name
        console.log(existenceCheckResponse);
        window.location.href = `/home/${user_id}`;
      } else {
        console.log("User does not exist. Proceed with registration");
        
        try {
          const registrationResponse = await axios.post("http://localhost:8800/register/regis", userReg);
          console.log("Registration Result:", registrationResponse.data);
  
          const user_id = registrationResponse.data.user_id;
          window.location.href = `/home/${user_id}`;
        } catch (registrationError) {
          console.error("Registration Error:", registrationError.message);
        }
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Google Login Error:", error.message);
    }
  };

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
      navigate(`/home/${userAuth.user_id}`);
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
      setWrongOtp(true);
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
    
          const response = await axios.post(`http://localhost:8800/login/compare-password/${userAuth.mobile_no}/${userAuth.user_pass}`);
      
          if (response.status === 200) {

            if (isSubmitting) {
              return;
            }

            setAuthenticated(true);
      
            const user_id = response.data[0].user_id;
            
            setUserAuth((prev) => ({ ...prev, user_id }));
      
            if (!authenticated) {
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
      

      const [showPassword, setShowPassword] = useState(false);
      const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };
    
  return (
    <div className="relative lg:h-screen md:h-screen min-h-screen bg-[url('./src/images/manila-v5.jpg')] dark:bg-[url('./src/images/manila-v4.jpg')] bg-cover bg-no-repeat bg-top">
      <div className="flex flex-col md:flex-row h-full">
        
        {/* Left Section */}
        <div className="md:w-1/2 flex items-center justify-center lg:mb-0 mb-5">
          <div className="text-center lg:pt-0 pt-20">
            <img
              src="./src/images/mnl.svg"
              alt="Centralized Manila Logo" className="lg:h-60 md:h-40 sm:h-28 h-28 mx-auto"
            />
            <span className="text-2xl text-white font-semibold tracking-wide">
              <span className="font-medium">Centralized </span>
              <span className="text-blue-500 text-shadow-[0_0px_4px_var(--tw-shadow-color)] shadow-blue-500/100">M</span>
              <span className="text-red-500 text-shadow-[0_0px_4px_var(--tw-shadow-color)] shadow-red-500/100">a</span>
              <span className="text-yellow-500 text-shadow-[0_0px_4px_var(--tw-shadow-color)] shadow-yellow-500/100">n</span>
              <span className="text-emerald-500 text-shadow-[0_0px_4px_var(--tw-shadow-color)] shadow-emerald-500/100">i</span>
              <span className="text-blue-500 text-shadow-[0_0px_4px_var(--tw-shadow-color)] shadow-blue-500/100">l</span>
              <span className="text-red-500 text-shadow-[0_0px_4px_var(--tw-shadow-color)] shadow-red-500/100">a</span>
            </span>
            
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 flex items-center justify-center lg:mx-auto mx-5">
          <div className="bg-white bg-opacity-95 lg:p-16 p-10 rounded-3xl shadow-lg">
            <h1 className='text-center mb-10 lg:text-lg text-md tracking-[.020em]'>
              <span className='font-medium text-slate-600'>"Maligayang pagdating, </span>
              <span className='font-bold text-blue-500'>Manileño!"</span>
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-1 md:gap-6">
                {!authenticated && (
                <div className="relative z-0 w-full lg:mb-0 mb-4 group">
                  <input
                    type="text"
                    id="mobile_no"
                    name="mobile_no"
                    placeholder=' '
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-400 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum"
                    value={`+63 ${userAuth.mobile_no}`}
                    maxLength={14}
                    onChange={handleChange}
                  />
                  <label htmlFor="mobile_no" className="peer-focus:font-medium appearance-none absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mobile Number (+63)</label>
                </div>
                )}
                {!authenticated && (
                <div className="relative z-0 w-full mb-4 group">
                
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="user_pass"
                    name="user_pass"
                    placeholder=' '
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-400 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={userAuth.user_pass}
                    onChange={handleChange}
                  />
                  <label htmlFor="user_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                  <button
                    type="button"
                    className="absolute right-3 top-4 cursor-pointer"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 dark:text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 dark:text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    )}
                  </button>
                </div>
                )}
              </div>
          
            {!authenticated && (
            <div className="mt-2 flex justify-between font-semibold text-sm">
              <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                {/* <input
                  className="mr-1.5 shrink-0 mt-0.5 border-2 border-gray-300 dark:border-gray-400 rounded bg-transparent text-emerald-600 pointer-events-none focus:ring-emerald-500"
                  type="checkbox"
                />
                <span>Remember Me</span> */}
              </label>
              <a className="text-yellow-500 hover:text-blue-700 hover:text-yellow-600" href="/forgotpass">Forgot Password?</a>
            </div>
            )}
            <div className="text-center">
              {!authenticated && (
              <button
              className="text-blue-500 md:w-3/4 w-full hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2 text-center mb-2 mt-5 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              type="submit"
              disabled={isSubmitting}  // Disable the button if submitting
              >
                Login
              </button>
              )}

              {!authenticated && loginError && (
                <p className="text-red-600 p-2 text-xs rounded-full mt-5">{loginError}</p>
              )}
            </div>
            
            {!authenticated && (
            <div className="my-2 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
            </div>
            )}

            <div id="recaptcha-container"></div>

            {isSuccess && (
              <div className="text-emerald-700 md:text-sm text-xs bg-emerald-200 text-center rounded-full py-1.5 mb-5">
                Success! OTP sent to your number.
              </div>
            )}

            {Many_Request && (
              <div className="text-red-700 md:text-sm text-xs bg-red-200 text-center rounded-full px-1.5 py-1.5 mb-5">
                Too many request, please try again later.
              </div>
            )}  
            
            {wrong_otp && (
              <div className="text-red-700 md:text-sm text-xs bg-red-200 text-center rounded-full px-1.5 py-1.5 mb-5">
                Wrong OTP. Please enter the valid OTP.
              </div>
            )} 

            {/* VERIFICATION PROCESS */}
            {authenticated && (
              <>
                <div className="grid grid-cols-1 items-center justify-items-center gap-4">

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                    <path className='fill-yellow-500' fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                  </svg>

                  <div className="text-center text-sm font-medium text-slate-600">
                    Enter the OTP sent to your number
                  </div>

                  {/* OTP Input Boxes */}
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

                  {/* Verify Button */}
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
                        className="w-full text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 uppercase"
                        onClick={handleVerificationSubmit}
                      >
                        Verify
                      </button>
                      
                    )}
                    
                  </div>
                  
                </div>
                
              </>
            )}
            </form>

            {!authenticated && (
              <div className='flex justify-center items-center'>
                  <button
                    id="google-login-btn"
                    className="flex justify-center items-center text-slate-900 md:w-3/4 w-full hover:text-white border border-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-slate-300 font-normal rounded-full md:text-sm text-xs px-10 py-2 text-center mb-2 mt-3 dark:focus:ring-slate-300"
                    type="submit"
                    onClick={handleGoogleLogin}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='w-5 h-5 mr-2' viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg>
                  Login with Google
                </button>
              </div>
            )}

            {!authenticated && (
            <div className="mt-4 text-sm text-slate-500 text-center">
              Don't have an account? <a className="text-emerald-500 font-bold hover:text-emerald-700" href="../register">Register Here!</a>
            </div>
            )}


            <div className="absolute top-4 right-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="md:absolute relative bottom-0 w-full text-center text-sm text-gray-500 py-3 drop-shadow-xl">
          Copyright &copy; {new Date().getFullYear()} |
          <a href="/indexadmin" className='hover:text-white'>
            <span className="hover:font-medium hover:text-blue-500"> B</span>
            <span className="hover:font-medium hover:text-blue-500">S</span>
            <span className="hover:font-medium hover:text-yellow-500">I</span>
            <span className="hover:font-medium hover:text-purple-500">T</span>
            <span className="hover:font-medium hover:text-emerald-500"> 4</span>
            <span className="hover:font-medium hover:text-red-500">B</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPageForm;