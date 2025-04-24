
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import type { UserRole, RolePermission } from "../../types/system.types";

interface RoleFormProps {
  role?: UserRole | null;
  onSave: (role: UserRole) => void;
  onCancel: () => void;
}

export function RoleForm({ role, onSave, onCancel }: RoleFormProps) {
  // Default permissions if creating a new role
  const defaultPermissions: RolePermission[] = [
    { id: "p1", name: "manage_users", description: "Create, edit, delete users", enabled: false },
    { id: "p2", name: "manage_courses", description: "Create, edit, delete courses", enabled: false },
    { id: "p3", name: "manage_system", description: "Modify system settings", enabled: false },
    { id: "p4", name: "approve_courses", description: "Review and approve courses", enabled: false },
    { id: "p5", name: "view_analytics", description: "View system analytics", enabled: false },
    { id: "p6", name: "manage_payments", description: "Configure payment systems", enabled: false },
  ];
  
  // Initialize form with either existing role data or defaults
  const [permissions, setPermissions] = useState<RolePermission[]>(
    role?.permissions || defaultPermissions
  );
  
  const form = useForm({
    defaultValues: {
      name: role?.name || "",
      description: role?.description || "",
    }
  });

  const handleSubmit = form.handleSubmit((data) => {
    const newRole: UserRole = {
      id: role?.id || `new-${Date.now()}`,
      name: data.name,
      description: data.description,
      permissions
    };
    onSave(newRole);
  });

  const togglePermission = (permissionId: string) => {
    setPermissions(perms => 
      perms.map(p => 
        p.id === permissionId 
          ? { ...p, enabled: !p.enabled } 
          : p
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onCancel} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Roles
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{role ? "Edit Role" : "Add New Role"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter role name" {...field} />
                    </FormControl>
                    <FormDescription>A short, descriptive name for this role</FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter role description" {...field} />
                    </FormControl>
                    <FormDescription>Describe what this role is used for</FormDescription>
                  </FormItem>
                )}
              />
              
              <div>
                <h3 className="text-md font-medium mb-4">Permissions</h3>
                <div className="space-y-4">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center justify-between">
                      <div>
                        <Label htmlFor={`permission-${permission.id}`} className="font-medium">
                          {permission.description}
                        </Label>
                      </div>
                      <Switch 
                        id={`permission-${permission.id}`}
                        checked={permission.enabled}
                        onCheckedChange={() => togglePermission(permission.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                Save Role
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
