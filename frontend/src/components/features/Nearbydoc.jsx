import { useState, useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";

export default function Nearbydoc() {
  const mapContainerRef = useRef(null);
  const [userLat, setUserLat] = useState(null);
  const [userLong, setUserLong] = useState(null);
  const [map, setMap] = useState(null);

  const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLat(latitude);
          setUserLong(longitude);
          console.log("User location:", latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Please enable location access to find nearby doctors.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    if (userLat && userLong && mapContainerRef.current && !map) {
      const mapInstance = new maplibregl.Map({
        container: mapContainerRef.current,
        style: `https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${GEOAPIFY_KEY}`,
        center: [userLong, userLat],
        zoom: 13,
      });

      new maplibregl.Marker({ color: "#4285F4" })
        .setLngLat([userLong, userLat])
        .setPopup(new maplibregl.Popup().setText("You are here"))
        .addTo(mapInstance);

      setMap(mapInstance);
    }
  }, [userLat, userLong]);

  return (
    <div>
      <h1 className="text-black text-3xl mb-4">LOCATE NEARBY DOCTORS</h1>

      <button
        className="border-2 text-green-400 border-black p-2 cursor-pointer rounded-2xl bg-black font-bold"
        onClick={getUserLocation}
      >
        Find Health Services
      </button>

      {userLat && userLong && (
        <div className="mt-4 p-4 border-2 border-black rounded-lg bg-white backdrop-blur-3xl">
          <h2 className="text-xl font-semibold mb-2 text-black">Your Location:</h2>
          <p className="text-black">Latitude: {userLat}</p>
          <p className="text-black">Longitude: {userLong}</p>
        </div>
      )}

      <div className="w-full h-[500px] mt-4 relative">
  <div
    ref={mapContainerRef}
    className="absolute top-0 left-0 w-full h-full rounded-lg"
  ></div>
</div>

    </div>
  );
}
