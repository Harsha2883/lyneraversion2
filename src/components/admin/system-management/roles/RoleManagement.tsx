
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash } from "lucide-react";
import { TableFilters } from "../../shared/components/filters/TableFilters";
import { DataTable } from "../../shared/components/data-table/DataTable";
import { RoleForm } from "./RoleForm";
import type { Role } from "../../types/system.types";

// Mock data for roles
const mockRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full access to all system features",
    permissions: [
      { id: "p1", name: "manage_users", description: "Create, edit, delete users", enabled: true },
      { id: "p2", name: "manage_courses", description: "Create, edit, delete courses", enabled: true },
      { id: "p3", name: "manage_system", description: "Modify system settings", enabled: true },
    ]
  },
  {
    id: "2",
    name: "Moderator",
    description: "Can manage content but not system settings",
    permissions: [
      { id: "p1", name: "manage_users", description: "Create, edit, delete users", enabled: false },
      { id: "p2", name: "manage_courses", description: "Create, edit, delete courses", enabled: true },
      { id: "p3", name: "manage_system", description: "Modify system settings", enabled: false },
    ]
  },
  {
    id: "3",
    name: "Creator",
    description: "Can create and manage their own courses",
    permissions: [
      { id: "p1", name: "manage_users", description: "Create, edit, delete users", enabled: false },
      { id: "p2", name: "manage_courses", description: "Create, edit, delete courses", enabled: true },
      { id: "p3", name: "manage_system", description: "Modify system settings", enabled: false },
    ]
  },
  {
    id: "4",
    name: "Learner",
    description: "Can enroll in courses and track progress",
    permissions: [
      { id: "p1", name: "manage_users", description: "Create, edit, delete users", enabled: false },
      { id: "p2", name: "manage_courses", description: "Create, edit, delete courses", enabled: false },
      { id: "p3", name: "manage_system", description: "Modify system settings", enabled: false },
    ]
  }
];

export function RoleManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  
  const filteredRoles = mockRoles.filter(role => 
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setIsAddingRole(true);
  };

  const handleDeleteRole = (roleId: string) => {
    // In a real app, this would call an API to delete the role
    console.log(`Deleting role ${roleId}`);
  };

  const handleSaveRole = (role: Role) => {
    // In a real app, this would call an API to save the role
    console.log('Saving role:', role);
    setIsAddingRole(false);
    setEditingRole(null);
  };

  const columns = [
    {
      header: "Role",
      accessor: (role: Role) => (
        <div>
          <div className="font-medium">{role.name}</div>
          <div className="text-sm text-muted-foreground">{role.description}</div>
        </div>
      )
    },
    {
      header: "Permissions",
      accessor: (role: Role) => (
        <div>{role.permissions.filter(p => p.enabled).length} of {role.permissions.length}</div>
      )
    },
    {
      header: "Actions",
      accessor: (role: Role) => (
        <div className="flex justify-end space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleEditRole(role)}
            title="Edit role"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleDeleteRole(role.id)}
            title="Delete role"
            disabled={role.name === "Admin" || role.name === "Learner"} // Prevent deleting essential roles
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
      className: "text-right"
    }
  ];

  if (isAddingRole) {
    return <RoleForm role={editingRole} onSave={handleSaveRole} onCancel={() => {
      setIsAddingRole(false);
      setEditingRole(null);
    }} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h2 className="text-lg font-medium">Role Management</h2>
        <Button onClick={() => setIsAddingRole(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Role
        </Button>
      </div>
      
      <TableFilters
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        className="mb-6"
      />
      
      <Card>
        <DataTable
          columns={columns}
          data={filteredRoles}
          keyField="id"
          emptyMessage="No roles found"
        />
      </Card>
    </div>
  );
}
