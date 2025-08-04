import React, { useState } from 'react';
import { Alert, AlertDescription } from './alert';
import {
  AlertTriangle, Clock, X, Filter, TrendingUp,
  Building, AlertCircle, CheckCircle
} from 'lucide-react';

interface RiskAlert {
  id: number;
  supplier: string;
  type: string;
  severity: string;
  message: string;
  timestamp: string;
  impact: string;
}

interface AlertsDisplayProps {
  riskAlerts: RiskAlert[];
}

const AlertsDisplay: React.FC<AlertsDisplayProps> = ({ riskAlerts }) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<number>>(new Set());
  const [hoveredAlert, setHoveredAlert] = useState<number | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'border-rose-500 bg-gradient-to-r from-rose-50 to-rose-100';
      case 'Medium': return 'border-amber-500 bg-gradient-to-r from-amber-50 to-amber-100';
      case 'Low': return 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-emerald-100';
      default: return 'border-slate-400 bg-gradient-to-r from-slate-50 to-slate-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'High': return <AlertTriangle className="w-5 h-5 text-rose-600" />;
      case 'Medium': return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case 'Low': return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      default: return <AlertTriangle className="w-5 h-5 text-slate-600" />;
    }
  };

  const getRiskColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-rose-700 bg-rose-100 border-rose-200';
      case 'Medium': return 'text-amber-700 bg-amber-100 border-amber-200';
      case 'Low': return 'text-emerald-700 bg-emerald-100 border-emerald-200';
      default: return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  const getAlertTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'financial': return '💰';
      case 'operational': return '⚙️';
      case 'regulatory': return '📋';
      case 'supply chain': return '🔗';
      default: return '⚠️';
    }
  };

  const filteredAlerts = riskAlerts.filter(alert =>
    !dismissedAlerts.has(alert.id) &&
    (selectedSeverity === 'All' || alert.severity === selectedSeverity)
  );

  const dismissAlert = (alertId: number) => {
    setDismissedAlerts(prev => new Set(prev).add(alertId));
  };

  const severityLevels = ['All', 'High', 'Medium', 'Low'];

  const getSeverityCount = (severity: string) => {
    if (severity === 'All') return riskAlerts.filter(alert => !dismissedAlerts.has(alert.id)).length;
    return riskAlerts.filter(alert => alert.severity === severity && !dismissedAlerts.has(alert.id)).length;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-rose-50 via-amber-50 to-yellow-50 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-rose-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Real-time Risk Alerts</h3>
              <p className="text-sm text-slate-600">
                {filteredAlerts.length} active alerts • Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* Live Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-600 font-medium">Live</span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-2 mt-4">
          <Filter className="w-4 h-4 text-slate-500" />
          <div className="flex space-x-1">
            {severityLevels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedSeverity(level)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 flex items-center space-x-1 ${
                  selectedSeverity === level
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-300'
                }`}
              >
                <span>{level}</span>
                <span className="ml-1 text-xs opacity-75">({getSeverityCount(level)})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="p-6">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-emerald-400" />
            <h4 className="text-lg font-medium text-slate-900 mb-2">All Clear!</h4>
            <p className="text-slate-600">No active alerts match your filter criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                onMouseEnter={() => setHoveredAlert(alert.id)}
                onMouseLeave={() => setHoveredAlert(null)}
                className={`group relative transition-all duration-300 ease-in-out ${
                  hoveredAlert === alert.id ? 'transform scale-[1.02] shadow-lg' : ''
                }`}
              >
                <Alert className={`border-l-4 ${getSeverityColor(alert.severity)} border border-slate-200 transition-all duration-200`}>
                  <div className="flex items-start space-x-3">
                    {getSeverityIcon(alert.severity)}
                    <AlertDescription className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 pr-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Building className="w-4 h-4 text-slate-500" />
                            <span className="font-bold text-slate-900 text-lg">{alert.supplier}</span>
                            <span className="text-lg">{getAlertTypeIcon(alert.type)}</span>
                            <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                              {alert.type}
                            </span>
                          </div>
                          <div className="mb-3">
                            <p className="text-slate-800 leading-relaxed">{alert.message}</p>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-slate-600">
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-3 h-3" />
                              <span className="font-medium">Impact: {alert.impact}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{alert.timestamp}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                          <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getRiskColor(alert.severity)}`}>
                            {alert.severity}
                          </span>
                          <button
                            onClick={() => dismissAlert(alert.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors duration-200"
                            title="Dismiss alert"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </AlertDescription>
                  </div>

                  {alert.severity === 'High' && (
                    <div className="absolute inset-0 bg-rose-500 opacity-10 rounded-lg pointer-events-none"></div>
                  )}
                </Alert>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <div className="flex items-center space-x-4">
            <span>Monitoring {riskAlerts.length} suppliers</span>
            <span>•</span>
            <span>{dismissedAlerts.size} dismissed</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Auto-refresh: 30s</span>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsDisplay;
