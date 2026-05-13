import './globals.css';

import { Montserrat } from 'next/font/google';
import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';
import { ModalProvider } from '@/shared/ui/modal';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
});

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko">
      <body className={cn('bg-background text-foreground antialiased', montserrat.variable)}>
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}
