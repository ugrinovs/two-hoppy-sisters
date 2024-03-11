import HeaderCompoent from "../header/header.component";

export default function LayoutContentWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="px-4 pb-32 flex justify-center flex-col items-center">
      {children}
    </div>
  );
}
