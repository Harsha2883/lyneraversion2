
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "../../shared/components/data-table/DataTable";
import { Plus, Edit, Trash } from "lucide-react";

// Mock data for carbon offset projects
interface OffsetProject {
  id: string;
  name: string;
  type: "forest" | "solar" | "wind" | "water" | "other";
  location: string;
  offsetAmount: number; // in tonnes of CO2
  status: "active" | "completed" | "planned";
  startDate: string;
  endDate?: string;
  description: string;
}

const mockProjects: OffsetProject[] = [
  {
    id: "p1",
    name: "Amazon Rainforest Conservation",
    type: "forest",
    location: "Brazil",
    offsetAmount: 5000,
    status: "active",
    startDate: "2023-06-15",
    description: "Conservation and reforestation project in the Amazon rainforest."
  },
  {
    id: "p2",
    name: "Solar Power Installation",
    type: "solar",
    location: "Kenya",
    offsetAmount: 2500,
    status: "active",
    startDate: "2023-09-20",
    description: "Installation of solar panels in rural communities in Kenya."
  },
  {
    id: "p3",
    name: "Wind Farm Development",
    type: "wind",
    location: "Denmark",
    offsetAmount: 3700,
    status: "active",
    startDate: "2023-04-05",
    description: "Development of offshore wind farms in Denmark."
  },
  {
    id: "p4",
    name: "Mangrove Restoration",
    type: "forest",
    location: "Indonesia",
    offsetAmount: 1800,
    status: "active",
    startDate: "2023-08-10",
    description: "Restoration of mangrove forests in coastal areas of Indonesia."
  },
  {
    id: "p5",
    name: "Hydroelectric Power",
    type: "water",
    location: "Nepal",
    offsetAmount: 1200,
    status: "planned",
    startDate: "2024-06-01",
    description: "Development of a small-scale hydroelectric power plant in Nepal."
  }
];

export function CarbonOffsetProjects() {
  const [selectedProject, setSelectedProject] = useState<OffsetProject | null>(null);
  
  const handleViewProject = (project: OffsetProject) => {
    setSelectedProject(project);
  };
  
  const handleCloseDetails = () => {
    setSelectedProject(null);
  };
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "completed":
        return "secondary";
      case "planned":
        return "outline";
      default:
        return "outline";
    }
  };
  
  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "forest":
        return "green";
      case "solar":
        return "yellow";
      case "wind":
        return "blue";
      case "water":
        return "cyan";
      default:
        return "grey";
    }
  };
  
  const columns = [
    {
      header: "Project",
      accessor: (project: OffsetProject) => (
        <div>
          <div className="font-medium">{project.name}</div>
          <div className="text-xs text-muted-foreground">{project.location}</div>
        </div>
      )
    },
    {
      header: "Type",
      accessor: (project: OffsetProject) => (
        <Badge 
          variant="outline" 
          className="capitalize"
          style={{ 
            backgroundColor: project.type === "forest" ? "rgba(34, 197, 94, 0.1)" :
                            project.type === "solar" ? "rgba(234, 179, 8, 0.1)" :
                            project.type === "wind" ? "rgba(59, 130, 246, 0.1)" :
                            project.type === "water" ? "rgba(6, 182, 212, 0.1)" : 
                            "rgba(107, 114, 128, 0.1)",
            color: project.type === "forest" ? "rgb(22, 163, 74)" :
                 project.type === "solar" ? "rgb(202, 138, 4)" :
                 project.type === "wind" ? "rgb(37, 99, 235)" :
                 project.type === "water" ? "rgb(8, 145, 178)" : 
                 "rgb(75, 85, 99)"
          }}
        >
          {project.type}
        </Badge>
      )
    },
    {
      header: "Status",
      accessor: (project: OffsetProject) => (
        <Badge 
          variant={getStatusBadgeVariant(project.status)}
          className="capitalize"
        >
          {project.status}
        </Badge>
      )
    },
    {
      header: "CO₂ Offset",
      accessor: (project: OffsetProject) => (
        <div>{project.offsetAmount.toLocaleString()} tonnes</div>
      )
    },
    {
      header: "Actions",
      accessor: (project: OffsetProject) => (
        <div className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleViewProject(project)}
          >
            View
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            title="Edit project"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            title="Delete project"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
      className: "text-right"
    }
  ];

  // Show project details if a project is selected
  if (selectedProject) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{selectedProject.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
              <p className="mt-1 capitalize">{selectedProject.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
              <p className="mt-1">{selectedProject.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <Badge 
                variant={getStatusBadgeVariant(selectedProject.status)}
                className="mt-1 capitalize"
              >
                {selectedProject.status}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">CO₂ Offset</h3>
              <p className="mt-1">{selectedProject.offsetAmount.toLocaleString()} tonnes</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
              <p className="mt-1">{new Date(selectedProject.startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">End Date</h3>
              <p className="mt-1">{selectedProject.endDate ? new Date(selectedProject.endDate).toLocaleDateString() : "Ongoing"}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
            <p className="mt-1">{selectedProject.description}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCloseDetails}>Back to Projects</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Carbon Offset Projects</h3>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>
      
      <Card>
        <DataTable
          columns={columns}
          data={mockProjects}
          keyField="id"
          emptyMessage="No carbon offset projects available"
        />
      </Card>
    </div>
  );
}
