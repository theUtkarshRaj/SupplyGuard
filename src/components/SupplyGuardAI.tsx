import React from 'react';
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

const SupplyGuardAI: React.FC<SupplyGuardAIProps> = ({ activeTab, setActiveTab, currentTime }) => {
  const [selectedSupplier, setSelectedSupplier] = React.useState<any>(null);

  // const suppliers = [
  //   {
  //     id: 'S001',
  //     name: 'Pacific Electronics Co.',
  //     region: 'Asia-Pacific',
  //     location: 'Taiwan',
  //     riskScore: 0.85,
  //     riskLevel: 'High',
  //     financialScore: 0.7,
  //     geopoliticalRisk: 0.9,
  //     esgCompliance: 0.8,
  //     recentNews: 'Geopolitical tensions affecting shipping routes in Taiwan Strait',
  //     action: 'Diversify sourcing to alternative suppliers in South Korea',
  //     category: 'Electronics',
  //     lastUpdated: '2 hours ago',
  //     trend: 'increasing' as const
  //   },
  //   {
  //     id: 'S002',
  //     name: 'European Textiles Ltd.',
  //     region: 'Europe',
  //     location: 'Romania',
  //     riskScore: 0.65,
  //     riskLevel: 'Medium',
  //     financialScore: 0.5,
  //     geopoliticalRisk: 0.4,
  //     esgCompliance: 0.6,
  //     recentNews: 'Labor compliance violations reported at manufacturing facility',
  //     action: 'Conduct immediate ESG audit and compliance review',
  //     category: 'Textiles',
  //     lastUpdated: '4 hours ago',
  //     trend: 'stable' as const
  //   },
  //   {
  //     id: 'S003',
  //     name: 'African Mining Corp.',
  //     region: 'Africa',
  //     location: 'South Africa',
  //     riskScore: 0.35,
  //     riskLevel: 'Low',
  //     financialScore: 0.9,
  //     geopoliticalRisk: 0.3,
  //     esgCompliance: 0.85,
  //     recentNews: 'Strong Q4 financial results, expanded sustainability initiatives',
  //     action: 'Continue monitoring, consider increasing order volume',
  //     category: 'Raw Materials',
  //     lastUpdated: '1 hour ago',
  //     trend: 'decreasing' as const
  //   },
  //   {
  //     id: 'S004',
  //     name: 'Americas Food Processing',
  //     region: 'Americas',
  //     location: 'Mexico',
  //     riskScore: 0.45,
  //     riskLevel: 'Medium',
  //     financialScore: 0.8,
  //     geopoliticalRisk: 0.2,
  //     esgCompliance: 0.7,
  //     recentNews: 'Climate change affecting crop yields in northern regions',
  //     action: 'Evaluate alternative sourcing regions, monitor weather patterns',
  //     category: 'Food & Beverage',
  //     lastUpdated: '3 hours ago',
  //     trend: 'stable' as const
  //   }
  // ];

  // const riskAlerts = [
  //   {
  //     id: 1,
  //     supplier: 'Pacific Electronics Co.',
  //     type: 'Geopolitical',
  //     severity: 'High',
  //     message: 'Escalating tensions in Taiwan Strait affecting shipping routes',
  //     timestamp: '2 hours ago',
  //     impact: 'Potential 30% delay in electronics shipments'
  //   },
  //   {
  //     id: 2,
  //     supplier: 'European Textiles Ltd.',
  //     type: 'ESG',
  //     severity: 'Medium',
  //     message: 'Labor compliance violations detected through news monitoring',
  //     timestamp: '4 hours ago',
  //     impact: 'Reputational risk, potential regulatory action'
  //   },
  //   {
  //     id: 3,
  //     supplier: 'Americas Food Processing',
  //     type: 'Climate',
  //     severity: 'Medium',
  //     message: 'Drought conditions affecting crop production capacity',
  //     timestamp: '6 hours ago',
  //     impact: 'Possible 15% reduction in food product availability'
  //   }
  // ];

  // const newsUpdates = [
  //   {
  //     id: 1,
  //     headline: 'Taiwan Strait Tensions Rise, Affecting Global Supply Chains',
  //     source: 'Global Trade News',
  //     timestamp: '2 hours ago',
  //     relevantSuppliers: ['S001'],
  //     impact: 'High'
  //   },
  //   {
  //     id: 2,
  //     headline: 'EU Strengthens Labor Compliance Regulations for Textile Industry',
  //     source: 'European Business Daily',
  //     timestamp: '4 hours ago',
  //     relevantSuppliers: ['S002'],
  //     impact: 'Medium'
  //   },
  //   {
  //     id: 3,
  //     headline: 'Climate Change Impacts on Agriculture Intensify in North America',
  //     source: 'Agricultural Times',
  //     timestamp: '6 hours ago',
  //     relevantSuppliers: ['S004'],
  //     impact: 'Medium'
  //   }
  // ];
  const suppliers = [
  {
    id: 'S001',
    name: 'Pacific Electronics Co.',
    region: 'Asia-Pacific',
    location: 'Taiwan',
    riskScore: 0.85,
    riskLevel: 'High',
    financialScore: 0.7,
    geopoliticalRisk: 0.9,
    esgCompliance: 0.8,
    recentNews: 'Geopolitical tensions affecting shipping routes in Taiwan Strait',
    action: 'Diversify sourcing to alternative suppliers in South Korea',
    category: 'Electronics',
    lastUpdated: '2 hours ago',
    trend: 'increasing' as const,
    lat: 23.6978,
    lng: 120.9605,
    predictedRisk: 0.87,
    llmSummary: 'High geopolitical risk due to tensions in Taiwan Strait, potential for supply chain delays.'
  },
  {
    id: 'S002',
    name: 'European Textiles Ltd.',
    region: 'Europe',
    location: 'Romania',
    riskScore: 0.65,
    riskLevel: 'Medium',
    financialScore: 0.5,
    geopoliticalRisk: 0.4,
    esgCompliance: 0.6,
    recentNews: 'Labor compliance violations reported at manufacturing facility',
    action: 'Conduct immediate ESG audit and compliance review',
    category: 'Textiles',
    lastUpdated: '4 hours ago',
    trend: 'stable' as const,
    lat: 45.9432,
    lng: 24.9668,
    predictedRisk: 0.67,
    llmSummary: 'Moderate risk from ESG violations, requiring compliance audit.'
  },
  {
    id: 'S003',
    name: 'African Mining Corp.',
    region: 'Africa',
    location: 'South Africa',
    riskScore: 0.35,
    riskLevel: 'Low',
    financialScore: 0.9,
    geopoliticalRisk: 0.3,
    esgCompliance: 0.85,
    recentNews: 'Strong Q4 financial results, expanded sustainability initiatives',
    action: 'Continue monitoring, consider increasing order volume',
    category: 'Raw Materials',
    lastUpdated: '1 hour ago',
    trend: 'decreasing' as const,
    lat: -30.5595,
    lng: 22.9375,
    predictedRisk: 0.33,
    llmSummary: 'Low risk, stable supplier with strong financials and ESG performance.'
  },
  {
    id: 'S004',
    name: 'Americas Food Processing',
    region: 'Americas',
    location: 'Mexico',
    riskScore: 0.45,
    riskLevel: 'Medium',
    financialScore: 0.8,
    geopoliticalRisk: 0.2,
    esgCompliance: 0.7,
    recentNews: 'Climate change affecting crop yields in northern regions',
    action: 'Evaluate alternative sourcing regions, monitor weather patterns',
    category: 'Food & Beverage',
    lastUpdated: '3 hours ago',
    trend: 'stable' as const,
    lat: 23.6345,
    lng: -102.5528,
    predictedRisk: 0.47,
    llmSummary: 'Moderate climate risk impacting crop yields, consider alternative sourcing.'
  },
  {
    id: 'S005',
    name: 'Global Pharma Ltd.',
    region: 'Asia-Pacific',
    location: 'India',
    riskScore: 0.60,
    riskLevel: 'Medium',
    financialScore: 0.65,
    geopoliticalRisk: 0.5,
    esgCompliance: 0.75,
    recentNews: 'Regulatory changes in pharmaceutical exports announced',
    action: 'Review compliance with new export regulations',
    category: 'Pharmaceuticals',
    lastUpdated: '5 hours ago',
    trend: 'increasing' as const,
    lat: 20.5937,
    lng: 78.9629,
    predictedRisk: 0.62,
    llmSummary: 'Moderate risk due to regulatory changes, compliance review needed.'
  },
  {
    id: 'S006',
    name: 'South American Apparel',
    region: 'Americas',
    location: 'Brazil',
    riskScore: 0.55,
    riskLevel: 'Medium',
    financialScore: 0.6,
    geopoliticalRisk: 0.3,
    esgCompliance: 0.65,
    recentNews: 'Deforestation concerns linked to supply chain operations',
    action: 'Audit environmental practices, source from certified suppliers',
    category: 'Apparel',
    lastUpdated: '6 hours ago',
    trend: 'stable' as const,
    lat: -14.2350,
    lng: -51.9253,
    predictedRisk: 0.57,
    llmSummary: 'Moderate ESG risk from deforestation, environmental audit recommended.'
  },
  {
    id: 'S007',
    name: 'Nordic Packaging Co.',
    region: 'Europe',
    location: 'Sweden',
    riskScore: 0.30,
    riskLevel: 'Low',
    financialScore: 0.85,
    geopoliticalRisk: 0.2,
    esgCompliance: 0.9,
    recentNews: 'New eco-friendly packaging innovations launched',
    action: 'Explore partnership for sustainable packaging solutions',
    category: 'Packaging',
    lastUpdated: '2 hours ago',
    trend: 'decreasing' as const,
    lat: 60.1282,
    lng: 18.6435,
    predictedRisk: 0.28,
    llmSummary: 'Low risk, strong ESG performance with sustainable innovations.'
  },
  {
    id: 'S008',
    name: 'East Asia Chemicals',
    region: 'Asia-Pacific',
    location: 'China',
    riskScore: 0.75,
    riskLevel: 'High',
    financialScore: 0.6,
    geopoliticalRisk: 0.85,
    esgCompliance: 0.7,
    recentNews: 'Trade restrictions impacting chemical exports',
    action: 'Identify alternative chemical suppliers in Southeast Asia',
    category: 'Chemicals',
    lastUpdated: '3 hours ago',
    trend: 'increasing' as const,
    lat: 35.8617,
    lng: 104.1954,
    predictedRisk: 0.78,
    llmSummary: 'High geopolitical risk from trade restrictions, diversify suppliers.'
  },
  {
    id: 'S009',
    name: 'Middle East Logistics',
    region: 'Middle East',
    location: 'United Arab Emirates',
    riskScore: 0.50,
    riskLevel: 'Medium',
    financialScore: 0.75,
    geopoliticalRisk: 0.6,
    esgCompliance: 0.8,
    recentNews: 'Port congestion reported in Dubai',
    action: 'Optimize logistics routes, monitor port operations',
    category: 'Logistics',
    lastUpdated: '4 hours ago',
    trend: 'stable' as const,
    lat: 23.4241,
    lng: 53.8478,
    predictedRisk: 0.52,
    llmSummary: 'Moderate risk from port congestion, optimize logistics planning.'
  },
  {
    id: 'S010',
    name: 'Australian Agri Co.',
    region: 'Oceania',
    location: 'Australia',
    riskScore: 0.40,
    riskLevel: 'Low',
    financialScore: 0.8,
    geopoliticalRisk: 0.2,
    esgCompliance: 0.85,
    recentNews: 'Stable agricultural output with strong sustainability practices',
    action: 'Maintain current sourcing, explore expansion',
    category: 'Agriculture',
    lastUpdated: '1 hour ago',
    trend: 'decreasing' as const,
    lat: -25.2744,
    lng: 133.7751,
    predictedRisk: 0.38,
    llmSummary: 'Low risk, reliable supplier with strong ESG and financial performance.'
  }
];
const riskAlerts = [
  {
    id: 1,
    supplier: 'Pacific Electronics Co.',
    type: 'Geopolitical',
    severity: 'High',
    message: 'Escalating tensions in Taiwan Strait affecting shipping routes',
    timestamp: '2 hours ago',
    impact: 'Potential 30% delay in electronics shipments'
  },
  {
    id: 2,
    supplier: 'European Textiles Ltd.',
    type: 'ESG',
    severity: 'Medium',
    message: 'Labor compliance violations detected through news monitoring',
    timestamp: '4 hours ago',
    impact: 'Reputational risk, potential regulatory action'
  },
  {
    id: 3,
    supplier: 'Americas Food Processing',
    type: 'Climate',
    severity: 'Medium',
    message: 'Drought conditions affecting crop production capacity',
    timestamp: '6 hours ago',
    impact: 'Possible 15% reduction in food product availability'
  },
  {
    id: 4,
    supplier: 'Global Pharma Ltd.',
    type: 'Regulatory',
    severity: 'Medium',
    message: 'New export regulations impacting pharmaceutical shipments',
    timestamp: '5 hours ago',
    impact: 'Potential delays in medical supply chain'
  },
  {
    id: 5,
    supplier: 'South American Apparel',
    type: 'ESG',
    severity: 'Medium',
    message: 'Deforestation concerns raised in supply chain operations',
    timestamp: '6 hours ago',
    impact: 'Reputational and regulatory risks'
  },
  {
    id: 6,
    supplier: 'East Asia Chemicals',
    type: 'Geopolitical',
    severity: 'High',
    message: 'Trade restrictions disrupting chemical exports',
    timestamp: '3 hours ago',
    impact: 'Potential 25% reduction in chemical supply'
  },
  {
    id: 7,
    supplier: 'Middle East Logistics',
    type: 'Operational',
    severity: 'Medium',
    message: 'Port congestion reported in Dubai affecting logistics',
    timestamp: '4 hours ago',
    impact: 'Possible delays in delivery schedules'
  },
  {
    id: 8,
    supplier: 'Nordic Packaging Co.',
    type: 'Positive',
    severity: 'Low',
    message: 'New eco-friendly packaging solutions implemented',
    timestamp: '2 hours ago',
    impact: 'Positive impact on sustainability goals'
  }
];
const newsUpdates = [
  {
    id: 1,
    headline: 'Taiwan Strait Tensions Rise, Affecting Global Supply Chains',
    source: 'Global Trade News',
    timestamp: '2 hours ago',
    relevantSuppliers: ['S001'],
    impact: 'High',
    date: '2025-07-13T03:02:00Z'
  },
  {
    id: 2,
    headline: 'EU Strengthens Labor Compliance Regulations for Textile Industry',
    source: 'European Business Daily',
    timestamp: '4 hours ago',
    relevantSuppliers: ['S002'],
    impact: 'Medium',
    date: '2025-07-13T01:02:00Z'
  },
  {
    id: 3,
    headline: 'Climate Change Impacts on Agriculture Intensify in North America',
    source: 'Agricultural Times',
    timestamp: '6 hours ago',
    relevantSuppliers: ['S004'],
    impact: 'Medium',
    date: '2025-07-12T23:02:00Z'
  },
  {
    id: 4,
    headline: 'India Announces New Pharmaceutical Export Regulations',
    source: 'Pharma Journal',
    timestamp: '5 hours ago',
    relevantSuppliers: ['S005'],
    impact: 'Medium',
    date: '2025-07-13T00:02:00Z'
  },
  {
    id: 5,
    headline: 'Brazil Faces Scrutiny Over Deforestation in Apparel Supply Chains',
    source: 'Environmental Watch',
    timestamp: '6 hours ago',
    relevantSuppliers: ['S006'],
    impact: 'Medium',
    date: '2025-07-12T23:02:00Z'
  },
  {
    id: 6,
    headline: 'China Imposes New Trade Restrictions on Chemical Exports',
    source: 'Trade Weekly',
    timestamp: '3 hours ago',
    relevantSuppliers: ['S008'],
    impact: 'High',
    date: '2025-07-13T02:02:00Z'
  },
  {
    id: 7,
    headline: 'Dubai Port Congestion Disrupts Middle East Logistics',
    source: 'Logistics Today',
    timestamp: '4 hours ago',
    relevantSuppliers: ['S009'],
    impact: 'Medium',
    date: '2025-07-13T01:02:00Z'
  },
  {
    id: 8,
    headline: 'Sweden Leads in Sustainable Packaging Innovations',
    source: 'Sustainability News',
    timestamp: '2 hours ago',
    relevantSuppliers: ['S007'],
    impact: 'Low',
    date: '2025-07-13T03:02:00Z'
  }
];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header currentTime={currentTime} />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedSupplier ? (
          <SupplierDetailsPanel supplier={selectedSupplier} onClose={() => setSelectedSupplier(null)} />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <div>
                <DashboardOverview />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <AlertsDisplay riskAlerts={riskAlerts} />
                  <NewsFeed newsUpdates={newsUpdates} />
                </div>
              </div>
            )}
            {activeTab === 'suppliers' && (
              <SupplierTable suppliers={suppliers} setSelectedSupplier={setSelectedSupplier} />
            )}
            {activeTab === 'alerts' && <AlertsDisplay riskAlerts={riskAlerts} />}
            {activeTab === 'news' && <NewsFeed newsUpdates={newsUpdates} />}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SupplyGuardAI;
