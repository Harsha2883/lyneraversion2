
import { useState } from "react";
import { LearnCourseTypes } from "@/components/conversational-ai/learn-course-types";
import { ProcessPlayDashboard } from "@/components/conversational-ai/process-play-dashboard";

export function LearnTab() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Show the course selection UI if no course is selected
  if (!selectedCourse) {
    return <LearnCourseTypes onSelectCourse={setSelectedCourse} />;
  }

  // Show the process play dashboard if a course is selected
  return <ProcessPlayDashboard courseId={selectedCourse} onBack={() => setSelectedCourse(null)} />;
}
