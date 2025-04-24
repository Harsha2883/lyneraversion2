
import { AdminLayout } from "@/components/admin/admin-layout";
import { LearnersTab } from "@/components/admin/tabs/learners-tab";

const AdminLearnersPage = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Learners Management</h1>
      <LearnersTab />
    </AdminLayout>
  );
};

export default AdminLearnersPage;
