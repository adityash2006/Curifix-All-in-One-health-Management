import React, { useState } from "react";
import axios from "axios";

const HealthPlan = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    dietary: "",
    goal: "",
  });
  const [healthPlan, setHealthPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/health-plan",
        formData
      );
      setHealthPlan(response.data);
    } catch (error) {
      console.error("Error fetching health plan:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Personalized Health Plan</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <input
            type="text"
            name="dietary"
            placeholder="Dietary Restrictions"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="goal"
            placeholder="Health Goal"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg"
            disabled={loading}
          >
            {loading ? "Generating..." : "Get Health Plan"}
          </button>
        </form>
        {healthPlan && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Your Health Plan</h2>
            <p className="mt-2">{healthPlan}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthPlan;
