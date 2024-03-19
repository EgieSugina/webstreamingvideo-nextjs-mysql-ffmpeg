import "./layout.css";

import { LoginButton, LogoutButton } from "@/components/buttons.component";

import { FaPlay } from "react-icons/fa";
import Image from "next/image";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Link from "next/link";
import M_User from "@/db/models/m_user";
import { MdVideoLibrary } from "react-icons/md";
import Menu from "./menu";
import VideoBackground from "@/components/layout/home/videoBackground";
import { authOptions } from "@/lib/auth";
import { findOne } from "./dataVideo";
import { getServerSession } from "next-auth/next";

// import { Button } from "@nextui-org/react";

export default async function HomeLayout({ children }) {
  const session = await getServerSession(authOptions);
  const users = await M_User.findByPk(session.user.id);
  const containsAdminOrStaff =
    session.user.role.includes("Admin") || session.user.role.includes("Staff");
  const Data = await findOne();
  return (
    <>
      <VideoBackground Data={Data}>
        <div className="min-h-full bg-gradient-to-b from-transparent  to-slate-900">
          {/* <VideoBackground> */}
          <nav className="glass sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src={"/assets/images/logo.svg"}
                      width={150}
                      height={150}
                      alt="Logo"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <Menu name="Home" href="/home" />
                      <Menu name="Movie" href="/movie" />
                      <Menu name="My List" href="/mylist" />
                    </div>
                  </div>
                </div>

                <div className=" gap-4 flex text-center place-items-center ">
                  {session ? (
                    <>
                      {" "}
                      <Link
                        href="/profile"
                        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-500 text-lg text-white"
                      >
                        {users.img ? (
                          <>
                            {" "}
                            <Image
                              src={`data:image/png;base64,${users.img}`}
                              width={100}
                              height={100}
                              alt="Profile"
                              className=" rounded-full"
                            />
                          </>
                        ) : (
                          <>
                            <div className={"w-[100] h-[100] rounded-full"}>
                              {session.user.name.split("")[0]}
                            </div>
                          </>
                        )}
                      </Link>
                      <span>{session.user.name}</span>
                      {containsAdminOrStaff && (
                        <>
                          <Link href="/studio">
                            <div
                              className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none text-default-foreground data-[hover=true]:opacity-hover bg-green-800 rounded-md"
                              // type="button"
                              // data-hover="true"
                            >
                              Studio{" "}
                              <MdVideoLibrary className=" font-extrabold text-2xl" />{" "}
                            </div>
                          </Link>
                        </>
                      )}
                      <LogoutButton />
                    </>
                  ) : (
                    <>
                      <LoginButton />
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>

          <main>
            <div className=" h-[30rem] p-8">
              <div className="flex items-center h-full">
                <div className="text-5xl gap-4">
                  {Data.title}
                  <p
                    className="mt-2  text-justif text-medium w-[40rem] max-h-[20rem]"
                    dangerouslySetInnerHTML={{
                      __html: Data.description
                        .split("</p><p>")[0]
                        .replace("<p>", "")
                    }}
                  ></p>

                  <div className="flex gap-2 mt-3">
                    <button className="z-0 text-gray-800 rounded-md group relative  inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-3xl gap-unit-2 [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover   bg-white">
                      <FaPlay /> Play
                    </button>
                    <button
                      className="z-0 text-gray-800 rounded-md group relative  inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-3xl gap-unit-2 [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover 
                    bg-gray-300 bg-opacity-80 hover:bg-opacity-40"
                    >
                      <IoMdInformationCircleOutline /> More Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {children}
          </main>
        </div>
      </VideoBackground>
    </>
  );
}
