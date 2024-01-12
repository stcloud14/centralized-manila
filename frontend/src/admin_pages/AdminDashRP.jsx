import AdminDashRPForm from "../admin_components/AdminDashRPForm";
import { useDashboard } from '../DashboardContext';

function AdminDashRP() {
  const { taxPayment, taxClearance, topRegions, topProvinces, topCities, revenue, totalRP } = useDashboard();

  return (
    <AdminDashRPForm 
    revenue={revenue}
    totalRP={totalRP}
    taxPayment={taxPayment}
    taxClearance={taxClearance}
    topRegions={topRegions}
    topProvinces={topProvinces}
    topCities={topCities}
    />
  );
}

export default AdminDashRP;