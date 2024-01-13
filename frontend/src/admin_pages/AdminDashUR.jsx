import AdminDashURForm from "../admin_components/AdminDashURForm";

import { useDashboard } from "../DashboardContext";

function AdminDashUR() {
  const { 
    verifiedUsers,
    topRegions,
    topProvinces,
    topCities
  } = useDashboard();
  return (
    <AdminDashURForm 
    verifiedUsers={verifiedUsers}
    topRegions={topRegions}
    topProvinces={topProvinces}
    topCities={topCities}
    />
  );
}

export default AdminDashUR;