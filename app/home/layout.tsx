"use client";
import LayoutDesktop from "@/components/layout/layout.desktop";
// import LayoutMobile from "@/components/layout/layout.mobile";
// import useIsMobile from "@/hooks/is-mobile.hook";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const isMobile = useIsMobile(500);
  return (
    <div className="w-full">
      <LayoutDesktop>{children}</LayoutDesktop>
    </div>
  );
}

// {isMobile ? (
// <LayoutMobile>{children}</LayoutMobile>
// ) : (
// )}
