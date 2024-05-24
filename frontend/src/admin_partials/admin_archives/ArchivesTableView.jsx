import React from 'react';
import StatusBadgeDesktop from '../../partials/StatusBadgeDesktop';

const ArchivesTableView = ({ filteredTaxClearance, filteredTaxPayment, filteredBusinessPermit, filteredctcCedula, filteredBirthCert, filteredDeathCert, filteredMarriageCert, handleModalOpen, admin_type }) => {


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

  // Function to get the border color based on transaction type
  const getStatusColor = (transType) => {
    switch (transType) {
      case 'Real Property Tax Clearance':
        return 'border-l-blue-500';
      case 'Real Property Tax Payment':
        return 'border-l-[#0057e7]';
      case 'Business Permit':
        return 'border-l-[#d62d20]';
      case 'Community Tax Certificate':
        return 'border-l-[#ffa700]';
      case 'Birth Certificate':
        return 'border-l-[#008744]';
      case 'Death Certificate':
        return 'border-l-[#17bf6c]';
      case 'Marriage Certificate':
        return 'border-l-[#78ffbc]';
      default:
        return '';
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md rounded-sm">
      <table className="w-full text-xs md:text-sm rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-gray-700 border-l-4 dark:border-l-[#212121] uppercase bg-slate-200 dark:bg-[#212121] dark:text-slate-400">
          <tr>
            <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
              <div className="flex items-center pl-3">
                Transaction ID
              </div>
            </th>
            <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
              <div className="flex items-center">
                Date
              </div>
            </th>
            <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
              <div className="flex items-center">
                User ID
              </div>
            </th>
            <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
              <div className="flex items-center">
                Transaction Type
              </div>
            </th>
            <th scope="col" className="px-1 py-3 text-left text-xs font-bold dark:text-gray-300 uppercase">
              <div className="flex items-center">
                Status
              </div>
            </th>
          </tr>
        </thead>
        <tbody>

          {/* Display transactions */}
          {allTransactions.length === 0 && (
            <tr>
              <td colSpan="6" className="font-medium text-slate-600 items-center text-center py-4 justify-center dark:text-white">
                No records found.
              </td>
            </tr>
          )}

          {allTransactions.map((transaction) => (
            <tr onClick={() => handleModalOpen(transaction, transaction.trans_type)} key={transaction.transaction_id} className='cursor-pointer bg-white border-b dark:bg-[#333333] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3d3d3d]'>
              <td className={`px-1 py-2 border-l-4 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400 ${getStatusColor(transaction.trans_type)}`}>
                <div className="font-medium text-slate-600 whitespace-nowrap dark:text-white pl-3">
                  {transaction.transaction_id}
                </div>
              </td>
              <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                {transaction.date}
              </td>
              <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                {transaction.user_id}
              </td>
              <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                {transaction.trans_type}
              </td>
              <td className="px-1 py-2 whitespace-nowrap text-xs md:text-sm text-slate-500 dark:text-slate-400">
                <StatusBadgeDesktop statusType={transaction.status_type} />
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default ArchivesTableView;
