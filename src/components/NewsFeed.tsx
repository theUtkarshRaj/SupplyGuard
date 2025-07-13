import React from 'react';

interface NewsUpdate {
  id: number;
  headline: string;
  source: string;
  timestamp: string;
  relevantSuppliers: string[];
  impact: string;
}

interface NewsFeedProps {
  newsUpdates: NewsUpdate[];
}

const NewsFeed: React.FC<NewsFeedProps> = ({ newsUpdates }) => {
  const getRiskColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Global News Monitoring</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {newsUpdates.map((news) => (
            <div key={news.id} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{news.headline}</h4>
                  <p className="text-sm text-gray-600 mt-1">Source: {news.source}</p>
                  <div className="text-sm text-gray-500 mt-2">
                    Relevant Suppliers: {news.relevantSuppliers.join(', ')}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(news.impact)}`}>
                    {news.impact} Impact
                  </span>
                  <div className="text-xs text-gray-500 mt-1">{news.timestamp}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;