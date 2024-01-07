import React, { useEffect } from 'react';
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
  const currentUrl = window.location.href;
  const startIndex = currentUrl.indexOf("/paymentsuccess/") + "/paymentsuccess/".length;
  const userId = currentUrl.substr(startIndex, 6);
  const location = useLocation();

  const getTransId = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('transaction_id');
  };

  const transactionId = getTransId();

  console.log(transactionId);

  const handleReturn = async () => {
    try {
      const res = await axios.post(`http://localhost:8800/payment/success/${transactionId}`);
      window.location.href = `http://localhost:5173/transachistory/${userId}`;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let interval = setInterval(function () {
      let timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      let particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
      );
      confetti(
        Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
      );
    }, 250);

    // Clear interval when component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array ensures it runs only once after mounting

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Content Area of 3rd Button */}
        <main className="overflow-y-auto flex items-center justify-center min-h-screen bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
          <div className={`bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] text-slate-700 dark:text-white shadow-xl rounded-lg flex flex-col items-center justify-center px-[100px] py-[100px]`}>
            <svg viewBox="0 0 24 24" className="text-green-600 w-10 h-10 sm:w-16 sm:h-16 mb-2">
              <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path>
            </svg>
            <div className="text-center pt-10">
              <p className="font-bold text-lg md:text-xl">Payment Successful!</p>
              <br />
              <span className="text-xs md:text-sm">The payment has been done succesfully.</span>
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
            <div className="flex items-center justify-center mt-6">
              <button
                onClick={handleReturn}
                type="button"
                className="text-white text-xs md:text-sm bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-12 py-2 text-center dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go Back
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentSuccessForm;
