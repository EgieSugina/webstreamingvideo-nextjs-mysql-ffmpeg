export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/home"],
//   matcher: ["/((?!register|api|login|home|watch|mylist|studio).*)"],
};
