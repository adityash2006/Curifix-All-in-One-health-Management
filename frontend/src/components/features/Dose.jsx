
import { useState, useEffect, useRef } from 'react';

export default function TakeYourDose() {
  const [reminders, setReminders] = useState([]);
  const [formData, setFormData] = useState({
    medicineName: '',
    dosage: '',
    duration: '',
  });
  const alarmRef = useRef(null);

  // Initialize alarm audio on mount
  useEffect(() => {
    alarmRef.current = new Audio(
      'https://www.fesliyanstudios.com/play-mp3/4386'
    );
  }, []);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setReminders((prevReminders) =>
        prevReminders.map((reminder) => {
          if (reminder.isCompleted) return reminder;

          const timeLeft = reminder.timeLeft - 1;

          if (timeLeft <= 0) {
            alarmRef.current?.play();
            return { ...reminder, timeLeft: 0, isCompleted: true };
          }

          return { ...reminder, timeLeft };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddReminder = (e) => {
    e.preventDefault();

    if (!formData.medicineName || !formData.dosage || !formData.duration) {
      alert('Please fill in all fields');
      return;
    }

    const newReminder = {
      id: Date.now(),
      medicineName: formData.medicineName,
      dosage: formData.dosage,
      duration: parseInt(formData.duration),
      timeLeft: parseInt(formData.duration),
      isCompleted: false,
    };

    setReminders([...reminders, newReminder]);
    setFormData({ medicineName: '', dosage: '', duration: '' });
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const handleMarkAsTaken = (id) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, isCompleted: true } : reminder
      )
    );
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  };

  const getProgressPercentage = (reminder) => {
    return ((reminder.duration - reminder.timeLeft) / reminder.duration) * 100;
  };

  return (
    <main className="min-h-screen w-full overflow-auto bg-gradient-to-b from-green-50 via-white to-green-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-2">
            Take Your Dose
          </h1>
          <p className="text-lg text-green-700">
            Never forget your medication reminders
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-green-100 p-6">
              <h2 className="text-2xl font-bold text-green-900 mb-6">
                Add Reminder
              </h2>
              <form onSubmit={handleAddReminder} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-green-800 mb-2">
                    Medicine Name
                  </label>
                  <input
                    type="text"
                    name="medicineName"
                    value={formData.medicineName}
                    onChange={handleInputChange}
                    placeholder="e.g., Aspirin"
                    className="w-full px-4 text-black py-2 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-green-800 mb-2">
                    Dosage
                  </label>
                  <input
                    type="text"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleInputChange}
                    placeholder="e.g., 500mg"
                    className="w-full text-black px-4 py-2 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-green-800 mb-2">
                    Duration (seconds)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 3600"
                    min="1"
                    className="w-full text-black px-4 py-2 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition transform hover:scale-105 active:scale-95"
                >
                  Add Reminder
                </button>
              </form>
            </div>
          </div>

          {/* Reminders Grid */}
          <div className="md:col-span-2">
            {reminders.length === 0 ? (
              <div className="bg-white rounded-2xl border-2 border-green-100 p-12 text-center shadow-lg">
                <div className="text-6xl mb-4">💊</div>
                <h3 className="text-xl font-semibold text-green-900 mb-2">
                  No reminders yet
                </h3>
                <p className="text-green-600">
                  Create your first medication reminder to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className={`rounded-2xl border-2 shadow-lg p-6 transition ${
                      reminder.isCompleted
                        ? 'bg-green-100 border-green-300'
                        : reminder.timeLeft <= 0
                          ? 'bg-red-100 border-red-400 animate-pulse'
                          : 'bg-white border-green-100'
                    }`}
                  >
                    {reminder.isCompleted && reminder.timeLeft <= 0 && (
                      <div className="mb-4 p-3 bg-red-500 text-white rounded-lg font-bold text-center animate-bounce">
                        Time to take your dose!
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-green-900">
                          {reminder.medicineName}
                        </h3>
                        <p className="text-green-700 font-semibold">
                          {reminder.dosage}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteReminder(reminder.id)}
                        className="text-red-500 hover:text-red-700 font-bold text-2xl transition"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-green-700">
                          Time Remaining
                        </span>
                        <span className="text-lg font-bold text-green-900">
                          {formatTime(reminder.timeLeft)}
                        </span>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all"
                          style={{ width: `${getProgressPercentage(reminder)}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    {!reminder.isCompleted && reminder.timeLeft > 0 ? (
                      <button
                        onClick={() => handleMarkAsTaken(reminder.id)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition transform hover:scale-105 active:scale-95"
                      >
                        Mark as Taken
                      </button>
                    ) : (
                      <div className="w-full bg-green-200 text-green-900 font-bold py-2 px-4 rounded-lg text-center">
                        ✓ Completed
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
