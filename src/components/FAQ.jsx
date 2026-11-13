import { useState } from "react";
import { LuChevronDown, LuCircleHelp } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { useTrip } from "../Contexts/TripType";

const categories = ["All", "Fares & Tolls", "Safety & Chauffeur", "Bookings & Airport"];

const faqs = [
  {
    category: "Fares & Tolls",
    q: "How are the outstation cab charges calculated?",
    a: "Our pricing is transparent and per-kilometer based. For one-way trips, you pay only for the distance traveled from pickup to drop point (minimum 130 km applies). For round trips, minimum 250 km/day applies. Tolls, state permits, and driver bata/allowance are displayed clearly with zero hidden markups.",
  },
  {
    category: "Bookings & Airport",
    q: "Is advance payment required to book a cab?",
    a: "No heavy upfront deposits! You can confirm your booking online or via call. Minor reservation token can be paid or you can settle fares via UPI, cards, or cash directly upon trip completion.",
  },
  {
    category: "Fares & Tolls",
    q: "What is included in the fare and what is extra?",
    a: "The fare includes clean AC vehicle hire, chauffeur service, and standard fuel costs. Toll charges, inter-state entry permit taxes (if crossing state boundaries), and driver night/daily allowance are extra as per actual state regulations.",
  },
  {
    category: "Safety & Chauffeur",
    q: "Are the cabs and chauffeurs verified and safe for night travel?",
    a: "Absolutely. All Shree Pallaku Cabs chauffeurs undergo background verification, police clearance checks, and customer etiquette training. All vehicles are equipped with active GPS tracking and are inspected for long-distance highway safety.",
  },
  {
    category: "Bookings & Airport",
    q: "Can I book a one-way drop taxi to airport or another city?",
    a: "Yes! One-way drop is one of our most popular services. You pay only for the one-way route without having to pay for two-way return empty kilometer charges.",
  },
  {
    category: "Bookings & Airport",
    q: "What if my flight or train is delayed?",
    a: "We monitor arrival timings. Just notify our 24/7 dispatch desk, and your chauffeur will coordinate smoothly with buffer time so your ride is ready when you arrive.",
  },
  {
    category: "Bookings & Airport",
    q: "Can I modify my pickup time or add multiple drop points?",
    a: "Yes, you can easily modify your schedule or add interim stops along the route. Contact our round-the-clock support desk on phone or WhatsApp anytime.",
  },
  {
    category: "Safety & Chauffeur",
    q: "What types of cabs are available in your fleet?",
    a: "We provide Hatchbacks (Swift), Comfort Sedans (Dzire, Etios), 6/7 Seater MPVs (Ertiga, Rumion), Luxury SUVs (Innova, Innova Crysta), and Urbania / Tempo Travellers for larger groups.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("All");
  const { adminPhone } = useTrip();
  const displayPhone = adminPhone || "+91 78712 37890";
  const cleanPhone = displayPhone.replace(/[^0-9]/g, "");

  const filteredFaqs = activeTab === "All"
    ? faqs
    : faqs.filter((f) => f.category === activeTab);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-[#ff1d58] text-xs font-black tracking-widest uppercase">
          <LuCircleHelp size={14} />
          <span>HELP & SUPPORT DESK</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Frequently Asked Questions
        </h2>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Transparent answers about outstation tariffs, driver allowances, airport pickups, and travel safety.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveTab(cat);
                setOpenIndex(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List with Elevated Card Design */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "bg-white border-rose-300 shadow-xl ring-2 ring-rose-500/10"
                  : "bg-white border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-5 sm:px-7 py-5 flex items-center justify-between gap-4 focus:outline-none group"
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#ff1d58] text-white shadow-md shadow-rose-950/20"
                        : "bg-slate-100 text-slate-500 group-hover:bg-rose-50 group-hover:text-[#ff1d58]"
                    }`}
                  >
                    Q{index + 1}
                  </span>
                  <span
                    className={`font-extrabold text-sm sm:text-base transition-colors ${
                      isOpen
                        ? "text-[#ff1d58]"
                        : "text-slate-900 group-hover:text-[#ff1d58]"
                    }`}
                  >
                    {faq.q}
                  </span>
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? "bg-rose-50 text-[#ff1d58] rotate-180"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  }`}
                >
                  <LuChevronDown size={18} />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-7 pb-6 pt-2 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pl-14 sm:pl-16">
                      <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100 text-slate-700 leading-relaxed font-medium">
                        {faq.a}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Premium Help Card */}
      <div className="mt-14 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-9 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-white/10 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#ff1d58]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <span>24/7 Concierge Support</span>
          </div>
          <h4 className="text-lg sm:text-xl font-black text-white">
            Have a custom trip itinerary or questions?
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
            Speak directly with our route specialist for instant fare calculations, multi-city drops, or custom group travel packages.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto relative z-10">
          <a
            href={`tel:${cleanPhone}`}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#ff1d58] to-rose-600 hover:from-[#e01549] hover:to-rose-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-rose-950/40 hover:scale-105 active:scale-95"
          >
            <FaPhoneAlt size={12} />
            <span>Call {displayPhone}</span>
          </a>
          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              "Hi Pallaku Cabs, I have an inquiry regarding outstation cab booking."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-950/30 hover:scale-105 active:scale-95"
          >
            <FaWhatsapp size={15} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;