import './globals.css';

import { Montserrat } from 'next/font/google';
import type { ReactNode } from 'react';

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
      <body className={`${montserrat.variable} antialiased`}>{children}</body>
    </html>
  );
}
