import { useState, useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function Nearbydoc() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [userLat, setUserLat] = useState(null);
  const [userLong, setUserLong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [healthCenters, setHealthCenters] = useState([]);
  const [loadingCenters, setLoadingCenters] = useState(false);
  const [locationFound, setLocationFound] = useState(false);
  const markersRef = useRef([]);

  const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

  function getUserLocation() {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      setLocationFound(false);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLat(latitude);
          setUserLong(longitude);
          setLoading(false);
          setLocationFound(true);
          console.log("User location:", latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Please enable location access to find nearby doctors.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }

  async function findNearbyHealthCenters() {
    if (!userLat || !userLong) return;
    
    setLoadingCenters(true);
    setError(null);
    
    try {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      
      const response = await fetch(
`https://api.geoapify.com/v2/places?categories=healthcare.hospital,healthcare.clinic_or_praxis&filter=circle:${userLong},${userLat},5000&limit=30&apiKey=${GEOAPIFY_KEY}
`      );
      
      const data = await response.json();
      console.log(data);
      
      if (data.features && data.features.length > 0) {
        setHealthCenters(data.features);
        
        // Add markers for each health center
        data.features.forEach((feature, index) => {
          const [lng, lat] = feature.geometry.coordinates;
          const props = feature.properties;
          
          const marker = new maplibregl.Marker({ 
            color: "#EF4444",
            scale: 0.8
          })
            .setLngLat([lng, lat])
            .setPopup(
              new maplibregl.Popup({ offset: 25 })
                .setHTML(`
                  <div style="padding: 8px;">
                    <strong style="color: #1f2937; font-size: 14px;">${props.name || 'Health Center'}</strong>
                    <p style="color: #6b7280; font-size: 12px; margin-top: 4px;">${props.formatted || props.address_line1 || 'Address not available'}</p>
                    ${props.distance ? `<p style="color: #059669; font-size: 12px; margin-top: 4px;">📍 ${(props.distance / 1000).toFixed(2)} km away</p>` : ''}
                  </div>
                `)
            )
            .addTo(mapRef.current);
          
          markersRef.current.push(marker);
        });
        
        // Fit map to show all markers
        const bounds = new maplibregl.LngLatBounds();
        bounds.extend([userLong, userLat]);
        data.features.forEach(feature => {
          bounds.extend(feature.geometry.coordinates);
        });
        mapRef.current.fitBounds(bounds, { padding: 50 });
        
      } else {
        setError("No health centers found nearby. Try expanding your search area.");
      }
    } catch (err) {
      console.error("Error fetching health centers:", err);
      setError("Failed to fetch nearby health centers. Please try again.");
    } finally {
      setLoadingCenters(false);
    }
  }

  useEffect(() => {
    if (userLat && userLong && mapContainerRef.current && !mapRef.current) {
      const mapInstance = new maplibregl.Map({
        container: mapContainerRef.current,
        style: `https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${GEOAPIFY_KEY}`,
        center: [userLong, userLat],
        zoom: 14,
      });

      // Handle missing images to prevent console errors
      mapInstance.on('styleimagemissing', (e) => {
        const id = e.id;
        if (mapInstance.hasImage(id)) return;
        
        // Create a simple 1x1 transparent image for missing sprites
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const context = canvas.getContext('2d');
        
        mapInstance.addImage(id, {
          width: 1,
          height: 1,
          data: new Uint8Array(4)
        });
      });

      mapInstance.on('load', () => {
        // Add user location marker
        new maplibregl.Marker({ 
          color: "#4285F4",
          scale: 1.2
        })
          .setLngLat([userLong, userLat])
          .setPopup(
            new maplibregl.Popup({ offset: 25 })
              .setHTML('<strong>You are here</strong>')
          )
          .addTo(mapInstance);
      });

      mapRef.current = mapInstance;
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [userLat, userLong, GEOAPIFY_KEY]);

  return (
    <div className="min-h-screen w-full overflow-auto bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Find Nearby Doctors
          </h1>
          <p className="text-gray-600">
            Locate healthcare providers in your area
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {!locationFound ? (
            <button
              className="px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              onClick={getUserLocation}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Finding Location...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Find My Location
                </span>
              )}
            </button>
          ) : (
            <button
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              onClick={findNearbyHealthCenters}
              disabled={loadingCenters}
            >
              {loadingCenters ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Locate Nearby Doctors
                </span>
              )}
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {userLat && userLong && (
          <div className="mb-6 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Your Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Latitude</p>
                <p className="text-lg font-mono font-semibold text-gray-800">
                  {userLat.toFixed(6)}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Longitude</p>
                <p className="text-lg font-mono font-semibold text-gray-800">
                  {userLong.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
          <div 
            ref={mapContainerRef}
            className="w-full h-[600px]"
            style={{ minHeight: '600px' }}
          />
        </div>

        {healthCenters.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
              Nearby Health Centers ({healthCenters.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {healthCenters.map((center, index) => {
                const props = center.properties;
                return (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-800 mb-2">{props.name || 'Health Center'}</h3>
                    <p className="text-sm text-gray-600 mb-2">{props.formatted || props.address_line1 || 'Address not available'}</p>
                    {props.distance && (
                      <p className="text-sm text-green-600 font-medium">
                        📍 {(props.distance / 1000).toFixed(2)} km away
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!userLat && !userLong && !loading && (
          <div className="mt-6 text-center text-gray-500">
            <p>Click the button above to find your location on the map</p>
          </div>
        )}

        {locationFound && !healthCenters.length && !loadingCenters && (
          <div className="mt-6 text-center text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="font-medium">📍 Your location has been marked on the map!</p>
            <p className="text-sm mt-2">Now click "Locate Nearby Doctors" to find healthcare facilities around you.</p>
          </div>
        )}
      </div>
    </div>
  );
}