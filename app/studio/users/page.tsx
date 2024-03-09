"use client";

import Image from "next/image";
import { Tabs } from "@/components/ui/tabs";

export default function Users() {
  const tabs = [
    {
      title: "Members",
      value: "members",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded  bg-[#212129]  p-4 text-xl md:text-4xl font-bold text-white ">
          <p>Members</p>
          {/* <Tables /> */}
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
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative  flex flex-col    w-full  items-start justify-start ">
      <Tabs tabs={tabs} />
    </div>
  );
}
