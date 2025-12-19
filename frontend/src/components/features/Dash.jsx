import { useState, useEffect } from 'react';
import { Menu, HeartPulse, Sparkles, Radio, Droplets, Flame, Moon, Activity, TrendingUp, Clock, ExternalLink } from 'lucide-react';

// Demo user - replace with Clerk in production
const demoUser = { firstName: 'Friend' };

// Greeting Card Component
function GreetingCard({ userName, quote }) {
  return (
    <div className="bg-gradient-to-br from-lime-300 via-lime-400 to-lime-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
      <h3 className="text-4xl font-bold text-gray-900 mb-3">
        Hello {userName}! 👋
      </h3>
      <p className="text-gray-800 text-sm flex items-center gap-2">
        <Sparkles size={16} className="animate-pulse" /> {quote}
      </p>
    </div>
  );
}

// Wellness Status Card
function WellnessCard() {
  return (
    <div className="bg-gradient-to-br from-lime-300 via-lime-400 to-lime-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
      <p className="text-xs text-gray-700 mb-1 uppercase tracking-wide font-semibold">Today's Wellness</p>
      <div className="flex items-center gap-3 mb-2">
        <HeartPulse size={40} className="text-gray-900 animate-pulse" />
        <span className="text-5xl font-bold text-gray-900">Good</span>
      </div>
      <p className="text-gray-800 text-sm">Keep maintaining your rhythm 🌿</p>
    </div>
  );
}

// Quick Stats Component
function QuickStats() {
  const stats = [
    { icon: Droplets, label: 'Hydration', value: '6/8', unit: 'glasses', color: 'text-blue-700' },
    { icon: Flame, label: 'Calories', value: '1,842', unit: 'kcal', color: 'text-orange-700' },
    { icon: Moon, label: 'Sleep', value: '7.5', unit: 'hours', color: 'text-purple-700' },
    { icon: Activity, label: 'Steps', value: '8,234', unit: 'steps', color: 'text-green-700' }
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white/60 backdrop-blur-sm rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <stat.icon size={24} className={`${stat.color} mb-2`} />
          <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-xs text-gray-600">{stat.unit}</p>
        </div>
      ))}
    </div>
  );
}

