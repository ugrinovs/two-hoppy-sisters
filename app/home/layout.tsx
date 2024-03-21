"use client";
import LayoutDesktop from "@/components/layout/layout.desktop";
import LayoutMobile from "@/components/layout/layout.mobile";
import useIsMobile from "@/hooks/is-mobile.hook";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useIsMobile(500);
  return (
    <div className="w-full">
      {isMobile ? (
        <LayoutMobile>{children}</LayoutMobile>
      ) : (
        <LayoutDesktop>{children}</LayoutDesktop>
      )}
    </div>
  );
}
