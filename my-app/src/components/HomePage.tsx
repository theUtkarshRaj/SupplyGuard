import React, { useEffect, useState } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import DashboardOverview from './DashboardOverview';
import SupplierTable from './SupplierTable';
import AlertsDisplay from './AlertDisplay';
import NewsFeed from './NewsFeed';
import SupplierDetailsPanel from './SupplierDetailsPanel';
import Footer from './Footer';

interface SupplyGuardAIProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentTime: Date;
}

const HomePage: React.FC<SupplyGuardAIProps> = ({ activeTab, setActiveTab, currentTime }) => {
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [riskAlerts, setRiskAlerts] = useState<any[]>([]);
  const [newsUpdates, setNewsUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [supplierRes, alertRes, newsRes] = await Promise.all([
          fetch('http://localhost:8000/api/suppliers'),
          fetch('http://localhost:8000/api/alerts'),
          fetch('http://localhost:8000/api/news')
        ]);

        const supplierData = await supplierRes.json();
        const alertData = await alertRes.json();
        const newsData = await newsRes.json();

        setSuppliers(supplierData);
        setRiskAlerts(alertData);
        setNewsUpdates(newsData);
      } catch (error) {
        console.error('Failed to fetch backend data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // ======= RENDER HELPERS ========= //

  const renderDashboard = () => (
    <>
      <DashboardOverview suppliers={suppliers} alerts={riskAlerts} />
      {/* Toggleable Tabs for compactness */}
      <div className="mt-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between px-4 pt-4">
            <h3 className="text-lg font-semibold text-gray-800">Live Insights</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('alerts')}
                className="px-4 py-1 rounded-full text-sm bg-red-100 text-red-600 hover:bg-red-200 transition"
              >
                Risk Alerts
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className="px-4 py-1 rounded-full text-sm bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
              >
                News Feed
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 pb-6 pt-4">
            <AlertsDisplay riskAlerts={riskAlerts.slice(0, 5)} />
            <NewsFeed newsUpdates={newsUpdates.slice(0, 5)} />
          </div>
        </div>
      </div>
    </>
  );

  const renderSuppliers = () => (
    <SupplierTable suppliers={suppliers} setSelectedSupplier={setSelectedSupplier} />
  );

  const renderAlerts = () => <AlertsDisplay riskAlerts={riskAlerts} />;

  const renderNews = () => <NewsFeed newsUpdates={newsUpdates} />;

  // ======= LOADING STATE ======== //

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-gray-700 text-lg font-semibold animate-pulse">Loading SupplyGuard AI data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header currentTime={currentTime} />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedSupplier ? (
          <SupplierDetailsPanel supplier={selectedSupplier} onClose={() => setSelectedSupplier(null)} />
        ) : (
          <>
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'suppliers' && renderSuppliers()}
            {activeTab === 'alerts' && renderAlerts()}
            {activeTab === 'news' && renderNews()}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
