import { motion } from "framer-motion";

const FairDetails = ({
  tripType,
  baseKm,
  totalKms,
  baseFair,
  totalPrice,
  tollCharge,
  driverAllowance,
  permitCharges,
  startDate,
}) => {
  const roundTripDays = Math.max(
    1,
    Math.ceil(
      (new Date(startDate[1]) - new Date(startDate[0])) / (1000 * 60 * 60 * 24)
    ) + 1
  );

  let tripDate = baseKm * roundTripDays;
  const finalPrice =
    totalPrice +
    tollCharge +
    (permitCharges === "Not Applicable" ? 0 : permitCharges) +
    driverAllowance;

  const rows = [
    {
      label: "Minimum Base km",
      value:
        tripType === "onewaytrip"
          ? `${baseKm} km`
          : `${tripDate} km (${baseKm} km/day × ${roundTripDays} days)`,
    },
    {
      label: "Calculated Route Distance",
      value: `${totalKms} km`,
    },
    {
      label: "Tariff Per km",
      value: `₹${baseFair?.toFixed(2)} / km`,
    },
    {
      label: "Vehicle Base Fare",
      value:
        tripType === "onewaytrip"
          ? `₹${totalPrice} (${baseKm} km × ₹${Number(baseFair).toFixed(2)})`
          : `₹${totalPrice} (${roundTripDays}d × ${baseKm}km × ₹${Number(baseFair).toFixed(2)})`,
    },
    {
      label: "Driver Bata / Allowance",
      value: `₹${driverAllowance}`,
    },
    {
      label: "State Permit Charges",
      value: permitCharges > 0 ? `₹${permitCharges}` : "Not Applicable",
    },
    {
      label: "Estimated Fastag Tolls",
      value: `₹${tollCharge || 0}`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >
      <div className="divide-y divide-slate-100">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-5 py-3 text-xs sm:text-sm hover:bg-slate-50/50 transition-colors"
          >
            <span className="font-semibold text-slate-600">{row.label}</span>
            <span className="font-bold text-slate-900">{row.value}</span>
          </div>
        ))}

        <div className="flex items-center justify-between px-5 py-3.5 bg-rose-50/80 text-sm sm:text-base border-t border-rose-100">
          <span className="font-extrabold text-[#ff1d58]">Total Estimated Fare</span>
          <span className="font-black text-xl text-slate-900">₹{finalPrice}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FairDetails;