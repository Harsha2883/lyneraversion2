
import { AdminLayout } from "@/components/admin/admin-layout";
import { LearnersManagement } from "@/components/admin/learner-management/learners-management";

const AdminLearnersPage = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Learners Management</h1>
      <LearnersManagement />
    </AdminLayout>
  );
};

export default AdminLearnersPage;
