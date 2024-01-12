import AdminDashLCRForm from "../admin_components/AdminDashLCRForm";
import { useDashboard } from '../DashboardContext';

function AdminDashLCR() {
  const { birthCert, deathCert, marriageCert, topRegions, topProvinces, topCities, revenue, totalLCR } = useDashboard();

  return (
    <AdminDashLCRForm 
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