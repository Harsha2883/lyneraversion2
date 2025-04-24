
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "../../shared/components/data-table/DataTable";
import { TableFilters } from "../../shared/components/filters/TableFilters";
import { TablePagination } from "../../shared/components/pagination/TablePagination";
import { formatDate } from "../../shared/utils/format-utils";

// Mock data for user carbon footprints
interface UserFootprint {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  totalEmissions: number;
  totalOffset: number;
  netImpact: number;
  lastCalculated: string;
}

const mockFootprints: UserFootprint[] = [
  {
    id: "f1",
    userId: "u1",
    userName: "Morgan Smith",
    userEmail: "morgan.smith@example.com",
    userRole: "Learner",
    totalEmissions: 0.45,
    totalOffset: 0.8,
    netImpact: -0.35,
    lastCalculated: "2024-04-20"
  },
  {
    id: "f2",
    userId: "u2",
    userName: "Jamie Johnson",
    userEmail: "jamie.johnson@example.com",
    userRole: "Learner",
    totalEmissions: 0.92,
    totalOffset: 0.5,
    netImpact: 0.42,
    lastCalculated: "2024-04-22"
  },
  {
    id: "f3",
    userId: "u3",
    userName: "Dr. Sarah Johnson",
    userEmail: "sarah.johnson@example.com",
    userRole: "Creator",
    totalEmissions: 1.2,
    totalOffset: 2.0,
    netImpact: -0.8,
    lastCalculated: "2024-04-19"
  },
  {
    id: "f4",
    userId: "u4",
    userName: "Michael Chen",
    userEmail: "michael.chen@example.com",
    userRole: "Creator",
    totalEmissions: 0.75,
    totalOffset: 0.6,
    netImpact: 0.15,
    lastCalculated: "2024-04-21"
  },
  {
    id: "f5",
    userId: "u5",
    userName: "System Admin",
    userEmail: "admin@example.com",
    userRole: "Admin",
    totalEmissions: 0.3,
    totalOffset: 1.0,
    netImpact: -0.7,
    lastCalculated: "2024-04-23"
  }
];

export function UserCarbonFootprint() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const filteredFootprints = mockFootprints.filter(footprint => {
    const matchesSearch = 
      footprint.userName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      footprint.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "all" || footprint.userRole.toLowerCase() === roleFilter.toLowerCase();
    
    return matchesSearch && matchesRole;
  });
  
  const paginatedFootprints = filteredFootprints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(filteredFootprints.length / itemsPerPage);
  
  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "learner", label: "Learner" },
    { value: "creator", label: "Creator" },
    { value: "admin", label: "Admin" },
    { value: "moderator", label: "Moderator" }
  ];
  
  const columns = [
    {
      header: "User",
      accessor: (footprint: UserFootprint) => (
        <div>
          <div className="font-medium">{footprint.userName}</div>
          <div className="text-xs text-muted-foreground">{footprint.userEmail}</div>
        </div>
      )
    },
    {
      header: "Role",
      accessor: (footprint: UserFootprint) => (
        <Badge variant="outline" className="capitalize">
          {footprint.userRole}
        </Badge>
      )
    },
    {
      header: "Emissions (t)",
      accessor: (footprint: UserFootprint) => footprint.totalEmissions.toFixed(2)
    },
    {
      header: "Offset (t)",
      accessor: (footprint: UserFootprint) => footprint.totalOffset.toFixed(2)
    },
    {
      header: "Net Impact (t)",
      accessor: (footprint: UserFootprint) => (
        <div className={footprint.netImpact < 0 ? "text-green-600 font-medium" : footprint.netImpact > 0 ? "text-amber-500 font-medium" : ""}>
          {footprint.netImpact.toFixed(2)}
        </div>
      )
    },
    {
      header: "Last Updated",
      accessor: (footprint: UserFootprint) => formatDate(footprint.lastCalculated)
    },
    {
      header: "Actions",
      accessor: (footprint: UserFootprint) => (
        <div className="flex justify-end">
          <Button variant="outline" size="sm">View Details</Button>
        </div>
      ),
      className: "text-right"
    }
  ];

  return (
    <div className="space-y-6">
      <TableFilters
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filterOptions={[
          {
            name: "role",
            value: roleFilter,
            options: roleOptions,
            onChange: setRoleFilter
          }
        ]}
        className="mb-6"
      />
      
      <Card>
        <DataTable
          columns={columns}
          data={paginatedFootprints}
          keyField="id"
          emptyMessage="No carbon footprint data available"
        />
        
        {filteredFootprints.length > 0 && (
          <div className="p-4 border-t">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsShown={paginatedFootprints.length}
              totalItems={filteredFootprints.length}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
