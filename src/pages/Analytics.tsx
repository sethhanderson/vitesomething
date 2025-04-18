import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import PerformanceChart from '../components/analytics/PerformanceChart';
import { OverallAnalytics } from '../types';
// analyticsAPI is commented out as we're using mock data for now
// import { analyticsAPI } from '../services/api';

// Mock data for development
const mockAnalyticsData: OverallAnalytics = {
  totalContentCount: 32,
  totalImpressions: 58900,
  totalEngagements: 4730,
  engagementRate: 8.03,
  platformBreakdown: {
    'instagram': {
      platform: 'Instagram',
      contentCount: 12,
      impressions: 22400,
      engagements: 2150,
      engagementRate: 9.6
    },
    'twitter': {
      platform: 'Twitter',
      contentCount: 8,
      impressions: 14500,
      engagements: 1180,
      engagementRate: 8.14
    },
    'linkedin': {
      platform: 'LinkedIn',
      contentCount: 7,
      impressions: 12000,
      engagements: 850,
      engagementRate: 7.08
    },
    'facebook': {
      platform: 'Facebook',
      contentCount: 5,
      impressions: 10000,
      engagements: 550,
      engagementRate: 5.5
    }
  },
  contentTypeBreakdown: {
    'post': 15,
    'image': 8,
    'video': 5,
    'article': 4,
    'story': 0,
    'reel': 0
  },
  timePerformance: [
    { date: '2025-04-10', impressions: 5200, engagements: 430, posts: 2 },
    { date: '2025-04-11', impressions: 4800, engagements: 380, posts: 2 },
    { date: '2025-04-12', impressions: 5800, engagements: 470, posts: 3 },
    { date: '2025-04-13', impressions: 6200, engagements: 510, posts: 2 },
    { date: '2025-04-14', impressions: 7500, engagements: 620, posts: 3 },
    { date: '2025-04-15', impressions: 8900, engagements: 730, posts: 4 },
    { date: '2025-04-16', impressions: 9800, engagements: 840, posts: 4 },
    { date: '2025-04-17', impressions: 10700, engagements: 750, posts: 4 }
  ]
};

const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<OverallAnalytics | null>(null);
  const [dateRange, setDateRange] = useState<'7days' | '30days' | '90days'>('7days');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would fetch from the API with date range
      // const startDate = getStartDateFromRange(dateRange);
      // const response = await analyticsAPI.getOverallAnalytics({
      //   startDate: startDate.toISOString(),
      //   endDate: new Date().toISOString()
      // });
      // setAnalytics(response.data);
      
      // For development, using mock data
      // In a real implementation, you would filter data based on dateRange
      setTimeout(() => {
        setAnalytics(mockAnalyticsData);
        setIsLoading(false);
      }, 800); // Simulate loading delay
      
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
      setError('Failed to load analytics data. Please try again.');
      setIsLoading(false);
    }
  };

  // Format large numbers with comma separators
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  // Calculate percentage changes (mock data for demo)
  const getChangePercentage = (metric: 'impressions' | 'engagements' | 'rate') => {
    switch(metric) {
      case 'impressions': return 12.8;
      case 'engagements': return 8.5;
      case 'rate': return -2.1;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setDateRange('7days')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                dateRange === '7days' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setDateRange('30days')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                dateRange === '30days' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setDateRange('90days')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                dateRange === '90days' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Last 90 Days
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-200 border-t-primary-600"></div>
            <p className="mt-2 text-gray-600">Loading analytics data...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-red-600">
            {error}
            <button 
              onClick={fetchAnalyticsData}
              className="block mx-auto mt-2 text-primary-600 hover:text-primary-800"
            >
              Try Again
            </button>
          </div>
        ) : analytics ? (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Impressions */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-medium text-gray-500">TOTAL IMPRESSIONS</h2>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    getChangePercentage('impressions') > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {getChangePercentage('impressions') > 0 ? '+' : ''}
                    {getChangePercentage('impressions')}%
                  </span>
                </div>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-gray-900">{formatNumber(analytics.totalImpressions)}</p>
                  <p className="ml-2 text-sm text-gray-500">views</p>
                </div>
              </div>
              
              {/* Engagements */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-medium text-gray-500">TOTAL ENGAGEMENTS</h2>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    getChangePercentage('engagements') > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {getChangePercentage('engagements') > 0 ? '+' : ''}
                    {getChangePercentage('engagements')}%
                  </span>
                </div>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-gray-900">{formatNumber(analytics.totalEngagements)}</p>
                  <p className="ml-2 text-sm text-gray-500">interactions</p>
                </div>
              </div>
              
              {/* Engagement Rate */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-medium text-gray-500">ENGAGEMENT RATE</h2>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    getChangePercentage('rate') > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {getChangePercentage('rate') > 0 ? '+' : ''}
                    {getChangePercentage('rate')}%
                  </span>
                </div>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-gray-900">{analytics.engagementRate.toFixed(2)}%</p>
                  <p className="ml-2 text-sm text-gray-500">avg. rate</p>
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Performance Over Time</h2>
              <div className="h-80">
                <PerformanceChart data={analytics.timePerformance} />
              </div>
            </div>

            {/* Platform Breakdown */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Platform Performance</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                      <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                      <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Impressions</th>
                      <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Engagements</th>
                      <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Eng. Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(analytics.platformBreakdown).map(([key, platform]) => (
                      <tr key={key}>
                        <td className="py-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 mr-3 bg-gray-200 rounded-full flex items-center justify-center">
                              {platform.platform.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-900">{platform.platform}</span>
                          </div>
                        </td>
                        <td className="py-4 text-right text-gray-500">{platform.contentCount}</td>
                        <td className="py-4 text-right text-gray-500">{formatNumber(platform.impressions)}</td>
                        <td className="py-4 text-right text-gray-500">{formatNumber(platform.engagements)}</td>
                        <td className="py-4 text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            platform.engagementRate > analytics.engagementRate
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {platform.engagementRate.toFixed(2)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Content Type Breakdown */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Content Type Distribution</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {Object.entries(analytics.contentTypeBreakdown).map(([type, count]) => {
                  // Skip content types with no content
                  if (count === 0) return null;
                  
                  const percentage = Math.round((count / analytics.totalContentCount) * 100);
                  return (
                    <div key={type} className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="mb-2">
                        <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                          {type.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 capitalize">{type}</h3>
                      <div className="mt-1 flex items-baseline justify-center">
                        <span className="text-2xl font-semibold text-gray-900">{count}</span>
                        <span className="ml-1 text-sm text-gray-500">({percentage}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Analytics;