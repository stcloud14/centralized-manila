import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import ModalTransaction from '../partials/transactionModal/ModalTransaction';
import TransMobile from '../partials/transactionHistory/transMobile';
import TransDesktop from '../partials/transactionHistory/transDesktop';


const TransactionHistoryForm = () => {
  
  const { user_id } = useParams();
  const navigate = useNavigate();
  const Base_Url = process.env.Base_Url;


  useEffect(() => {
    const token = localStorage.getItem('token');
    const checkToken = async (token) => {
        try {
            // Make a request to backend API to verify token and check user access
            const response = await axios.get(`${Base_Url}token/protect-token/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            window.location.href = '/';
        }
    };
    if (token) {
        checkToken(token); 
    } else {
        window.location.href = '/';
    }
}, [user_id]);


  // const location = useLocation();
  // const { pathname } = location;
  // const user_id = pathname.split("/")[2];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userTransaction, setUserTransaction] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortOption, setSortOption] = useState('date_processed');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDatee, setSelectedDatee] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [userPersonal, setUserPersonal]=useState({});
  const [soaData, setSoaData]=useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  console.log(userTransaction)

  useEffect(() => {
    const fetchUserPersonal = async () => {
      try {
        const res = await axios.get(`${Base_Url}profile/${user_id}`);
        setUserPersonal(res.data.user_personal[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserPersonal();
  }, [user_id]);

  useEffect(() => {
    const fetchUserTransaction = async () => {
      try {
        const res = await axios.get(`${Base_Url}transachistory/${user_id}`);
        const transactions = res.data;

        // Sort transactions by date in descending order (newest to oldest)
        const sortedTransactions = transactions.slice().sort((a, b) => {
          const dateA = new Date(a.date_processed);
          const dateB = new Date(b.date_processed);
          return dateB - dateA;
        });

        setUserTransaction(sortedTransactions);
        setFilteredTransactions(sortedTransactions);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserTransaction();
  }, [user_id]);

  useEffect(() => {
    const fetchSOAdata = async () => {
      try {
        const res = await axios.get(`${Base_Url}soa/${user_id}`);
        setSoaData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSOAdata();
  }, [user_id]);

  console.log(soaData)

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
  
  const handleSearch = () => {
    const filteredTransactions = userTransaction
      .filter((transaction) => {
        const transactionId = transaction.transaction_id.toString().toUpperCase();
        const searchInputUpper = searchInput.toUpperCase();
  
        const isDateInRange = (() => {
          if (!selectedDate || !selectedDatee) {
            return true; // No date range selected, include all transactions
          }
  
          const transactionDate = new Date(transaction.date_processed);
          const startDate = new Date(selectedDate);
          const endDate = new Date(selectedDatee);
          endDate.setHours(23, 59, 59, 999);
  
          return startDate <= transactionDate && transactionDate <= endDate;
        })();
  
        return (
          transactionId.includes(searchInputUpper) &&
          isSubsequence(searchInputUpper, transactionId) &&
          isDateInRange && // Check if the date is in range
          (!selectedType || selectedType === 'All' || parseInt(selectedType) === 0 || transaction.trans_type === selectedType) &&
          (!selectedStatus || selectedStatus === 'All' || transaction.status_type.toLowerCase() === selectedStatus.toLowerCase())
        );
      })
      .filter((transaction) => {
        // Exclude records with trans_type as null or 'default'
        return transaction.trans_type !== null && transaction.trans_type.toLowerCase() !== 'default';
      })
      .sort((a, b) => {
        // Sort the transactions based on the selected option and order
        const valueA = a[sortOption];
        const valueB = b[sortOption];
  
        if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  
    setFilteredTransactions(filteredTransactions);
  
    // Calculate isButtonDisabled based on filteredTransactions and selectedStatus
    // const isButtonDisabled = ['Paid', 'Processing', 'Expired', 'Canceled', 'Complete', 'Rejected'].includes(selectedStatus) || filteredTransactions.length === 0;
  
    // Update the state of isButtonDisabled
    // setIsButtonDisabled(isButtonDisabled);
  
    // setSelectedType('');
    // setSelectedStatus('');
  };

  useEffect(() => {
    const isButtonDisabled =
      ['Paid', 'Processing', 'Expired', 'Canceled', 'Complete', 'Rejected'].includes(selectedStatus) || filteredTransactions.length === 0;

    setIsButtonDisabled(isButtonDisabled);
  }, [filteredTransactions, selectedStatus]);
  
     
  // Make sure that the transaction searching is the same order in terms of characters
  const isSubsequence = (search, str) => {
    let i = 0;
    let j = 0;
  
    while (j < str.length) {
      if (search[i] === str[j]) {
        i += 1;
      }
      if (i === search.length) {
        return true;
      }
      j += 1;
    }
  
    return false;
  };

  const handleClearFilter = () => {
    setSearchInput('');
    setFilteredTransactions(userTransaction);
    setSortOption('date_processed');
    setSortOrder('desc');
    setSelectedDate('');
    setSelectedDatee('');
    setSelectedStatus('');
    setSelectedType('');
    setIsButtonDisabled(false);
  };

  // For handle sorting and filtering
  useEffect(() => {
  }, [filteredTransactions, sortOption, sortOrder, selectedDate, selectedDatee, selectedType, selectedStatus]);

  const handleInputChange = (e) => {
    const selectedType = e.target.value;
    console.log("Dropdown Value Changed:", selectedType);
    setSelectedType(selectedType);
  };
  
  const handleInputChange2 = (e) => {
    const selectedStatus = e.target.value;
    console.log("Dropdown Value Changed:", selectedStatus);
    setSelectedStatus(selectedStatus);
  };

  //Clickable Icon of date, type, and etc
  
const handleSortChange = (newSortOption) => {
  // Toggle between ascending and descending order
  const newSortOrder =
  sortOption === newSortOption ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
  setSortOrder(newSortOrder);
  setSortOption(newSortOption);

  // Sort transactions based on the selected option and order
  const sortedTransactions = sortTransactions(newSortOption, newSortOrder);

  // Update the state with the sorted transactions
  setFilteredTransactions(sortedTransactions);
};

const sortTransactions = (option, order) => {
  return userTransaction.slice().sort((a, b) => {
    let valueA, valueB;

    if (option === 'date_processed') {
      valueA = new Date(a.date_processed);
      valueB = new Date(b.date_processed);
    } else if (option === 'status_type') {
      valueA = a.status_type.toLowerCase();
      valueB = b.status_type.toLowerCase();
    } else if (option === 'trans_type') {
      valueA = a.trans_type;
      valueB = b.trans_type;
    } else if (option === 'amount') {
      valueA = parseFloat(a.amount);
      valueB = parseFloat(b.amount);
    } else {
      // Handle other sorting criteria if needed
    }

    if (valueA < valueB) return order === 'asc' ? -1 : 1;
    if (valueA > valueB) return order === 'asc' ? 1 : -1;
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

        <main className="overflow-y-auto">
          <div className="flex flex-col justify-between mx-4 mt-4">
            {isMobileView ? (
              // For Mobile View
              <TransMobile 
                searchInput={searchInput}   
                setSearchInput={setSearchInput}
                handleSearch={handleSearch} 
                handleOpenModal={handleOpenModal} 
                handleClearFilter={handleClearFilter} 
                handleSortChange={handleSortChange}
                sortOption={sortOption}
                sortOrder={sortOrder}
                SortIcon={SortIcon}
                sortedTransactions={sortedTransactions} 
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedDatee={selectedDatee}
                setSelectedDatee={setSelectedDatee}
                selectedStatus={selectedStatus}
                handleInputChange={handleInputChange}
                handleInputChange2={handleInputChange2}
                selectedType={selectedType}
                filteredTransactions={filteredTransactions}
                userPersonal={userPersonal}
                soaData={soaData}
                isButtonDisabled={isButtonDisabled}
              />
            ) : (
              // For Desktop View
              <TransDesktop 
                searchInput={searchInput} 
                setSearchInput={setSearchInput}
                handleSearch={handleSearch} 
                handleOpenModal={handleOpenModal} 
                handleClearFilter={handleClearFilter} 
                handleSortChange={handleSortChange}
                sortOption={sortOption}
                sortOrder={sortOrder}
                SortIcon={SortIcon}
                sortedTransactions={sortedTransactions} 
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedDatee={selectedDatee}
                setSelectedDatee={setSelectedDatee}
                selectedStatus={selectedStatus}
                handleInputChange={handleInputChange}
                handleInputChange2={handleInputChange2}
                selectedType={selectedType}
                filteredTransactions={filteredTransactions}
                userPersonal={userPersonal}
                soaData={soaData}
                isButtonDisabled={isButtonDisabled}
              />
            )}
          </div>
          <Footer />
        </main>

        {isModalOpen && selectedTransaction && (
          <ModalTransaction user_id={user_id} selectedTransaction={selectedTransaction} modalType={selectedTransaction.trans_type} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

export default TransactionHistoryForm;