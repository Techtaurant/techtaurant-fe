import './globals.css';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

import { AuthProvider } from '@/features/auth/model/auth-provider';
import { montserrat, pretendard } from '@/shared/config/fonts';
import { cn } from '@/shared/lib/cn';
import { ModalProvider } from '@/shared/ui/modal';
import { BottomNavigation } from '@/widgets/bottom-navigation';
import { Header } from '@/widgets/header';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={cn('bg-background text-foreground antialiased', pretendard.className, montserrat.variable)}>
        <ThemeProvider attribute="data-mode">
          <AuthProvider>
            <ModalProvider>
              <main>
                <Header />
                <div className={cn('min-h-screen py-16', 'md:pb-0')}>{children}</div>
                <BottomNavigation />
              </main>
            </ModalProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
