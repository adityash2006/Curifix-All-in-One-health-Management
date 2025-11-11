import { useEffect, useState, useRef } from "react";
import maplibregl from "maplibre-gl";

const NearbyHospitalsMap = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

  // Step 1: Get user location
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error(error);
        alert("Unable to get your location. Please enable GPS.");
      }
    );
  }, []);

  // Step 2: Initialize Map when location is ready
  useEffect(() => {
    if (!userLocation) return;

    const mapInstance = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${GEOAPIFY_KEY}`,
      center: [userLocation.lng, userLocation.lat],
      zoom: 13,
    });

    new maplibregl.Marker({ color: "#4285F4" })
      .setLngLat([userLocation.lng, userLocation.lat])
      .setPopup(new maplibregl.Popup().setText("You are here"))
      .addTo(mapInstance);

    setMap(mapInstance);
    return () => mapInstance.remove();
  }, [userLocation]);

  // Step 3: Fetch nearby hospitals
  useEffect(() => {
    const fetchHospitals = async () => {
      if (!userLocation) return;

      const offset = 0.05;
      const rect = `${userLocation.lng - offset},${userLocation.lat + offset},${userLocation.lng + offset},${userLocation.lat - offset}`;
      const url = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=rect:${rect}&limit=20&apiKey=${GEOAPIFY_KEY}`;

      const res = await fetch(url);
      const data = await res.json();
      setHospitals(data.features);
    };

    fetchHospitals();
  }, [userLocation]);

  // Step 4: Add hospital markers
  useEffect(() => {
    if (!map || hospitals.length === 0) return;

    hospitals.forEach((place) => {
      const [lng, lat] = place.geometry.coordinates;

      new maplibregl.Marker({ color: "#D9534F" })
        .setLngLat([lng, lat])
        .setPopup(
          new maplibregl.Popup().setHTML(`
            <strong>${place.properties.name || "Unnamed Hospital"}</strong><br/>
            ${place.properties.address_line2 || ""}
          `)
        )
        .addTo(map);
    });
  }, [map, hospitals]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Nearby Hospitals</h2>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "400px", borderRadius: "10px" }}
      />
    </div>
  );
};

export default NearbyHospitalsMap;
