
import { AdminLayout } from "@/components/admin/admin-layout";
import { InternalSystemTab } from "@/components/admin/tabs/internal-system-tab";

const AdminSystemPage = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Internal System Management</h1>
      <InternalSystemTab />
    </AdminLayout>
  );
};

export default AdminSystemPage;
