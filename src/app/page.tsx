import { getAllCourses } from '@/lib/mdx';
import HomePageClient from '@/components/HomePageClient';

export default async function Home() {
  const courses = await getAllCourses();

  return <HomePageClient courses={courses} />;
}
