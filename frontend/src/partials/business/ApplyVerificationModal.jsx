import React from 'react';

const ApplyVerificationModal = ({ isOpen, handleClose }) => {
  return (
    isOpen && (
      <div className="fixed z-50 inset-0">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center text-xs md:text-sm sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white dark:bg-[#212121] text-slate-700 dark:text-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full max-w-xl max-h-screen overflow-y-auto">
            <div className="sm:flex sm:items-start px-8 pt-8">

              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-[12rem] h-[12rem] text-blue-400" viewBox="0 0 841.89 595.28">
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
              </div>

              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                  Verify Account
                </h1>
                <div className="my-2">
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    Please ensure that the information currently displayed in your profile is the most recent and up-to-date before proceeding with the verification process.
                  </p>
                </div>

                <div className="col-span-full">
                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                    Valid ID
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-white px-6 py-10">
                    <div className="text-center text-gray-600 dark:text-slate-400">
                      <div className="mt-4 flex text-sm leading-6">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-transparent font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-600 dark:hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600 dark:text-slate-400">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            <div className="bg-white dark:bg-[#212121] px-4 pt-6 pb-4 gap-3 sm:px-6 flex md:justify-end justify-center">
                  <button
                    onClick={handleClose}
                    type="button"
                    className="text-slate-500 text-xs md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                  >
                    <p>Cancel</p>
                  </button>
                  <button
                    onClick={handleClose}
                    type="button"
                    className="text-white text-xs md:text-sm bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <p>Apply for Verification</p>
                  </button>
                </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ApplyVerificationModal;
