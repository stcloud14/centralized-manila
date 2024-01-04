import React from 'react';
import TaxPaymentModal from './TaxPaymentModal';
import TaxClearanceModal from './TaxClearanceModal';
import BusinessModal from './BusinessModal';
import CedulaModal from './CedulaModal';
import BirthModal from './BirthCertModal';
import DeathModal from './DeathCertModal';
import MarriageModal from './MarriageCertModal';

const ModalTransaction = ({ modalType, onClose, onSubmit, selectedTransaction, businessData }) => {

    let ModalComponent;
  
    switch (modalType) {
      case 'Real Property Tax Payment':
        ModalComponent = TaxPaymentModal;
        break;
      case 'Real Property Tax Clearance':
        ModalComponent = TaxClearanceModal;
        break;
      case 'Business Permit':
        ModalComponent = BusinessModal;
        break;
      case 'Community Tax Certificate':
        ModalComponent = CedulaModal;
        break;
      case 'Birth Certificate':
        ModalComponent = BirthModal;
        break;
      case 'Death Certificate':
        ModalComponent = DeathModal;
        break;
      case 'Marriage Certificate':
        ModalComponent = MarriageModal;
        break;
      default:
        ModalComponent = TaxPaymentModal;
        return null;
    }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <ModalComponent selectedTransaction={selectedTransaction} businessData={businessData} onClose={onClose} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default ModalTransaction;

