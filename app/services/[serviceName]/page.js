"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  ShieldCheck,
  Sparkles,
  Clock,
  Star,
  Zap,
  ChevronRight,
  ShieldAlert,
  ChevronLeft,
  Share2,
  CheckCircle2,
  Trash2,
  X
} from "lucide-react";

export default function ServiceDetailPage() {
  const { serviceName } = useParams();
  const router = useRouter();

  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [minCartError, setMinCartError] = useState("");

  const MIN_CART_VALUE = 299;

  // Theme Colors
  const SAGA_GREEN = "#3A4D39";
  const SAGA_MAROON = "#a61d33";
  const SAGA_ACCENT = "#f7b614";
  const SAGA_BG = "#fbfcfa";

  const normalize = (s) => s?.toLowerCase().replace(/[\s-]+/g, "") || "";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.services || [];
        setServices(list);
        const decoded = decodeURIComponent(serviceName || "");
        const found = list.find((s) => normalize(s.title).includes(normalize(decoded)));
        setSelected(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [serviceName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceName]);

  const getCartTotal = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  };

  const addToCart = (service) => {
    const itemToAdd = {
      title: service.name || service.title,
      price:
        typeof service.price === "string"
          ? parseInt(service.price.replace("₹", ""))
          : service.price,
      image: service.image,
      quantity: 1,
      category: service.category,
      earning: service.earning,
      profit: service.profit,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(itemToAdd);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    const total = getCartTotal();

    if (total < MIN_CART_VALUE) {
      const remaining = MIN_CART_VALUE - total;
      setMinCartError(`Add at least ₹${remaining} service`);
      return;
    }

    setMinCartError("");
    router.push("/checkout");
  };

  if (loading) return <ServiceDetailSkeleton />;

  if (!selected)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#F8F9F5]">
        <h2 className="text-xl font-black text-[#A61D33] mb-2">Service Not Found</h2>
        <p className="text-sm text-[#4F6F52] mb-6">The requested ritual could not be located.</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-full bg-[#3A4D39] text-white font-bold text-xs"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8F9F5] text-[#1A2421] font-sans antialiased pb-28 lg:pb-16 selection:bg-[#E5EAD7]">
      {/* =========================================================================
          HEADER BAR
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#EAEFE0] shadow-[0_4px_20px_rgba(58,77,57,0.04)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 bg-[#F5F7F0] hover:bg-[#EAEFE0] border border-[#E5EAD7] shadow-sm rounded-full flex items-center justify-center text-[#3A4D39] active:scale-90 transition-all"
            aria-label="Back"
          >
            <ChevronLeft size={22} />
          </button>

          <span className="text-sm font-[900] tracking-tight text-[#1A2421] truncate max-w-[200px] sm:max-w-md">
            {selected.title}
          </span>

          <button
            onClick={() => router.push("/cart")}
            className="w-10 h-10 bg-[#F5F7F0] hover:bg-[#EAEFE0] border border-[#E5EAD7] shadow-sm rounded-full flex items-center justify-center text-[#3A4D39] active:scale-90 transition-all"
            aria-label="Cart"
          >
            <ShoppingCart size={19} color={SAGA_GREEN} />
          </button>
        </div>
      </header>

      {/* =========================================================================
          RESPONSIVE LANDSCAPE BODY (Desktop 2-column vs Mobile Vertical)
          ========================================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Visual Hero & Sparky Guarantee (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-[#E0E6D4] bg-[#F6F8F3]">
              <Image
                src={selected.image || "/images/goldfacial.jpg"}
                alt={selected.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="bg-[#3A4D39]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {selected.category || "Premium Service"}
                </span>
                <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md text-[#1A2421] px-2.5 py-0.5 rounded-full text-xs font-black shadow-sm">
                  <Star size={12} fill="#F7B614" color="#F7B614" />
                  <span>{selected.rating || "4.9"}</span>
                </div>
              </div>
            </div>

            {/* Sparky Certified Banner */}
            <div className="p-8 text-center bg-[#3A4D39] rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                  <ShieldCheck size={28} className="text-[#F7B614]" />
                </div>
              </div>
              <h4 className="text-white text-base font-[900] tracking-wider uppercase italic">
                Sparky Certified
              </h4>
              <p className="text-white/70 text-[11px] font-bold uppercase tracking-widest mt-1.5 leading-relaxed">
                Premium Hygiene • Single-Use Sealed Kits • Verified Specialists
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Service Details, Pricing, Steps & Booking (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Core Card: Title & Price */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAEFE0] shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#4F6F52]">
                  Curated Treatment
                </span>
                <span className="text-[11px] font-extrabold text-[#3A4D39] bg-[#F2F4ED] px-3 py-1 rounded-full">
                  Best Value
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-[900] text-[#1A2421] leading-tight tracking-tight">
                {selected.title}
              </h1>

              <p className="text-sm text-[#5F6B4A] leading-relaxed">
                {selected.description}
              </p>

              {/* Price Row */}
              <div className="flex items-center justify-between pt-5 border-t border-[#F0F4E8]">
                <div>
                  <span className="text-xs text-[#5F6B4A] block">Service Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-[900] text-[#1A2421]">
                      ₹{selected.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{parseInt(selected.price) + 300}
                    </span>
                  </div>
                </div>

                {/* Desktop Inline Book Button */}
                <button
                  onClick={() => addToCart(selected)}
                  className="hidden lg:flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#3A4D39] to-[#2F3A1F] text-white font-black text-xs uppercase tracking-widest shadow-md hover:shadow-xl active:scale-95 transition-all"
                >
                  <span>Book Ritual</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </section>

            {/* Service Steps */}
            {selected.steps && selected.steps.length > 0 && (
              <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAEFE0] shadow-sm">
                <div className="mb-6">
                  <span className="text-[10px] font-black tracking-widest text-[#4F6F52] uppercase">
                    How It Works
                  </span>
                  <h3 className="text-xl font-[900] text-[#1A2421] tracking-tight mt-1">
                    Service Journey
                  </h3>
                </div>

                <div className="space-y-6 relative pl-3">
                  <div className="absolute left-6 top-2 bottom-2 w-px bg-[#E8ECE4]" />
                  {selected.steps.map((step, idx) => {
                    const [stepLabel, rest] = step.split(" – ");
                    const [title, desc] = rest ? rest.split(": ") : [rest, ""];
                    return (
                      <div key={idx} className="relative pl-10">
                        <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-2 border-[#3A4D39] flex items-center justify-center text-[10px] font-black text-[#3A4D39] shadow-sm">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#1A2421]">
                            {title || stepLabel}
                          </h4>
                          {desc && (
                            <p className="text-xs text-[#5F6B4A] mt-1 leading-relaxed">
                              {desc}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Popular Add-ons */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAEFE0] shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#4F6F52] mb-4">
                Recommended Add-ons
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {services.slice(0, 4).map((s, i) => (
                  <div
                    key={i}
                    onClick={() => router.push(`/services/${encodeURIComponent(s.title)}`)}
                    className="p-3 bg-[#F8F9F5] border border-[#EAEFE0] rounded-2xl hover:border-[#3A4D39] transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                      <Image
                        src={s.image || "/images/goldfacial.jpg"}
                        alt={s.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <p className="text-xs font-bold text-[#1A2421] truncate">{s.title}</p>
                    <p className="text-xs font-black text-[#3A4D39] mt-1">₹{s.price}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* =========================================================================
          MOBILE STICKY BOTTOM CHECKOUT BAR (Hidden on lg screens)
          ========================================================================= */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#EAEFE0] px-6 py-4 flex items-center justify-between shadow-2xl lg:hidden">
        <div>
          <span className="text-[10px] font-bold uppercase text-[#4F6F52]">Net Price</span>
          <p className="text-2xl font-[900] text-[#1A2421] leading-none">
            ₹{selected.price}
          </p>
        </div>

        <button
          onClick={() => addToCart(selected)}
          className="h-12 px-7 rounded-2xl bg-gradient-to-r from-[#3A4D39] to-[#2F3A1F] text-white text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-2 active:scale-95 transition-all"
        >
          <span>Book Now</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Min-Cart Error Toast */}
      {minCartError && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[110] w-[90%] max-w-sm bg-white border border-[#EAEFE0] shadow-2xl rounded-2xl p-3.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#FFF9E6] text-[#F7B614] flex items-center justify-center font-bold text-sm shrink-0">
            ₹
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#1A2421] truncate">{minCartError}</p>
            <p className="text-[10px] text-[#5F6B4A]">Minimum booking is ₹{MIN_CART_VALUE}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8F9F5] p-6 lg:p-12 animate-pulse">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="h-12 bg-white rounded-2xl border border-[#EAEFE0]" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 h-96 bg-white rounded-3xl border border-[#EAEFE0]" />
          <div className="lg:col-span-7 space-y-6">
            <div className="h-44 bg-white rounded-3xl border border-[#EAEFE0]" />
            <div className="h-56 bg-white rounded-3xl border border-[#EAEFE0]" />
          </div>
        </div>
      </div>
    </div>
  );
}
