'use client'
import SubjectDetailPage from '@app/module/user/subjects/[id]/page';

interface SubjectDetailRouteProps {
  params: {
    id: string;
  };
}

export default function SubjectDetailRoute({ params }: SubjectDetailRouteProps) {
  return <SubjectDetailPage params={params} />;
} 