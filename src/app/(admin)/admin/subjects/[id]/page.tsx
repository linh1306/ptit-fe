'use client'

import SubjectLessonManagementPage from "@app/module/admin/subjects/[id]/page";

interface SubjectDetailRouteProps {
  params: {
    id: string;
  };
}

export default function SubjectLessonManagementPages({ params }: SubjectDetailRouteProps) {
  return <SubjectLessonManagementPage params={params} />;
} 