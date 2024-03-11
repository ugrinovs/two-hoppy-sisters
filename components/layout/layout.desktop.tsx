import HeaderComponent from "../header/header.component";
import LayoutContentWrapper from "./layout-content.wrapper";

export default function LayoutDesktop({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderComponent />
      <LayoutContentWrapper>{children}</LayoutContentWrapper>
    </>
  );
}
