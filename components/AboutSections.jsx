"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Sparkles,
  Clock,
  CheckCircle2,
  HeartHandshake,
  Star,
  Wrench,
  Scissors,
  ArrowRight,
  MapPin,
  Check,
} from "lucide-react";

/* ===========================
   DATA
   =========================== */
const corePillars = [
  {
    icon: ShieldCheck,
    title: "Strict Background Verification",
    subtitle: "Safety First, Always",
    desc: "Every beautician, technician, and cleaner undergoes mandatory police verification, address authentication, and criminal record screening before onboarding.",
    badge: "Zero Compromise",
    color: "from-teal-500/10 to-emerald-500/10 border-teal-200/60 text-[#008077]",
  },
  {
    icon: Award,
    title: "Certified Skill Assessments",
    subtitle: "Top 5% Talent Only",
    desc: "Pros complete 3-stage practical testing and grooming workshops to ensure perfection in salon techniques, appliance repairs, and customer etiquette.",
    badge: "Master Trained",
    color: "from-amber-500/10 to-orange-500/10 border-amber-200/60 text-amber-700",
  },
  {
    icon: Sparkles,
    title: "Sealed Single-Use Kits",
    subtitle: "Clinical Grade Hygiene",
    desc: "For all beauty and salon sessions, we exclusively use sealed, single-use disposable kits opened right in front of you with dermatologically approved brands.",
    badge: "100% Sterile",
    color: "from-rose-500/10 to-pink-500/10 border-rose-200/60 text-rose-700",
  },
  {
    icon: HeartHandshake,
    title: "7-Day Sparky Warranty",
    subtitle: "Total Peace of Mind",
    desc: "We stand 100% behind our craft. If any service doesn't meet your expectations, we provide hassle-free rework or refund within 7 days, no questions asked.",
    badge: "Guaranteed",
    color: "from-blue-500/10 to-indigo-500/10 border-blue-200/60 text-blue-700",
  },
  {
    icon: Clock,
    title: "Punctual & Transparent",
    subtitle: "Respect for Your Time",
    desc: "Real-time technician tracking on your phone map with precise arrival windows. Transparent, standardized pricing with zero hidden fees.",
    badge: "On-Time Promise",
    color: "from-purple-500/10 to-violet-500/10 border-purple-200/60 text-purple-700",
  },
  {
    icon: Wrench,
    title: "Genuine Parts & Modern Tools",
    subtitle: "Precision Engineering",
    desc: "Our maintenance specialists use calibrated electronic diagnostic tools and 100% OEM genuine spares to guarantee long-lasting fixes.",
    badge: "OEM Spares",
    color: "from-slate-500/10 to-zinc-500/10 border-slate-200/60 text-slate-700",
  },
];

const steps = [
  {
    num: "01",
    title: "Select Service",
    desc: "Pick from salon at home, AC service, deep cleaning, electricals, and more at standardized rates.",
    icon: Scissors,
  },
  {
    num: "02",
    title: "Pick Your Slot",
    desc: "Choose an exact hour and date that fits your lifestyle. Same-day emergency slots available.",
    icon: Clock,
  },
  {
    num: "03",
    title: "Verified Pro Arrives",
    desc: "A background-checked, uniformed specialist arrives fully equipped with tools and sterile kits.",
    icon: ShieldCheck,
  },
  {
    num: "04",
    title: "Relax & Pay Later",
    desc: "Inspect the completed work, pay securely via UPI/Card, and enjoy our 7-day service warranty.",
    icon: CheckCircle2,
  },
];

const testimonials = [
  {
    name: "Simran Kaur",
    location: "Ranjit Avenue, Amritsar",
    service: "Diamond Facial & Hair Spa",
    rating: 5,
    review:
      "The salon-at-home experience with Sparky was mindblowing. The beautician brought sealed disposable kits, wore shoe covers, and the facial was better than the top luxury parlours in Amritsar!",
  },
  {
    name: "Rajesh Sharma",
    location: "Mall Road, Amritsar",
    service: "AC Deep Cleaning & Repair",
    rating: 5,
    review:
      "Had an AC leaking issue right before a family gathering. Booked on Sparky, technician arrived in 25 mins with foam jet cleaner. Fixed in no time with transparent billing. Highly recommended!",
  },
  {
    name: "Gurpreet Singh",
    location: "Circular Road, Amritsar",
    service: "Home Electrical & Switchboard",
    rating: 5,
    review:
      "Finally a service you can actually trust in Amritsar! Verified professional with ID badge, proper toolkit, and no bargaining needed. Sparky is a game changer.",
  },
];

const comparisons = [
  {
    feature: "Professional Verification",
    sparky: "Police checked, background verified & tested",
    traditional: "Random stranger, unknown background",
  },
  {
    feature: "Pricing Transparency",
    sparky: "Standard fixed rate card, itemized bill",
    traditional: "Arbitrary quotes & endless bargaining",
  },
  {
    feature: "Hygiene & Safety",
    sparky: "Single-use sealed kits & sanitized tools",
    traditional: "Reused tools & questionable products",
  },
  {
    feature: "Service Warranty",
    sparky: "7-Day rework or money-back guarantee",
    traditional: "Zero accountability once pro leaves",
  },
  {
    feature: "Live Tracking",
    sparky: "Real-time GPS tracker on your phone",
    traditional: "Endless phone calls asking 'Kahan pohnche?'",
  },
];

/* ===========================
   COMPONENT
   =========================== */
