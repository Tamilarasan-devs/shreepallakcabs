import { useRef } from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useTrip } from "../Contexts/TripType";
import logo from "../assets/I1.png";

const Fleets = () => {
  const { vehicles, adminPhone } = useTrip();
  const scrollRef = useRef(null);

  const displayPhone = adminPhone || "+91 78712 37890";
  const cleanPhone = displayPhone.replace(/[^0-9]/g, "");

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="tariffs" className="py-16 sm:py-20 px-3 sm:px-4 lg:px-6 max-w-[1400px] w-full mx-auto overflow-hidden">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-8 sm:mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#ff1d58] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          Transparent Rates
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Our Premium Fleet & Tariffs
        </h2>
        <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
          From economical sedans to spacious luxury MPVs, explore our pristine fleet with clear, fixed per-kilometer pricing.
        </p>
      </div>

      {/* Outer Card Carousel / Container with Nav Arrows */}
      <div className="relative p-0 sm:p-2">
        {/* Left Arrow Button (visible on screens below 1280px when scrollable) */}
        <button
          type="button"
          onClick={() => handleScroll("left")}
          className="xl:hidden absolute left-1 sm:-left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#ff1d58] hover:bg-[#e01549] text-white shadow-xl shadow-rose-900/30 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 focus:outline-none"
          aria-label="Previous fleet"
        >
          <LuChevronLeft size={18} />
        </button>

        {/* Right Arrow Button (visible on screens below 1280px when scrollable) */}
        <button
          type="button"
          onClick={() => handleScroll("right")}
          className="xl:hidden absolute right-1 sm:-right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#ff1d58] hover:bg-[#e01549] text-white shadow-xl shadow-rose-900/30 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 focus:outline-none"
          aria-label="Next fleet"
        >
          <LuChevronRight size={18} />
        </button>

        {/* Grid that spans full width across all 4 columns cleanly */}
        <div
          ref={scrollRef}
          className="grid grid-flow-col auto-cols-[minmax(260px,82vw)] sm:auto-cols-[minmax(270px,1fr)] xl:grid-flow-row xl:grid-cols-4 gap-4 lg:gap-5 overflow-x-auto xl:overflow-visible pb-4 xl:pb-0 pt-2 px-1 scroll-smooth no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {vehicles.map((val, index) => {
            const minKm = val?.minKm || 130;
            const allowance = val?.driverAllowance || 400;

            return (
              <div
                key={index}
                className="snap-center sm:snap-start w-full bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group"
              >
                {/* Top Gradient Highlight Bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-[#ff1d58] to-amber-500" />

                {/* Card Top Header with Pallaku Brand & Seater Tag */}
                <div className="p-4 pb-0 flex items-center justify-between">
                  <div className="h-8 w-24">
                    <img
                      src={logo}
                      alt="Pallaku Cabs"
                      className="h-full w-full object-contain filter drop-shadow-sm brightness-105"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 border border-slate-300/80 rounded-full px-2.5 py-1 text-slate-700 bg-slate-50/80">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600">
                      {val.capacity ? `${val.capacity}` : "4 Seater"}
                    </span>
                  </div>
                </div>

                {/* Car Image with Clean Background (no colored backdrop block) */}
                <div className="relative w-full aspect-[16/11] px-4 py-2 flex items-center justify-center overflow-hidden bg-white">
                  <img
                    src={`https://pallaku-backend.onrender.com/image/${val.img}`}
                    alt={val.type}
                    className="relative z-10 object-contain w-full h-full max-h-36 sm:max-h-40 transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80";
                    }}
                  />
                </div>

                {/* Car Name & Category Bar (Dark Navy Banner) */}
                <div className="bg-[#0b132b] text-white px-4 py-3 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <h3 className="font-extrabold text-base tracking-tight leading-tight truncate">
                      {val.type}
                    </h3>
                    <p className="text-[11px] text-slate-300 font-medium mt-0.5 truncate">
                      {val.options && val.options.length > 0
                        ? val.options.slice(0, 2).join(" • ")
                        : "AC • Verified Driver"}
                    </p>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/25 border border-rose-400/40 text-rose-300 shrink-0">
                    Outstation
                  </span>
                </div>

                {/* Tariffs Section */}
                <div className="p-4 flex flex-col flex-1 justify-between bg-white">
                  <div className="grid grid-cols-2 gap-2 text-center py-2">
                    {/* One Way */}
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-rose-600 block">
                        One Way
                      </span>
                      <div className="text-xl font-black text-slate-900 mt-0.5">
                        ₹{val?.oneWayPrice}
                        <span className="text-[10px] font-semibold text-slate-500"> / km</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Drop only
                      </span>
                    </div>

                    {/* Round Trip */}
                    <div className="flex flex-col items-center border-l border-slate-200">
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-rose-600 block">
                        Round Trip
                      </span>
                      <div className="text-xl font-black text-slate-900 mt-0.5">
                        ₹{val?.roundTripPrice}
                        <span className="text-[10px] font-semibold text-slate-500"> / km</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Return trip
                      </span>
                    </div>
                  </div>

                  {/* Min KM & Allowance Notice */}
                  <div className="my-3 px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 font-medium text-center leading-relaxed">
                    Min {minKm}km (One Way) / 250km (Round Trip). Driver allowance: ₹{allowance}.
                  </div>

                  {/* Actions: Call & WhatsApp */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`tel:${cleanPhone}`}
                      className="py-2.5 px-3 rounded-full bg-gradient-to-r from-[#ff1d58] to-rose-600 hover:from-[#e01549] hover:to-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-950/20 transition-all hover:scale-[1.02] active:scale-95"
                    >
                      <FaPhoneAlt size={11} />
                      <span>Call</span>
                    </a>

                    <a
                      href={`https://wa.me/${cleanPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `Hi Pallaku Cabs, I want to book a ${val.type} for my trip.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-[1.02] active:scale-95"
                    >
                      <FaWhatsapp size={14} className="text-emerald-500" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Fleets;
