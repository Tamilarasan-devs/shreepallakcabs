import { FaArrowRightLong } from "react-icons/fa6";
import { LuArrowLeftRight } from "react-icons/lu";
import { useTrip } from "../../Contexts/TripType";
import { motion } from "framer-motion";

const TripSwitcher = () => {
  const { tripType, setTripType, setVehicleList, setStartDate, setconform } =
    useTrip();

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-200 pb-5">
      <div>
        <span className="text-xs font-bold tracking-wider uppercase text-amber-700 block">
          Plan Your Travel
        </span>
        <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Select Trip Type
        </h2>
      </div>

      <div className="w-full sm:w-auto inline-flex p-1 bg-slate-200/80 rounded-2xl border border-slate-300 shadow-inner">
        {/* One Way Button */}
        <button
          type="button"
          onClick={() => {
            setVehicleList(false);
            setconform(false);
            setTripType("onewaytrip");
            setStartDate((prev) => {
              const updated = [...prev];
              updated[1] = "";
              return updated;
            });
          }}
          className={`relative flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            tripType === "onewaytrip"
              ? "text-white shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
          }`}
        >
          {tripType === "onewaytrip" && (
            <motion.div
              layoutId="trip-tab-pill"
              className="absolute inset-0 bg-gradient-to-r from-[#ff1d58] to-rose-600 rounded-xl"
              transition={{ type: "spring", stiffness: 450, damping: 35 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
            <FaArrowRightLong size={12} />
            <span>One Way</span>
          </span>
        </button>

        {/* Round Trip Button */}
        <button
          type="button"
          onClick={() => {
            setVehicleList(false);
            setconform(false);
            setTripType("roundtrip");
          }}
          className={`relative flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            tripType === "roundtrip"
              ? "text-white shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
          }`}
        >
          {tripType === "roundtrip" && (
            <motion.div
              layoutId="trip-tab-pill"
              className="absolute inset-0 bg-gradient-to-r from-[#ff1d58] to-rose-600 rounded-xl"
              transition={{ type: "spring", stiffness: 450, damping: 35 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
            <LuArrowLeftRight size={14} />
            <span>Round Trip</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default TripSwitcher;
