import { LuShieldCheck, LuClock, LuCar, LuPhoneCall } from "react-icons/lu";
import { motion } from "framer-motion";

const Experience = () => {
  const cards = [
    {
      title: "Safe & verified rides",
      desc: "Experienced drivers, well-maintained cars and doorstep pickup so your family can travel with confidence to any destination across South India.",
      icon: <LuShieldCheck size={20} className="text-[#ff1d58]" />,
    },
    {
      title: "On-time pickup",
      desc: "We plan buffer time around your schedule so early morning and late-night airport runs and outstation trips start on time.",
      icon: <LuClock size={20} className="text-[#ff1d58]" />,
    },
    {
      title: "Comfortable long drives",
      desc: "Clean sedans, SUVs and travellers with AC, enough boot space and planned breaks make long South India routes easier.",
      icon: <LuCar size={20} className="text-[#ff1d58]" />,
    },
    {
      title: "24/7 human support",
      desc: "Call or WhatsApp anytime for new bookings, changes or help during the trip — no bots, only people who know your route.",
      icon: <LuPhoneCall size={20} className="text-[#ff1d58]" />,
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Tag & Main Heading */}
      <div className="space-y-4 max-w-4xl mb-12">
        <div className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff1d58]" />
          <span className="text-xs font-black tracking-widest text-[#ff1d58] uppercase">
            WHY CHOOSE SHREE PALLAKU CABS
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Reliable, safe and comfortable taxi rides for your journey
        </h2>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          Choosing the right cab matters — especially for night travel, airport runs and long outstation journeys. These are the reasons frequent travellers and families book Shree Pallaku Cabs again and again.
        </p>
      </div>

      {/* Main Grid: 4 Cards on Left + 1 Pink Feature Box on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: 2x2 Feature Cards Grid (7 of 12 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                    {item.title}
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Pink Gradient Stats Card (5 of 12 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#ff1d58] via-rose-500 to-[#e01549] text-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-xl shadow-rose-950/20">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-rose-200 block mb-2">
              TRUSTED BY FREQUENT TRAVELLERS
            </span>
            <p className="text-sm sm:text-base font-medium text-white/95 leading-relaxed">
              Regularly chosen for airport drops, business trips, family functions and weekend tours starting across Tamil Nadu.
            </p>
          </div>

          {/* Stats 3-Column Pill Container */}
          <div className="my-6 grid grid-cols-3 gap-2 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">20,000+</div>
              <div className="text-[10px] sm:text-[11px] font-medium text-rose-100 mt-0.5">Trips completed</div>
            </div>
            <div className="border-x border-white/20">
              <div className="text-xl sm:text-2xl font-black text-white">150+</div>
              <div className="text-[10px] sm:text-[11px] font-medium text-rose-100 mt-0.5">Routes served</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">99%</div>
              <div className="text-[10px] sm:text-[11px] font-medium text-rose-100 mt-0.5">On-time rides</div>
            </div>
          </div>

          <p className="text-[11px] text-rose-100/90 leading-relaxed">
            Note: Numbers reflect our commitment to real customers. Honest, clear communication and consistent service build long-term trust.
          </p>
        </div>
      </div>

      {/* Bottom FAQ / Highlight Box: What makes Shree Pallaku Cabs different? */}
      <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
          What makes Shree Pallaku Cabs different?
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Many travellers need one way drop taxi services late at night, very early in the morning or for long outstation journeys. Shree Pallaku Cabs focuses on verified drivers, clean vehicles and clear communication so that these trips feel safe and predictable for your family.
        </p>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          When you share your route, timing and special needs (elderly travellers, extra luggage, children, etc.), our team suggests the right cab type, pickup time and tariff model. This combination of planning, safety and support is why regular customers keep choosing us for important journeys.
        </p>
      </div>
    </section>
  );
};

export default Experience;
