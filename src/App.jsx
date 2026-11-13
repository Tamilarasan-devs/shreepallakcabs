import { useEffect, useCallback, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import Header from "./components/Header";
import Banner from "./components/Banner";
import Location from "./components/Location";
import VehiclesList from "./components/VehiclesList";
import Experience from "./components/Experience";
import Fleets from "./components/Fleets";
import Footer from "./components/Footer";
import RouteMap from "./components/RouteMap";
import BookingConfirmation from "./components/Confirmation";
import AboutUs from "./components/AboutUs";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";

import { useTrip } from "./Contexts/TripType";
import getPriceList from "./Services/getPriceList";
import { getAllVehicles } from "./Services/getAllVehicles";
import Loader from "./Loader";

const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const {
    vehicleList,
    setVehiclePriceList,
    conform,
    adminPhone,
    setAdminPhone,
    setVehicles,
  } = useTrip();

  const bookingRef = useRef(null);
  const vehicleRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: mapsApiKey,
    libraries: ["places", "geometry"],
  });

  const fetchPrices = useCallback(async () => {
    const data = await getPriceList();
    setVehiclePriceList(data.priceList);
    setAdminPhone(data.adminPhone);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllVehicles();
        setVehicles(response);
      } catch (error) {
        console.error("Failed to fetch trips:");
      }
    };
    getData();
    fetchPrices();
  }, [fetchPrices]);

  useEffect(() => {
    if (conform && bookingRef?.current) {
      bookingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conform]);

  useEffect(() => {
    if (vehicleList && vehicleRef?.current) {
      vehicleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [vehicleList]);

  if (loadError) return <div>Something went wrong</div>;
  if (!isLoaded) return null;
  return (
    <div className="h-full w-full overflow-hidden">
      <Header adminPhone={adminPhone} />
      {/* Spacer div to prevent content from hiding behind fixed header */}
      <div className="h-16 md:h-18" style={{ zIndex: 40 }}></div>
      <main>
        <div className="relative flex flex-col bg-slate-50 min-h-screen">
          <Banner adminPhone={adminPhone}/>

          <Location isMapLoaded={isLoaded} />

          {vehicleList && (
            <div ref={vehicleRef}>
              <VehiclesList />
            </div>
          )}
          {conform && (
            <div ref={bookingRef} className="pt-6">
              <BookingConfirmation isMapLoaded={isLoaded} />
            </div>
          )}
          <Experience />
          <AboutUs />
          <Fleets />
          <Testimonials />
          <FAQ />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
// ok
