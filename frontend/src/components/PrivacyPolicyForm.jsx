import React, { useState, useRef, useEffect } from 'react';

import axios from 'axios';

import Footer from '../partials/Footer';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { useParams, useNavigate } from 'react-router-dom';

const PrivacyPolicyForm =()=>{

  const { user_id } = useParams();

  const contentRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
      {/* Sidebar */}
      {user_id && (
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      {user_id && (
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}

        {/*  Content Area of 3rd Button */}
        <main ref={contentRef} className="overflow-y-auto">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-10 py-5">
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
                Centralized<span className='text-blue-600'> M</span>
                    <span className='text-red-500'>a</span>
                    <span className='text-yellow-500'>n</span>
                    <span className='text-green-500'>i</span>
                    <span className='text-blue-600'>l</span>
                    <span className='text-red-500'>a</span> acknowledges its obligations under Republic Act No. 10173, commonly referred to as the Data Privacy Act of 2012, and is dedicated to safeguarding your Personal Information.
                <br/><br/>
                </span>
              <h1 className="text-slate-800 dark:text-slate-100 font-medium">Coverage</h1>
                <br/>
              <span className="text-left text-slate-700 dark:text-white">
                Your Personal Information is required for registration on our web application, which includes, at a minimum, your full name, address, email, and contact number. Your Personal Information is additionally necessary for the billing company or government agency to process your payments through the Centralized Manila System. This encompasses your full name, account number, date of birth, address, contact number, and Government ID details (where applicable).
              </span>
                <br/><br/>
              <h1 className="text-slate-800 dark:text-slate-100 font-medium">Data Collection and Utilization</h1>
                <br/>
              <span className="text-left text-slate-700 dark:text-white">
                We gather your personal information primarily to verify your identity and ensure the accuracy of your payment details. Your payment data is encrypted through our secure payment system and then uploaded for your payment/s. Moreover, your information may and will only be utilized for the following purposes:
              </span>
                <br/><br/>
            <div className="ml-3">
              <span className="text-left text-slate-700 dark:text-white">
                Inquiry into payment history;
                <br/><br/>
                Processing of document request;
                <br/><br/>
                Centralized Manila advisories and updates;
                <br/><br/>
                Centralized Manila will not disclose your personal information to third parties without your consent, except when such disclosure or data sharing is mandated by applicable laws necessary for the aforementioned purposes.
              </span>
            </div>
              <br/>
              <span className="text-left text-slate-700 dark:text-white">
                Please direct any complaints to the DATA PROTECTION OFFICER via this email: centralizedmanila@gmail.com
              </span>
              <br/><br/>
              <h1 className="text-slate-800 dark:text-slate-100 font-medium">Data Retention</h1>
                <br/>
              <span className="text-left text-slate-700 dark:text-white">
                Your registered Personal Information and payment information will be retained in our database for as long as required by National laws, regulations, and guidelines. Centralized Manila has implemented suitable organizational, physical, and technical security measures to ensure the safeguarding of your personal information.
              </span>
                <br/><br/>
              <h1 className="text-slate-800 dark:text-slate-100 font-medium">Customer Consent and Declaration</h1>
                <br/>
              <span className="text-left text-slate-700 dark:text-white">
                The Personal and Payment Information I provide will be made in good faith, verified to the best of my knowledge, pursuant to any applicable Laws and Regulations. I fully understand that Centralized Manila is authorized to accept and process payments and documents submitted through its web application.
              </span>
                <br/><br/>
              <span className="text-left text-slate-700 dark:text-white">
              Furthermore, I have reviewed Centralized Manila’s Data Privacy Statement and hereby voluntarily and freely provide my consent for Centralized Manila to collect, encrypt, transmit, process, analyze, retrieve, update, or modify my personal data for registration on Centralized Manila’s online portal and processing of my bills payment. I also affirm my rights:
              </span>
                <br/><br/>
              <div className="ml-3">
              <span className="text-left text-slate-700 dark:text-white">
                • Right to be informed,
                <br/>
                • Right to access,
                <br/>
                • Right to object,
                <br/>
                • Right to erase or block,
                <br/>
                • Right to rectify,
                <br/>
                • Right to damages,
                <br/>
                • Right to data portability.
              </span>
            </div>
                {/* <br/>
              <span className="text-left text-slate-700 dark:text-white">2. Information we process or generate after the collection. When applying to City Government of Manila, as an employee, we may also collect additional information about you, including</span>
                <br/>
            <div className="ml-3 text-left text-slate-700 dark:text-white ">
              <p className="mb-1 mt-2">1. Name</p>
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
                  <p className="mb-1">• Spouse’s Name</p>
                  <p className="mb-1">• Occupation </p>
                  <p className="mb-1">• Employer/Business Name</p>
                  <p className="mb-1">• Telephone Number</p>
                  <p className="mb-1">• Father’s Name</p>
                  <p className="mb-1">• Mother’s Name </p>
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
              <p className="">36. Signature </p>
            </div>
              <br/>
            <span className="text-left text-slate-700 dark:text-white">
              3. Receipt of Unrequested Information. There may be situations where personal data is sent to us or received by us without a prior request. In such instances, we will assess the legitimacy of retaining such information. If it does not align with any of our genuine interests, we will promptly dispose of the information in a manner ensuring your privacy protection. Otherwise, it will be handled with the same level of confidentiality and security as the information you intentionally provide us.
              <br/><br/>
              In the event that you supply us with personal data belonging to other individuals (e.g., heirs), we will require you to affirm that you have obtained the consent of such individuals. This affirmation can be done through a consent form provided by the Data Protection Officer (DPO) of the City Government of Manila.
            </span>
            <br/><br/>
            <h1 className="text-slate-800 dark:text-slate-100 font-medium">Information We Collect, Acquire, or Generate</h1>
            <span className="text-left text-slate-700 dark:text-white">
              <br/>
              To the extent permitted or required by law, we use your personal data to pursue our legitimate interests as a local government unit of the City of Manila, including a variety of administrative, research, historical, and statistical purposes. For example, we may use the information we collect for purposes such as but not limited to:
            </span>
            <div className="ml-3 text-left text-slate-700 dark:text-white ">
              <p className="mb-1 mt-2">1. Job Application</p>
              <p className="mb-1">2. Payroll Processing</p>
              <p className="mb-1">3. Avail the City of Manila Health Services</p>
              <p className="mb-1">4. Register for Covid-19 Vaccination</p>
              <p className="mb-1">5. Transact with the City of Manila Civil Registry</p>
              <p className="mb-1">6. Avail services of the Social Welfare</p>
              <p className="mb-1">7. Register as Senior Citizen resident of the City and avail its services</p>
              <p className="mb-1">8. Apply for employment in the City of Manila</p>
              <p className="mb-1">9. Apply for Manila Resident ID</p>
              <p className="mb-1">10. Utilize any of the City of Manila Electronic Data Processing System</p>
              <p className="mb-1">11. Avail service of the City Library</p>
              <p className="mb-1">12. Carryout transaction concerning Business Permit</p>
              <p className="mb-1">13. Carryout Transaction concerning Real Property Tax</p>
              <p className="mb-1">14. Bids and Awards activities, or</p>
              <p className="">15. Any for any other legitimate transaction with the city</p>
            </div>
              <br/>
            <span className="text-left text-slate-700 dark:text-white">
              We view the processing of your personal data for these purposes as essential for fulfilling our contractual commitments to you, ensuring compliance with legal obligations, safeguarding your crucial interests, such as life and health, executing tasks in the public interest (e.g., public order, public safety, etc.), or promoting the legitimate interests of the City Government of Manila or a third party, among other considerations. We acknowledge the more stringent regulations imposed by the Data Privacy Act (DPA) on processing sensitive personal information and privileged information, and we are wholeheartedly dedicated to adhering to these regulations.
              <br/><br/>
              Should we necessitate your consent for any specific use of your personal data, we will seek it at the appropriate juncture.
              <br/><br/>
              It's important to note additionally that we will refrain from subjecting your personal data to any automated decision-making process without obtaining your prior consent.
            </span>
              <br/><br/>
            <h1 className="text-slate-800 dark:text-slate-100 font-medium">How we Share, Disclose, or Transfer Your Information</h1>
              <br/>
            <span className="text-left text-slate-700 dark:text-white">
              As allowed or mandated by law, we may also distribute, reveal, or convey your personal data to other individuals or entities to safeguard your interests and/or advance our legitimate interests as an educational institution. For instance, we might disclose, share, or transfer your personal data for the following purposes:
            </span>
            <div className="ml-3 text-left text-slate-700 dark:text-white ">
              <p className="mb-1 mt-2">1. Internal and External Audit activities</p>
              <p className="mb-1">2. Availment of the City of Manila programs</p>
                <div className="ml-5">
                  <p className="mb-1">• Manila Department of Social Welfare (MDSW) programs</p>
                  <p className="mb-1">• Office For Senior Citizen Affair (OSCA)</p>
                  <p className="mb-1">• Youth Development and Welfare Bureau Program like Sports Clinic</p>
                  <p className="mb-1">• City of Manila Health Services</p>
                </div>
              <p className="">3. And other programs of the City of Manila</p>
            </div>
              <br/>
            <h1 className="text-slate-800 dark:text-slate-100 font-medium">How we Store, Retain, and Dispose of your Information</h1>
              <br/>
            <span className="text-left text-slate-700 dark:text-white">
              Your personal information is securely stored and transmitted through various paper and electronic formats, including databases shared among different units or offices within the City Government of Manila. Access to data covered by this policy is limited to individuals specified in this policy, whose roles necessitate access to such data. We assure you that the utilization of your personal information will be appropriate and not excessive. This policy is applicable to:
            </span>
            <div className="ml-3 text-left text-slate-700 dark:text-white ">
              <p className="mb-1 mt-2">1. The department/units of the City Government of Manila</p>
              <p className="mb-1">2. All employees of the City Government of Manilla</p>
              <p className="mb-1">3. All citizen/entities being served in various service units of the City Government of Manila such as but not limited to:</p>
                <div className="ml-5">
                  <p className="mb-1">• Health Services</p>
                  <p className="mb-1">• Civil Registry</p>
                  <p className="mb-1">• Public Employment Services</p>
                  <p className="mb-1">• City Library</p>
                  <p className="mb-1">• Manila Department of Social Welfare (MDSW) programs</p>
                  <p className="mb-1">• Office For Senior Citizens Affair (OSCA)</p>
                  <p className="mb-1">• Youth Development and Welfare Bureau</p>
                </div>
              <p className="">4. All contractors, suppliers, bidders, and other people working on behalf of the city.</p>
            </div>
            <br/>
            <h1 className="text-slate-800 dark:text-slate-100 font-medium">General Staff Guidelines</h1>
              <br/>
            <span className="text-left text-slate-700 dark:text-white">
              Only individuals covered by this policy, whose roles inherently demand access to such data, are authorized to retrieve information.
              <br/><br/>
              Unless specified otherwise by law or relevant policies, we will retain your pertinent personal information indefinitely for historical and statistical purposes. If a retention period is mandated by law and/or City Government of Manila policies, all relevant records will be securely disposed of after the specified period.
            </span>
              <br/><br/>
            <h1 className="text-slate-800 dark:text-slate-100 font-medium">Under the Data Privacy Act of 2012, you have the following rights:</h1>
            <div className="ml-3 text-left text-slate-700 dark:text-white ">
              <p className="mb-1 mt-2">• Right to be informed,</p>
              <p className="mb-1">• Right to access,</p>
              <p className="mb-1">• Right to object,</p>
              <p className="mb-1">• Right to erase or block,</p>
              <p className="mb-1">• Right to rectify,</p>
              <p className="mb-1">• Right to damages,</p>
              <p className="mb-1">• Right to object,</p>
              <p className="mb-1">• Right to data portability and</p>
              <p className="">• Right to file a complaint.</p>
            </div>
              <br/>
            <span className="text-left text-slate-700 dark:text-white">
            We acknowledge these rights in relation to your personal information, as outlined by the DPA. If you desire to exercise any of these rights or have any concerns, questions, or inquiries related to them, this Notice, or any data privacy matters, you can reach out to the designated Data Protection Officer (DPO) of the City Government of Manila at the following contact details:
              <br/><br/>
            The DPO Office: 
              <br/>
            Email: manila.dpo@gmail.com
            </span>
              <br/><br/>
            <h1 className="text-slate-800 dark:text-slate-100 font-medium">Changes in the Privacy Notice</h1>
              <br/>
            <span className="text-left text-slate-700 dark:text-white">
              We reserve the right to periodically update this Privacy Notice. In such instances, we will inform you through our website/s and, where applicable, alternative communication channels. Any changes take effect immediately upon being posted on the website.
            </span>
              <br/><br/>
            <h1 className="text-slate-800 dark:text-slate-100 font-medium">Other City of Manila Policies</h1>
              <br/>
            <span className="text-left text-slate-700 dark:text-white">
              The City Government of Manila's additional policies, insofar as they align with this Privacy Notice, will remain in effect. In the event that any provision of this Notice is deemed unenforceable or invalid by a court with competent jurisdiction, the invalidity of that particular provision will not impact the validity of the remaining provisions, which will continue to be fully effective.
            </span> */}
            </div>
          </div>
          {user_id && (
          <Footer />
          )}
        </main>


      </div>
    </div>
  );
}

export default PrivacyPolicyForm;