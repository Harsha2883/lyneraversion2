
import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TokenIssuance } from "@/components/create-course/types/token-types";

// Mock data for token issuances
const mockTokenIssuances: TokenIssuance[] = [
  { 
    id: "1", 
    userId: "user-123", 
    courseId: "course-456", 
    tokensEarned: 50, 
    assessmentScore: 92,
    issuedAt: "2024-04-10T14:32:00Z",
    achievementType: "high_score"
  },
  { 
    id: "2", 
    userId: "user-456", 
    courseId: "course-789", 
    tokensEarned: 20, 
    assessmentScore: 85,
    issuedAt: "2024-04-09T11:15:00Z",
    achievementType: "completion"
  },
  { 
    id: "3", 
    userId: "user-789", 
    courseId: "course-123", 
    tokensEarned: 10, 
    assessmentScore: 75,
    issuedAt: "2024-04-08T16:45:00Z",
    achievementType: "participation"
  },
  { 
    id: "4", 
    userId: "user-123", 
    courseId: "course-789", 
    tokensEarned: 15, 
    assessmentScore: 80,
    issuedAt: "2024-04-07T09:20:00Z",
    achievementType: "completion"
  }
];

interface TokenIssuanceExtended extends TokenIssuance {
  userName: string;
  courseName: string;
}

// Extended mock data with user and course names
const extendedTokenData: TokenIssuanceExtended[] = mockTokenIssuances.map(token => ({
  ...token,
  userName: token.userId === "user-123" ? "John Doe" : 
           token.userId === "user-456" ? "Jane Smith" : "Alice Williams",
  courseName: token.courseId === "course-123" ? "Introduction to ESG" : 
             token.courseId === "course-456" ? "Carbon Market Fundamentals" : 
             "Sustainability in Corporate Governance"
}));

const TokenManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [achievementFilter, setAchievementFilter] = useState<string>("all");
  
  const filteredTokens = extendedTokenData.filter(token => {
    const matchesSearch = 
      token.userName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      token.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = achievementFilter === "all" || token.achievementType === achievementFilter;
    
    return matchesSearch && matchesType;
  });
  
  const getAchievementLabel = (type: string) => {
    switch (type) {
      case "high_score":
        return "High Score";
      case "completion":
        return "Course Completion";
      case "first_attempt":
        return "First Attempt";
      case "participation":
        return "Participation";
      default:
        return type;
    }
  };
  
  const getAchievementBadge = (type: string) => {
    switch (type) {
      case "high_score":
        return "default";
      case "completion":
        return "secondary";
      case "first_attempt":
        return "outline";
      case "participation":
        return "default";
      default:
        return "secondary";
    }
  };
  
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Token Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tokens Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{extendedTokenData.reduce((sum, token) => sum + token.tokensEarned, 0)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Issuances This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{extendedTokenData.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(extendedTokenData.reduce((sum, token) => sum + (token.assessmentScore || 0), 0) / extendedTokenData.length)}%
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Token Issuance History</CardTitle>
          <CardDescription>
            Track and manage token rewards earned by users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by user or course..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[300px]"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={achievementFilter} onValueChange={setAchievementFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by achievement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Achievements</SelectItem>
                  <SelectItem value="high_score">High Score</SelectItem>
                  <SelectItem value="completion">Course Completion</SelectItem>
                  <SelectItem value="first_attempt">First Attempt</SelectItem>
                  <SelectItem value="participation">Participation</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">Export</Button>
              <Button>Issue Tokens</Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Achievement</TableHead>
                  <TableHead>Tokens</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTokens.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No token issuances matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTokens.map((token) => (
                    <TableRow key={token.id}>
                      <TableCell>{token.userName}</TableCell>
                      <TableCell>{token.courseName}</TableCell>
                      <TableCell>
                        <Badge variant={getAchievementBadge(token.achievementType)}>
                          {getAchievementLabel(token.achievementType)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{token.tokensEarned}</TableCell>
                      <TableCell>{token.assessmentScore ? `${token.assessmentScore}%` : "—"}</TableCell>
                      <TableCell>{new Date(token.issuedAt).toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredTokens.length} of {extendedTokenData.length} token issuances
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default TokenManagementPage;
