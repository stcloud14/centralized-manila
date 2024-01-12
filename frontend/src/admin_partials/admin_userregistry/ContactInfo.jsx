import React from 'react';

const ContactInfo = () => {
  return (
    <div className="my-10">
                  <span className='font-bold text-lg text-gray-700 dark:text-white'>Contact Information</span>
                  <form>
                    <div className="mt-5 md:px-32 px-12">
                      <label htmlFor="user_email" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Email</label>
                      <input type="text" name="user_email" id="user_email" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="mobile_no" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Mobile Number</label>
                      <input type="text" name="mobile_no" id="mobile_no" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="tel_no" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Telephone Number</label>
                      <input type="text" name="tel_no" id="tel_no" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="region_id" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Region</label>
                      <select defaultValue={0} name="region_id" id="region_id" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6">
                        <option value="0">Select Region</option>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                        <option value="">Option 3</option>
                      </select> 
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="prov_id" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Province</label>
                      <select defaultValue={0} name="prov_id" id="prov_id" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6">
                        <option value="0">Select Province</option>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                        <option value="">Option 3</option>
                      </select> 
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="city_id" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Municipal</label>
                      <select defaultValue={0} name="city_id" id="city_id"  className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6">
                        <option value="0">Select Municipal</option>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                        <option value="">Option 3</option>
                      </select> 
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="house_floor" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">House No. / Unit / Floor</label>
                      <input type="text" name="house_floor" id="house_floor" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="bldg_name" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Street / Building Name</label>
                      <input type="text" name="bldg_name" id="bldg_name" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="brgy_dist" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Barangay / Zone / District</label>
                      <input type="text" name="brgy_dist" id="brgy_dist" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="zip_code" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Zip Code</label>
                      <input type="text" name="zip_code" id="zip_code" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                  </form>
                </div>
  );
};

export default ContactInfo;
