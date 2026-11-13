import { useState, useEffect, useRef, useCallback } from "react";
import { FaStar, FaQuoteRight, FaMapMarkerAlt } from "react-icons/fa";
import { LuChevronLeft, LuChevronRight, LuShieldCheck, LuCalendar } from "react-icons/lu";

const reviews = [
  {
    name: "Murugan Selvam",
    location: "Coimbatore to Ooty",
    rating: 5,
    tag: "Family Holiday",
    date: "12 Nov 2026",
    text: "Booked an Innova for our family trip to Ooty. Driver Murugesan was very polite, drove through the ghat roads with exceptional care, and arrived 15 minutes before the pickup time. Very clean AC vehicle and zero hidden charges!",
  },
  {
    name: "Dr. Soundarya Natarajan",
    location: "Tiruppur to Coimbatore Airport",
    rating: 5,
    tag: "Airport Drop",
    date: "04 Nov 2026",
    text: "Had an early morning 4:30 AM flight. The chauffeur was waiting right outside our house at 2:00 AM sharp without causing any disturbance. Highly reliable and safe for female solo travelers.",
  },
  {
    name: "Senthil Kumar V",
    location: "Salem to Chennai",
    rating: 5,
    tag: "One-Way Drop",
    date: "28 Oct 2026",
    text: "Most taxi services force you to pay double-side return km charges. Pallaku Cabs gave genuine one-way pricing. The Dzire was super comfortable and the driver gave clear receipts for all highway tolls.",
  },
  {
    name: "Kavitha Meenakshi Sundaram",
    location: "Madurai to Rameswaram",
    rating: 5,
    tag: "Temple Tour",
    date: "21 Oct 2026",
    text: "Traveled with my elderly parents for temple darshan. The chauffeur was extremely patient, assisted my mother while boarding, and guided us to good traditional vegetarian dining spots. Truly grateful!",
  },
  {
    name: "Vigneshwaran Palanisamy",
    location: "Erode to Bangalore Airport",
    rating: 5,
    tag: "Emergency Travel",
    date: "15 Oct 2026",
    text: "Booked on short notice at 11 PM for an emergency morning flight from Bangalore. The cab arrived within 35 minutes. Professional, safe, and punctual highway transit throughout the night.",
  },
  {
    name: "Annamalai Chettiar",
    location: "Tiruchirappalli to Kodaikanal",
    rating: 5,
    tag: "Round Trip Vacation",
    date: "09 Oct 2026",
    text: "Booked for a 3-day holiday in Kodaikanal. Driver allowance and daily minimum km were completely upfront as quoted. Neat chauffeur with excellent route familiarity. Best cab service in Tamil Nadu!",
  },
];

const AUTO_DELAY = 5000;

// "Dr. Soundarya Natarajan" -> "SN"
const getInitials = (name) =>
  name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const Stars = ({ count = 5, className = "" }) => (
  <div className={`flex gap-0.5 text-amber-400 ${className}`} aria-label={`${count} out of 5 stars`}>
    {[...Array(count)].map((_, i) => (
      <FaStar key={i} />
    ))}
  </div>
);

