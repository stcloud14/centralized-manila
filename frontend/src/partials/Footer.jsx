import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Footer = ({ logo }) => {

  const location = useLocation();
  const { pathname } = location;
  const user_id = pathname.split("/")[2];

  return (
    <footer className="text-gray-500 text-xs mx-10">
      <div className="flex flex-col items-center sm:flex-row sm:items-center mx-10">
        <div className="mb-0">
          <img src={logo} alt="Company Logo" className="h-20" />
        </div>

        <div className="flex flex-col items-center sm:flex-row sm:ml-auto">
          <Link to={`/home/${user_id}`} className="sm:ml-0 sm:mr-8 md:mb-0 mb-2">News</Link>
          <Link to={`/about/${user_id}`} className="sm:ml-0 sm:mr-8 md:mb-0 mb-2">About</Link>
          <Link to={`/contacts/${user_id}`} className="sm:ml-0 sm:mr-8 md:mb-0 mb-2">Contact</Link>
          <Link to={`/faqs/${user_id}`} className="sm:ml-0 sm:mr-8 md:mb-0 mb-2">FAQs</Link>
          <Link to={`/privacypolicy/${user_id}`} className="mb-2 sm:mb-0 sm:ml-0 sm:mr-8">Privacy Policy</Link>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-500 mx-10 my-4" />

      <div className="text-center mt-2 mb-4 mx-10">
        <span>© 2024 Centralized Manila. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
