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
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortOption, setSortOption] = useState('date_processed');


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

  const handleClearFilter = () => {
    setSearchInput([]);
    setFilteredTransactions([]);
    setSortOption('date_processed');
    setSortOrder('desc')
  };


  const handleSortChange = (option) => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
  
    setSortOption(option);
    setSortOrder(newOrder);
  };
  
  const sortTransactions = (transactions) => {
    return transactions.slice().sort((a, b) => {
      const valueA = a[sortOption];
      const valueB = b[sortOption];
  
      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

const sortedTransactions = sortTransactions(filteredTransactions.length > 0 ? filteredTransactions : userTransaction);


const SortIcon = ({ order }) => (
  <button className="group flex items-center px-1">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
      <path className="group-hover:stroke-black dark:group-hover:stroke-white cursor-pointer" strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
    </svg>
  </button>
  );


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
              handleClearFilter={handleClearFilter} 
              handleSortChange={handleSortChange}
              sortOption={sortOption}
              sortedTransactions={sortedTransactions} />
            ) : (
              // For Desktop View
              <TransDesktop searchInput={searchInput} 
              handleSearch={handleSearch} 
              handleSearchInputChange={handleSearchInputChange} 
              handleOpenModal={handleOpenModal} 
              handleClearFilter={handleClearFilter} 
              handleSortChange={handleSortChange}
              sortOption={sortOption}
              sortOrder={sortOrder}
              SortIcon={SortIcon}
              sortedTransactions={sortedTransactions} />
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
