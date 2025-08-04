import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, MapPin, Building, Search, Filter, MoreHorizontal, Eye, Calendar, ArrowUpDown } from 'lucide-react';

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

interface SupplierTableProps {
  suppliers: Supplier[];
  setSelectedSupplier: (supplier: Supplier) => void;
}

const SupplierTable: React.FC<SupplierTableProps> = ({ suppliers, setSelectedSupplier }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Supplier>('riskScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('All');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High': return 'text-red-700 bg-red-100 border-red-200';
      case 'Medium': return 'text-amber-700 bg-amber-100 border-amber-200';
      case 'Low': return 'text-emerald-700 bg-emerald-100 border-emerald-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score > 0.7) return 'bg-gradient-to-r from-red-500 to-red-600';
    if (score > 0.5) return 'bg-gradient-to-r from-amber-500 to-amber-600';
    return 'bg-gradient-to-r from-emerald-500 to-emerald-600';
  };

  const getTrendIcon = (trend: 'increasing' | 'decreasing' | 'stable') => {
    switch (trend) {
      case 'increasing': 
        return (
          <div className="flex items-center space-x-1 text-red-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-medium">Rising</span>
          </div>
        );
      case 'decreasing': 
        return (
          <div className="flex items-center space-x-1 text-emerald-600">
            <TrendingDown className="w-4 h-4" />
            <span className="text-xs font-medium">Falling</span>
          </div>
        );
      default: 
        return (
          <div className="flex items-center space-x-1 text-gray-600">
            <Minus className="w-4 h-4" />
            <span className="text-xs font-medium">Stable</span>
          </div>
        );
    }
  };

  const handleSort = (field: keyof Supplier) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedSuppliers = suppliers
    .filter(supplier => 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.region.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(supplier => selectedRiskLevel === 'All' || supplier.riskLevel === selectedRiskLevel)
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * multiplier;
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * multiplier;
      }
      return 0;
    });

  const riskLevels = ['All', 'High', 'Medium', 'Low'];
  const getRiskLevelCount = (level: string) => {
    if (level === 'All') return suppliers.length;
    return suppliers.filter(s => s.riskLevel === level).length;
  };

  const SortableHeader = ({ field, children }: { field: keyof Supplier; children: React.ReactNode }) => (
    <th 
      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors group"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-2">
        <span>{children}</span>
        <ArrowUpDown className="w-3 h-3 text-gray-400 group-hover:text-gray-600" />
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Supplier Risk Overview</h3>
              <p className="text-sm text-gray-600">{filteredAndSortedSuppliers.length} of {suppliers.length} suppliers</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 font-medium">Live Data</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"

            />
          </div>

          {/* Risk Level Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <div className="flex space-x-1">
              {riskLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedRiskLevel(level)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    selectedRiskLevel === level
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {level} ({getRiskLevelCount(level)})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <SortableHeader field="name">Supplier</SortableHeader>
              <SortableHeader field="region">Region</SortableHeader>
              <SortableHeader field="riskScore">Risk Score</SortableHeader>
              <SortableHeader field="riskLevel">Risk Level</SortableHeader>
              <SortableHeader field="trend">Trend</SortableHeader>
              <SortableHeader field="lastUpdated">Last Updated</SortableHeader>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredAndSortedSuppliers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <Building className="w-12 h-12 text-gray-300" />
                    <p className="text-gray-500 font-medium">No suppliers found</p>
                    <p className="text-sm text-gray-400">Try adjusting your search or filter criteria</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredAndSortedSuppliers.map((supplier) => (
                <tr 
                  key={supplier.id} 
                  className={`hover:bg-gray-50 transition-colors duration-150 ${
                    hoveredRow === supplier.id ? 'bg-blue-50' : ''
                  }`}
                  onMouseEnter={() => setHoveredRow(supplier.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {supplier.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{supplier.name}</div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{supplier.location}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{supplier.region}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-gray-900">
                            {(supplier.riskScore * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getRiskScoreColor(supplier.riskScore)}`}
                            style={{ width: `${supplier.riskScore * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getRiskColor(supplier.riskLevel)}`}>
                      {supplier.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTrendIcon(supplier.trend)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{supplier.lastUpdated}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedSupplier(supplier)}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>Showing {filteredAndSortedSuppliers.length} suppliers</span>
            <span>•</span>
            <span>Last sync: {new Date().toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Auto-refresh: 5min</span>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierTable;