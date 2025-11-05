 import { LayoutDashboard,Video,Ambulance, MapPinHouse ,MessageSquare, Pill, FileText, User, Menu, TrendingUp, Plus, Settings2 } from 'lucide-react';
import { useState } from 'react';
 export default function Dash(){
    const [activeTab, setActiveTab] = useState('Outline');

  const tabs = [
    { name: 'Outline', count: null },
    { name: 'Past Performance', count: 3 },
    { name: 'Key Personnel', count: 2 },
    { name: 'Focus Documents', count: null }
  ];
    return (
 
 <div className="flex-1 overflow-auto">
        <div className="p-8">
         
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Menu size={20} className="text-gray-600" />
            </button>
          </div>

        
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-lime-300 via-lime-400 to-lime-300 rounded-2xl p-8 shadow-sm">
              <h3 className="text-4xl font-bold text-gray-900 mb-3">Hello Ayush</h3>
              <p className="text-gray-800 text-sm">How are you feeling today?</p>
            </div>

            <div className="bg-gradient-to-br from-lime-300 via-lime-400 to-lime-300 rounded-2xl p-8 shadow-sm">
              <p className="text-xs text-gray-700 mb-1 uppercase tracking-wide">Health Status</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-gray-900">98%</span>
              </div>
              <div className="flex items-center gap-1 text-gray-800 text-sm">
                <span>Stay Healthy</span>
                <TrendingUp size={14} />
              </div>
            </div>
          </div>

          
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`pb-2 text-sm font-medium transition-colors relative ${
                    activeTab === tab.name
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.name}
                  {tab.count && (
                    <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                  {activeTab === tab.name && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings2 size={16} />
                Customize Columns
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Plus size={16} />
                Add Section
              </button>
            </div>
          </div>

         
          <div className="grid grid-cols-2 gap-6">
            
            <div className="bg-gradient-to-br from-lime-300 via-lime-400 to-lime-300 rounded-2xl p-8 shadow-sm">
              <p className="text-center text-sm text-gray-700 mb-8 uppercase tracking-wide">Today's progress</p>
              
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-64 h-64">
                  <svg viewBox="0 0 200 200" className="transform -rotate-90">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#F97316" strokeWidth="30" strokeDasharray="150.8 502.4" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#FB923C" strokeWidth="30" strokeDasharray="125.6 502.4" strokeDashoffset="-150.8" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#EA580C" strokeWidth="30" strokeDasharray="125.6 502.4" strokeDashoffset="-276.4" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#9A3412" strokeWidth="30" strokeDasharray="100.5 502.4" strokeDashoffset="-402" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">1,125</span>
                    <span className="text-sm text-gray-700">Visitors</span>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-1 text-gray-800 text-sm font-medium">
                  <span>Trending up by 5.2% this month</span>
                  <TrendingUp size={14} />
                </div>
                <p className="text-xs text-gray-700">Showing total visitors for the last 6 months</p>
              </div>
            </div>

           <p>Bar chart</p>
            <div className="bg-gradient-to-br from-lime-300 via-lime-400 to-lime-300 rounded-2xl p-8 shadow-sm"> 
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900">Bar Chart - Mixed</h3>
                <p className="text-xs text-gray-700">January - June 2024</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-800 w-16">Chrome</span>
                  <div className="flex-1 bg-orange-400 h-8 rounded" style={{ width: '85%' }} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-800 w-16">Safari</span>
                  <div className="flex-1 bg-orange-500 h-8 rounded" style={{ width: '65%' }} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-800 w-16">Firefox</span>
                  <div className="flex-1 bg-orange-600 h-8 rounded" style={{ width: '55%' }} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-800 w-16">Edge</span>
                  <div className="flex-1 bg-orange-700 h-8 rounded" style={{ width: '50%' }} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-800 w-16">Other</span>
                  <div className="flex-1 bg-amber-800 h-8 rounded" style={{ width: '35%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 text-gray-800 text-sm font-medium">
                  <span>Trending up by 5.2% this month</span>
                  <TrendingUp size={14} />
                </div>
                <p className="text-xs text-gray-700">Showing total visitors for the last 6 months</p>
              </div>
            </div>
          </div>
        </div>
      </div> 
   ) }