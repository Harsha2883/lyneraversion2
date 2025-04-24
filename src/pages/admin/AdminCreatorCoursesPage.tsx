
import { AdminLayout } from "@/components/admin/admin-layout";
import { CreatorCoursesManagement } from "@/components/admin/creator-management/creator-courses-management";

const AdminCreatorCoursesPage = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Creator Course Management</h1>
      <CreatorCoursesManagement />
    </AdminLayout>
  );
};

export default AdminCreatorCoursesPage;
