import React, { useRef, useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { toast } from "react-toastify";
import { LuMapPin, LuNavigation, LuArrowDownUp } from "react-icons/lu";

export default function FromTo({
  fromInput,
  toInput,
  setFromInput,
  setToInput,
  setPermitCharges,
  isMapLoaded,
}) {
  const fromRef = useRef(null);
  const toRef = useRef(null);

  const [fromState, setFromState] = useState("");
  const [toState, setToState] = useState("");
  const [noResults, setNoResults] = useState(false);

  const getStateFromPlace = (place) => {
    if (!place || !place.address_components) return "";
    const stateComp = place.address_components.find((c) =>
      c.types.includes("administrative_area_level_1")
    );
    return stateComp ? stateComp.long_name : "";
  };

  useEffect(() => {
    if (fromState && toState) {
      setPermitCharges(fromState !== toState ? 550 : 0);
    }
  }, [fromState, toState, setPermitCharges]);

  const handleFromPlaceChanged = () => {
    if (!isMapLoaded || !fromRef.current) return;
    const place = fromRef.current.getPlace();
    if (place && place.place_id) {
      setNoResults(false);
      setFromInput(place.formatted_address || place.name || "");
      setFromState(getStateFromPlace(place));
    }
  };

  const handleToPlaceChanged = () => {
    if (!isMapLoaded || !toRef.current) return;
    const place = toRef.current.getPlace();
    if (place && place.place_id) {
      setNoResults(false);
      setToInput(place.formatted_address || place.name || "");
      setToState(getStateFromPlace(place));
    }
  };

  const handleBlur = (value, setFn, label, setStateFn) => {
    if (!value || !isMapLoaded) return;

    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      { input: value, componentRestrictions: { country: "in" } },
      (predictions, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions &&
          predictions.length > 0
        ) {
          const placesService = new window.google.maps.places.PlacesService(
            document.createElement("div")
          );
          placesService.getDetails(
            { placeId: predictions[0].place_id },
            (place, detailsStatus) => {
              if (
                detailsStatus ===
                  window.google.maps.places.PlacesServiceStatus.OK &&
                place
              ) {
                setFn(place.formatted_address || predictions[0].description);
                setStateFn(getStateFromPlace(place));
              }
            }
          );
        } else {
          toast.error(`No valid ${label} found`);
          setNoResults(true);
        }
      }
    );
  };

  const handleSwap = () => {
    const tempInput = fromInput;
    const tempState = fromState;
    setFromInput(toInput);
    setFromState(toState);
    setToInput(tempInput);
    setToState(tempState);
  };

  if (!isMapLoaded) return <div className="text-sm text-gray-400 py-4">Initializing search map...</div>;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold tracking-wider uppercase text-slate-800">
          Pick Up & Drop Destination
        </span>
        {fromInput && toInput && (
          <button
            type="button"
            onClick={handleSwap}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-800 bg-rose-100 hover:bg-rose-200 px-3 py-1.5 rounded-full transition"
          >
            <LuArrowDownUp size={13} />
            <span>Swap Route</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* From Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600 group-focus-within:text-emerald-700 transition">
            <LuNavigation size={19} />
          </div>
          <div className="w-full bg-slate-50 hover:bg-white focus-within:bg-white border-2 border-slate-300 focus-within:border-emerald-600 rounded-2xl transition-all shadow-sm focus-within:shadow-md">
            <span className="block text-[11px] font-extrabold text-slate-700 pl-11 pt-2.5 uppercase tracking-wider">
              Pickup Point
            </span>
            <Autocomplete
              onLoad={(autocomplete) => (fromRef.current = autocomplete)}
              onPlaceChanged={handleFromPlaceChanged}
              options={{ componentRestrictions: { country: "in" } }}
            >
              <input
                type="text"
                value={fromInput}
                onChange={(e) => setFromInput(e.target.value)}
                onBlur={(e) =>
                  handleBlur(e.target.value, setFromInput, "Pickup Location", setFromState)
                }
                className="w-full pl-11 pr-4 pb-2.5 pt-0.5 bg-transparent font-semibold text-slate-950 placeholder:text-slate-600 placeholder:font-normal text-sm sm:text-base outline-none truncate"
                placeholder="e.g. Chennai Central, Coimbatore Airport, Madurai"
              />
            </Autocomplete>
          </div>
        </div>

        {/* To Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#ff1d58] group-focus-within:text-[#e01549] transition">
            <LuMapPin size={20} />
          </div>
          <div className="w-full bg-slate-50 hover:bg-white focus-within:bg-white border-2 border-slate-300 focus-within:border-[#ff1d58] rounded-2xl transition-all shadow-sm focus-within:shadow-md">
            <span className="block text-[11px] font-extrabold text-slate-700 pl-11 pt-2.5 uppercase tracking-wider">
              Drop Location
            </span>
            <Autocomplete
              onLoad={(autocomplete) => (toRef.current = autocomplete)}
              onPlaceChanged={handleToPlaceChanged}
              options={{ componentRestrictions: { country: "in" } }}
            >
              <input
                type="text"
                value={toInput}
                onChange={(e) => setToInput(e.target.value)}
                onBlur={(e) =>
                  handleBlur(e.target.value, setToInput, "Destination", setToState)
                }
                className="w-full pl-11 pr-4 pb-2.5 pt-0.5 bg-transparent font-semibold text-slate-950 placeholder:text-slate-600 placeholder:font-normal text-sm sm:text-base outline-none truncate"
                placeholder="e.g. Bangalore, Trichy, Ooty, Kanyakumari"
              />
            </Autocomplete>
          </div>
        </div>
      </div>

      {noResults && (
        <p className="text-red-600 text-xs font-semibold bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
          ⚠️ Sorry, no matching suggestions found. Please verify location name.
        </p>
      )}
    </div>
  );
}
