
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash, MoreHorizontal } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatDate } from "../../shared/utils/format-utils";
import { DataTable } from "../../shared/components/data-table/DataTable";
import type { Learner } from "../../types/learner.types";

interface LearnersListProps {
  learners: Learner[];
  onViewLearner: (id: string) => void;
  onDeleteLearner: (id: string) => void;
}

export function LearnersList({ learners, onViewLearner, onDeleteLearner }: LearnersListProps) {
  const columns = [
    {
      header: "Learner",
      accessor: (learner: Learner) => (
        <div>
          <div className="font-medium">{learner.name}</div>
          <div className="text-xs text-muted-foreground">{learner.email}</div>
        </div>
      )
    },
    {
      header: "Status",
      accessor: (learner: Learner) => (
        <Badge 
          variant={learner.status === "active" ? "default" : "outline"}
          className="capitalize"
        >
          {learner.status}
        </Badge>
      )
    },
    {
      header: "Progress",
      accessor: (learner: Learner) => (
        <div className="flex flex-col gap-1">
          <Progress value={learner.progress} className="h-2" />
          <span className="text-xs text-muted-foreground">{learner.progress}%</span>
        </div>
      )
    },
    {
      header: "Courses",
      accessor: (learner: Learner) => (
        <span>{learner.completedCourses}/{learner.enrolledCourses}</span>
      )
    },
    {
      header: "Last Active",
      accessor: (learner: Learner) => formatDate(learner.lastActive)
    },
    {
      header: "Joined",
      accessor: (learner: Learner) => formatDate(learner.joinedDate)
    },
    {
      header: "Actions",
      accessor: (learner: Learner) => (
        <div className="flex justify-end space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onViewLearner(learner.id)}
            title="View learner details"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onDeleteLearner(learner.id)}
            title="Delete learner"
          >
            <Trash className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Reset Password</DropdownMenuItem>
              <DropdownMenuItem>Send Message</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      className: "text-right"
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={learners}
      keyField="id"
      emptyMessage="No learners found matching your criteria"
    />
  );
}
