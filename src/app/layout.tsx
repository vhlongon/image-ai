import { ModeToggle } from '@/components/ModeToggle';
import './globals.css';

import { ThemeProvider } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { AppBar } from '@/components/AppBar';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Image AI Editor',
  description: 'Create and edit images with the help of AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
