import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { QuizProvider } from '@/components/quiz/QuizProvider';
import { MenuProvider } from '@/hooks/MenuProvider';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PureLearn',
  description:
    'A minimal learning platform for tracking and taking detailed notes on technology learnings',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MenuProvider>
          <QuizProvider>{children}</QuizProvider>
        </MenuProvider>
      </body>
    </html>
  );
}
