import React from 'react';

const UploadButton = ({ openUploadModal, targetIMG }) => {

    return (
        <div>
            <button
                onClick={() => {
                    openUploadModal(targetIMG);
                }}
                className="flex justify-center pl-3 items-center text-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full cursor-pointer"
                aria-label="Upload"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
      
            <span className="md:text-sm text-xs font-normal pl-1 pr-3 py-0.5">Upload</span>
          </button>

        </div>
      );
      
}

export default UploadButton