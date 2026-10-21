"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const hideNavbar =
    pathname === "/checkout" ||
    pathname === "/cart";

  const hideFooter =
    pathname === "/checkout" ||
    pathname === "/cart" ||
    pathname === "/beauty" ||
    pathname.startsWith("/services/");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <main>
        {children}
        <Toaster position="top-right" />
      </main>

      {!hideFooter && <Footer />}
    </>
  );
}