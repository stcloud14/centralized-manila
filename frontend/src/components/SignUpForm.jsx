import axios from 'axios';
import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import PasswordRuleIcon from '../partials/register/PasswordRuleIcon';

const SignUpForm =()=>{
    const [userReg, setUserReg] = useState({
        f_name:"",
        l_name:"",
        user_email:"",
        mobile_no:"",
        user_pass:"",
    });

const navigate = useNavigate()
const [isSuccess, setIsSuccess] = useState(false);
const [passwordError, setPasswordError] = useState('');
const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#\$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;


const [passwordCriteria, setPasswordCriteria] = useState({
  length: false,
  uppercase: false,
  lowercase: false,
  symbol: false,
  number: false,
});


useEffect(() => {
  // Check each requirement and update the state
  setPasswordCriteria({
    length: /^.{8,}$/.test(userReg.user_pass),
    uppercase: /[A-Z]/.test(userReg.user_pass),
    lowercase: /[a-z]/.test(userReg.user_pass),
    symbol: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(userReg.user_pass),
    number: /\d/.test(userReg.user_pass),
  });
}, [userReg.user_pass]);


const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === 'f_name' || name === 'l_name') {

    const uppercasedValue = (name === 'f_name' || name === 'l_name') ? value.toUpperCase() : value;

    setUserReg((prev) => ({ ...prev, [name]: uppercasedValue }));

  } else if (name === 'mobile_no') {

    if (value.startsWith('+63 - ')) {
      const rawValue = value.replace('+63 - ', '');
      const formattedValue = rawValue.trim() ? rawValue.replace(/\D/g, '') : '';

      setUserReg((prev) => ({ ...prev, [name]: formattedValue }));

    } else if (value === '+63 -') {
      setUserReg((prev) => ({ ...prev, [name]: '' }));
      
    } else {
      setUserReg((prev) => ({ ...prev, [name]: `+63 - ${prev[name] || ''}` }));
    }

  } else {
    setUserReg((prev) => ({ ...prev, [name]: [value] }));
  }
};

const handleClick= async e=>{
    e.preventDefault()

    const { user_pass } = userReg;
    const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#\$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;

    if (user_pass && !passwordRule.test(user_pass)) {
      setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one symbol, and one number.');
      setTimeout(() => {
        setPasswordError('');
      }, 3000);

    } else {

        try {
          // Check if the user already exists
          const existenceCheckResponse = await axios.post("http://localhost:8800/register/check-existence", {
            mobile_no: userReg.mobile_no,
          });

          if (existenceCheckResponse.data.exists) {
            // User exists, display a message or redirect to the login page
            alert(existenceCheckResponse.data.message);
            navigate("/register");
          } else {
            // User does not exist, proceed with registration
            await axios.post("http://localhost:8800/register", userReg);
            setIsSuccess(true);
            console.log('Successful Register');
            setTimeout(() => {
              setIsSuccess(false);
            }, 3000);
            navigate("/register");
          }
        } catch (err) {
          console.log(err);
        }
    }
  };

console.log(userReg)
  return (
    <div className='bg-white'>
      <div className='flex justify-center'>
        <div className='flex flex-col items-center'>
          <img src='./src/images/mnl.svg' width="100" height="100" className='mt-10' />
          <h1 className='font-normal mb-16 text-slate-500'>Centralized Manila</h1>
        </div>
      </div>
   
            <div className='form px-6 sm:px-6 md:px-12 lg:px-64'>
            {isSuccess && (
                  <div className="text-emerald-500 bg-emerald-100 md:text-sm text-xs text-center rounded-full py-1.5 mb-5">
                    Successful Register!
                  </div>
                  )}
            <div className="grid md:grid-cols-2 md:gap-6 sm:grid-cols-1">
                    <div className=" relative z-0 w-full mb-6 group">
                    <input onChange={handleChange} value={userReg.f_name} type="text" name="f_name" id="f_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum" placeholder=" " required />
                    <label htmlFor="f_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleChange} value={userReg.l_name} type="text" name="l_name" id="l_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum" placeholder=" " required />
                    <label htmlFor="l_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                    </div>
                </div>

                <div className="relative z-0 w-full mb-6 group ">
                    <input onChange={handleChange} value={userReg.user_email} type="email" name="user_email" id="user_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum" placeholder=" " required />
                    <label htmlFor="user_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
                </div>

                <div className="relative z-0 w-full mb-6 group ">
                    <input onChange={handleChange} value={userReg.mobile_no ? `+63 - ${userReg.mobile_no}` : '+63 - '} maxLength={16} type="text" name="mobile_no" id="mobile_no" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum" placeholder=" " required />
                    <label htmlFor="mobile_no" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mobile Number (+63)</label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleChange} value={userReg.user_pass} type="password" name="user_pass" id="user_pass" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum" placeholder=" " required />
                    <label htmlFor="user_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>

                {passwordError && <h3 className="text-red-500 text-xs md:text-sm">{passwordError}</h3>}

                {/* <div class="relative z-0 w-full mb-6 group">
                    <input type="password" name="user_pass1" id="user_pass1" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mobnum" placeholder=" " required />
                    <label for="user_pass1" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                </div> */}

                <div>
                  <h1 className="italic text-xs text-slate-400">Password must be:</h1>
                  
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
   
                <div className="flex flex-col items-center">
                  <button onClick={handleClick} type="submit" className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-5 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Register</button>
                </div>
            </div>

            <div className="mt-4 text-sm text-slate-500 text-center">
                Already have an account? <a className="text-emerald-500 font-bold hover:text-emerald-700" href="../">Login Here</a>
            </div>
    </div>
  );
}

export default SignUpForm;