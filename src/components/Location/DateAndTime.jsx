import { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuCalendarDays, LuClock } from "react-icons/lu";
import { useTrip } from "../../Contexts/TripType";
import { toast } from "react-toastify";

const DateAndTime = () => {
  const departureRef = useRef();
  const returnRef = useRef();
  const { tripType, startDate, setStartDate } = useTrip();

  const isFutureDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const handleDateChange = (date, index) => {
    if (!isFutureDate(date)) {
      toast.warning("Please select today or a future date.");
      return;
    }

    setStartDate((prev) => {
      const updated = [...prev];
      updated[index] = date;
      return updated;
    });
  };

  const isRoundTrip = tripType === "roundtrip";

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold tracking-wider uppercase text-slate-800">
          Travel Schedule
        </span>
        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
          {isRoundTrip ? "2-Way Journey" : "Direct Departure"}
        </span>
      </div>

      <div className={`grid grid-cols-1 ${isRoundTrip ? "md:grid-cols-2" : "md:grid-cols-1"} gap-4`}>
        {/* Departure Date */}
        <div className="relative group">
          <div className="w-full bg-slate-50 hover:bg-white focus-within:bg-white border-2 border-slate-300 focus-within:border-amber-500 rounded-2xl transition-all shadow-sm focus-within:shadow-md flex items-center px-4 py-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mr-3 group-focus-within:bg-amber-500 group-focus-within:text-white transition">
              <LuCalendarDays size={20} />
            </div>
            <div className="flex-1 cursor-pointer" onClick={() => departureRef?.current?.focus()}>
              <span className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                Departure Date
              </span>
              <DatePicker
                ref={departureRef}
                selected={startDate[0]}
                onChange={(date) => handleDateChange(date, 0)}
                dateFormat="EEE, dd MMM yyyy"
                minDate={new Date()}
                placeholderText="Select pickup date"
                className="outline-none w-full font-bold text-slate-950 text-sm sm:text-base bg-transparent cursor-pointer placeholder:text-slate-600"
                calendarClassName="border border-slate-200 rounded-2xl shadow-2xl p-3 text-sm font-sans"
                dayClassName={() =>
                  "text-slate-700 hover:bg-[#ff1d58] hover:text-white rounded-lg transition duration-150"
                }
                popperPlacement="bottom-start"
              />
            </div>
          </div>
        </div>

        {/* Return Date (only for roundtrip) */}
        {isRoundTrip && (
          <div className="relative group">
            <div className="w-full bg-slate-50 hover:bg-white focus-within:bg-white border-2 border-slate-300 focus-within:border-amber-500 rounded-2xl transition-all shadow-sm focus-within:shadow-md flex items-center px-4 py-2">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mr-3 group-focus-within:bg-rose-500 group-focus-within:text-white transition">
                <LuCalendarDays size={20} />
              </div>
              <div className="flex-1 cursor-pointer" onClick={() => returnRef?.current?.focus()}>
                <span className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                  Return Date
                </span>
                <DatePicker
                  ref={returnRef}
                  selected={startDate[1]}
                  onChange={(date) => handleDateChange(date, 1)}
                  dateFormat="EEE, dd MMM yyyy"
                  minDate={startDate[0] || new Date()}
                  placeholderText="Select return date"
                  className="outline-none w-full font-bold text-slate-950 text-sm sm:text-base bg-transparent cursor-pointer placeholder:text-slate-600"
                  calendarClassName="border border-slate-200 rounded-2xl shadow-2xl p-3 text-sm font-sans"
                  dayClassName={() =>
                    "text-slate-700 hover:bg-[#ff1d58] hover:text-white rounded-lg transition duration-150"
                  }
                  popperPlacement="bottom-start"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateAndTime;
