"use client";

import { signIn, signOut } from "next-auth/react";

import { Button } from "@nextui-org/react";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";

export const LoginButton = () => {
  

  return (
    <button style={{ marginRight: 10 }} onClick={() => signIn()}>
      Sign in
    </button>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register" style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <Button
      className=" bg-red-800 rounded-md"
      onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}
    >
      Sign Out <IoIosLogOut className=" font-extrabold text-2xl" />
    </Button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
