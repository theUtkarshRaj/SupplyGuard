// components/SettingsPanel.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="absolute right-12 mt-2 w-64 bg-white shadow-lg border rounded-lg p-4 z-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-gray-800">Settings</h4>
        <button onClick={onClose} className="text-gray-400 hover:text-red-500">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Settings Options */}
      <div className="space-y-3 text-sm text-gray-700">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={emailAlerts}
            onChange={() => setEmailAlerts(!emailAlerts)}
            className="form-checkbox"
          />
          <span>Email Alerts</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="form-checkbox"
          />
          <span>Dark Mode</span>
        </label>
      </div>
    </div>
  );
};

export default SettingsPanel;
