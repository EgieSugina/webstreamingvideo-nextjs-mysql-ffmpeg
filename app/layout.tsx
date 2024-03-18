import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TRIPLEX",
  description: `Aplikasi Ini Di buat oleh\n+-----------+-----------------------+\n|    NPM    |          Nama         |\n+===========+=======================+\n| D1A220400 | Egie Sugina           |\n+-----------+-----------------------+\n| D1A221015 | Ardista Amiyata Putri |\n+-----------+-----------------------+\n| D1A220413 | Dita Widya Ningrum    |\n+-----------+-----------------------+\n| D1A220433 | Widya Septi Aprilia   |\n+-----------+-----------------------+`
};




export default function RootLayout({ children }) {
  return (
    <html lang="en" className={"dark " + inter.className}>
      <link rel="icon" href="/assets/images/ico.svg" sizes="any" />
      <body>
        {/* <NextAuthProvider>{children}</NextAuthProvider> */}
        {children}
        {/* <Providers>{children}</Providers> */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          stacked
          // transition: Flip,
        />
      </body>
    </html>
  );
}
