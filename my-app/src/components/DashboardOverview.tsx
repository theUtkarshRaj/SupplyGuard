import React from 'react';
import { AlertTriangle, Shield, CheckCircle, Activity, TrendingUp, TrendingDown } from 'lucide-react';

interface Supplier {
  riskLevel: string;
}

interface Alert {
  severity: string;
}

interface DashboardOverviewProps {
  suppliers: Supplier[];
  alerts: Alert[];
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ suppliers, alerts }) => {
  const highRisk = suppliers.filter(s => s.riskLevel === 'High').length;
  const mediumRisk = suppliers.filter(s => s.riskLevel === 'Medium').length;
  const lowRisk = suppliers.filter(s => s.riskLevel === 'Low').length;
  const activeAlerts = alerts.length;
  const totalSuppliers = suppliers.length;

  const cards = [
    {
      title: 'High Risk Suppliers',
      value: highRisk,
      percentage: totalSuppliers > 0 ? ((highRisk / totalSuppliers) * 100).toFixed(1) : '0',
      icon: AlertTriangle,
      color: 'red',
      bgGradient: 'from-red-500 to-red-600',
      trend: 'up',
      change: '+2.3%'
    },
    {
      title: 'Medium Risk Suppliers',
      value: mediumRisk,
      percentage: totalSuppliers > 0 ? ((mediumRisk / totalSuppliers) * 100).toFixed(1) : '0',
      icon: Shield,
      color: 'yellow',
      bgGradient: 'from-yellow-500 to-orange-500',
      trend: 'down',
      change: '-1.2%'
    },
    {
      title: 'Low Risk Suppliers',
      value: lowRisk,
      percentage: totalSuppliers > 0 ? ((lowRisk / totalSuppliers) * 100).toFixed(1) : '0',
      icon: CheckCircle,
      color: 'green',
      bgGradient: 'from-green-500 to-emerald-600',
      trend: 'up',
      change: '+4.1%'
    },
    {
      title: 'Active Alerts',
      value: activeAlerts,
      percentage: '24h',
      icon: Activity,
      color: 'blue',
      bgGradient: 'from-blue-500 to-indigo-600',
      trend: 'up',
      change: '+7 new'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const TrendIcon = card.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <div key={index} className="group relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br opacity-5 from-gray-50 to-gray-100"></div>
            
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${card.bgGradient} shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-xs font-medium ${
                  card.trend === 'up' ? 'text-red-600' : 'text-green-600'
                }`}>
                  <TrendIcon className="w-3 h-3" />
                  <span>{card.change}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <div className="flex items-baseline space-x-2">
                  <p className={`text-3xl font-bold ${
                    card.color === 'red' ? 'text-red-600' :
                    card.color === 'yellow' ? 'text-orange-600' :
                    card.color === 'green' ? 'text-green-600' :
                    'text-blue-600'
                  }`}>
                    {card.value}
                  </p>
                  <span className="text-sm text-gray-500">
                    {card.title === 'Active Alerts' ? card.percentage : `${card.percentage}%`}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${card.bgGradient} transition-all duration-500`}
                  style={{ 
                    width: card.title === 'Active Alerts' 
                      ? `${Math.min(activeAlerts * 10, 100)}%` 
                      : `${card.percentage}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardOverview;