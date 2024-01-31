import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';


let duration = 15 * 1000;
let animationEnd = Date.now() + duration;
let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}



const PaymentSuccessForm = () => {
  const [isloading, setIsLoading] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  const currentUrl = window.location.href;
  const startIndex = currentUrl.indexOf("/paymentsuccess/") + "/paymentsuccess/".length;
  const userId = currentUrl.substr(startIndex, 6);
  const location = useLocation();

  const getTransactionDetails = () => {
    const searchParams = new URLSearchParams(location.search);
    const transaction_id = searchParams.get('transaction_id');
    const amount = searchParams.get('amount');
    const user_id = searchParams.get('user_id');
    const trans_type = searchParams.get('trans_type');
    
    return { transaction_id, amount, user_id, trans_type };
  };

  const transactionDetails = getTransactionDetails();

  let transType;

  switch (transactionDetails.trans_type) {
    case 'Real Property Tax Payment':
      transType = 'taxpayment';
      break;
    case 'Real Property Tax Clearance':
      transType = 'taxclearance';
      break;
    case 'Business Permit':
      transType = 'buspermit';
      break;
    case 'Community Tax Certificate':
      transType = 'cedula';
      break;
    case 'Birth Certificate':
      transType = 'birthcert';
      break;
    case 'Death Certificate':
      transType = 'deathcert';
      break;
    case 'Marriage Certificate':
      transType = 'marriagecert';
      break;
  }

  

  const { transaction_id, user_id } = transactionDetails;


  const handleReturn = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`http://localhost:8800/payment/success/${transaction_id}`, transactionDetails);
      try {
        const res1 = await axios.get(`http://localhost:8800/transachistory/${transType}/${transaction_id}`);
        const transaction_details = res1.data;
        console.log(transaction_details)

        const res = await axios.get(`http://localhost:8800/email/${user_id}`);
        
        if (res.data.user_email) {
          const updatedUserEmail = res.data.user_email;
          const f_name = res.data.f_name;
          const l_name = res.data.l_name;
          console.log('FETCHED USER EMAIL:', updatedUserEmail);

          const user_email = updatedUserEmail;

          const status_type = 'Paid';

          const date = new Date(); // Current date and time
          const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
          const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

          const rawData = {
            ...transaction_details,
            transaction_id: transaction_id,
            acc_name: transaction_details.tp_acc_name,
            rp_tdn: transaction_details.tp_rp_tdn || transaction_details.tc_rp_tdn,
            rp_pin: transaction_details.tp_rp_pin || transaction_details.tc_rp_pin,
            trans_type: transaction_details.trans_type,
            amount: transaction_details.amount,
            date: formattedDate,
            time: formattedTime,
          }
          
          const body = {
            data: rawData,
            f_name: f_name,
            l_name: l_name,
            status_type: status_type
          };

          try {
            const emailResponse = await axios.post(`http://localhost:8800/email/send-email/${user_email}`, body);
          
            if (emailResponse.data && emailResponse.data.message) {
              console.log('SENT EMAIL:', emailResponse.data.message);

            } else {
              console.error('Email response:', emailResponse);

            }
          } catch (emailError) {
            console.error('Error sending email:', emailError);
          }
          
        } else {
          console.error('Transaction error:', res.statusText);
        }
      } catch (fetchError) {
        console.log('NOT FETCHING EMAIL');
        console.error(fetchError);
      }

      setIsLoading(false);
      setButtonVisible(false);
      setTimeout(() => {
      window.location.href = `http://localhost:5173/transachistory/${userId}`;
      }, 1200);

    } 
    catch (err) {
      console.error(err);
    }
  };


    const [isVisible, setIsVisible] = useState(true);
  
    useEffect(() => {
      // Hide the component after 3 seconds
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
  
      // Clear the timeout to avoid hiding if the component unmounts before 3 seconds
      return () => clearTimeout(timeoutId);
    }, []);


    useEffect(() => {
      if (!isVisible) {
        const animationEnd = Date.now() + 3000; // Replace 3000 with your desired duration
        let interval = setInterval(function () {
          let timeLeft = animationEnd - Date.now();
  
          let particleCount = 50 * (timeLeft / 3000); // Adjust particleCount and duration as needed
          // since particles fall down, start a bit higher than random
          confetti(
            Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
          );
          confetti(
            Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
          );
  
          if (timeLeft <= 0) {
            clearInterval(interval);
            // Additional logic after the animation ends, e.g., showing other content
            // You may want to handle this logic in a separate useEffect or callback function
            // setShowContent(true);
          }
        }, 250);
  
        // Cleanup function to clear the interval if the component unmounts or isVisible changes
        return () => clearInterval(interval);
      }
    }, [isVisible]);



  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Content Area of 3rd Button */}
        <main className="overflow-y-auto flex items-center justify-center min-h-screen bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-xl rounded-sm border border-slate-200">
            <div className={`bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] text-slate-700 dark:text-white shadow-xl rounded-lg flex flex-col items-center justify-center mx-2 px-[50px] py-[70px] sm:px-[70px] sm:py-[80px] md:px-[80px] md:py-[90px]`}>
    
              {isVisible && (
                <>
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 md:w-15 md:h-15 lg:w-20 lg:h-20 pb-0 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                  <p className="pt-5 sm:pt-10 font-bold text-lg md:text-xl">Processing Payment</p>
                  <span className="text-xs md:text-sm">Please wait for a moment.</span>
                </> 
              )}


              {isVisible ? null : (
                <>
                  <svg viewBox="0 0 24 24" className="text-green-600 w-10 h-10 sm:w-16 sm:h-16 mb-2">
                    <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path>
                  </svg>

                  <div className="text-center pt-10">
                    <p className="font-bold text-lg md:text-xl">Payment Successful!</p>
                    <br />
                    <span className="text-xs md:text-sm">The payment has been done successfully.</span>
                    <br />
                    <span className="text-sm md:text-base">
                      Thank you for trusting Centralized
                      <span className='text-blue-600'> M</span>
                      <span className='text-red-500'>a</span>
                      <span className='text-yellow-500'>n</span>
                      <span className='text-green-500'>i</span>
                      <span className='text-blue-600'>l</span>
                      <span className='text-red-500'>a</span>!
                    </span>
                  </div>

                  {isloading ? (
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
                          ) : (
                        <>
                          {buttonVisible && (
                                  <div className="flex items-center justify-center mt-6">
                                  <button
                                  onClick={handleReturn}
                                  type="button"
                                  className="text-white text-xs md:text-sm bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-12 py-2 text-center dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                  >
                                  Back to Centralized Manila
                              </button>
                          </div>
                          )}

                        </>
                  )}


                </>
              )}
              
            </div>
         
        </main>
      </div>
    </div>
  );
};

export default PaymentSuccessForm;
