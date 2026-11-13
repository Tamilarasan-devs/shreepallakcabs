import { useState, useCallback } from "react";
import { toast } from "react-toastify";

import DateAndTime from "./Location/DateAndTime";
import FromTo from "./Location/FromTo";
import TripSwitcher from "./Location/TripSwitcher";
import { useTrip } from "../Contexts/TripType";
import { fetchGeocode } from "../Services/geocodeService.js";

const Location = ({ isMapLoaded }) => {
  const {
    fromInput,
    toInput,
    setFromInput,
    setToInput,
    setVehicleList,
    setTotalKms,
    setTollCharge,
    tripType,
    setEncodedPolyline,
    setDuration,
    permitCharges,
    setPermitCharges,
  } = useTrip();

  const [loading, setLoading] = useState(false); // 🌀 Loading state
  // ok
  const handleSearch = useCallback(
    async (fromInput, toInput) => {
      if (!fromInput || !toInput) {
        toast.error("Please select pick up and drop location", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }

      try {
        setLoading(true); // Start loading
        const data = await fetchGeocode(fromInput, toInput);

        if (data === null) {
          toast.error(
            "Service not available. Please choose a different location",
            {
              position: "top-center",
              autoClose: 3000,
            }
          );
          return;
        }

        const distance = Number(data.distanceMeters) || "-";

        setTotalKms(() =>
          tripType === "onewaytrip" ? distance.toFixed(2) : (distance * 2).toFixed(2)
        );

        setVehicleList(true);
        setTollCharge(() => {
          const toll = data?.tolls?.[0]?.units;
          // console.log('toll :', toll)
          if (toll === "" || toll == null) return 0; // if empty or undefined
          return tripType === "onewaytrip"
            ? Number(toll) / 2
            : Number(toll) || 0;
        });

        setEncodedPolyline(data?.polyline);
        setDuration(data?.duration);
      } catch (error) {
        toast.error("Something went wrong. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      } finally {
        setLoading(false); // Stop loading
      }
    },
    [
      tripType,
      setTotalKms,
      setVehicleList,
      setTollCharge,
      setEncodedPolyline,
      setDuration,
    ]
  );

  return (
    <section
      id="booking"
      className="relative z-20 max-w-6xl w-[94%] -mt-10 sm:-mt-14 lg:-mt-20 mx-auto bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 lg:p-10 transition-all duration-300"
    >
      {/* Upper Tab Switcher */}
      <TripSwitcher />

      {/* Inputs Form */}
      <div className="mt-6 flex flex-col gap-6">
        <FromTo
          fromInput={fromInput}
          toInput={toInput}
          setFromInput={setFromInput}
          setToInput={setToInput}
          permitCharges={permitCharges}
          setPermitCharges={setPermitCharges}
          isMapLoaded={isMapLoaded}
        />

        <DateAndTime />
      </div>

      {/* Action / Search Button */}
      <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Instant fare calculation • Guaranteed AC cab • Driver details via SMS/WhatsApp</span>
        </div>

        <button
          className={`w-full sm:w-auto px-10 py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-3 transition-all duration-200 shadow-lg ${
            loading
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#ff1d58] via-rose-500 to-amber-500 hover:from-[#e01549] hover:to-amber-600 shadow-rose-900/30 hover:shadow-rose-600/40 hover:-translate-y-0.5 active:translate-y-0"
          }`}
          onClick={() => handleSearch(fromInput, toInput)}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
              <span>Calculating Fares...</span>
            </>
          ) : (
            <>
              <span>Check Available Cabs</span>
              <span className="text-lg">→</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};

export default Location;
