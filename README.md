# PureLearn

A Next.js-based minimal learning theme designed for tracking and taking detailed notes on technology learnings. The app focuses on structured learning with a distraction-free interface, using Markdown as the primary data source.

## Features

- **Course Management**: Add/edit new courses using Markdown (.mdx files)
- **Structured Syllabus**: Organize topics and subtopics in a hierarchical structure
- **Distraction-free Reading**: Clean UI focused on content consumption
- **Highlights Section**: Automatically extracts key points from content
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **Git** (for cloning the repository)

### Installation

```sh
# Clone the repository
git clone https://github.com/your-repo/nextjs-learning-theme.git
cd nextjs-learning-theme

# Install dependencies
npm install  # or yarn install

# Start the development server
npm run dev  # or yarn dev
```

## Code Quality and Linting

This project uses ESLint and Prettier to ensure code quality and consistent formatting. Husky is configured for pre-commit hooks to ensure all committed code meets the project standards.

### ESLint Configuration

The project uses ESLint with Next.js recommended rules. Key configurations include:

- Next.js core web vitals rules
- TypeScript support
- React hooks rules
- Prettier integration

### Running Linting Tasks

```sh
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Format code with Prettier
npm run prettier
```

### Commit Hooks with Husky

The project uses Husky and lint-staged to ensure code quality before commits:

- **Pre-commit**: Automatically runs linting and formatting on staged files
- **Lint-staged**: Only processes files that are staged for commit

These hooks help maintain code quality by preventing commits with linting errors.

## Adding Content

### Course Structure

Courses are organized in the following structure:

### Course Structure

Courses are organized in the following structure:

src/courses/
├── course-slug/
│ ├── metadata.json
│ ├── topic-slug/
│ │ ├── subtopic-slug.mdx
│ │ └── another-subtopic.mdx
│ └── another-topic/
│ └── subtopic.mdx
└── another-course/
└── ...

### Creating a New Course

1. Create a new directory in `src/content/` with your course slug
2. Add a `metadata.json` file with course details
3. Create topic directories and MDX files for subtopics

### Metadata Format

The `metadata.json` file should follow this format:

```json
{
  "title": "Course Title",
  "description": "Course description",
  "slug": "course-slug",
  "author": "Author Name",
  "topics": [
    {
      "title": "Topic Title",
      "slug": "topic-slug",
      "subtopics": [
        {
          "title": "Subtopic Title",
          "slug": "subtopic-slug"
        }
      ]
    }
  ]
}
```

## Adding Quizzes to Course Content

### Quiz Structure

Quizzes can be added to any MDX content file using the `<Quiz>` component. Each quiz consists of questions, multiple-choice options, correct answers, and optional explanations.

### Adding a Quiz to MDX

Add a quiz to any subtopic by including the `<Quiz>` component in your MDX file:

```mdx
---
title: 'Topic Title'
description: 'Topic description'
---

# Content

Your course content here...

## Check Your Knowledge

<Quiz
  questions={[
    {
      question: 'What is the main benefit of using Next.js?',
      options: [
        "It's written in Python",
        'Server-side rendering capabilities',
        "It doesn't use JavaScript",
        "It's the oldest web framework",
      ],
      correctAnswer: 1,
      explanation:
        'Next.js is known for its server-side rendering capabilities, which improve performance and SEO.',
    },
    {
      question:
        'Which of the following is NOT a feature of this learning platform?',
      options: [
        'Course Management',
        'Social Media Integration',
        'Distraction-free Reading',
        'Dark Mode',
      ],
      correctAnswer: 1,
      explanation:
        'This platform focuses on learning features and does not include social media integration.',
    },
  ]}
/>
```

### Quiz Properties

Each quiz question should include:

- `question`: The question text
- `options`: An array of possible answers (2-4 options recommended)
- `correctAnswer`: The index of the correct option (zero-based, so first option is 0, second is 1, etc.)
- `explanation`: (Optional) Explanation shown after answering

### Quiz Progress Tracking

Quiz progress is automatically tracked and persisted between sessions. Students can see their scores in the course sidebar next to completed topics.

// ... existing content ...

### Progress Tracking

The platform offers two types of progress tracking:

1. **Quiz Progress**: Automatically tracks quiz completion and scores
2. **Section Progress**: Users can mark sections as completed as they progress through the course

#### Adding "Mark as Completed" to MDX Content

You can add an explicit "Mark as Completed" button anywhere in your MDX content:

```mdx
<MarkAsCompleted />
```

The platform also automatically adds a "Mark as Completed" button at the end of each content page.

#### How Progress is Displayed

- Completed sections are shown with a checkmark in the course sidebar
- Progress is saved between sessions using localStorage
- Both quiz completions and manually marked sections contribute to the overall progress tracking

### MDX Content

MDX files should include frontmatter and content:

```mdx
---
title: 'Subtopic Title'
description: 'Subtopic description'
---

# Content Heading

Your content here...

## Highlights

- Key point 1
- Key point 2
- Key point 3
```

## Next.js 15 Compatibility

This project is built with Next.js 15, which includes several breaking changes:

- **Async Route Parameters**: The `params` object in dynamic routes is now asynchronous and needs to be awaited
- **Modified Caching Behavior**: Fetch requests and GET route handlers are no longer cached by default

For more information on Next.js 15 changes, see the [official release notes](https://nextjs.org/blog/next-15).

## License

MIT
