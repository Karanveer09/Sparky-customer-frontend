"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

return (
  <footer className="w-full bg-[#FFF7F3] flex justify-center">

    {/* App Container */}
    <div className="w-full max-w-[430px] lg:max-w-7xl bg-[#FFF7F3] border-t border-[#F1DFE8] relative overflow-hidden">

      {/* Soft ambient background */}
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#C2306B]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-60 h-60 bg-[#8E4FD6]/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="px-6 py-12 relative z-10">

        {/* Brand Block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Link href="/" className="inline-block">
            <span className="text-2xl font-[950] tracking-tight text-[#2B1B2E] italic">
              SPARKY<span className="text-[#C2306B]">.</span>
            </span>
          </Link>

          <div className="space-y-4">
            <h2 className="text-[24px] font-semibold text-[#2B1B2E] tracking-tight leading-snug">
              Rituals, Reimagined at Home
            </h2>

            <p className="text-[#8D788D] text-[14px] leading-relaxed max-w-xl">
              Thoughtfully curated beauty and home services delivered by
              verified professionals with uncompromised hygiene and care.
            </p>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-[#F1DFE8] text-center">
          <p className="text-[11px] text-[#8D788D] tracking-wide">
            © {currentYear} Sparky • Crafted with care
          </p>
        </div>

      </div>
    </div>

  </footer>
);
}
