import React from 'react';
import { X, TrendingUp, TrendingDown, Activity, MapPin, Clock, Shield, AlertTriangle, CheckCircle, BarChart3, Bell, ExternalLink, Calendar, Building, Globe } from 'lucide-react';
import '../style/animation.css';

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

const SupplierDetailsPanel: React.FC<SupplierDetailsPanelProps> = ({ supplier, onClose }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-green-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-amber-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskLevelTextColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'from-green-400 to-green-600';
    if (score >= 0.6) return 'from-blue-400 to-blue-600';
    if (score >= 0.4) return 'from-amber-400 to-amber-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-slideUp">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 animate-slideUp">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{supplier.name}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{supplier.location}, {supplier.region}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span>{supplier.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Updated {supplier.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Risk Trend:</span>
                <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-white border border-gray-200">
                  {getTrendIcon(supplier.trend)}
                  <span className="text-xs font-medium capitalize">{supplier.trend}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-80 rounded-xl transition-all duration-200 group"
              >
                <X className="w-6 h-6 text-gray-500 group-hover:text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Risk Score Overview */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  Risk Score
                </h3>
                
                <div className="text-center">
                  {/* Circular Progress */}
                  <div className="relative inline-flex items-center justify-center w-28 h-28 mb-4">
                    <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        fill="none" 
                        stroke="#f3f4f6" 
                        strokeWidth="8"
                      />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        fill="none" 
                        stroke={supplier.riskScore > 70 ? '#ef4444' : supplier.riskScore > 40 ? '#f59e0b' : '#10b981'}
                        strokeWidth="8"
                        strokeDasharray={`${supplier.riskScore * 2.51} 251`}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900">{supplier.riskScore}</span>
                    </div>
                  </div>
                  
                  {/* Risk Level Badge */}
                  <div className={`inline-flex items-center px-4 py-2 rounded-full border ${getRiskLevelTextColor(supplier.riskLevel)}`}>
                    <div className={`w-3 h-3 rounded-full mr-2 ${getRiskLevelColor(supplier.riskLevel)}`}></div>
                    <span className="text-sm font-semibold">{supplier.riskLevel} Risk</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Breakdown */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Risk Breakdown</h3>
                
                <div className="space-y-8">
                  {/* Financial Score */}
                  <div className="group">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <BarChart3 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-800">Financial Score</span>
                          <p className="text-xs text-gray-500">Overall financial health and stability</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        {(supplier.financialScore * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full bg-gradient-to-r ${getScoreColor(supplier.financialScore)} transition-all duration-1000 ease-out`}
                        style={{ width: `${supplier.financialScore * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Geopolitical Risk */}
                  <div className="group">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-800">Geopolitical Risk</span>
                          <p className="text-xs text-gray-500">Political and regional stability factors</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        {(supplier.geopoliticalRisk * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-1000 ease-out"
                        style={{ width: `${supplier.geopoliticalRisk * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* ESG Compliance */}
                  <div className="group">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-800">ESG Compliance</span>
                          <p className="text-xs text-gray-500">Environmental, social, and governance standards</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        {(supplier.esgCompliance * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000 ease-out"
                        style={{ width: `${supplier.esgCompliance * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Intelligence and Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Recent Intelligence */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-purple-600" />
                Recent Intelligence
              </h3>
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-5 rounded-xl border border-gray-200">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Globe className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">{supplier.recentNews}</p>
                    <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-200">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-500">Last updated {supplier.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-orange-600" />
                Recommended Actions
              </h3>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border-l-4 border-blue-500">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-blue-800 leading-relaxed">{supplier.action}</p>
                    <div className="mt-4 pt-3 border-t border-blue-200">
                      <button className="inline-flex items-center px-3 py-1 bg-blue-500 text-white text-xs rounded-full hover:bg-blue-600 transition-colors">
                        <span>Take Action</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SupplierDetailsPanel;