import "./login.css";

import Image from "next/image";
import { LoginForm } from "./form";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

// import Header from "@/components/header.component";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home");
  }
  return (
    <>
      {/* <Header /> */}
      <section className=" bg-[#0a0124]  min-h-screen pt-20">
        <div className="custom-shape-divider-top-1709659997 ">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill shadow-2xl"
            ></path>
          </svg>
        </div>
        <div className="container mx-auto px-6 py-48 h-full flex justify-center items-center">
          <div className="w-8/12 ">
            <Image
              src={"/assets/images/logo.svg"}
              width={800}
              height={1000}
              alt="Logo"
            />
          </div>

          <div className="w-4/12 bg-[#8f68ff] px-8 pb-10 pt-6 rounded-xl">
            <h1 className=" text-gray-700 font-bold text-center text-4xl mb-4">
              Login
            </h1>
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
}
