import React from 'react';
import RegionDropdown from '../../partials/profile/RegionDropdown';
import ProvinceDropdown from '../../partials/profile/ProvinceDropdown';
import CityDropdown from '../../partials/profile/CityDropdown';

const ContactInfo = ({ selectedTransaction, userInfo, handleChangeData, editMode }) => {
  return (
    selectedTransaction && (editMode === undefined || editMode === false) ? (
    <div className="my-10">
                  <span className='font-bold text-lg text-gray-700 dark:text-white'>Contact Information</span>
                  <form>
                  {selectedTransaction.user_email ?
                    <div className="mt-5 md:px-32 px-12">
                      <label htmlFor="user_email" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Email</label>
                      <input value={selectedTransaction.user_email} readOnly type="text" name="user_email" id="user_email" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    : null}
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="mobile_no" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Mobile Number</label>
                      <input value={selectedTransaction.mobile_no} readOnly type="text" name="mobile_no" id="mobile_no" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    {selectedTransaction.tel_no ? 
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="tel_no" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Telephone Number</label>
                      <input value={selectedTransaction.tel_no} readOnly type="text" name="tel_no" id="tel_no" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    : null}
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="region_id" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Region</label>
                      <input value={selectedTransaction.region_name} readOnly type="text" name="region_id" id="region_id" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="prov_id" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Province</label>
                      <input value={selectedTransaction.prov_name} readOnly type="text" name="prov_id" id="prov_id" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="city_id" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Municipal</label>
                      <input value={selectedTransaction.city_name} readOnly type="text" name="city_id" id="city_id" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="house_floor" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">House No. / Unit / Floor</label>
                      <input value={selectedTransaction.house_floor} readOnly type="text" name="house_floor" id="house_floor" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="bldg_name" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Street / Building Name</label>
                      <input value={selectedTransaction.bldg_name} readOnly type="text" name="bldg_name" id="bldg_name" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="brgy_dist" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Barangay / Zone / District</label>
                      <input value={selectedTransaction.brgy_dist} readOnly type="text" name="brgy_dist" id="brgy_dist" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="zip_code" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Zip Code</label>
                      <input value={selectedTransaction.zip_code} readOnly type="text" name="zip_code" id="zip_code" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                  </form>
                </div>
       ) : (
        <div className="my-10">
                  <span className='font-bold text-lg text-gray-700 dark:text-white'>Contact Information</span>
                  <form>
                    <div className="mt-5 md:px-32 px-12">
                      <label htmlFor="user_email" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Email</label>
                      <input value={userInfo.user_email} onChange={handleChangeData} type="text" name="user_email" id="user_email" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="mobile_no" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Mobile Number</label>
                      <input value={userInfo.mobile_no} onChange={handleChangeData} type="text" name="mobile_no" id="mobile_no" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="tel_no" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Telephone Number</label>
                      <input value={userInfo.tel_no} onChange={handleChangeData} type="text" name="tel_no" id="tel_no" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="region_id" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Region</label>
                      <select value={userInfo.region_id} onChange={handleChangeData} defaultValue={0} name="region_id" id="region_id" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6">
                        <RegionDropdown />
                      </select> 
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="prov_id" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Province</label>
                      <select value={userInfo.prov_id} onChange={handleChangeData} defaultValue={0} name="prov_id" id="prov_id" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6">
                        <ProvinceDropdown selectedRegion={userInfo.region_id}/>
                      </select> 
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="city_id" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Municipal</label>
                      <select value={userInfo.city_id} onChange={handleChangeData} defaultValue={0} name="city_id" id="city_id"  className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6">
                        <CityDropdown selectedProvince={userInfo.prov_id}/>
                      </select> 
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="house_floor" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">House No. / Unit / Floor</label>
                      <input value={userInfo.house_floor} onChange={handleChangeData} type="text" name="house_floor" id="house_floor" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="bldg_name" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Street / Building Name</label>
                      <input value={userInfo.bldg_name} onChange={handleChangeData} type="text" name="bldg_name" id="bldg_name" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="brgy_dist" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Barangay / Zone / District</label>
                      <input value={userInfo.brgy_dist} onChange={handleChangeData} type="text" name="brgy_dist" id="brgy_dist" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                    <div className="mt-2 md:px-32 px-12">
                      <label htmlFor="zip_code" className="block font-medium md:text-sm text-xs text-gray-700 dark:text-white text-left py-1 px-0.5">Zip Code</label>
                      <input value={userInfo.zip_code} onChange={handleChangeData} type="text" name="zip_code" id="zip_code" className="block w-full md:text-sm text-xs rounded border-0 py-1.5 text-gray-900 dark:text-white dark:bg-[#3d3d3d] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:md:text-sm text-xs sm:leading-6" />
                    </div>
                  </form>
                </div>
        )
  );
};

export default ContactInfo;
