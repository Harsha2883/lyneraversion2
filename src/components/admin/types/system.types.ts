
export type UserRole = "admin" | "moderator" | "creator" | "learner";

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  lastActive?: string;
}

export interface RolePermission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: RolePermission[];
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  resourceId: string;
  timestamp: string;
  ipAddress: string;
  details?: Record<string, any>;
}

export interface PaymentProvider {
  id: string;
  name: string;
  isActive: boolean;
  lastUpdated: string;
  apiKeys?: {
    public?: string;
    secret?: string;
  };
}

export interface SystemFilters {
  search: string;
  role: string;
  status: string;
}
