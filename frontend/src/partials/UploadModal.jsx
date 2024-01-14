import React, { useState, useRef } from 'react';

const UploadModal = ({ onClose, onFileSelect, targetIMG }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name);
    } else {
      setSelectedFile(null);
      setSelectedFileName(null);
    }
    fileInputRef.current.value = '';
  };

  console.log(targetIMG)
  console.log(selectedFile)

  const preventDefault = (event) => {
    event.preventDefault();
  };

  const handleFileChangeClick = () => {
    fileInputRef.current.click();
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onFileSelect(selectedFile, targetIMG);
      setSelectedFile(null);
      setSelectedFileName(null);
      onClose();

      fileInputRef.current.value = '';

    } else {
 
      console.error('Please select a file before uploading.');
    }
  };
 
  return (
      <div className="fixed z-50 inset-0 ">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center text-xs md:text-sm sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white dark:bg-[#212121] text-slate-700 dark:text-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full max-w-2xl">
          <div className="px-4 pt-5 pb-3 sm:p-6 sm:pb-6 overflow-y-auto">
            
            <span className="font-bold md:text-lg text-sm">Upload File</span>
            
          </div>

          <div className="pb-1 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-6 md:pr-6 overflow-y-auto">
          <div className="mx-auto">
          <label 
              onDragOver={preventDefault}
              onDrop={(event) => {
                preventDefault(event); // Prevent the default behavior for file drops
                setSelectedFile(event.dataTransfer.files[0]);
                setSelectedFileName(event.dataTransfer.files[0].name);
              }}
              htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 bg-white dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d] border-gray-300 border-dashed rounded-lg cursor-pointer dark:hover:border-gray-500">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 mx-3">
              {!!selectedFileName ? (
                <div onClick={handleFileChangeClick}>
                <p className="mb-2 text-xs sm:text-sm text-green-600 dark:text-green-300">
                  {selectedFileName}
                </p>
                <p
                  className="text-[10px] sm:text-[12px] text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  Change File
                </p>
              </div>
            ) : (
              <>
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-xs sm:text-sm">
                    Click to upload
                  </span>{' '}
                  or drag and drop
                </p>
                <p className="text-[10px] sm:text-[12px] text-gray-500 dark:text-gray-400">
                  PNG, JPEG, DOCX, or PDF (MAX. 2MB)
                </p>
              </>
            )}
          </div>

            <input
              onChange={(event) => handleFileInputChange(event)}
              ref={fileInputRef}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>

          </div>
          </div>

            <div className="mr-0 md:mr-2 px-3 pt-3 pb-5 gap-3 sm:px-4 flex justify-end">
              <div className="flex items-center space-x-2 mt-auto">
                <button
                  onClick={onClose}
                  type="button"
                  className="text-slate-500 text-xs text-center px-5 py-2 mb-0 md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                  >
                  <p>Close</p>
                </button>

                <button
                  onClick={handleUploadClick}
                  type="button"
                  className="text-white text-xs text-center px-5 py-2 md:text-sm bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                  <p>Upload</p>
                </button>
              </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default UploadModal;
