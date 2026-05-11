import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
