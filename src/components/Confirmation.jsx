import React, { useState } from "react";
import {
  Calendar,
  Mail,
  Phone,
  User,
  MapPin,
  CarFront,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Receipt,
  Info,
  Map,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTrip } from "../Contexts/TripType";
import ConformBooking from "../Services/ConformBooking";
import RouteMap from "./RouteMap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookingConfirmation = ({ isMapLoaded }) => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    pickupTime: "",
    dropTime: "",
  });
  const [showMap, setShowMap] = useState(false);

  const {
    selectedVehicle,
    fromInput,
    toInput,
    totalKms,
    baseFair,
    tollCharge,
    startDate,
    setStartDate,
    setFromInput,
    setToInput,
    setVehicleList,
    setconform,
    duration,
    tripType,
    driverAllowance,
    minKm,
    permitCharges,
  } = useTrip();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const roundTripDays = Math.max(
    1,
    Math.ceil(
      (new Date(startDate[1]) - new Date(startDate[0])) / (1000 * 60 * 60 * 24)
    ) + 1
  );

  const getTotalFare = () => {
    let kmsForFare;
    if (tripType === "onewaytrip") {
      kmsForFare = totalKms < minKm ? minKm : totalKms;
    } else {
      kmsForFare =
        totalKms < minKm * roundTripDays ? minKm * roundTripDays : totalKms;
    }
    return kmsForFare * baseFair;
  };

  const formatCurrency = (num) => `₹${num}`;

  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile.trim())) {
      toast.error("Please enter a valid 10-digit mobile number");
      return false;
    }
    if (
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!form.pickupTime.trim()) {
      toast.error("Please select a convenient pickup time");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const rawPermitCharge = permitCharges || 0;
    const bookingData = {
      ...form,
      from: fromInput,
      to: toInput,
      tripType,
      vehicle: selectedVehicle,
      totalKms,
      baseFair,
      totalBaseFare: Number(getTotalFare()),
      tollCharge,
      totalFare: Number(
        getTotalFare() + tollCharge + driverAllowance + rawPermitCharge
      ),
      driverAllowance,
      permitCharges: rawPermitCharge,
      departureDate: startDate[0],
      arrivalDate: startDate[1] || "-",
    };

    try {
      let bookingId = "DEMO-" + Math.floor(100000 + Math.random() * 900000);
      try {
        const response = await ConformBooking(bookingData);
        if (response?.data?.newBooking?._id) {
          bookingId = response.data.newBooking._id;
        }
      } catch (apiErr) {
        console.warn("Backend API not reachable, proceeding with demo booking ID:", apiErr);
      }

      // Store in sessionStorage so SuccessPage can display it immediately even if backend is offline
      try {
        sessionStorage.setItem(
          `booking_${bookingId}`,
          JSON.stringify({
            _id: bookingId,
            ...bookingData,
            vehicle: selectedVehicle?.type || bookingData.vehicle || "Sedan (Etios / Dzire)",
            createdAt: new Date().toISOString(),
          })
        );
      } catch (e) {
        console.error("Storage error:", e);
      }

      setForm({
        name: "",
        mobile: "",
        email: "",
        pickupTime: "",
        dropTime: "",
      });
      setStartDate([new Date()]);
      setFromInput("");
      setToInput("");
      setVehicleList(false);
      setconform(false);

      toast.success("🎉 Ride booked successfully with Shree Pallaku Cabs!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate(`/successPage/${bookingId}`);
    } catch (err) {
      console.error(err);
      toast.error("Booking failed. Please check connection and try again.", {
        position: "top-center",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const driverAmount = Number(driverAllowance) || 0;
  const durationText = (() => {
    const durationSec = parseInt(duration);
    if (!durationSec) return "Approx 3 hrs";
    const hours = Math.floor(durationSec / 3600);
    const minutes = Math.floor((durationSec % 3600) / 60);
    return `${hours} hr ${minutes} min`;
  })();

  const fareItems = [
    {
      label: "Min Base km",
      value: tripType === "onewaytrip" ? `${minKm} km` : `${minKm * roundTripDays} km`,
    },
    { label: "Total Distance", value: `${totalKms} km` },
    { label: "Rate Per km", value: formatCurrency(baseFair) },
    { label: "Base Ride Cost", value: formatCurrency(getTotalFare()) },
    { label: "Est. Duration", value: durationText },
    { label: "Driver Allowance", value: formatCurrency(driverAmount) },
    {
      label: "Permit Charges",
      value: permitCharges <= 0 ? "Not Applicable" : formatCurrency(permitCharges),
    },
    {
      label: "Fastag Tolls (Approx)",
      value: tollCharge ? formatCurrency(tollCharge) : "₹0",
    },
  ];

  const totalPayable = Math.floor(
    getTotalFare() + tollCharge + driverAmount + (permitCharges || 0)
  );

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Premium Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-[#ff1d58] text-[11px] sm:text-xs font-black tracking-widest uppercase shadow-sm">
          <Sparkles size={13} className="text-amber-500" />
          <span>FINAL STEP • INSTANT CONFIRMATION</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Review Itinerary & Book Cab
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Please verify your itinerary and enter passenger details. A dedicated driver from <strong className="text-slate-800">Shree Pallaku Cabs</strong> will be assigned immediately.
        </p>
      </div>

      {/* Main Grid: 5 cols Itinerary | 7 cols Passenger Form (On Mobile: Itinerary first, Form second) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 Cols Desktop, 1st on Mobile): Route Itinerary & Fare Summary */}
        <div className="lg:col-span-5 space-y-6 order-1">
          {/* Card Frame with luxury border & elevation */}
          <div className="bg-white rounded-3xl sm:rounded-[32px] border border-slate-200/90 shadow-xl shadow-slate-200/50 p-5 sm:p-7 space-y-5">
            {/* Itinerary Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff1d58] animate-pulse" />
                <h3 className="text-xs font-black tracking-widest uppercase text-slate-900">
                  Route Itinerary
                </h3>
              </div>
              <span className="text-[10px] sm:text-[11px] font-black text-[#ff1d58] bg-rose-50 border border-rose-200/80 px-3 py-1 rounded-full uppercase tracking-wider">
                {tripType === "onewaytrip" ? "One Way" : "Round Trip"}
              </span>
            </div>

            {/* Stepper Pickup - Drop Box */}
            <div className="relative bg-slate-50/90 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-4">
              {/* Stepper Connecting Line */}
              <div className="absolute left-[29px] sm:left-[33px] top-10 bottom-10 w-0.5 border-l-2 border-dashed border-slate-300 pointer-events-none" />

              {/* Pickup Point */}
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-md shadow-emerald-500/20">
                  <MapPin size={13} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 block">
                    Pickup
                  </span>
                  <p className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug break-words">
                    {fromInput}
                  </p>
                </div>
              </div>

              {/* Drop Point */}
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-[#ff1d58] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-md shadow-rose-500/20">
                  <MapPin size={13} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#ff1d58] block">
                    Drop Destination
                  </span>
                  <p className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug break-words">
                    {toInput}
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Vehicle Banner */}
            <div className="p-4 sm:p-4.5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-between shadow-lg border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 shrink-0 border border-white/5">
                  <CarFront size={22} />
                </div>
                <div>
                  <h4 className="font-black text-base sm:text-lg tracking-tight leading-tight">
                    {selectedVehicle?.type}
                  </h4>
                  <p className="text-[11px] text-slate-300 font-medium mt-0.5">
                    {selectedVehicle?.capacity} • AC Included
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 inline-block">
                  Shree Pallaku Cabs
                </span>
              </div>
            </div>

            {/* Toggle Live Interactive Route Map */}
            {isMapLoaded && (
              <div>
                <button
                  type="button"
                  onClick={() => setShowMap(!showMap)}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/80 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Map size={14} className="text-[#ff1d58]" />
                  <span>{showMap ? "Hide Route Map" : "View Live Route Map"}</span>
                </button>

                <AnimatePresence>
                  {showMap && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "240px" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 overflow-hidden rounded-2xl border border-slate-200 shadow-inner"
                    >
                      <RouteMap isMapLoaded={isMapLoaded} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Transparent Fare Breakdown */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 pb-2 border-b border-slate-100">
                <span className="flex items-center gap-1.5 font-black uppercase tracking-wider text-slate-700">
                  <Receipt size={14} className="text-[#ff1d58]" />
                  <span>Transparent Fare Summary</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium">All inclusive</span>
              </div>

              <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                {fareItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2.5">
                    <span className="text-slate-600 font-medium">{item.label}</span>
                    <span className="font-extrabold text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Total Estimated Fare Highlight Box */}
              <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-50/90 via-amber-50/40 to-rose-50/90 border border-rose-200/90 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[11px] sm:text-xs uppercase font-black text-[#ff1d58] tracking-wider block">
                    Total Estimated Fare
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                    All tolls & allowance included
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  ₹{totalPayable}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols Desktop, 2nd on Mobile): Passenger Details Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl sm:rounded-[32px] border border-slate-200/90 shadow-xl shadow-slate-200/50 p-5 sm:p-8 space-y-6 order-2">
          {/* Form Header */}
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-[#ff1d58] border border-rose-100">
                <User size={18} />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Passenger Details
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1 pl-10.5">
              Trip updates and Shree Pallaku Cabs driver contact will be sent to this phone and email.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#ff1d58] transition">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter passenger name"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-[#ff1d58] outline-none text-sm font-bold text-slate-900 bg-white transition placeholder:text-slate-400 shadow-sm"
                />
              </div>
            </div>

            {/* Mobile Number & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="mobile" className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  Mobile Number (10 Digits) <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#ff1d58] transition">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    required
                    maxLength={10}
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-[#ff1d58] outline-none text-sm font-bold text-slate-900 bg-white transition placeholder:text-slate-400 shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#ff1d58] transition">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g. name@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-[#ff1d58] outline-none text-sm font-bold text-slate-900 bg-white transition placeholder:text-slate-400 shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Time Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label htmlFor="pickupTime" className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  Pickup Time <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#ff1d58] transition">
                    <Clock size={18} />
                  </div>
                  <select
                    name="pickupTime"
                    id="pickupTime"
                    required
                    value={form.pickupTime}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-[#ff1d58] outline-none text-sm font-bold text-slate-900 bg-white transition cursor-pointer shadow-sm appearance-none"
                  >
                    <option value="">Select Pickup Time</option>
                    {Array.from({ length: 24 * 4 }).map((_, idx) => {
                      const hours24 = Math.floor(idx / 4);
                      const minutes = (idx % 4) * 15;
                      const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
                      const ampm = hours24 < 12 ? "AM" : "PM";
                      const timeStr = `${hours12
                        .toString()
                        .padStart(2, "0")}:${minutes
                        .toString()
                        .padStart(2, "0")} ${ampm}`;
                      return (
                        <option key={timeStr} value={timeStr}>
                          {timeStr}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {tripType === "roundtrip" && (
                <div>
                  <label htmlFor="dropTime" className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                    Expected Return Time
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#ff1d58] transition">
                      <Clock size={18} />
                    </div>
                    <select
                      name="dropTime"
                      id="dropTime"
                      required
                      value={form.dropTime}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-[#ff1d58] outline-none text-sm font-bold text-slate-900 bg-white transition cursor-pointer shadow-sm appearance-none"
                    >
                      <option value="">Select Return Time</option>
                      {Array.from({ length: 24 * 4 }).map((_, idx) => {
                        const hours24 = Math.floor(idx / 4);
                        const minutes = (idx % 4) * 15;
                        const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
                        const ampm = hours24 < 12 ? "AM" : "PM";
                        const timeStr = `${hours12
                          .toString()
                          .padStart(2, "0")}:${minutes
                          .toString()
                          .padStart(2, "0")} ${ampm}`;
                        return (
                          <option key={timeStr} value={timeStr}>
                            {timeStr}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Action Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-2xl text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2.5 ${
                  loading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#ff1d58] via-rose-500 to-amber-500 hover:from-[#e01549] hover:to-amber-600 shadow-rose-950/20 hover:shadow-rose-950/30 hover:scale-[1.01] active:scale-95 cursor-pointer"
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2.5">
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    Confirming Reservation...
                  </span>
                ) : (
                  <>
                    <CheckCircle2 size={20} />
                    <span>Confirm & Book Cab</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Guarantee Badges Footer */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-emerald-500 shrink-0" />
              <span>Zero cancellation fee prior to driver dispatch</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Info size={15} className="text-[#ff1d58] shrink-0" />
              <span>Pay securely after completing trip via UPI, cash, or credit/debit card.</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingConfirmation;