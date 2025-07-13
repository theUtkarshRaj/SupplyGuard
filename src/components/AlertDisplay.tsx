import React from 'react';
import { Alert, AlertDescription } from "./alert";
import { AlertTriangle } from 'lucide-react';

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
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'border-red-500 bg-red-50';
      case 'Medium': return 'border-yellow-500 bg-yellow-50';
      case 'Low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getRiskColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Real-time Risk Alerts</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {riskAlerts.map((alert) => (
            <Alert key={alert.id} className={`border-l-4 ${getSeverityColor(alert.severity)}`}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-900">{alert.supplier}</div>
                    <div className="text-sm text-gray-600 mt-1">{alert.message}</div>
                    <div className="text-sm text-gray-500 mt-2">Impact: {alert.impact}</div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">{alert.timestamp}</div>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertsDisplay;