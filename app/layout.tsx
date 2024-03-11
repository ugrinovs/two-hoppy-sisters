import { Inter } from "next/font/google";
import "./globals.css";
import "@mdxeditor/editor/style.css";
import MainLayout from "@/components/layout/layout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
