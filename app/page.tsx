// import {
//   LoginButton,
//   LogoutButton,
//   ProfileButton,
//   RegisterButton
// } from "@/components/buttons.component";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/home");
  }
  return redirect("/login");
  // console.log(session);

  // return (
  //   <main
  //     style={{
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //       height: "70vh"
  //     }}
  //   >
  //     <div>
  //       <LoginButton />
  //       <RegisterButton />
  //       <LogoutButton />
  //       <ProfileButton />

  //       <h1>Server Session</h1>
  //       <pre>{JSON.stringify(session)}</pre>
  //     </div>
  //   </main>
  // );
}
