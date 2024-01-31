import AdminDashLCRForm from "../admin_components/AdminDashLCRForm";
import { useDashboard } from '../DashboardContext';

function AdminDashLCR() {
  const { transStats, birthCert, deathCert, marriageCert, topRegions, topProvinces, topCities, revenue, totalLCR } = useDashboard();

  return (
    <AdminDashLCRForm 
    transStats={transStats}
    revenue={revenue}
    totalLCR={totalLCR}
    birthCert={birthCert}
    deathCert={deathCert}
    marriageCert={marriageCert}
    topRegions={topRegions}
    topProvinces={topProvinces}
    topCities={topCities}
    />
  );
}

export default AdminDashLCR;