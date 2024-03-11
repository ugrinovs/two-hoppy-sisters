"use client";

import NavbarTop from "./mobile/nav-top.component";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-dvh flex justify-center w-full">
      <NavbarTop />
      {children}
    </div>
  );
}
