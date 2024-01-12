import AdminDashCTCForm from "../admin_components/AdminDashCTCForm";
import { useDashboard } from '../DashboardContext';

function AdminDashCTC() {
  const { cedulaCert, topRegions, topProvinces, topCities, revenue, totalCC } = useDashboard();

  return (
    <AdminDashCTCForm 
    revenue={revenue}
    totalCC={totalCC}
    cedulaCert={cedulaCert}
    topRegions={topRegions}
    topProvinces={topProvinces}
    topCities={topCities}
    />
  );
}

export default AdminDashCTC;