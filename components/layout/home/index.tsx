import "./layout.css";

import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "@/components/buttons.component";
import Menu from "./menu";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

// import VideoBackground from "@/components/layout/home/videoBackground";



export default async function HomeLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="min-h-full">
        {/* <VideoBackground> */}
        <nav className="glass">
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
                <Link
                  href="/profile"
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-500 text-lg text-white"
                >
                  <Image
                    src={session.user.image}
                    width={100}
                    height={100}
                    alt="Profile"
                    className=" rounded-full"
                  />
                </Link>
                <span>{session.user.name}</span>
                <LogoutButton />
              </div>
            </div>
          </div>
        </nav>
        {/* </VideoBackground> */}
        {/* <pre>{JSON.stringify(session)}</pre> */}
        <main>{children}</main>
      </div>
    </>
  );
}
