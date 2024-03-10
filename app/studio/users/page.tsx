import { FaUserPlus } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import M_User from "@/db/models/m_user";
import React from "react";
import Tables from "../../../components/TablesUsers";
import { Tabs } from "@/components/ui/tabs";
import { useQuery } from "react-query";

export default async function Users() {
  const users = await M_User.findAll({
    raw: true
  });

  const columns = [
    { name: "Name", uid: "fullname" },
    { name: "Username", uid: "username" },
    // { name: "Role", uid: "role" },
    { name: "Actions", uid: "actions" }
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
            <Tables
              Data={users.filter((v) => v.role === "Member")}
              Columns={columns}
              className="mt-3"
            />
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
          <Tables
            Data={users.filter((v) => v.role === "Staff")}
            Columns={columns}
            className="mt-3"
          />
        </div>
      )
    },
    {
      title: "Admin",
      value: "admin",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded  bg-[#212129]  p-4 text-xl md:text-4xl font-bold text-white ">
          <p>Admin</p>
          <Tables
            Data={users.filter((v) => v.role === "Admin")}
            Columns={columns}
            className="mt-3"
          />
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
