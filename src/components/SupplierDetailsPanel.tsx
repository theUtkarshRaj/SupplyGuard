import React from 'react';

interface Supplier {
  id: string;
  name: string;
  region: string;
  location: string;
  riskScore: number;
  riskLevel: string;
  financialScore: number;
  geopoliticalRisk: number;
  esgCompliance: number;
  recentNews: string;
  action: string;
  category: string;
  lastUpdated: string;
  trend: 'increasing' | 'decreasing' | 'stable';
}

interface SupplierDetailsPanelProps {
  supplier: Supplier;
  onClose: () => void;
}

const SupplierDetailsPanel: React.FC<SupplierDetailsPanelProps> = ({ supplier, onClose }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="px-6 py-4 bg-gray-50 border-b">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{supplier.name} - Detailed Analysis</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
    </div>
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Risk Breakdown</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Financial Score</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${supplier.financialScore * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{(supplier.financialScore * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Geopolitical Risk</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="h-2 rounded-full bg-red-500"
                    style={{ width: `${supplier.geopoliticalRisk * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{(supplier.geopoliticalRisk * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">ESG Compliance</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${supplier.esgCompliance * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{(supplier.esgCompliance * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Recent Intelligence</h4>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700">{supplier.recentNews}</p>
          </div>
          <h4 className="font-medium text-gray-900 mt-4 mb-3">Recommended Action</h4>
          <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-blue-800">{supplier.action}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SupplierDetailsPanel;