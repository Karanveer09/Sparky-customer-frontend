"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Package,
  CheckCircle2,
  AlertCircle,
  Search,
  ArrowRight,
  Phone,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Wrench,
  ExternalLink
} from "lucide-react";

export default function MyBookings({ onSelectBooking }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'completed'
  const [searchPhone, setSearchPhone] = useState("");
  const [manualLoading, setManualLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const THEME_TEAL = "#C2306B";

  const fetchUserOrders = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      // 1. Check logged-in session
      const authRes = await fetch("/api/me");
      const authData = await authRes.json();

      let phoneToFetch = authData?.user?.phone;
      if (authData?.user) {
        setUser(authData.user);
      }

      // If no auth phone, check localStorage saved address / phone
      if (!phoneToFetch && typeof window !== "undefined") {
        const savedAddr = localStorage.getItem("user_address");
        if (savedAddr) {
          try {
            const parsed = JSON.parse(savedAddr);
            if (parsed.phone) phoneToFetch = parsed.phone;
          } catch (e) {}
        }
      }

      if (phoneToFetch) {
        const orderRes = await fetch("/api/orders/by-phone", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: phoneToFetch }),
        });
        const orderData = await orderRes.json();
        setTasks(orderData.orders || []);
      } else {
        // Check recent localStorage orders if any
        const localOrders = JSON.parse(localStorage.getItem("recent_orders") || "[]");
        setTasks(localOrders);
      }
    } catch (e) {
      console.error("Error fetching bookings:", e);
      setErrorMsg("Unable to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const handleManualSearch = async (e) => {
    e.preventDefault();
    if (!searchPhone.trim()) return;
    setManualLoading(true);
    setErrorMsg("");
    try {
      const orderRes = await fetch("/api/orders/by-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: searchPhone.trim() }),
      });
      const orderData = await orderRes.json();
      if (orderData.orders && orderData.orders.length > 0) {
        setTasks(orderData.orders);
      } else {
        setTasks([]);
        setErrorMsg("No bookings found for this phone number.");
      }
    } catch (e) {
      setErrorMsg("Failed to search bookings.");
    } finally {
      setManualLoading(false);
    }
  };

  const isCompleted = (task) => {
    const status = (task.status || "").toLowerCase();
    return status === "completed" || status === "delivered" || status === "done";
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !isCompleted(task);
    if (filter === "completed") return isCompleted(task);
    return true;
  });

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 md:py-8 font-sans text-slate-800">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#C2306B] animate-pulse" />
            <span className="text-[11px] font-bold tracking-widest text-[#C2306B] uppercase">
              Sparky Service Desk
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Bookings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            View, track, and manage all your scheduled appointments
          </p>
        </div>

        <button
          onClick={fetchUserOrders}
          disabled={loading}
          className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition active:scale-95 disabled:opacity-50"
          title="Refresh bookings"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center gap-2 p-1 bg-slate-100/80 rounded-2xl mb-6">
        {[
          { id: "all", label: "All Bookings", count: tasks.length },
          {
            id: "active",
            label: "Active & Upcoming",
            count: tasks.filter((t) => !isCompleted(t)).length,
          },
          {
            id: "completed",
            label: "Completed",
            count: tasks.filter((t) => isCompleted(t)).length,
          },
        ].map((tab) => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all relative ${
                isActive
                  ? "bg-white text-[#C2306B] shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-1.5">
                {tab.label}
                {tab.count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive
                        ? "bg-[#C2306B]/10 text-[#C2306B]"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* GUEST LOOKUP (When user is not logged in) */}
      {!user && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-teal-50/70 to-emerald-50/70 border border-teal-100/80">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C2306B]/10 text-[#C2306B] flex items-center justify-center shrink-0 mt-0.5">
              <Search size={16} />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-800">
                Track by Registered Phone Number
              </h4>
              <p className="text-[11px] text-slate-500 mb-2">
                Not logged in? Enter the phone number used while booking.
              </p>
              <form onSubmit={handleManualSearch} className="flex gap-2">
                <input
                  type="tel"
                  placeholder="Enter 10-digit phone"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white text-xs rounded-xl border border-teal-200 focus:outline-none focus:ring-2 focus:ring-[#C2306B]/30 text-slate-900"
                />
                <button
                  type="submit"
                  disabled={manualLoading || !searchPhone}
                  className="px-4 py-2 bg-[#C2306B] text-white rounded-xl text-xs font-bold hover:bg-[#A82058] transition disabled:opacity-50 active:scale-95"
                >
                  {manualLoading ? "Searching..." : "Find"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
          <AlertCircle size={16} className="text-amber-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* BOOKINGS LIST */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm animate-pulse space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="h-4 w-28 bg-slate-200 rounded-full" />
                <div className="h-4 w-16 bg-slate-200 rounded-full" />
              </div>
              <div className="h-6 w-48 bg-slate-200 rounded-lg" />
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-10 w-full bg-slate-100 rounded-2xl" />
            </div>
          ))}
        </div>
      ) : filteredTasks.length === 0 ? (
        /* EMPTY STATE */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-12 px-6 text-center bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full bg-teal-50 text-[#C2306B] flex items-center justify-center mb-4 shadow-inner">
            <Calendar size={36} className="stroke-[1.75]" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            No Bookings Found
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mb-6">
            {filter !== "all"
              ? `You don't have any ${filter} bookings at the moment.`
              : "You haven't scheduled any service yet. Experience hassle-free home & beauty care with Sparky!"}
          </p>
          <Link
            href="/beauty"
            className="px-6 py-3 rounded-full bg-[#C2306B] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#C2306B]/25 hover:bg-[#A82058] transition active:scale-95"
          >
            <Wrench size={16} />
            <span>Explore Services</span>
          </Link>
        </motion.div>
      ) : (
        /* BOOKINGS LIST */
        <div className="space-y-4">
          <AnimatePresence>
            {filteredTasks.map((task, idx) => {
              const completed = isCompleted(task);
              const orderId = task.order_id || task._id;
              return (
                <motion.div
                  key={orderId || idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] transition-all"
                >
                  {/* Top Bar: Order ID + Status */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-teal-50 text-[#C2306B] flex items-center justify-center">
                        <Package size={15} />
                      </div>
                      <div>
                        <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                          Ref #{orderId ? orderId.toString().slice(-6) : "SPK"}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${
                        completed
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-teal-50 text-[#C2306B] border border-teal-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          completed ? "bg-emerald-500" : "bg-[#C2306B] animate-ping"
                        }`}
                      />
                      {completed ? "Completed" : "Confirmed"}
                    </span>
                  </div>

                  {/* Services In Cart */}
                  <div className="py-3.5 space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {(task.cart || []).map((item, itemIdx) => (
                        <span
                          key={itemIdx}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60"
                        >
                          <Sparkles size={12} className="text-[#C2306B]" />
                          <span>{item.name || item.title || "Service"}</span>
                          {item.quantity && item.quantity > 1 && (
                            <span className="text-[10px] text-slate-400">
                              x{item.quantity}
                            </span>
                          )}
                        </span>
                      ))}
                    </div>

                    {/* Address if available */}
                    {task.address && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                        <MapPin size={13} className="text-slate-400 shrink-0" />
                        <span className="truncate">{task.address}</span>
                      </div>
                    )}
                  </div>

                  {/* Scheduled Slot + Total Price */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-t border-dashed border-slate-100 bg-slate-50/50 rounded-2xl px-3.5 mb-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-white text-[#C2306B] flex items-center justify-center shadow-xs">
                        <Calendar size={15} />
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-slate-400 uppercase">
                          Date
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          {task.date || "Scheduled"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-white text-[#C2306B] flex items-center justify-center shadow-xs">
                        <Clock size={15} />
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-slate-400 uppercase">
                          Time Slot
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          {task.timeSlot || "Flexible"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">
                        Total Amount
                      </span>
                      <span className="text-lg font-black text-slate-900 tracking-tight">
                        ₹{task.total || task.amount || 0}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {orderId && (
                        <button
                          onClick={() => router.push(`/track/${orderId}`)}
                          className="px-4 py-2.5 rounded-2xl bg-[#C2306B] hover:bg-[#A82058] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-[#C2306B]/25 transition active:scale-95"
                        >
                          <span>Track</span>
                          <ChevronRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
