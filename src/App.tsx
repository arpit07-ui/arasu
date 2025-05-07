import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import { createUserTrcak } from "./services/userManagementService";

const App: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  // Hide footer on Login & Signup pages
  const hideFooter = location.pathname === "/login";

  const fetchCombinedData = async (lat: any, lon: any) => {
    try {
      const res1: any = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const locationData = await res1.json();

      const res2 = await fetch("https://api.ipify.org/?format=json");
      const apiData = await res2.json();

      const payload = {
        ip: apiData?.ip,
        name: "unknown",
        latitude: locationData?.lat,
        longitude: locationData?.lon,
        timeZone: locationData?.display_name,
        city: locationData?.address?.city,
        region: locationData?.address?.state,
        country: locationData?.address?.country,
        postal: locationData?.address?.postcode,
      };

      const createUserIp = await createUserTrcak(payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Request current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const fetch = fetchCombinedData(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geoloaction is not supported by this browser");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header */}
      {!isAuthenticated && <Header />}

      {/* Main Content (Takes Remaining Space) */}
      <main className="flex-grow">
        <AppRouter />
      </main>

      {/* Footer (Always at Bottom, but hidden on login) */}

      {isAuthenticated || (!hideFooter && <Footer />)}
    </div>
  );
};

export default App;
