import React, { useState } from 'react';
import {
  Globe, ExternalLink, Clock, Filter,
  Building, Search, Bookmark, Share2
} from 'lucide-react';

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
  const [selectedImpact, setSelectedImpact] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const getRiskColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-700 bg-red-100 border-red-200';
      case 'Medium': return 'text-amber-700 bg-amber-100 border-amber-200';
      case 'Low': return 'text-green-700 bg-green-100 border-green-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getBorderColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'border-red-400';
      case 'Medium': return 'border-amber-400';
      case 'Low': return 'border-green-400';
      default: return 'border-gray-300';
    }
  };

  const filteredNews = newsUpdates
    .filter(news =>
      selectedImpact === 'All' || news.impact === selectedImpact
    )
    .filter(news =>
      searchTerm === '' ||
      news.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.relevantSuppliers.some(supplier =>
        supplier.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  const impactLevels = ['All', 'High', 'Medium', 'Low'];
  const getImpactCount = (impact: string) =>
    impact === 'All'
      ? newsUpdates.length
      : newsUpdates.filter(news => news.impact === impact).length;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 leading-tight">Global News Monitoring</h2>
              <p className="text-sm text-gray-500">{filteredNews.length} live updates available</p>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search news..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            {impactLevels.map(level => (
              <button
                key={level}
                onClick={() => setSelectedImpact(level)}
                className={`px-3 py-1 text-sm rounded-full border ${
                  selectedImpact === level
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-gray-300'
                }`}
              >
                {level} ({getImpactCount(level)})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News List */}
      <div className="p-6">
        {filteredNews.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <Globe className="w-12 h-12 mx-auto mb-3" />
            <p className="text-lg font-semibold">No news found</p>
            <p className="text-sm">Try changing your filters or search query.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNews.map(news => (
              <div
                key={news.id}
                className={`border-l-4 ${getBorderColor(news.impact)} bg-white hover:bg-gray-50 transition rounded-md p-4 shadow-sm`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <h4 className="text-md font-semibold text-gray-800 mb-2">
                      {news.headline}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500 gap-4">
                      <div className="flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        <span>{news.source}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{news.timestamp}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center text-sm text-gray-600 gap-2 mb-1">
                        <Building className="w-4 h-4" />
                        Affected Suppliers:
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {news.relevantSuppliers.map((supplier, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
                          >
                            {supplier}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full border ${getRiskColor(news.impact)}`}
                    >
                      {news.impact} Impact
                    </span>
                    <div className="flex gap-2 text-gray-400">
                      <button className="hover:text-blue-500">
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button className="hover:text-green-500">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600 flex justify-between items-center">
        <span>Last updated: {new Date().toLocaleTimeString()}</span>
        <span className="flex items-center gap-1">
          Auto-refresh: 2min <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </span>
      </div>
    </div>
  );
};

export default NewsFeed;
