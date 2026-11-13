import { motion } from "framer-motion";
import banner from "../assets/car.jpg";
import { FaShieldAlt, FaClock, FaTags, FaAward } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";

const Banner = ({ adminPhone }) => {
  const displayPhone = adminPhone || "+91 78712 37890";

  const highlights = [
    { icon: <FaShieldAlt className="text-amber-400" />, text: "Verified Drivers" },
    { icon: <FaClock className="text-emerald-400" />, text: "Punctual Pickups" },
    { icon: <FaTags className="text-sky-400" />, text: "No Hidden Costs" },
    { icon: <FaAward className="text-rose-400" />, text: "Clean & Sanitized" },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 text-white min-h-[460px] md:min-h-[520px] lg:min-h-[560px] flex items-center">
      {/* Background Image with Cinematic Gradient Overlays */}
      <div className="absolute inset-0">
        <motion.img
          src={banner}
          alt="Luxury Cab Fleet"
          className="w-full h-full object-cover object-center scale-105"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 0.42 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
        {/* Multilayered Gradients for High-end Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
        {/* Glow ambient circle */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#ff1d58]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 w-full">
        <div className="max-w-2xl space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold text-amber-300 shadow-sm"
          >
            <MdVerifiedUser className="text-amber-400 text-base" />
            <span>Shree Pallaku Cabs - Tamil Nadu's Trusted Outstation Cabs</span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Ride With <span className="bg-gradient-to-r from-amber-300 via-rose-400 to-[#ff1d58] bg-clip-text text-transparent">Elegance</span>, Arrive In Comfort.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed max-w-xl pt-2">
              Shree Pallaku Cabs offers premium one-way drops, round trips, and executive airport transfers. Transparent per-km tariffs with polite, verified drivers.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#booking"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-gradient-to-r from-[#ff1d58] via-rose-500 to-amber-500 hover:from-[#e01549] hover:to-amber-600 text-white font-bold text-sm shadow-xl shadow-rose-950/50 hover:shadow-rose-600/30 hover:-translate-y-0.5 transition duration-200"
            >
              Book Your Ride Now
            </a>
            <a
              href={`tel:${displayPhone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold text-sm transition"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>24/7 Support: {displayPhone}</span>
            </a>
          </motion.div>

          {/* Micro Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10"
          >
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <span className="text-base">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
