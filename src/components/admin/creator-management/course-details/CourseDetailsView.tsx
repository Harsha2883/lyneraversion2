
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, X } from "lucide-react";
import { formatCurrency, formatDate } from "../../shared/utils/format-utils";
import { getStatusBadgeVariant } from "../../shared/utils/course-utils";
import type { Course } from "../../types/course.types";

interface CourseDetailsViewProps {
  course: Course;
  onBack: () => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export function CourseDetailsView({ course, onBack, onApprove, onReject }: CourseDetailsViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={getStatusBadgeVariant(course.status)} className="capitalize">
              {course.status}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Submitted on {formatDate(course.submittedDate)}
            </span>
          </div>
        </div>
        
        {course.status === "pending" && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => onReject?.(course.id)}
            >
              <X className="h-4 w-4" />
              Reject
            </Button>
            <Button 
              className="gap-2"
              onClick={() => onApprove?.(course.id)}
            >
              <Check className="h-4 w-4" />
              Approve
            </Button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Creator Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-medium">{course.creatorName}</p>
              <p className="text-sm text-muted-foreground">{course.creatorEmail}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Financial Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{formatCurrency(course.earnings)}</p>
              <p className="text-sm text-muted-foreground">
                {course.status === "approved" ? "Total Earnings" : "Estimated Earnings"}
              </p>
              <p className="text-sm mt-2">Price: {formatCurrency(course.price || 0)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{course.enrollments}</p>
              <p className="text-sm text-muted-foreground">Total Enrollments</p>
              <p className="text-sm mt-2">Completions: {course.completions}</p>
              <p className="text-sm">
                Completion Rate: {
                  course.enrollments > 0 
                    ? `${Math.round((course.completions / course.enrollments) * 100)}%` 
                    : 'N/A'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Course Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{course.description || "No description available."}</p>
        </CardContent>
      </Card>
    </div>
  );
}
