
import { AdminLayout } from "@/components/admin/admin-layout";
import { CreatorsTab } from "@/components/admin/tabs/creators-tab";

const AdminCreatorsPage = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Creators Management</h1>
      <CreatorsTab />
    </AdminLayout>
  );
};

export default AdminCreatorsPage;
