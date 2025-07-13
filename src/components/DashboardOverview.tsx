import React from 'react';
import { AlertTriangle, Shield, CheckCircle, Globe } from 'lucide-react';

const DashboardOverview: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">High Risk Suppliers</p>
          <p className="text-2xl font-bold text-red-600">2</p>
        </div>
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Medium Risk Suppliers</p>
          <p className="text-2xl font-bold text-yellow-600">5</p>
        </div>
        <Shield className="w-8 h-8 text-yellow-500" />
      </div>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Low Risk Suppliers</p>
          <p className="text-2xl font-bold text-green-600">1</p>
        </div>
        <CheckCircle className="w-8 h-8 text-green-500" />
      </div>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Active Alerts</p>
          <p className="text-2xl font-bold text-blue-600">8</p>
        </div>
        <Globe className="w-8 h-8 text-blue-500" />
      </div>
    </div>
  </div>
);

export default DashboardOverview;