import React from 'react';
import defaultImage from '../../images/manila-v3.jpg';

const AdminURViewImage = ({ isImageOpen, handleCloseImageModal }) => {
  return (
    isImageOpen && (
      <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center text-xs sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          {/* Contents */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-screen-lg mx-auto">
            {/* Close button */}
            <button onClick={handleCloseImageModal} type="button" className="absolute top-1 right-1 md:top-3 md:right-3 text-slate-500 text-xs md:text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:w-5 md:h-5 w-4 h-4">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"/>
              </svg>
            </button>

            {/* Image */}
            <div className="max-h-screen mx-auto overflow-y-auto">
              <img
                name="defaultImage"
                className="w-full h-auto object-cover object-center"
                src={defaultImage}
                alt="Image"
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AdminURViewImage;
