import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Explicitly ignore the .next directory and other build artifacts
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'dist/**',
      'build/**',
      'public/**',
      'next-env.d.ts',
      'next.config.js',
      '**/*.d.ts',
    ],
  },

  // Main ESLint configuration
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'prettier', // Add prettier last to override conflicting rules
    ],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'warn',
      'prefer-const': 'warn',
      'no-var': 'warn',
      'no-unused-vars': 'warn',
      'object-shorthand': 'warn',
      'quote-props': ['warn', 'as-needed'],
    },
  }),
];

export default eslintConfig;
