import './globals.css';

import type { ReactNode } from 'react';

import { montserrat, pretendard } from '@/shared/config/fonts';
import { cn } from '@/shared/lib/cn';
import { ModalProvider } from '@/shared/ui/modal';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko">
      <body className={cn('bg-background text-foreground antialiased', pretendard.className, montserrat.variable)}>
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}