export default function AboutSections() {
  return (
    <div className="bg-[#F8F9F5] text-slate-800 font-sans selection:bg-[#008077]/15">
      {/* =========================================================================
          OUR STORY & ROOTS
          ========================================================================= */}
      <section className="py-14 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[32px] p-6 sm:p-10 md:p-12 border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-[10px] font-extrabold uppercase tracking-widest">
              <MapPin size={12} className="text-amber-600" />
              <span>Born in Amritsar, Punjab</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Re-imagining Everyday Services With Dignity & Trust
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              We started Sparky because finding a reliable beautician or a skilled
              technician shouldn't feel like a gamble. For decades, homeowners had
              to deal with unpredictable pricing, unverified strangers entering
              their private spaces, and zero accountability when things went wrong.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              At the same time, hardworking beauty professionals and technicians
              were trapped in unorganized markets, getting underpaid and
              disrespected. Sparky changes both sides of the coin: empowering
              skilled artisans with fair livings, pride, and tech tools, while giving
              you a 5-star, salon-grade hotel service right in your living room.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-lg font-black text-slate-900">500+ Pros</p>
                <p className="text-[11px] font-bold text-slate-500 uppercase mt-0.5">
                  Empowered & Trained
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-lg font-black text-[#008077]">100%</p>
                <p className="text-[11px] font-bold text-slate-500 uppercase mt-0.5">
                  Safe & Sanitized Kits
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#008077] to-[#005e57] p-8 text-white flex flex-col justify-between min-h-[360px]">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-200">
                  The Sparky Standard
                </span>
                <h3 className="text-2xl font-black mt-2 leading-tight">
                  &ldquo;When someone enters your home, trust is not optional.&rdquo;
                </h3>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/15">
                <div className="flex items-center gap-2.5 text-xs font-semibold">
                  <CheckCircle2 size={16} className="text-teal-300 shrink-0" />
                  <span>Triple-Layered Background Verification</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold">
                  <CheckCircle2 size={16} className="text-teal-300 shrink-0" />
                  <span>Real-time Live GPS Tracking on App</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold">
                  <CheckCircle2 size={16} className="text-teal-300 shrink-0" />
                  <span>Zero Cash Hassles & UPI Direct</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black tracking-wider">TEAM SPARKY</p>
                  <p className="text-[10px] text-teal-200 font-medium">Amritsar Operations Hub</p>
                </div>
                <span className="text-2xl">✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CORE PILLARS & VALUES (CARD GRID)
          ========================================================================= */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008077]">
            Why Thousands Choose Us
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            The Sparky Commitment
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Built from the ground up to protect your home, health, and peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {corePillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center border shadow-xs`}
                    >
                      <Icon size={22} />
                    </div>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-[11px] font-bold text-[#008077] uppercase tracking-wide mt-0.5">
                    {p.subtitle}
                  </p>

                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2.5">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-extrabold text-[#008077]">
                  <Check size={14} className="stroke-[3]" />
                  <span>Guaranteed on every booking</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          HOW SPARKY WORKS (STEP BY STEP)
          ========================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-y border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008077]">
              Simple 4-Step Flow
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              How Sparky Delivers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Seamless booking to execution in less than 60 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => {
              const Icon = st.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-[#F8F9F5] border border-slate-200/70 relative group hover:bg-white hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-slate-300 group-hover:text-[#008077] transition-colors">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-[#008077] group-hover:text-white text-slate-700 flex items-center justify-center shadow-xs transition-colors">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1.5">
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SPARKY VS CONVENTIONAL (COMPARISON TABLE CARD)
          ========================================================================= */}
      <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008077]">
            The Difference
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Sparky vs. Traditional Market
          </h2>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="grid grid-cols-12 bg-slate-900 text-white p-4 sm:p-5 font-bold text-xs uppercase tracking-wider">
            <div className="col-span-4 sm:col-span-5">Feature</div>
            <div className="col-span-4 sm:col-span-4 text-[#2dd4bf] font-black flex items-center gap-1.5">
              <span>Sparky</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Verified
              </span>
            </div>
            <div className="col-span-4 sm:col-span-3 text-slate-400">Local Unorganized</div>
          </div>

          <div className="divide-y divide-slate-100">
            {comparisons.map((c, i) => (
              <div
                key={i}
                className="grid grid-cols-12 p-4 sm:p-5 text-xs items-center hover:bg-slate-50/60 transition-colors"
              >
                <div className="col-span-4 sm:col-span-5 font-bold text-slate-900">
                  {c.feature}
                </div>
                <div className="col-span-4 sm:col-span-4 text-[#008077] font-extrabold flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#008077] shrink-0" />
                  <span>{c.sparky}</span>
                </div>
                <div className="col-span-4 sm:col-span-3 text-slate-400 font-medium">
                  {c.traditional}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          REAL CUSTOMER REVIEWS
          ========================================================================= */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008077]">
            Community Love
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Loved By Amritsar Homeowners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.03)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-slate-900">{t.name}</h4>
                  <p className="text-[10px] text-slate-400 font-medium">{t.location}</p>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-[#008077] border border-teal-100">
                  {t.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          HIGH IMPACT CALL TO ACTION
          ========================================================================= */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[36px] overflow-hidden bg-gradient-to-r from-slate-900 via-[#0d2a28] to-[#008077] p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-300">
              Ready for 5-Star Home Care?
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Book Your First Verified Specialist Today.
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 font-medium">
              Enjoy salon indulgence or expert maintenance delivered to your door with
              the 7-day Sparky quality guarantee.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/beauty"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-900 font-black text-xs uppercase tracking-wider shadow-xl hover:bg-slate-100 transition active:scale-95 text-center"
            >
              Book Service Now
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-extrabold text-xs uppercase tracking-wider border border-white/20 transition active:scale-95 text-center"
            >
              Get Help
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
