import React from 'react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => (
  <div className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex space-x-8">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'dashboard'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('suppliers')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'suppliers'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Suppliers
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'alerts'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Alerts
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'news'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          News Monitor
        </button>
      </div>
    </div>
  </div>
);

export default Navigation;  