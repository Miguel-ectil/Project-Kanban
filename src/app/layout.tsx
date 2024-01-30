import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='fixed flex w-full items-center justify-end bg-gradient-to-t from-transparent bg-[#2f0c6663] to-indigo-900 transition-all'>
          <button
            className="flex hover:bg-[#aea7f3] bg-[#BFB9FF]  border-[#BFB9FF] rounded-lg cursor-pointer hover:shadow-lg m-5 text-white px-2 py-2"
            // onClick={handleLogoutClick}
          >
            <strong>+ Novo Card</strong>
          </button>
        </div>
        {children}
      </body>
    </html>
  );
}
