
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Search, Filter, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface Creator {
  id: string;
  name: string;
  email: string;
  courses: number;
  status: "active" | "pending" | "suspended";
  joinedDate: string;
  totalLearners: number;
  rating: number;
}

// Mock data for creators
const mockCreators: Creator[] = [
  { id: "1", name: "Jane Smith", email: "jane.smith@example.com", courses: 12, status: "active", joinedDate: "2024-01-15", totalLearners: 2450, rating: 4.8 },
  { id: "2", name: "John Doe", email: "john.doe@example.com", courses: 8, status: "active", joinedDate: "2023-11-23", totalLearners: 1875, rating: 4.6 },
  { id: "3", name: "Alice Williams", email: "alice.williams@example.com", courses: 5, status: "pending", joinedDate: "2024-04-10", totalLearners: 780, rating: 4.3 },
  { id: "4", name: "Robert Johnson", email: "robert.johnson@example.com", courses: 15, status: "active", joinedDate: "2023-08-05", totalLearners: 3200, rating: 4.9 },
  { id: "5", name: "Emily Davis", email: "emily.davis@example.com", courses: 0, status: "suspended", joinedDate: "2024-02-28", totalLearners: 0, rating: 0 },
  { id: "6", name: "Michael Brown", email: "michael.brown@example.com", courses: 7, status: "active", joinedDate: "2023-12-12", totalLearners: 1450, rating: 4.5 },
  { id: "7", name: "Sarah Wilson", email: "sarah.wilson@example.com", courses: 3, status: "pending", joinedDate: "2024-03-20", totalLearners: 420, rating: 4.2 },
  { id: "8", name: "David Martinez", email: "david.martinez@example.com", courses: 10, status: "active", joinedDate: "2023-09-18", totalLearners: 2150, rating: 4.7 },
];

export function CreatorsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const filteredCreators = mockCreators.filter(creator => {
    const matchesSearch = 
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      creator.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || creator.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Creators Management</CardTitle>
        <CardDescription>
          Manage creator accounts, review applications, and monitor content creation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex-1 min-w-[300px] flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search creators..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button>Add Creator</Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Creator</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Learners</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCreators.map((creator) => (
                <TableRow key={creator.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{creator.name}</div>
                        <div className="text-xs text-muted-foreground">{creator.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        creator.status === "active" ? "default" : 
                        creator.status === "pending" ? "outline" : "destructive"
                      }
                      className="capitalize"
                    >
                      {creator.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{creator.courses}</TableCell>
                  <TableCell>{creator.totalLearners.toLocaleString()}</TableCell>
                  <TableCell>{creator.rating > 0 ? creator.rating.toFixed(1) : "N/A"}</TableCell>
                  <TableCell>{new Date(creator.joinedDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="Approve">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Suspend">
                        <XCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredCreators.length} of {mockCreators.length} creators
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
