import { notFound } from 'next/navigation';
import { getCourseBySlug } from '@/lib/mdx';
import CoursePageClient from '@/components/CoursePageClient';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;

  const course = await getCourseBySlug(courseSlug);

  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  return {
    title: course.title,
    description: course.description,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;

  const course = await getCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <CoursePageClient course={course} courseSlug={courseSlug} />
    </div>
  );
}
