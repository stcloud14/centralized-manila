import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import ModalTransaction from '../partials/transactionModal/ModalTransaction';
import TransMobile from '../partials/transactionHistory/transMobile';
import TransDesktop from '../partials/transactionHistory/transDesktop';


const TransactionHistoryForm = () => {

  const location = useLocation();
  const { pathname } = location;
  const user_id = pathname.split("/")[2];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userTransaction, setUserTransaction] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);


  useEffect(() => {
    const fetchUserTransaction = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/transachistory/${user_id}`);
        setUserTransaction(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserTransaction();
  }, [user_id]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (transaction) => {
    setIsModalOpen(true);
    setSelectedTransaction(transaction);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleSearchInputChange = (e) => {
    const input = e.target.value;
    const inputUpperCase = input.toUpperCase();

    setSearchInput(inputUpperCase);
  };

  const handleSearch = () => {

    const filteredTransactions = userTransaction.filter(transaction => 
    transaction.transaction_id.toString().includes(searchInput)
    );
  
    setFilteredTransactions(filteredTransactions);
  };


  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="flex flex-col h-full justify-between mx-4 mt-4">
                 
            {isMobileView ? (           
              // For Mobile View
              <TransMobile searchInput={searchInput} 
              handleSearch={handleSearch} 
              handleSearchInputChange={handleSearchInputChange} 
              handleOpenModal={handleOpenModal} 
              userTransaction={userTransaction} 
              filteredTransactions={filteredTransactions}/>
            ) : (
              // For Desktop View
              <TransDesktop searchInput={searchInput} 
              handleSearch={handleSearch} 
              handleSearchInputChange={handleSearchInputChange} 
              handleOpenModal={handleOpenModal} 
              userTransaction={userTransaction} 
              filteredTransactions={filteredTransactions}/>
            )}
          </div>
        </main>

        {isModalOpen && selectedTransaction && (
          <ModalTransaction selectedTransaction={selectedTransaction} modalType={selectedTransaction.trans_type} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

export default TransactionHistoryForm;
