"use client";

import { FaUserPlus } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Tables from "../../../components/TablesUsers";
import { Tabs } from "@/components/ui/tabs";

export default function Users() {
  const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "ACTIONS", uid: "actions" }
  ];

  const users = [
    {
      id: 1,
      name: "Tony Reichert",
      role: "CEO",
      team: "Management",
     
      age: "29",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      email: "tony.reichert@example.com"
    },
    {
      id: 2,
      name: "Zoey Lang",
      role: "Technical Lead",
      team: "Development",
      status: "paused",
      age: "25",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      email: "zoey.lang@example.com"
    },
    {
      id: 3,
      name: "Jane Fisher",
      role: "Senior Developer",
      team: "Development",
     
      age: "22",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      email: "jane.fisher@example.com"
    },
    {
      id: 4,
      name: "William Howard",
      role: "Community Manager",
      team: "Marketing",
      status: "vacation",
      age: "28",
      avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
      email: "william.howard@example.com"
    },
    {
      id: 5,
      name: "Kristen Copper",
      role: "Sales Manager",
      team: "Sales",
     
      age: "24",
      avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
      email: "kristen.cooper@example.com"
    },
     
  ];

  const tabs = [
    {
      title: "Members",
      value: "members",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl  bg-[#212129]  p-4 text-xl md:text-4xl font-bold text-white ">
          <div className="flex gap-2">
            Members
            <Link
              href="users/form"
              className="flex border px-1 m-2 bg-green-600 rounded shadow-2xl hover:bg-green-950 gap-2  text-medium font-medium items-center"
            >
              <FaUserPlus /> Add
            </Link>
          </div>

          <div className="mt-3">
            <Tables Data={users} Columns={columns} className="mt-3" />
          </div>
        </div>
      )
    },
    {
      title: "Staff",
      value: "staff",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded  bg-[#212129]  p-4 text-xl md:text-4xl font-bold text-white ">
          <p>Staff</p>
          {/* <Tables /> */}
        </div>
      )
    },
    {
      title: "Admin",
      value: "admin",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded  bg-[#212129]  p-4 text-xl md:text-4xl font-bold text-white ">
          <p>Admin</p>
          {/* <Tables /> */}
        </div>
      )
    }
  ];

  return (
    <div className="h-full md:h-full [perspective:1000px] relative  flex flex-col    w-full  items-start justify-start ">
      <Tabs tabs={tabs} />
    </div>
  );
}
