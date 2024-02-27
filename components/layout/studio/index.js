"use client";

import React, { useState } from "react";

import { FaHome } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";

//https://react-icons.github.io/react-icons
export default function Aside() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  return (
    <>
      <button
        title="Side navigation"
        type="button"
        className={`visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${
          isSideNavOpen
            ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
            : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? " true" : "false"}
        aria-controls="nav-menu-4"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
          ></span>
        </div>
      </button>

      {/*  <!-- Side Navigation --> */}
      <aside
        id="nav-menu-4"
        aria-label="Side navigation"
        className={` flex w-64 flex-col   bg-gray-900 transition-transform lg:translate-x-0 ${
          isSideNavOpen ? "translate-x-0" : " -translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center gap-4 border-b   p-6">
          <div className="shrink-0">
            <diiv className="relative flex h-40 w-40 items-center justify-center rounded-full text-white">
              <Image
                src="/assets/images/profile.jpg"
                alt="user name"
                title="user name"
                width="500"
                height="500"
                className="max-w-full rounded-full"
              />
            </diiv>
          </div>
          <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0 text-center">
            <h4 className="w-full truncate text-base text-slate-700">
              Nama User
            </h4>
            <p className="w-full truncate text-sm text-slate-500">Role</p>
          </div>
        </div>
        <nav
          aria-label="side navigation"
          className="flex-1 divide-y divide-slate-100 overflow-auto"
        >
          <div>
            <ul className="flex flex-1 flex-col gap-1 py-3">
              <Menu icons={<FaHome />} name={"AAAAA"} href={"aaaa"} />
            </ul>
          </div>
        </nav>

        <footer className="border-t border-slate-200 p-3">
          <Link
            href="#"
            className="flex items-center gap-3 rounded p-3 text-red-900 transition-colors hover:text-emerald-500 "
          >
            <div className="flex items-center self-center ">
              <FaPowerOff />
            </div>
            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm font-medium">
              Logout
            </div>
          </Link>
        </footer>
      </aside>

      {/*  <!-- Backdrop --> */}
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>
      {/*  <!-- End Side navigation menu with user profile and alert message --> */}
    </>
  );
}
