import { useState, useEffect } from "react";
import logo from "../assets/I1.png";
import { FaBars, FaTimes, FaPhoneAlt, FaShieldAlt } from "react-icons/fa";
import { MdOutlineLocalTaxi } from "react-icons/md";

const Header = ({ adminPhone }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest(".header-container")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Handle smooth scrolling and active section tracking + background glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["booking", "tariffs", "experience", "about", "testimonials", "faq"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const navItems = [
    { href: "#booking", label: "Book Cab" },
    { href: "#tariffs", label: "Fleet & Tariffs" },
    { href: "#experience", label: "Why Us" },
    { href: "#about", label: "About" },
    { href: "#testimonials", label: "Reviews" },
    { href: "#faq", label: "FAQ" },
  ];

  const handleNavClick = (href, event) => {
    event.preventDefault();
    setMenuOpen(false);

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const displayPhone = adminPhone || "+91 78712 37890";

  return (
    <header
      className={`header-container fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-md shadow-xl border-b border-white/10 py-2"
          : "bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-white/5 py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 group"
        >
          <div className="h-11 w-32 sm:h-12 sm:w-36 transition-transform group-hover:scale-105 duration-200">
            <img
              src={logo}
              className="h-full w-full object-contain filter drop-shadow-md brightness-110"
              alt="Pallaku Cabs"
            />
          </div>
          <div className="hidden lg:flex flex-col border-l border-white/20 pl-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-400">
            Shree Pallaku Cabs
            </span>
            <span className="text-[11px] text-gray-400 font-medium tracking-wide">
              Your Journey, Our Care
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white bg-white/10 shadow-inner"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-amber-400 to-[#ff1d58] rounded-full"></span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Header Right Action (Phone + CTA) */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${displayPhone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2.5 text-gray-200 hover:text-amber-400 text-sm font-semibold transition group"
          >
            <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-900 transition">
              <FaPhoneAlt size={12} />
            </div>
            <span className="tracking-wide text-xs lg:text-sm font-medium">
              {displayPhone}
            </span>
          </a>

          <a
            href="#booking"
            onClick={(e) => handleNavClick("#booking", e)}
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff1d58] via-rose-500 to-amber-500 hover:from-[#e01549] hover:to-amber-600 text-white text-xs uppercase tracking-wider font-bold shadow-lg shadow-rose-900/30 hover:shadow-rose-600/40 hover:-translate-y-0.5 active:translate-y-0 transition duration-200"
          >
            <MdOutlineLocalTaxi size={16} />
            <span>Book Now</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <a
            href={`tel:${displayPhone.replace(/\s+/g, "")}`}
            className="p-2 rounded-lg bg-white/10 text-amber-400 hover:bg-white/20 transition"
            aria-label="Call Us"
          >
            <FaPhoneAlt size={16} />
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-white hover:bg-white/10 transition focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/98 backdrop-blur-xl px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={`flex items-center justify-between py-3 px-4 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? "text-amber-400 bg-white/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-gray-500">→</span>
                </a>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href={`tel:${displayPhone.replace(/\s+/g, "")}`}
              className="flex items-center justify-center gap-3 py-3 rounded-xl bg-white/10 text-white font-semibold text-sm border border-white/10"
            >
              <FaPhoneAlt size={14} className="text-amber-400" />
              <span>Call: {displayPhone}</span>
            </a>
            <a
              href="#booking"
              onClick={(e) => handleNavClick("#booking", e)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#ff1d58] to-amber-500 text-white font-bold text-sm shadow-lg shadow-rose-950"
            >
              <MdOutlineLocalTaxi size={18} />
              <span>Instant Cab Booking</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
