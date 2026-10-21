"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Headphones,
  MessageSquare,
  Phone,
  Mail,
  Send,
  ChevronDown,
  Search,
  ShieldCheck,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  RefreshCw,
  HelpCircle,
  FileText,
  ExternalLink,
  ArrowRight,
  ChevronLeft,
  X,
  AlertTriangle,
  Zap
} from "lucide-react";

/* =========================================================================
   FAQ DATA
   ========================================================================= */
const FAQ_CATEGORIES = [
  "All Topics",
  "Booking & Rescheduling",
  "Payments & Refunds",
  "Safety & Quality",
  "Live Service Journey",
];

const FAQ_ITEMS = [
  {
    id: 1,
    category: "Booking & Rescheduling",
    question: "How do I track my service professional in real-time?",
    answer:
      "Once an expert is assigned to your order, you can visit the Track page directly from your account or the floating order tracker. You will see their live GPS coordinates on an interactive map with updated turn-by-turn ETA.",
  },
  {
    id: 2,
    category: "Safety & Quality",
    question: "What is Sparky's 100% Satisfaction Guarantee?",
    answer:
      "Sparky guarantees craftsmanship and hygiene. If you are not completely delighted with your service ritual, our safety desk will arrange a complimentary rework session with a senior specialist or initiate an immediate full refund.",
  },
  {
    id: 3,
    category: "Booking & Rescheduling",
    question: "Can I reschedule or cancel my service booking?",
    answer:
      "Yes. You can reschedule to any available date and time slot with zero penalty as long as the technician has not departed for your premises. Free cancellations are honored up to 2 hours before the scheduled appointment.",
  },
  {
    id: 4,
    category: "Payments & Refunds",
    question: "How do refunds work and how long do they take?",
    answer:
      "Approved refunds are processed instantly back to your original payment method (UPI, Debit/Credit Card, or Net Banking). Bank settlement typically reflects within 2 to 4 business hours.",
  },
  {
    id: 5,
    category: "Safety & Quality",
    question: "Are all Sparky service professionals background-checked?",
    answer:
      "Every single technician and salon partner undergoes 7-point verification: mandatory police background clearance, government ID validation, in-person hygiene training, and technical trade tests before accepting any appointment.",
  },
  {
    id: 6,
    category: "Live Service Journey",
    question: "What should I do if an emergency arises during a service?",
    answer:
      "Every active appointment includes an instant Emergency Pause feature in the app. Tapping it halts the live service timer immediately and alerts our priority safety desk to contact you within 60 seconds.",
  },
  {
    id: 7,
    category: "Payments & Refunds",
    question: "Which payment options are accepted?",
    answer:
      "We support all major payment gateways including UPI (Google Pay, PhonePe, Paytm), Visa, MasterCard, RuPay cards, Net Banking, and secure Cash on Delivery upon completion.",
  },
];

/* =========================================================================
   QUICK ASSISTANCE CARDS DATA
   ========================================================================= */
const QUICK_CARDS = [
  {
    id: "call",
    title: "Call Direct Concierge",
    subtitle: "Instant Voice Support",
    detail: "+91 81950 60669",
    meta: "Available 7 AM - 11 PM",
    badge: "Priority",
    badgeColor: "bg-[#F7B614] text-[#1A2421]",
    icon: Phone,
    actionText: "Call Now",
    actionHref: "tel:+918195060669",
  },
  {
    id: "whatsapp",
    title: "WhatsApp Helpline",
    subtitle: "Chat with an Expert",
    detail: "Direct message resolution",
    meta: "Average reply: 2 mins",
    badge: "Fastest",
    badgeColor: "bg-[#3A4D39] text-white",
    icon: MessageSquare,
    actionText: "Open WhatsApp",
    actionHref: "https://wa.me/918195060669?text=Hi%20Sparky%20Support,%20I%20need%20assistance%20with%20my%20service.",
    external: true,
  },
  {
    id: "orders",
    title: "Active Bookings",
    subtitle: "Self-Service Hub",
    detail: "Track, reschedule, or cancel",
    meta: "Instant self-service",
    badge: "Automated",
    badgeColor: "bg-[#F2F4ED] text-[#4F6F52]",
    icon: Calendar,
    actionText: "Manage Bookings",
    actionHref: "/user",
  },
  {
    id: "email",
    title: "Email Support Desk",
    subtitle: "Official Correspondence",
    detail: "support@sparky.in",
    meta: "Detailed inquiry & bills",
    badge: "24x7",
    badgeColor: "bg-[#F2F4ED] text-[#4F6F52]",
    icon: Mail,
    actionText: "Write Email",
    actionHref: "mailto:support@sparky.in",
  },
];

