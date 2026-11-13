import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { IoPeopleSharp } from "react-icons/io5";
import { RiLuggageCartLine } from "react-icons/ri";
import { TbAirConditioning } from "react-icons/tb";
import { FaCheckCircle, FaCarSide, FaShieldAlt } from "react-icons/fa";
import FairDetails from "./VehiclesList/FairDetails";
import { useTrip } from "../Contexts/TripType";
import { motion, AnimatePresence } from "framer-motion";

const VehiclesList = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const {
    tripType,
    totalKms,
    tollCharge,
    setconform,
    setBaseFair,
    setSelectedVehicle,
    vehicles,
    startDate,
    permitCharges,
    minKm,
    setMinKm,
    setDriverAllowance,
    driverAllowance,
    baseFair,
  } = useTrip();

  const handleToggle = (index) =>
    setOpenIndex(openIndex === index ? null : index);

  // 👉 Returns numeric allowance
  const getDriverAllowanceValue = (car) => {
    if (tripType === "roundtrip" && startDate.length >= 2) {
      const days = Math.max(
        1,
        Math.ceil(
          (new Date(startDate[1]) - new Date(startDate[0])) /
            (1000 * 60 * 60 * 24)
        ) + 1
      );
      return car.driverAllowance * days;
    }
    return car.driverAllowance;
  };

  // 👉 Returns display string for UI
  const getDriverAllowanceDisplay = (car) => {
    if (tripType === "roundtrip" && startDate.length >= 1) {
      const days = Math.max(
        1,
        Math.ceil(
          (new Date(startDate[1]) - new Date(startDate[0])) /
            (1000 * 60 * 60 * 24)
        ) + 1
      );
      return `₹${car.driverAllowance * days} (${car.driverAllowance} × ${days}d)`;
    }
    return `₹${car.driverAllowance}`;
  };

  const roundTripDays = Math.max(
    1,
    Math.ceil(
      (new Date(startDate[1]) - new Date(startDate[0])) / (1000 * 60 * 60 * 24)
    ) + 1
  );

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      {/* Header Container */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-[#ff1d58] text-xs font-black tracking-widest uppercase">
          <FaCarSide size={13} />
          <span>CHOOSE YOUR RIDE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Available Cabs For Your Route
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Transparent per-km fares, sanitized vehicles, and top-tier highway chauffeurs. Choose the vehicle that fits your travel style.
        </p>
      </div>

      {/* Vehicle Cards Stack */}
      <div className="space-y-6">
        {vehicles.map((car, index) => {
          const effectiveKms =
            tripType === "onewaytrip"
              ? Math.max(totalKms, car.oneWayTripMinKm)
              : Math.max(
                  totalKms > car.roundTripMinKm * roundTripDays
                    ? totalKms
                    : car.roundTripMinKm * roundTripDays
                );
          const price =
            tripType === "onewaytrip"
              ? car.oneWayPrice * effectiveKms
              : car.roundTripPrice * effectiveKms || 0;

          const decimalPrice = Math.floor(price);
          const driverAllowanceValue = getDriverAllowanceValue(car);
          const driverAllowanceDisplay = getDriverAllowanceDisplay(car);
          const finalPrice =
            decimalPrice + tollCharge + driverAllowanceValue + permitCharges;

          const isExpanded = openIndex === index;

          return (
            <motion.div
              key={car.type}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className={`bg-white rounded-3xl border transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden ${
                isExpanded ? "border-rose-300 ring-2 ring-rose-500/10" : "border-slate-200/90"
              }`}
            >
              <div className="p-5 sm:p-7 flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* 1. Vehicle Image Container */}
                <div className="w-full lg:w-64 h-40 bg-slate-50/80 rounded-2xl flex items-center justify-center p-3 shrink-0 relative border border-slate-100">
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-wider">
                    {tripType === "onewaytrip" ? "One Way" : "Round Trip"}
                  </span>
                  <img
                    src={`https://pallaku-backend.onrender.com/image/${car.img}`}
                    alt={car.type}
                    className="max-h-36 max-w-full object-contain transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80";
                    }}
                  />
                </div>

                {/* 2. Vehicle Info & Amenities */}
                <div className="flex-1 w-full space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {car.type}
                    </h3>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                      Guaranteed AC
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    {car.options.join(" • ")}
                  </p>

                  {/* Amenities Row */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 pt-1">
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-xl">
                      <IoPeopleSharp size={16} className="text-[#ff1d58]" />
                      <span>{car.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-xl">
                      <RiLuggageCartLine size={16} className="text-[#ff1d58]" />
                      <span>Luggage Space</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-xl">
                      <TbAirConditioning size={16} className="text-[#ff1d58]" />
                      <span>Clean Air Con</span>
                    </div>
                  </div>

                  {/* Breakdown Toggle Button */}
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#ff1d58] hover:text-[#e01549] pt-1 transition"
                  >
                    <span>{isExpanded ? "Hide Fare Breakdown" : "View Detailed Fare Breakdown"}</span>
                    <SlArrowDown
                      size={11}
                      className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                {/* 3. Fare & Action Button */}
                <div className="w-full lg:w-56 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-6 flex flex-col justify-between items-start lg:items-end">
                  <div className="w-full lg:text-right space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Estimated Total Fare
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      ₹{finalPrice}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Bata: <span className="font-semibold text-slate-700">{driverAllowanceDisplay}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedVehicle(car);
                      setBaseFair(() =>
                        tripType === "onewaytrip"
                          ? car.oneWayPrice
                          : car.roundTripPrice
                      );
                      setMinKm(() =>
                        tripType === "onewaytrip"
                          ? car.oneWayTripMinKm
                          : car.roundTripMinKm
                      );
                      setDriverAllowance(driverAllowanceValue);
                      setconform(true);
                    }}
                    className="mt-4 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#ff1d58] to-rose-600 hover:from-[#e01549] hover:to-rose-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-rose-950/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Select & Book</span>
                    <span className="text-base">→</span>
                  </button>
                </div>
              </div>

              {/* Animated Fare Details Table */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="border-t border-slate-100 bg-slate-50/70 p-6 sm:p-8"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <FaShieldAlt className="text-emerald-500" size={16} />
                      <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                        Transparent Itemized Cost Calculation
                      </h4>
                    </div>

                    <FairDetails
                      baseKm={
                        tripType === "onewaytrip"
                          ? car?.oneWayTripMinKm
                          : car?.roundTripMinKm
                      }
                      tripType={tripType}
                      totalKms={totalKms}
                      permitCharges={
                        permitCharges > 0 ? permitCharges : "Not Applicable"
                      }
                      baseFair={
                        tripType === "onewaytrip"
                          ? car.oneWayPrice
                          : car.roundTripPrice
                      }
                      totalPrice={decimalPrice}
                      tollCharge={tollCharge}
                      driverAllowance={driverAllowanceValue}
                      vehicles={vehicles}
                      startDate={startDate}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default VehiclesList;