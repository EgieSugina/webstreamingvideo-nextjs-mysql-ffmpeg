"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = ({ name, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-3 py-2 text-sm font-medium ${
        isActive
          ? "bg-gray-900 text-white rounded-md"
          : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
      }`}
    >
      {name}
    </Link>
  );
};
export default Menu;