const Testimonials = () => {
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0); // restarts the progress bar

  // Distance between two card starts (card width + gap)
  const getStep = useCallback(() => {
    const el = trackRef.current;
    if (!el || !el.children.length) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return el.children[0].offsetWidth + gap;
  }, []);

  const goTo = useCallback(
    (index) => {
      const el = trackRef.current;
      if (!el) return;
      const step = getStep();
      const safe = (index + reviews.length) % reviews.length;
      el.scrollTo({ left: safe * step, behavior: "smooth" });
      setActive(safe);
      setCycle((c) => c + 1);
    },
    [getStep]
  );

  // Keep the active dot in sync with manual swipe / drag
  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const step = getStep();
    if (!step) return;
    const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const idx = nearEnd ? reviews.length - 1 : Math.round(el.scrollLeft / step);
    setActive(Math.min(Math.max(idx, 0), reviews.length - 1));
  };

  // Auto-advance, paused on hover / touch / focus, off for reduced-motion users
  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => goTo(active + 1), AUTO_DELAY);
    return () => clearTimeout(timer);
  }, [isPaused, active, cycle, goTo]);

  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden bg-gradient-to-b from-white via-rose-50/40 to-white py-16 sm:py-24"
    >
      {/* Soft ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-rose-100/70 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-rose-100/50 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          {/* ───────── Left: heading + rating summary + controls ───────── */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-3.5 py-1.5 text-xs font-bold tracking-wide text-[#ff1d58] shadow-sm backdrop-blur">
              <FaStar size={11} className="text-amber-500" />
              Real passenger experiences
            </div>

            <h2 className="mt-5 text-3xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              Trusted by travelers across Tamil Nadu
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
              Read what regular outstation passengers, families, and airport commuters say about their
              journey with Shree Pallaku Cabs.
            </p>

            {/* Rating summary */}
            <div className="mt-8 flex w-full max-w-sm items-center gap-5 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_40px_-12px_rgba(15,23,42,0.15)]">
              <div className="text-5xl font-black leading-none tracking-tighter text-slate-900 sm:text-6xl">
                4.9
              </div>
              <div className="h-12 w-px bg-slate-200" />
              <div>
                <Stars className="text-sm sm:text-base" />
                <p className="mt-1.5 text-xs font-medium text-slate-500 sm:text-sm">
                  from 3,000+ verified reviews
                </p>
              </div>
            </div>

            {/* Desktop controls */}
            <div className="mt-8 hidden items-center gap-3 lg:flex">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1d58] focus-visible:ring-offset-2 active:scale-95"
                aria-label="Previous review"
              >
                <LuChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff1d58] text-white shadow-lg shadow-rose-500/30 transition hover:bg-[#e01549] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1d58] focus-visible:ring-offset-2 active:scale-95"
                aria-label="Next review"
              >
                <LuChevronRight size={20} />
              </button>
              <span className="ml-2 text-sm font-semibold tabular-nums text-slate-400">
                <span className="text-slate-900">{String(active + 1).padStart(2, "0")}</span> /{" "}
                {String(reviews.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* ───────── Right: carousel ───────── */}
          <div
            className="min-w-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <div
              ref={trackRef}
              onScroll={handleScroll}
              className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-6 pt-2 sm:-mx-6 sm:gap-6 sm:px-6 lg:mx-0 lg:px-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              role="region"
              aria-roledescription="carousel"
              aria-label="Customer reviews"
            >
              {reviews.map((rev, index) => (
                <article
                  key={index}
                  className="group relative flex w-[86vw] max-w-[380px] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-16px_rgba(255,29,88,0.25)] sm:w-[360px] sm:p-7 lg:w-[380px]"
                >
                  {/* Accent hairline */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff1d58] via-rose-400 to-amber-400 opacity-90" />

                  {/* Oversized quote mark */}
                  <FaQuoteRight
                    aria-hidden="true"
                    className="absolute right-6 top-8 text-6xl text-rose-50 transition group-hover:text-rose-100 sm:right-7"
                  />

                  {/* Author */}
                  <div className="relative flex items-center gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff1d58] to-rose-400 text-sm font-black tracking-wide text-white shadow-lg shadow-rose-500/25 ring-4 ring-rose-50">
                      {getInitials(rev.name)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="truncate text-[15px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-base">
                        {rev.name}
                      </h4>
                      <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <LuShieldCheck size={13} />
                        Verified trip
                      </div>
                    </div>
                  </div>

                  {/* Stars + tag */}
                  <div className="relative mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <Stars count={rev.rating} className="text-sm" />
                    <span className="rounded-full border border-rose-100 bg-rose-50 px-2.5 py-0.5 text-[11px] font-bold text-[#ff1d58]">
                      {rev.tag}
                    </span>
                  </div>

                  {/* Review text */}
                  <p className="relative mt-4 flex-1 text-[14px] leading-[1.75] text-slate-700 sm:text-[15px]">
                    {rev.text}
                  </p>

                  {/* Footer: route + date */}
                  <div className="relative mt-6 flex items-center justify-between gap-3 border-t border-dashed border-slate-200 pt-4 text-xs">
                    <div className="flex min-w-0 items-center gap-1.5 font-bold text-[#ff1d58]">
                      <FaMapMarkerAlt size={11} className="shrink-0" />
                      <span className="truncate">{rev.location}</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 font-medium text-slate-400">
                      <LuCalendar size={12} />
                      <span>{rev.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Indicators + mobile controls */}
            <div className="mt-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2" role="tablist" aria-label="Choose review">
                {reviews.map((_, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Go to review ${i + 1}`}
                      onClick={() => goTo(i)}
                      className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1d58] focus-visible:ring-offset-2 ${
                        isActive ? "w-9 bg-rose-100" : "w-2 bg-slate-200 hover:bg-slate-300"
                      }`}
                    >
                      {isActive && (
                        <span
                          key={cycle}
                          className="absolute inset-y-0 left-0 rounded-full bg-[#ff1d58]"
                          style={{
                            width: "100%",
                            animation: isPaused ? "none" : `tsFill ${AUTO_DELAY}ms linear`,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                <button
                  type="button"
                  onClick={() => goTo(active - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition active:scale-90"
                  aria-label="Previous review"
                >
                  <LuChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(active + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff1d58] text-white shadow-md shadow-rose-500/30 transition active:scale-90"
                  aria-label="Next review"
                >
                  <LuChevronRight size={18} />
                </button>
              </div>
            </div>

            <p className="mt-4 hidden text-xs font-medium text-slate-400 sm:block">
              Auto-sliding reviews. Hover to pause, swipe or drag to browse.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tsFill { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        #testimonials ::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          #testimonials * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;