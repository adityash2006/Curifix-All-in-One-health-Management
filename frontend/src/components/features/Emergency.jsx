import { useState } from "react";

export default function Emergency() {
  const [savedNumber, setSavedNumber] = useState("");

  // Save emergency contact locally (you can replace with DB)
  const handleSaveNumber = () => {
    if (savedNumber.trim().length < 10)
      return alert("Enter a valid number");

    localStorage.setItem("emergencyContact", savedNumber);
    alert("Emergency contact saved!");
  };

  const savedContact = localStorage.getItem("emergencyContact");

  // SOS SMS with location
  const sendSOS = () => {
    if (!savedContact) {
      alert("No emergency contact saved!");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const message = `EMERGENCY! I need help. My location: https://maps.google.com/?q=${lat},${lng}`;

        window.location.href = `sms:${savedContact}?body=${encodeURIComponent(
          message
        )}`;
      },
      () => {
        alert("Unable to access location");
      }
    );
  };

  const emergencyServices = [
    {
      id: 1,
      name: "Ambulance",
      number: "108",
      icon: "🚑",
      color: "from-red-500 to-red-600",
      description: "Medical Emergency",
    },
    {
      id: 2,
      name: "Police",
      number: "100",
      icon: "🚓",
      color: "from-blue-500 to-blue-600",
      description: "Police Assistance",
    },
    {
      id: 3,
      name: "Fire Brigade",
      number: "101",
      icon: "🔥",
      color: "from-orange-500 to-orange-600",
      description: "Fire Emergency",
    },
    {
      id: 4,
      name: "Women Helpline",
      number: "1091",
      icon: "👩",
      color: "from-pink-500 to-pink-600",
      description: "Women Safety",
    },
    {
      id: 5,
      name: "Child Helpline",
      number: "1098",
      icon: "👶",
      color: "from-purple-500 to-purple-600",
      description: "Child Protection",
    },
    {
      id: 6,
      name: "Disaster Management",
      number: "1070",
      icon: "⚠️",
      color: "from-yellow-500 to-yellow-600",
      description: "Disaster Relief",
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-auto bg-gradient-to-br  from-green-50 via-white to-green-50 text-green-900">
      <div className="pt-8 pb-6 px-4 ">
        <div className="max-w-4xl mx-auto">
          <div className="mb-2 text-sm font-semibold text-red-400 uppercase tracking-widest">
            Emergency Services
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-3 text-balance">
            Get Help <span className="text-red-500">Now</span>
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl">
            Quick access to essential emergency services in your area. Select a service for immediate assistance.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {emergencyServices.map((service) => (
            <button
              key={service.id}
              onClick={() => (window.location.href = `tel:${service.number}`)}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${service.color} p-0.5 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95`}
            >
              <div className="relative bg-slate-900/95 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center gap-3 h-full min-h-40">
                {/* Icon */}
                <div className="text-4xl group-hover:scale-125 transition-transform duration-300">
                  {service.icon}
                </div>

                {/* Service name and number */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {service.name}
                  </div>
                  <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500 mb-2">
                    {service.number}
                  </div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    {service.description}
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-20`} />
                </div>
              </div>
            </button>
          ))}
        </div>

        

      
      </div>
    </div>
  );
}
