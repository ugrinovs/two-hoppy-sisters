"use client";

import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { title: "Pocetna", path: "/admin/dashboard", icon: <HomeIcon /> },
  { title: "Korisnici", path: "/admin/users", icon: <GroupIcon /> },
  { title: "Piva", path: "/admin/products", icon: <InventoryIcon /> },
  { title: "Narudžbine", path: "/admin/orders", icon: <ReceiptIcon /> },
  { title: "Kategorije", path: "/admin/categories", icon: <BackupTableIcon /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isCurrent = (path: string) => pathname === path;
  return (
    <ul className="border-r-2 border-secondary-700 h-full">
      {navItems.map((item) => (
        <li
          key={item.path}
          onClick={() => router.push(item.path)}
          className={`flex justify-between py-2 hover:bg-secondary-700 hover:text-primary-700 px-4 border-b border-gray-500 w-full items-center last:border-b-0 ${
            isCurrent(item.path) ? "bg-secondary-700 text-primary-700" : ""
          }`}
        >
          {item.icon}
          <p className="text-left grow pl-2">{item.title}</p>
        </li>
      ))}
    </ul>
  );
}
