import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';
import { BottomNavigation } from '@/widgets/bottom-navigation';
import { Header } from '@/widgets/header';

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <main>
      <Header />
      <div className={cn('min-h-screen py-16', 'md:pb-0')}>{children}</div>
      <BottomNavigation />
    </main>
  );
}
