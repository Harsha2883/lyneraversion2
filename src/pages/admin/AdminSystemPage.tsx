
import { AdminLayout } from "@/components/admin/admin-layout";
import { SystemManagement } from "@/components/admin/system-management/system-management";

const AdminSystemPage = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Internal System Management</h1>
      <SystemManagement />
    </AdminLayout>
  );
};

export default AdminSystemPage;