// Activity Suggestions Component
function ActivitySuggestions() {
  const activities = [
    { title: '10-min Morning Stretch', time: '8:00 AM', icon: '🧘', bg: 'bg-lime-100' },
    { title: 'Healthy Lunch Break', time: '12:30 PM', icon: '🥗', bg: 'bg-green-100' },
    { title: 'Evening Walk', time: '6:00 PM', icon: '🚶', bg: 'bg-emerald-100' }
  ];

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={20} className="text-lime-700" />
        <h3 className="text-lg font-semibold text-gray-900">Today's Activities</h3>
      </div>
      <div className="space-y-3">
        {activities.map((activity, idx) => (
          <div key={idx} className={`${activity.bg} rounded-lg p-4 flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer`}>
            <span className="text-2xl">{activity.icon}</span>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{activity.title}</p>
              <p className="text-xs text-gray-600">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// News Card Component
function NewsCard({ article, index }) {
  return (
    <div className="p-5 bg-white/50 backdrop-blur-sm rounded-xl hover:bg-white/70 transition-all hover:scale-105 cursor-pointer border border-lime-200">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-lime-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold">{index + 1}</span>
        </div>
        <div className="flex-1">
          <p className="text-gray-900 font-semibold mb-1 leading-snug">{article.title}</p>
          <p className="text-xs text-gray-600 mb-2">{article.description}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock size={12} />
            <span>{article.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Component
export default function Dash() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const healthQuotes = [
    "Drink water like your life depends on it — because it does 😄",
    "Sleep is your body's free doctor. Don't skip appointments!",
    "Your body hears everything your mind says. Be nice ❤️",
    "A 10-minute walk after meals fixes half of life's problems 🧠",
    "Health is like money — don't wait until it's gone to appreciate it."
  ];

  const randomQuote = healthQuotes[Math.floor(Math.random() * healthQuotes.length)];

  useEffect(() => {
    async function fetchHealthNews() {
      try {
        setLoading(true);
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            messages: [
              {
                role: "user",
                content: "Find 5 recent health and wellness news headlines from the past week. Return ONLY valid JSON with this exact format, no markdown, no preamble: [{\"title\": \"headline\", \"description\": \"brief summary\", \"date\": \"relative time like '2 hours ago'\"}]"
              }
            ],
            tools: [
              {
                type: "web_search_20250305",
                name: "web_search"
              }
            ]
          })
        });

        const data = await response.json();
        const textContent = data.content
          .filter(item => item.type === "text")
          .map(item => item.text)
          .join("");
        
        const cleanJson = textContent.replace(/```json|```/g, "").trim();
        const articles = JSON.parse(cleanJson);
        setNews(articles.slice(0, 5));
      } catch (err) {
        console.error("Error fetching news:", err);
        // Fallback news
        setNews([
          { title: "Morning Exercise Boosts Mental Health", description: "New study shows 20 minutes of activity improves mood", date: "2 hours ago" },
          { title: "Mediterranean Diet Linked to Longevity", description: "Researchers find strong correlation with healthy aging", date: "5 hours ago" },
          { title: "Hydration Tips for Winter Wellness", description: "Experts share strategies to stay hydrated in cold weather", date: "1 day ago" },
          { title: "Sleep Quality Affects Immune System", description: "Study reveals connection between rest and immunity", date: "1 day ago" },
          { title: "Plant-Based Proteins on the Rise", description: "New alternatives provide complete nutrition", date: "2 days ago" }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchHealthNews();
  }, []);

  return (

    <div>
      sdfdsf
    </div>
    // <div className="flex-1 overflow-auto bg-gradient-to-br from-lime-50 to-green-50 min-h-screen">
    //   <div className="p-8 max-w-7xl mx-auto">

    //     {/* Header */}
    //     <div className="flex items-center justify-between mb-8">
    //       <div>
    //         <h2 className="text-3xl font-bold text-gray-900">My Health Dashboard</h2>
    //         <p className="text-sm text-gray-600 mt-1">Track your wellness journey</p>
    //       </div>
    //       <button className="p-3 hover:bg-white/60 rounded-xl transition-colors backdrop-blur-sm">
    //         <Menu size={24} className="text-gray-700" />
    //       </button>
    //     </div>

    //     {/* Greeting + Wellness Cards */}
    //     <div className="grid grid-cols-2 gap-6 mb-8">
    //       <GreetingCard userName={demoUser.firstName} quote={randomQuote} />
    //       <WellnessCard />
    //     </div>

    //     {/* Quick Stats */}
    //     <div className="mb-8">
    //       <QuickStats />
    //     </div>

    //     {/* Activity Suggestions + Health Tip */}
    //     <div className="grid grid-cols-3 gap-6 mb-8">
    //       <div className="col-span-2">
    //         <ActivitySuggestions />
    //       </div>
    //       <div className="bg-gradient-to-br from-lime-400 to-green-400 rounded-2xl p-6 shadow-lg text-white">
    //         <TrendingUp size={32} className="mb-3" />
    //         <h4 className="text-lg font-bold mb-2">Weekly Progress</h4>
    //         <p className="text-sm opacity-90 mb-4">You're 15% more active than last week! 🎉</p>
    //         <div className="bg-white/30 rounded-lg p-3 backdrop-blur-sm">
    //           <p className="text-xs font-semibold">Keep it up!</p>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Health News */}
    //     <div className="bg-gradient-to-br from-lime-300 via-lime-400 to-lime-300 rounded-2xl p-8 shadow-lg">
    //       <div className="flex items-center gap-2 mb-6">
    //         <Radio size={24} className="text-gray-800" />
    //         <h3 className="text-2xl font-bold text-gray-900">Latest Health News</h3>
    //       </div>

    //       {loading && (
    //         <div className="text-center py-8">
    //           <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-900 border-t-transparent"></div>
    //           <p className="text-sm text-gray-700 mt-3">Fetching fresh health headlines...</p>
    //         </div>
    //       )}

    //       <div className="space-y-4">
    //         {news.map((article, idx) => (
    //           <NewsCard key={idx} article={article} index={idx} />
    //         ))}
    //       </div>
    //     </div>

    //   </div>
    // </div>
  );
}