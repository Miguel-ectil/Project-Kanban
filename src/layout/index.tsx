'use client'
import { useState, useEffect, Fragment } from "react";
import Sidebar from "../layout/Sidebar";
import Header  from "@/layout/Navbar";
// import { Transition } from "@headlessui/react";

export default function Layout({ children }: { children: any }) {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (innerWidth <= 1008) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Header   />
      </div>
      <div
      >
        <div style={{ position: 'fixed', top: 0, zIndex: 1000 }}>
          <Sidebar  />
        </div>
      </div>
      <main
        className={`transition-all duration-[400ms] ${showNav && !isMobile ? "pl-60" : ""}`}
      >
        <div className="mt-12 px-4 z-50">{children}</div>
      </main>
    </>
  );
}

