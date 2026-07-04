import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function PostDetailContainer({ children }: Props) {
  return <main className="mx-auto w-full max-w-3xl px-4 py-6 md:px-6 md:py-10">{children}</main>;
}
