"use client";
import HeaderComponent from "../header/header.component";
import LayoutContentWrapper from "./layout-content.wrapper";
import NavbarBottom from "./mobile/nav-bottom.component";

export default function LayoutMobile({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderComponent />
      <LayoutContentWrapper>{children}</LayoutContentWrapper>
      <NavbarBottom />
    </>
  );
}
