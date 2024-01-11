import AdminDashRPForm from "../admin_components/AdminDashRPForm";
import { useDashboard } from '../DashboardContext';

function AdminDashRP() {
  const { taxPayment, taxClearance, topRegions, topProvinces, topCities, revenue } = useDashboard();

  return (
    <AdminDashRPForm 
    revenue={revenue}
    taxPayment={taxPayment}
    taxClearance={taxClearance}
    topRegions={topRegions}
    topProvinces={topProvinces}
    topCities={topCities}
    />
  );
}

export default AdminDashRP;