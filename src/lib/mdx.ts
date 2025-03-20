import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

// Get all course slugs
export async function getAllCourses() {
  const coursesDirectory = path.join(process.cwd(), 'src/content');

  // Check if directory exists before reading
  if (!fs.existsSync(coursesDirectory)) {
    return [];
  }

  const courseDirectories = fs.readdirSync(coursesDirectory);

  // Filter out directories that start with "[" as they are dynamic route segments
  const filteredDirectories = courseDirectories.filter(
    (dir) => !dir.startsWith('['),
  );

  return filteredDirectories.map((courseDir) => {
    const metadataPath = path.join(
      coursesDirectory,
      courseDir,
      'metadata.json',
    );
    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      return {
        slug: courseDir,
        ...metadata,
      };
    }
    return { slug: courseDir, title: courseDir, description: '', topics: [] };
  });
}

// Get course metadata by slug
export async function getCourseBySlug(slug: string) {
  const metadataPath = path.join(
    process.cwd(),
    `src/content/${slug}/metadata.json`,
  );

  if (fs.existsSync(metadataPath)) {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    return {
      slug,
      ...metadata,
    };
  }

  return null;
}

// Get topic content
export async function getTopicContent(
  courseSlug: string,
  topicSlug: string,
  subtopicSlug: string,
) {
  const filePath = path.join(
    process.cwd(),
    `src/content/${courseSlug}/${topicSlug}/${subtopicSlug}.mdx`,
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContent);

  // Separate highlights and main content
  const highlightsRegex = /## Highlights\s+([\s\S]*?)(?:$|(?=##))/;
  const highlightsMatch = content.match(highlightsRegex);

  // Extract highlights section if it exists
  const highlights = highlightsMatch ? highlightsMatch[0] : '';

  // Remove highlights section from main content
  const mainContent = content.replace(highlightsRegex, '').trim();

  // Serialize the main content only
  const mdxSource = await serialize(mainContent);

  return {
    source: mdxSource,
    frontMatter: data,
    content: mainContent,
    highlights,
  };
}

// Get all topics for a course
export async function getAllTopics(courseSlug: string) {
  const course = await getCourseBySlug(courseSlug);

  if (!course) {
    return [];
  }

  return course.topics;
}
