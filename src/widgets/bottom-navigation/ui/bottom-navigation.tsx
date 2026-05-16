'use client';

import { FileText, Search, SquarePen, UserRound } from 'lucide-react';
import type { MouseEvent } from 'react';

import { startGoogleLogin } from '@/features/auth/lib/login';
import { useAuth } from '@/features/auth/model/auth-provider';
import { cn } from '@/shared/lib/cn';

import { BottomNavigationLink } from './bottom-navigation-link';

export function BottomNavigation() {
  const auth = useAuth();

  const handleAuthRequiredClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (auth.status === 'authenticated') return true;

    event.preventDefault();
    startGoogleLogin();
    return false;
  };

  return (
    <nav className={cn('border-border bg-background fixed inset-x-0 bottom-0 z-40 border-t', 'md:hidden')}>
      <div className={cn('mx-auto grid h-16 max-w-130 grid-cols-4 px-2')}>
        <BottomNavigationLink href="/posts">
          <FileText className={cn('h-5 w-5')} />
          <span>게시글</span>
        </BottomNavigationLink>
        <BottomNavigationLink href="/search">
          <Search className={cn('h-5 w-5')} />
          <span>검색</span>
        </BottomNavigationLink>
        <BottomNavigationLink href="/write" onClick={handleAuthRequiredClick}>
          <SquarePen className={cn('h-5 w-5')} />
          <span>글쓰기</span>
        </BottomNavigationLink>
        <BottomNavigationLink href={'TODO: 작성자 게시물 페이지 href'} onClick={handleAuthRequiredClick}>
          <UserRound className={cn('h-5 w-5')} />
          <span>내 글</span>
        </BottomNavigationLink>
      </div>
    </nav>
  );
}