const ISSUE_TAGS = [
  "Booking & Reschedule",
  "Technician Delay",
  "Billing & Invoice",
  "Quality / Rework",
  "Refund Status",
  "Safety / Emergency",
  "Other Inquiry",
];

export default function HelpPage() {
  const router = useRouter();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [openFaqId, setOpenFaqId] = useState(1);

  // Form State
  const [selectedIssue, setSelectedIssue] = useState("Booking & Reschedule");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bookingId: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Filter FAQ items by category and search query
  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === "All Topics" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          issueType: selectedIssue,
        }),
      });

      const data = await res.json().catch(() => ({ success: true }));

      if (data.success !== false) {
        toast.success("Help request registered successfully!");
        setSubmitted(true);
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          bookingId: "",
          message: "",
        });
      } else {
        toast.error("Could not dispatch ticket. Please try again or call support.");
      }
    } catch {
      // Graceful offline fallback
      toast.success("Request logged! A concierge manager will reach out shortly.");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9F5] text-[#1A2421] font-sans antialiased pb-24 lg:pb-16 selection:bg-[#E5EAD7]">
      {/* =========================================================================
          1. HEADER BAR
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-[#EAEFE0] shadow-[0_4px_20px_rgba(58,77,57,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2.5 rounded-full bg-[#F5F7F0] hover:bg-[#EAEFE0] text-[#3A4D39] border border-[#E5EAD7] shadow-sm transition-all active:scale-95"
              aria-label="Go Back"
            >
              <ChevronLeft size={20} />
            </button>

            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-[#4F6F52] opacity-80">
                <span>Sparky Care</span>
                <span>/</span>
                <span className="text-[#3A4D39] font-extrabold">24/7 Desk</span>
              </div>
              <h1 className="text-lg lg:text-xl font-[900] tracking-tight text-[#1A2421]">
                Help & Concierge Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:+918195060669"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3A4D39] text-white text-xs font-bold shadow-sm hover:shadow transition-all active:scale-95"
            >
              <Phone size={13} className="text-[#F7B614]" />
              <span className="hidden sm:inline">Priority Line</span>
            </a>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. HERO BANNER CARD WITH LIVE SEARCH
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-10">
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#3A4D39] via-[#2F3E2E] to-[#1E291D] text-white p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl shadow-[#3A4D39]/20">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F7B614]/10 rounded-full blur-3xl pointer-events-none -translate-y-20 translate-x-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none -translate-x-16 translate-y-16" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-wider text-[#F7B614]">
              <Sparkles size={14} />
              <span>Dedicated Customer Assistance</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-[900] tracking-tight leading-tight">
              How can our concierge <br className="hidden sm:block" />
              <span className="text-[#F7B614] italic">assist you</span> today?
            </h2>

            <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto leading-relaxed font-medium">
              Get immediate help with bookings, technician dispatch, refunds, or safety support.
            </p>

            {/* Smart Search Card Input */}
            <div className="pt-2">
              <div className="relative max-w-xl mx-auto">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions, tracking, invoices, refunds..."
                  className="w-full pl-11 pr-10 py-3.5 sm:py-4 rounded-2xl bg-white text-[#1A2421] placeholder-gray-400 text-xs sm:text-sm font-semibold shadow-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#F7B614] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. QUICK ASSISTANCE CARDS GRID
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#4F6F52]">
              Instant Channels
            </span>
            <h2 className="text-xl lg:text-2xl font-[900] text-[#1A2421] tracking-tight">
              Connect With Us
            </h2>
          </div>
          <span className="text-xs text-[#5F6B4A] font-semibold">
            Typical resolution within 5 minutes
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {QUICK_CARDS.map((card) => {
            const IconComp = card.icon;
            return (
              <div
                key={card.id}
                className="group relative bg-white rounded-3xl p-6 border border-[#EAEFE0] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5F7F0] group-hover:bg-[#3A4D39] text-[#3A4D39] group-hover:text-white transition-all flex items-center justify-center shadow-inner">
                      <IconComp size={22} />
                    </div>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${card.badgeColor}`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#1A2421] group-hover:text-[#3A4D39] transition-colors leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#4F6F52] mt-0.5">
                    {card.subtitle}
                  </p>
                  <p className="text-xs font-extrabold text-[#1A2421] mt-2">
                    {card.detail}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F2F4ED] flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 font-medium">
                    {card.meta}
                  </span>

                  {card.external ? (
                    <a
                      href={card.actionHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-black text-[#3A4D39] group-hover:text-[#F7B614] transition-all"
                    >
                      <span>{card.actionText}</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : card.actionHref.startsWith("tel:") ||
                    card.actionHref.startsWith("mailto:") ? (
                    <a
                      href={card.actionHref}
                      className="inline-flex items-center gap-1 text-xs font-black text-[#3A4D39] group-hover:text-[#F7B614] transition-all"
                    >
                      <span>{card.actionText}</span>
                      <ArrowRight size={13} />
                    </a>
                  ) : (
                    <Link
                      href={card.actionHref}
                      className="inline-flex items-center gap-1 text-xs font-black text-[#3A4D39] group-hover:text-[#F7B614] transition-all"
                    >
                      <span>{card.actionText}</span>
                      <ArrowRight size={13} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. TWO-COLUMN LANDSCAPE WORKSPACE: FAQ CARDS + TICKET DISPATCH CARD
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* -------------------------------------------------------------
              LEFT / PRIMARY COLUMN: FAQ ACCORDION CARDS (lg:col-span-7)
              ------------------------------------------------------------- */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAEFE0] shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F0F4E8]">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#4F6F52]">
                    Self-Service Knowledge
                  </span>
                  <h2 className="text-xl font-[900] text-[#1A2421] tracking-tight">
                    Frequently Asked Questions
                  </h2>
                </div>

                <span className="text-xs font-bold text-[#4F6F52] bg-[#F5F7F0] px-3 py-1 rounded-full border border-[#E5EAD7] self-start sm:self-auto">
                  {filteredFaqs.length} answers found
                </span>
              </div>

              {/* Category Filter Chips */}
              <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1 scroll-smooth">
                {FAQ_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                        isActive
                          ? "bg-[#3A4D39] text-white shadow-md shadow-[#3A4D39]/20"
                          : "bg-[#F8F9F5] text-[#4F6F52] hover:bg-[#EAEFE0]"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* FAQ Cards Accordion */}
              {filteredFaqs.length === 0 ? (
                <div className="py-12 text-center text-[#5F6B4A]">
                  <HelpCircle size={36} className="mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-bold">No answers match your search</p>
                  <p className="text-xs opacity-75 mt-0.5">
                    Try another keyword or send a direct message below.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredFaqs.map((faq) => {
                    const isOpen = openFaqId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                          isOpen
                            ? "bg-[#F8F9F5] border-[#D2DAC2] shadow-sm"
                            : "bg-white border-[#EAEFE0] hover:border-[#D2DAC2]"
                        }`}
                      >
                        <button
                          onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                          className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                isOpen ? "bg-[#F7B614]" : "bg-[#D2DAC2]"
                              }`}
                            />
                            <span className="text-xs sm:text-sm font-extrabold text-[#1A2421] leading-snug">
                              {faq.question}
                            </span>
                          </div>

                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                              isOpen
                                ? "bg-[#3A4D39] text-white rotate-180"
                                : "bg-[#F5F7F0] text-[#3A4D39]"
                            }`}
                          >
                            <ChevronDown size={15} />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5F6B4A] leading-relaxed border-t border-[#EAEFE0]/60">
                            <p className="pl-4 border-l-2 border-[#3A4D39] py-0.5">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sparky Protection & Safety Commitment Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-3xl p-5 border border-[#EAEFE0] shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#F2F4ED] text-[#3A4D39] flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#1A2421]">
                  100% Rework Guarantee
                </h4>
                <p className="text-[11px] text-[#5F6B4A] leading-relaxed">
                  Complimentary rework or immediate refund if you are not fully satisfied.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-[#EAEFE0] shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#F2F4ED] text-[#3A4D39] flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#1A2421]">
                  Police Verified
                </h4>
                <p className="text-[11px] text-[#5F6B4A] leading-relaxed">
                  All salon and technical partners carry 7-point background clearance.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-[#EAEFE0] shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#F2F4ED] text-[#3A4D39] flex items-center justify-center">
                  <Zap size={20} />
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#1A2421]">
                  Instant SOS Desk
                </h4>
                <p className="text-[11px] text-[#5F6B4A] leading-relaxed">
                  Single-tap live service timer pause and priority safety desk escalation.
                </p>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------
              RIGHT COLUMN: DISPATCH TICKET FORM CARD (lg:col-span-5)
              ------------------------------------------------------------- */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAEFE0] shadow-md space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#F0F4E8]">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#3A4D39] to-[#2F3A1F] text-white flex items-center justify-center shadow-md shadow-[#3A4D39]/20">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="text-base font-[900] text-[#1A2421] tracking-tight">
                    Send Direct Message
                  </h3>
                  <p className="text-xs text-[#5F6B4A]">
                    Concierge ticket with guaranteed 15-min SLA
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#F2F4ED] text-[#3A4D39] flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h4 className="text-lg font-[900] text-[#1A2421]">
                      Ticket Logged Successfully!
                    </h4>
                    <p className="text-xs text-[#5F6B4A] mt-1 max-w-xs mx-auto leading-relaxed">
                      A senior concierge manager is reviewing your case and will message or call you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-[#3A4D39] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Issue Category Chips */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#4F6F52] mb-2">
                      Select Topic
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {ISSUE_TAGS.map((tag) => {
                        const isSelected = selectedIssue === tag;
                        return (
                          <button
                            type="button"
                            key={tag}
                            onClick={() => setSelectedIssue(tag)}
                            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                              isSelected
                                ? "bg-[#3A4D39] text-white shadow-sm"
                                : "bg-[#F8F9F5] text-[#4F6F52] hover:bg-[#EAEFE0]"
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name Inputs */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#5F6B4A] mb-1">
                        First Name
                      </label>
                      <input
                        required
                        type="text"
                        value={form.firstName}
                        onChange={(e) =>
                          setForm({ ...form, firstName: e.target.value })
                        }
                        placeholder="John"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9F5] border border-[#E0E6D4] text-xs font-semibold text-[#1A2421] placeholder-gray-400 focus:outline-none focus:border-[#3A4D39] focus:bg-white transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#5F6B4A] mb-1">
                        Last Name
                      </label>
                      <input
                        required
                        type="text"
                        value={form.lastName}
                        onChange={(e) =>
                          setForm({ ...form, lastName: e.target.value })
                        }
                        placeholder="Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9F5] border border-[#E0E6D4] text-xs font-semibold text-[#1A2421] placeholder-gray-400 focus:outline-none focus:border-[#3A4D39] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#5F6B4A] mb-1">
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9F5] border border-[#E0E6D4] text-xs font-semibold text-[#1A2421] placeholder-gray-400 focus:outline-none focus:border-[#3A4D39] focus:bg-white transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#5F6B4A] mb-1">
                        Booking ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={form.bookingId}
                        onChange={(e) =>
                          setForm({ ...form, bookingId: e.target.value })
                        }
                        placeholder="e.g. ORD-99283"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9F5] border border-[#E0E6D4] text-xs font-semibold text-[#1A2421] placeholder-gray-400 focus:outline-none focus:border-[#3A4D39] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[#5F6B4A] mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9F5] border border-[#E0E6D4] text-xs font-semibold text-[#1A2421] placeholder-gray-400 focus:outline-none focus:border-[#3A4D39] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[#5F6B4A] mb-1">
                      How Can We Help?
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Please describe your query or problem in detail..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9F5] border border-[#E0E6D4] text-xs font-semibold text-[#1A2421] placeholder-gray-400 focus:outline-none focus:border-[#3A4D39] focus:bg-white transition resize-none"
                    />
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#3A4D39] to-[#2F3A1F] text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-[#3A4D39]/25 hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <span>Dispatching...</span>
                    ) : (
                      <>
                        <span>Dispatch Ticket</span>
                        <Send size={14} className="text-[#F7B614]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Operating Hours Card */}
            <div className="bg-[#F5F7F0] rounded-3xl p-5 border border-[#E0E6D4] space-y-2">
              <div className="flex items-center gap-2 text-[#3A4D39]">
                <Clock size={16} />
                <span className="text-xs font-black uppercase tracking-wider">
                  Desk Operating Hours
                </span>
              </div>
              <p className="text-[11px] text-[#4F6F52] leading-relaxed">
                Mon - Sun: 7:00 AM - 11:00 PM IST. <br />
                Emergency Escalations and Active Timer Holds are monitored 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}