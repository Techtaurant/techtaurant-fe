import './globals.css';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

import { montserrat, pretendard } from '@/shared/config/fonts';
import { cn } from '@/shared/lib/cn';
import { ModalProvider } from '@/shared/ui/modal';
import { Header } from '@/widgets/header/ui/header';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={cn('antialiased', pretendard.className, montserrat.variable)}>
        <ThemeProvider attribute="data-mode">
          <ModalProvider>
            <main className="bg-background text-foreground">
              <Header />
              <div className="pt-16">{children}</div>
            </main>
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
