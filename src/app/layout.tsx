import { ModeToggle } from '@/components/mode-toggle';
import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { AppBar } from '@/components/app-bar';

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
          'flex flex-col min-h-screen bg-background font-sans antialiased',
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
          <div className="flex grow items-center justify-center">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
