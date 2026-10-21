"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Trash2,
  ShoppingBag,
  Tag,
  ShieldCheck,
  ChevronLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import toast from "react-hot-toast";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [minCartError, setMinCartError] = useState("");

  const TAX_RATE = 0.18;
  const MIN_CART_VALUE = 299;

  const getCartTotal = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  };

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => setUser(data?.user || null))
      .catch(() => setUser(null));

    const saved = localStorage.getItem("cart");
    if (saved) setCartItems(JSON.parse(saved));

    const savedCoupon = localStorage.getItem("coupon");
    if (savedCoupon) {
      setCoupon(savedCoupon);
      setDiscount(0.1);
    }
  }, []);

  const handleCheckout = () => {
    const total = getCartTotal();

    if (total < MIN_CART_VALUE) {
      const remaining = MIN_CART_VALUE - total;
      setMinCartError(`Add ₹${remaining} more service`);
      return;
    }

    setMinCartError("");

    if (!user) {
      toast.error("Please login to continue");
      router.push("/login");
      return;
    }

    router.push("/checkout");
  };

  const removeItem = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    if (updated.length === 0) localStorage.removeItem("coupon");
    toast.success("Item removed");
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SAVE10") {
      setDiscount(0.1);
      localStorage.setItem("coupon", "SAVE10");
      toast.success("10% discount applied");
    } else {
      setDiscount(0);
      localStorage.removeItem("coupon");
      toast.error("Invalid coupon");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const tax = subtotal * TAX_RATE;
  const discountAmount = subtotal * discount;
  const total = subtotal + tax - discountAmount;

  return (
    <div className="min-h-screen bg-[#F8F9F5] text-[#1A2421] font-sans antialiased pb-28 lg:pb-16 selection:bg-[#E5EAD7]">
      {/* =========================================================================
          HEADER BAR
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-[#EAEFE0] shadow-[0_4px_20px_rgba(58,77,57,0.04)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 bg-[#F5F7F0] hover:bg-[#EAEFE0] border border-[#E5EAD7] shadow-sm rounded-full flex items-center justify-center text-[#3A4D39] active:scale-90 transition-all"
            aria-label="Back"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="text-center">
            <h1 className="text-base sm:text-lg font-[900] tracking-tight text-[#1A2421]">
              Review Your Bag
            </h1>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#4F6F52]">
              {cartItems.length} Ritual{cartItems.length !== 1 ? "s" : ""} Selected
            </p>
          </div>

          <Link
            href="/beauty"
            className="text-xs font-bold text-[#3A4D39] hover:underline px-2.5 py-1 rounded-lg bg-[#F5F7F0] border border-[#E0E6D4]"
          >
            + Add More
          </Link>
        </div>
      </header>

      {/* =========================================================================
          LANDSCAPE 2-COLUMN CONTAINER
          ========================================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {cartItems.length === 0 ? (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-10 text-center border border-[#EAEFE0] shadow-sm my-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F5F7F0] flex items-center justify-center text-[#4F6F52]">
              <ShoppingBag size={28} />
            </div>
            <h2 className="text-lg font-black text-[#1A2421]">Your basket is empty</h2>
            <p className="text-xs text-[#5F6B4A] mt-1 mb-6">
              Explore our curated beauty & salon rituals to add services.
            </p>
            <Link
              href="/beauty"
              className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-[#3A4D39] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-xl transition-all"
            >
              Explore Rituals
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Cart Items & Coupon (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EAEFE0] shadow-sm">
                <h2 className="text-xs font-black uppercase tracking-wider text-[#4F6F52] mb-4">
                  Selected Treatments
                </h2>

                <div className="space-y-3.5">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8F9F5] border border-[#EAEFE0] hover:border-[#D2DAC2] transition-all"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white border border-[#EAEFE0] shrink-0">
                          <Image
                            src={item.image || "/images/goldfacial.jpg"}
                            alt={item.title || "service"}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm font-extrabold text-[#1A2421] truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs font-bold text-[#3A4D39] mt-0.5">
                            ₹{item.price}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(index)}
                        className="p-2.5 rounded-xl text-[#A61D33] hover:bg-rose-50 transition active:scale-90"
                        title="Remove service"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EAEFE0] shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={16} className="text-[#3A4D39]" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#4F6F52]">
                    Offer Code
                  </h3>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon (e.g. SAVE10)"
                    className="flex-1 bg-[#F8F9F5] border border-[#E0E6D4] rounded-2xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-[#3A4D39]"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-5 py-2.5 rounded-2xl bg-[#3A4D39] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2F3A1F] transition"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAEFE0] shadow-md space-y-5">
                <h2 className="text-xs font-black uppercase tracking-wider text-[#4F6F52] pb-3 border-b border-[#F0F4E8]">
                  Price Breakdown
                </h2>

                <div className="space-y-3 text-xs font-semibold">
                  <div className="flex justify-between text-[#5F6B4A]">
                    <span>Item Subtotal</span>
                    <span className="font-bold text-[#1A2421]">₹{subtotal.toFixed(0)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-[#3A4D39]">
                      <span>Discount (10% OFF)</span>
                      <span className="font-bold">-₹{discountAmount.toFixed(0)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#5F6B4A]">
                    <span>GST (18%)</span>
                    <span className="font-bold text-[#1A2421]">₹{tax.toFixed(0)}</span>
                  </div>

                  <div className="pt-3 border-t border-[#F0F4E8] flex justify-between items-baseline">
                    <span className="text-sm font-black text-[#1A2421]">Total Amount</span>
                    <span className="text-2xl font-[1000] text-[#1A2421]">
                      ₹{total.toFixed(0)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#3A4D39] to-[#2F3A1F] text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-[#3A4D39]/30 hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} className="text-[#F7B614]" />
                </button>
              </div>

              {/* Sparky Guarantee Card */}
              <div className="bg-[#F5F7F0] rounded-3xl p-5 border border-[#E0E6D4] space-y-2.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#3A4D39]" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#3A4D39]">
                    Sparky Protection
                  </span>
                </div>
                <p className="text-[11px] text-[#4F6F52] leading-relaxed">
                  Every ritual comes with certified sanitization, verified experts, and damage-free guarantee.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

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