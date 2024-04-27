import AdminDashChiefForm from "../admin_components/AdminDashChiefForm";

import { useDashboard } from "../DashboardContext";

function AdminDashChief() {
  const { 
    transStats,
    transReport,
    revenue,
    verifiedUsers,
    totalPaid,
    taxPayment,
    taxClearance,
    businessPermit,
    cedulaCert,
    birthCert,
    deathCert,
    marriageCert,
    topRegions,
    topProvinces,
    topCities
  } = useDashboard();

  return (
    <AdminDashChiefForm 
    transStats={transStats}
    transReport={transReport}
    revenue={revenue}
    verifiedUsers={verifiedUsers}
    totalPaid={totalPaid}
    taxPayment={taxPayment}
    taxClearance={taxClearance}
    businessPermit={businessPermit}
    cedulaCert={cedulaCert}
    birthCert={birthCert}
    deathCert={deathCert}
    marriageCert={marriageCert}
    topRegions={topRegions}
    topProvinces={topProvinces}
    topCities={topCities}
    />
  );
}

export default AdminDashChief;