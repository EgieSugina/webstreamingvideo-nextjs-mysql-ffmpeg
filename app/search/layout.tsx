import Layout from "@/components/layout/home/mylist";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function MyList({ children }) {
  const session = await getServerSession(authOptions);

  if (session) {
  return <Layout>{children}</Layout>;
  }
  return redirect("/login");
}
