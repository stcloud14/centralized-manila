import React, { useState, useRef } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

const PrivacyPolicyForm =()=>{

  const contentRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/*  Content Area of 3rd Button */}
        <main ref={contentRef} className="overflow-y-auto">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
              <h1 className="font-medium text-center text-slate-700 dark:text-white">Privacy Policy</h1>
                <br/>
                  <h1 className="text-slate-800 dark:text-slate-100 font-medium">
                     Welcome to Centralized
                    <span className='text-blue-600'> M</span>
                    <span className='text-red-500'>a</span>
                    <span className='text-yellow-500'>n</span>
                    <span className='text-green-500'>i</span>
                    <span className='text-blue-600'>l</span>
                    <span className='text-red-500'>a</span>
                   </h1>
                  <br/>
              <span className="text-left text-slate-700 dark:text-white">
                This Privacy Notice outlines our approach to the information we gather, detailing how we collect, use, share, store, and process your personal data. We are committed to respecting your privacy rights and adhering to applicable privacy and data protection laws, with a specific focus on the Data Privacy Act of 2012 (DPA). Similar to the National Privacy Commission (NPC), we strive to maintain a balance between safeguarding your personal privacy and facilitating the exchange of information, especially in the pursuit of our legitimate interests and fulfilling our responsibilities.
                <br/><br/>
                In this notification, we use the terms "data" and "information" interchangeably. When referring to "personal data," we encompass the notions of personal information, sensitive personal information, and privileged information. The first two are commonly employed to uniquely identify you. For precise definitions, you can consult the DPA text or visit the office of the designated Data Protection Officer in Manila. It is essential to recognize that the examples provided in this Privacy Notice, though illustrative, do not constitute an exhaustive list of all the data we handle.
                <br/><br/>
                </span>
              <h1 className="text-slate-800 dark:text-slate-100 font-medium">Information We Collect, Acquire, or Generate</h1>
                <br/>
              <span className="text-left text-slate-700 dark:text-white">
                We collect, obtain, or produce your personal data in a variety of ways. Written paperwork, photo and video records, digital content, and even biometric records may be among them. As examples, consider:
                <br/><br/>
                1. Details you give us when making a purchase. Among other things, we gather when you deal with us:
              </span>
                <br/><br/>
            <div className="ml-3">
              <span className="text-left text-slate-700 dark:text-white">
                a. information from a directory, such as name, address, gender, birthdate, place of birth, phone number, email address, citizenship, education, age, and other pertinent details pertaining to the dealings with the City Government of Manila;
                <br/><br/>
                b. Information about your individual circumstances, including your history, family background, marital status, government records, and any other pertinent circumstances or job history; and
                <br/><br/>
                c. Any and all data gathered via interviews and/or other methods of gathering personal information</span>
            </div>
                <br/>
              <span className="text-left text-slate-700 dark:text-white">2. Information we process or generate after the collection. When applying to City Government of Manila, as an employee, we may also collect additional information about you, including</span>
                <br/><br/>
            <div className="ml-3 text-left text-slate-700 dark:text-white ">
              <p className="mb-1">1. Name</p>
              <p className="mb-1">2. Address</p>
              <p className="mb-1">3. Date of Birth</p>
              <p className="mb-1">4. Place of Birth </p>
              <p className="mb-1">5. Sex</p>
              <p className="mb-1">6. Civil Status</p>
              <p className="mb-1">7. Height</p>
              <p className="mb-1">8. Weight</p>
              <p className="mb-1">9. Blood Type</p>
              <p className="mb-1">10. GSIS ID No.</p>
              <p className="mb-1">11. PagIBIG No.</p>
              <p className="mb-1">12. PhilHealth No.</p>
              <p className="mb-1">13. SSS No.</p>
              <p className="mb-1">14. Tin No. </p>
              <p className="mb-1">15. Citizenship</p>
              <p className="mb-1">16. Residential Address</p>
              <p className="mb-1">17. Zipcode</p>
              <p className="mb-1">18. Telephone Number</p>            
              <p className="mb-1">19. Mobile Number</p>           
              <p className="mb-1">20. Email Address</p>
              <p className="mb-1">21. Family Background</p>
                <div className="ml-5">
                  <p className="mb-1">•  Spouse’s Name</p>
                  <p className="mb-1">•  Occupation </p>
                  <p className="mb-1">•  Employer/Business Name</p>
                  <p className="mb-1">•  Telephone Number</p>
                  <p className="mb-1">•  Father’s Name</p>
                  <p className="mb-1">•  Mother’s Name </p>
                </div>
              <p className="mb-1">23. Civil Service Eligibility</p>
              <p className="mb-1">24. Work Experience</p>
              <p className="mb-1">25. Voluntary Work or Involvement in Civic / Non-Government / People / Voluntary Organization/s</p>
              <p className="mb-1">26. Learning and Development (L&D) Interventions/Training Programs Attended</p>
              <p className="mb-1">27. Special Skills and Hobbies </p>
              <p className="mb-1">28. Consanguinity of affinity to the appointing or recommending chief bureau or office or to the person who has immediate supervision over you in the Bureau or Department where you will be appointed </p>
              <p className="mb-1">29. Administrative Offense / criminal charges before any court </p>
              <p className="mb-1">30. Crime violation of any law, decree, ordinance or regulation by any court or tribunal </p>
              <p className="mb-1">31. Separation from service</p>
              <p className="mb-1">32. Candidate in National or local election</p>
              <p className="mb-1">33. Acquired status of an immigrant or permanent resident of another country</p>
              <p className="mb-1">34. Indigenous/Person with disability/ Solo Parent</p>
              <p className="mb-1">35. Character References</p>
              <p className="mb-1">36. Signature </p>
              <p className="mb-1">15. Citizenship</p>
              <p className="mb-1">16. Residential Address</p>
              <p className="mb-1">17. Zipcode</p>
              <p className="mb-1">18. Telephone Number</p>            
              <p className="mb-1">19. Mobile Number</p>           
              <p className="mb-1">20. Email Address</p>
              <p className="">21. Family Background</p>
            </div>
            <br/>
            <span className="text-left text-slate-700 dark:text-white">3. Unsolicited Information. There may be instances when personal information is sent to of received by us even without our prior request. In such cases, we will determine if we can legitimately keep such information. If it is not related to any of our legitimate interests, we will immediately dispose of the information in a way that will safeguard your privacy. Otherwise, it will be treated in the same manner as information you provide us as confidential and secure.</span>
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            </div>
          </div>
        </main>


      </div>
    </div>
  );
}

export default PrivacyPolicyForm;