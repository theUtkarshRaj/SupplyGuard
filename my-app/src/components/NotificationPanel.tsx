// components/NotificationPanel.tsx
import React from 'react';
import { X } from 'lucide-react';

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const notifications = [
    { id: 1, message: "⚠️ New high-risk alert detected" },
    { id: 2, message: "✅ Supplier XYZ updated compliance" },
    { id: 3, message: "📊 Weekly report generated" },
  ];

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg border rounded-lg p-4 z-50">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-gray-800">Notifications</h4>
        <button onClick={onClose} className="text-gray-400 hover:text-red-500">
          <X className="w-4 h-4" />
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm">No new notifications.</p>
      ) : (
        <ul className="text-sm text-gray-700 space-y-2">
          {notifications.map(n => (
            <li key={n.id}>{n.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPanel;
