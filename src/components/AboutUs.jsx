import { motion } from "framer-motion";
import taxii from "../assets/taxii.png";
import { FaShieldAlt, FaCarSide, FaUserTie, FaRegSmile } from "react-icons/fa";

const AboutUs = () => {
  const stats = [
    { value: "50,000+", label: "Rides Completed" },
    { value: "50+", label: "Cities Connected" },
    { value: "4.9/5", label: "Customer Rating" },
    { value: "24/7", label: "Dispatch & Support" },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ff1d58] bg-rose-50 px-3.5 py-1 rounded-full border border-rose-100">
            About Shree Pallaku Cabs
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Crafted for Comfort, Driven with Care
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#ff1d58] to-amber-500 mx-auto rounded-full mt-2"></div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <motion.div
            className="order-2 lg:order-1 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
              <img
                src={taxii}
                alt="Pallaku Cabs - Professional taxi service"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
                  South India's Choice
                </span>
                <p className="text-sm text-slate-200 mt-1 font-medium">
                  Thousands of seamless intercity rides delivered with 5-star passenger delight.
                </p>
              </div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 hidden sm:flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-extrabold text-xl">
                99%
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">On-Time Performance</p>
                <p className="text-[11px] text-slate-500">Across 20,000+ completed trips</p>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="order-1 lg:order-2 space-y-6"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                Shree Pallaku Cabs - Your Trusted Travel Partner Across Tamil Nadu & Neighboring States
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                At <span className="font-semibold text-slate-800">Shree Pallaku Cabs</span>, we redefine point-to-point and long-distance travel. We believe every trip is more than just transportation — it’s a commitment to safety, peace of mind, and sheer travel luxury.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Whether you need a quick airport transfer, a comfortable outstation weekend getaway, or round-trip corporate travel, our dedicated team ensures punctuality, clean air-conditioned vehicles, and polite, verified drivers.
              </p>
            </div>

            {/* Features 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition">
                <div className="w-11 h-11 rounded-xl bg-rose-50 text-[#ff1d58] flex items-center justify-center shrink-0">
                  <FaCarSide size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Pristine Fleet</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Sedans, SUVs, and luxury Innovas</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <FaUserTie size={19} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Verified Drivers</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Courteous & highway-trained</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <FaShieldAlt size={19} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Safe & Insured</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Sanitized with real-time GPS tracking</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition">
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <FaRegSmile size={19} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Fair Pricing</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Zero surge pricing surprises</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#booking"
                className="px-7 py-3.5 bg-gradient-to-r from-[#ff1d58] to-rose-600 hover:from-[#e01549] hover:to-rose-700 text-white font-bold text-sm rounded-full shadow-lg shadow-rose-900/20 transition duration-200"
              >
                Book Your Ride
              </a>
              <a
                href="tel:+917871237890"
                className="px-7 py-3.5 border-2 border-slate-300 hover:border-slate-800 text-slate-800 font-bold text-sm rounded-full transition duration-200"
              >
                Call Support Desk
              </a>
            </div>
          </motion.div>
        </div>

        {/* Highlight Stats Row */}
        <div className="mt-20 pt-12 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#ff1d58] mb-1 tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;