import React, { useState, useRef } from 'react';

const UploadButton = ({ openUploadModal }) => {

    const fileInputRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState(null);

    const updateSelectedFileName = (file) => {
        setSelectedFileName(file ? file.name : null);
    };

    const handleFileUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {

                console.log('Image uploaded successfully');
                updateSelectedFileName(file);
            } else {
                
                console.error('Image upload failed');
            }
        } catch (error) {
            console.error('Error during image upload:', error);
        }
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const preventDefault = (event) => {
        event.preventDefault();
    };


    return (
        <div>
            <button
                onClick={() => {
                    openUploadModal();
                    updateSelectedFileName(null);
                }}
                className="flex justify-center pl-3 items-center text-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full cursor-pointer"
                onDragOver={preventDefault}
                onDrop={(event) => {
                    handleDrop(event);
                    updateSelectedFileName(event.dataTransfer.files[0]);
                }}
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
      
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={(event) => {
                handleFileInputChange(event);
                updateSelectedFileName(event.target.files[0]);
            }}
            ref={fileInputRef}
          />

          {selectedFileName && (
            <div className="modal">
                <p>Selected file: {selectedFileName}</p>
            </div>
          )}

        </div>
      );
      
}

export default UploadButton