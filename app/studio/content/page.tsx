// import React, { useEffect, useState } from "react";

import Movie from "./movie";
import { Tabs } from "@/components/ui/tabs";

// import getDatafindAll from "./getDatafindAll";

export default function Users() {
  // const [Data, setData] = useState<any>([]);

  // const users = await M_User.findAll({
  //   raw: true
  // });
  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await getDatafindAll();
  //     setData(data);
  //   };
  //   getData();
  // }, []);
  // if (Data.length == 0) {
  //   return <>Loading...</>;
  // }

  const tabs = [
    {
      title: "Movie",
      value: "movie",
      content: <Movie />
    }
    // {
    //   title: "TV Series",
    //   value: "tv-series",
    //   content: (
    //     <div className="w-full overflow-hidden relative h-full rounded-2xl  bg-[#212129]  p-4 text-xl md:text-4xl font-bold text-white ">
    //       <div className="flex gap-2">
    //         TV Series
    //         <Link
    //           href="users/form"
    //           className="flex border px-1 m-2 bg-green-600 rounded shadow-2xl hover:bg-green-950 gap-2  text-medium font-medium items-center"
    //         >
    //           <FaUserPlus /> Add
    //         </Link>
    //       </div>

    //       <Tables
    //         Data={Data.filter((v: any) => v.role === "Staff")}
    //         Columns={columns}
    //       />
    //     </div>
    //   )
    // }
  ];

  return (
    <div className="h-full md:h-full [perspective:1000px] relative  flex flex-col overflow-hidden w-full  items-start justify-start ">
      <Tabs tabs={tabs} />
    </div>
  );
}
