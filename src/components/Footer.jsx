import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShieldAlt,
} from "react-icons/fa";
import logo from "../assets/I1.png";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Upper Newsletter / Quick CTA strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ff1d58] to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-950">
              <FaShieldAlt size={22} />
            </div>
            <div>
              <h4 className="text-white font-bold text-base sm:text-lg">
                Need Instant Assistance for Outstation or Airport Drop?
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm">
                Our customer desk is active 24 hours a day, 7 days a week.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+917871237890"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 hover:bg-amber-400 font-bold text-xs uppercase tracking-wider transition shadow-md"
            >
              <FaPhoneAlt size={12} className="text-[#ff1d58]" />
              <span>+91 78712 37890</span>
            </a>
            <a
              href="#booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#ff1d58] to-rose-600 hover:from-[#e01549] hover:to-rose-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md"
            >
              Book Online
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="h-12 w-36">
              <img
                src={logo}
                alt="Pallaku Cabs"
                className="h-full w-full object-contain filter brightness-110 drop-shadow-md"
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Shree Pallaku Cabs is South India's premier cab hire & outstation chauffeur service. We deliver reliable, punctual, and safe cab rides with verified drivers and transparent per-km billing.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center transition"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center transition"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center transition"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center transition"
              >
                <FaLinkedinIn size={14} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center transition"
              >
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#booking" className="hover:text-amber-400 transition">
                  Book Outstation Cab
                </a>
              </li>
              <li>
                <a href="#tariffs" className="hover:text-amber-400 transition">
                  Tariff & Fare Card
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-amber-400 transition">
                  Why Pallaku Cabs
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition">
                  About Our Company
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-amber-400 transition">
                  Customer Reviews & Stories
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition">
                  Frequently Asked Questions (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              Connect With Us
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <FaPhoneAlt size={14} className="text-[#ff1d58] mt-1 shrink-0" />
                <span>+91 78712 37890</span>
              </li>
              <li className="flex items-start gap-2.5">
                <FaEnvelope size={14} className="text-amber-400 mt-1 shrink-0" />
                <span className="break-all">support@shreepallakcabs.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt size={14} className="text-emerald-400 mt-1 shrink-0" />
                <span>Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 py-6 text-xs text-center text-slate-500 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Shree Pallak Cabs. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Designed & developed for premium travel experiences by</span>
            <span className="text-amber-400 font-semibold">Rt-info tech</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
