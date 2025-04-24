
import { AdminLayout } from "@/components/admin/admin-layout";
import { CoursesTab } from "@/components/admin/tabs/courses-tab";

const AdminCoursesPage = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Course Reviews & Management</h1>
      <CoursesTab />
    </AdminLayout>
  );
};

export default AdminCoursesPage;
