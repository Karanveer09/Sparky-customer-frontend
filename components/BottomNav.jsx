"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Wrench,
  Calendar,
  CircleHelp,
  User,
} from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  // 5 navigation tabs matching the user's requirements
  const navTabs = [
    {
      id: "home",
      label: "Home",
      href: "/",
      Icon: Home,
      isActive: (path) => path === "/",
    },
    {
      id: "services",
      label: "Services",
      href: "/beauty",
      Icon: Wrench,
      isActive: (path) =>
        path === "/beauty" ||
        path.startsWith("/services") ||
        path === "/clean" ||
        path === "/eventdecor" ||
        path === "/haute",
    },
    {
      id: "bookings",
      label: "Bookings",
      href: "/bookings",
      Icon: Calendar,
      isActive: (path) => path === "/bookings" || path.startsWith("/track"),
    },
    {
      id: "help",
      label: "Help",
      href: "/contact",
      Icon: CircleHelp,
      isActive: (path) => path === "/contact" || path === "/help",
    },
    {
      id: "account",
      label: "Account",
      href: "/user",
      Icon: User,
      isActive: (path) =>
        path === "/user" || path === "/login" || path === "/register",
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[425px] z-50 select-none">
      {/* Main Pill Navbar Container */}
      <nav className="relative h-[66px] bg-white rounded-[32px] shadow-[0_12px_40px_rgba(0,0,0,0.12),0_2px_10px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center justify-between px-1.5">
        {navTabs.map((tab) => {
          const active = tab.isActive(pathname);
          const Icon = tab.Icon;

          return (
            <button
              key={tab.id}
              onClick={() => router.push(tab.href)}
              className="flex-1 h-full flex flex-col items-center justify-center relative cursor-pointer group focus:outline-none"
              aria-label={tab.label}
            >
              {active ? (
                /* ================= ACTIVE STATE: ELEVATED TEAL CIRCLE + ARCHED NOTCH ================= */
                <div className="flex flex-col items-center justify-center w-full h-full relative">
                  {/* Smooth White Notch Arch Background wrapping the circle */}
                  <div className="absolute -top-[17px] left-1/2 -translate-x-1/2 w-[72px] h-[22px] pointer-events-none z-10 flex items-center justify-center">
                    <svg
                      viewBox="0 0 72 22"
                      className="w-full h-full"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 22C12 22 16 2 36 2C56 2 60 22 72 22Z"
                        fill="#FFFFFF"
                      />
                      <path
                        d="M0 22C12 22 16 2 36 2C56 2 60 22 72 22"
                        stroke="#f1f5f9"
                        strokeWidth="1.2"
                        fill="none"
                      />
                    </svg>
                  </div>

                  {/* Elevated Teal Circular Button with Subtle Glow */}
                  <motion.div
                    layoutId="activeTabCircle"
                    initial={{ scale: 0.8, y: 8 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 28,
                    }}
                    className="
                      absolute -top-[25px] z-20
                      w-[52px] h-[52px]
                      rounded-full
                      bg-gradient-to-b from-[#008980] to-[#00746b]
                      text-white
                      flex items-center justify-center
                      shadow-[0_10px_22px_rgba(0,128,119,0.38)]
                      border-2 border-white
                    "
                  >
                    <Icon size={24} className="stroke-[2.2] text-white" />
                  </motion.div>

                  {/* Active Label in Vibrant Teal */}
                  <span className="text-[11px] font-bold text-[#008077] tracking-tight mt-6 z-20">
                    {tab.label}
                  </span>
                </div>
              ) : (
                /* ================= INACTIVE STATE ================= */
                <div className="flex flex-col items-center justify-center w-full h-full active:scale-95 transition-transform duration-150">
                  <Icon
                    size={22}
                    className="text-slate-500 group-hover:text-slate-700 stroke-[1.8] transition-colors"
                  />
                  <span className="text-[11px] font-medium text-slate-500 group-hover:text-slate-700 mt-1 transition-colors leading-tight">
                    {tab.label}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
