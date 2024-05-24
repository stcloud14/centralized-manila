import React from 'react';

const ArchivesCardView = ({ filteredTaxClearance, filteredTaxPayment, filteredBusinessPermit, filteredctcCedula, filteredBirthCert, filteredDeathCert, filteredMarriageCert, handleModalOpen, admin_type }) => {
  
  let allTransactions = [];
  switch(admin_type) {
    case 'rptax_admin':
      allTransactions = [...filteredTaxClearance, ...filteredTaxPayment];
      break;
    case 'business_admin':
      allTransactions = [...filteredBusinessPermit];
      break;
    case 'cedula_admin':
      allTransactions = [...filteredctcCedula];
      break;
    case 'lcr_admin':
      allTransactions = [...filteredBirthCert, ...filteredDeathCert, ...filteredMarriageCert];
      break;
    default:
      allTransactions = [];
  }

  // Sort transactions based on date, with the latest on top
  allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  const getStatusColor = (transType) => {
    switch (transType) {
      case 'Real Property Tax Clearance':
        return 'border-blue-500';
      case 'Real Property Tax Payment':
        return 'border-[#0057e7]';
      case 'Business Permit':
        return 'border-[#d62d20]';
      case 'Community Tax Certificate':
        return 'border-[#ffa700]';
      case 'Birth Certificate':
        return 'border-[#008744]';
      case 'Death Certificate':
        return 'border-[#17bf6c]';
      case 'Marriage Certificate':
        return 'border-[#78ffbc]';
      default:
        return '';
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-4">
      
      {/* Render filtered transactions */}
      {allTransactions.map(transaction => (
        <div 
          onClick={(e) => handleModalOpen(transaction, transaction.trans_type, e)} 
          key={transaction.transaction_id} 
          className={`cursor-pointer bg-white dark:bg-[#333333] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] rounded-sm flex flex-col ${getStatusColor(transaction.trans_type)}`}
        >
          <div className={`text-xs font-semibold border-t-4 ${getStatusColor(transaction.trans_type)} text-slate-60 bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-sm px-4 py-1.5`}>
            Transaction ID: {transaction.transaction_id}
          </div>

          <div className="flex-grow px-4 pt-5 pb-4">
            <div className="text-xs text-slate-600 dark:text-slate-300 my-1">User ID: {transaction.user_id}</div>
            <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Type: {transaction.trans_type}</div>
            <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Date Processed: {transaction.date}</div>
            <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Time Processed: {transaction.time}</div>
            <div className="flex justify-start items-center text-xs text-slate-600 dark:text-slate-300 my-1">
              <span>Status: {transaction.status_type}</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Amount Paid: P {transaction.amount}</div>
          </div>
        </div>
      ))}
      
      {/* Render no records found message */}
      {allTransactions.length === 0 && (
        <div className="font-medium text-slate-600 items-center text-center py-4 justify-center dark:text-white col-span-full">
          No records found.
        </div>
      )}
    </div>
  );
};

export default ArchivesCardView;
