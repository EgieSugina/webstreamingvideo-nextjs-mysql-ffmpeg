// import Layout from "@/components/layout/home";

// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth/next";
// import { redirect } from "next/navigation";

// import { useSession } from "next-auth/react";

export default async function HomeLayout({ children }) {
  // const session = await getServerSession(authOptions);

  // if (session) {
  return <>{children}</>;
  // }

  // return redirect("/login");
}
