import { RegisterForm } from "./form";

import "../login/login.css";

import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Image from "next/image";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
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
      <BackgroundGradientAnimation
        gradientBackgroundStart={"rgb(10, 1, 36)"}
        gradientBackgroundEnd={"rgb(143, 104, 255)"}
      >
        <section className="  absolute z-50 inset-0 flex justify-center pointer-events-none">
          <div className="custom-shape-divider-top-1709659997 ">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              // className={""}
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="shape-fill shadow-2xl glass"
              ></path>
            </svg>
          </div>
          <div className="container mx-auto absolute h-full flex justify-center  items-center">
            <div className="w-8/12 ">
              <Image
                src={"/assets/images/logo.svg"}
                width={500}
                height={1000}
                alt="Logo"
                style={{ filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))" }}
              />
              <TextGenerateEffect
                words={"Abandon all hope, ye who enter here."}
              />
            </div>

            <div className="w-4/12 pointer-events-auto bg-[#8f68ff] px-8 pb-10 pt-6 rounded-xl">
              <h1 className=" text-gray-700 font-bold text-center text-4xl mb-4">
                Registrasi
              </h1>
              <RegisterForm />
            </div>
          </div>
        </section>
      </BackgroundGradientAnimation>
    </>
  );
}
