import React from 'react';

const Footer: React.FC = () => (
  <div className="bg-white border-t mt-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          SupplyGuard AI - Walmart Sparkathon 2025 Prototype
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>Powered by AI/ML</span>
          <span>&bull;</span>
          <span>Real-time Monitoring</span>
          <span>&bull;</span>
          <span>Global Coverage</span>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;