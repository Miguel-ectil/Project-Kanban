'use client'
import React from "react";
// import { UserProfile } from "./UserProfile";
// import { Logo } from "./Logo";
import { NavLinks } from "@/components/NavLinks";
import { useScroll } from "../hooks/useScroll";

export default function Header() {
  const isScrolled = useScroll();

  return (
    <header 
      className='flex items-center h-16 px-2 justify-end transition-all duration-[400ms] text-blue-gray-900  bg-gradient-to-r from-gray-600 via-[#48409E] to-black'
    >
      <button
        className="cursor-pointer m-5 text-white px-3 py-2 hover:bg-[#b9b3fd] bg-[#BFB9FF] rounded-lg"
      >
        New Card
      </button>
    </header>
  )
}