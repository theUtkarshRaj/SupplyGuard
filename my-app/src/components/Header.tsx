import React, { useState } from 'react';
import { Shield, Clock, Activity, Bell, Settings } from 'lucide-react';
import NotificationPanel from './NotificationPanel';
import SettingsPanel from './SettingsPanel';

interface HeaderProps {
  currentTime: Date;
}

const Header: React.FC<HeaderProps> = ({ currentTime }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
    setShowSettings(false);
  };

  const toggleSettings = () => {
    setShowSettings(prev => !prev);
    setShowNotifications(false);
  };

  return (
    <div className="relative z-40 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 relative">
          <div className="flex items-center">
            <div className="relative">
              <Shield className="w-10 h-10 text-blue-300 mr-3" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">SupplyGuard AI</h1>
              <p className="text-blue-300 text-sm">Intelligent Supply Chain Risk Management</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 relative">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-blue-200 bg-blue-800/30 px-3 py-2 rounded-lg backdrop-blur-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>Last Updated: {currentTime.toLocaleTimeString()}</span>
              </div>

              <div className="flex items-center space-x-2 bg-green-800/30 px-3 py-2 rounded-lg backdrop-blur-sm">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <Activity className="w-4 h-4 text-green-300" />
                <span className="text-sm text-green-300">Live Monitoring</span>
              </div>
            </div>

            {/* Notification & Settings Buttons */}
            <div className="flex items-center space-x-3 relative">
              <button
                onClick={toggleNotifications}
                className="relative p-2 text-blue-200 hover:text-white hover:bg-blue-800/30 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={toggleSettings}
                className="p-2 text-blue-200 hover:text-white hover:bg-blue-800/30 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* Notification Panel */}
              {showNotifications && (
                <div className="absolute top-12 right-20">
                  <NotificationPanel onClose={() => setShowNotifications(false)} />
                </div>
              )}


              {/* Settings Panel */}
              {showSettings && (
              <div className="absolute top-12 right-0">
                <SettingsPanel onClose={() => setShowSettings(false)} />
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
