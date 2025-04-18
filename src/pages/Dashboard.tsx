import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

// Mock data - in a real application, this would come from your API
const mockScheduledContent = [
  { id: 1, title: 'Social Media Strategy 2025', platform: 'LinkedIn', scheduledFor: '2025-04-20T14:00:00Z' },
  { id: 2, title: 'Product Launch Announcement', platform: 'Twitter', scheduledFor: '2025-04-18T16:30:00Z' },
  { id: 3, title: 'Weekly Tips and Tricks', platform: 'Instagram', scheduledFor: '2025-04-17T12:00:00Z' }
];

const mockActivityData = [
  { id: 1, action: 'Content published', title: 'Content Marketing Basics', user: 'You', timestamp: '2025-04-16T10:23:00Z' },
  { id: 2, action: 'Content scheduled', title: 'Product Launch Announcement', user: 'Jane Smith', timestamp: '2025-04-16T09:45:00Z' },
  { id: 3, action: 'Content edited', title: 'Weekly Tips and Tricks', user: 'You', timestamp: '2025-04-15T16:30:00Z' }
];

const Dashboard: React.FC = () => {
  const [upcomingContent] = useState(mockScheduledContent);
  const [recentActivity] = useState(mockActivityData);

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-bold text-gray-700 mb-2">Scheduled Content</h2>
            <p className="text-3xl font-bold">{upcomingContent.length}</p>
            <p className="text-sm text-gray-500 mt-1">items scheduled</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-bold text-gray-700 mb-2">Content Library</h2>
            <p className="text-3xl font-bold">24</p>
            <p className="text-sm text-gray-500 mt-1">pieces of content</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-bold text-gray-700 mb-2">Analytics</h2>
            <p className="text-3xl font-bold">+12%</p>
            <p className="text-sm text-gray-500 mt-1">engagement this week</p>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-lg text-gray-800">Upcoming Content</h2>
                <Link 
                  to="/scheduler" 
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                >
                  View Calendar
                </Link>
              </div>
              <div className="divide-y divide-gray-200">
                {upcomingContent.map(content => (
                  <div key={content.id} className="px-6 py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{content.title}</h3>
                        <p className="text-sm text-gray-500">{content.platform}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(content.scheduledFor)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                <Link to="/content-library" className="text-sm font-medium text-primary-600 hover:text-primary-800">
                  Create New Content
                </Link>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div>
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-semibold text-lg text-gray-800">Recent Activity</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="px-6 py-4">
                    <p className="font-medium text-sm text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-800 mt-1">{activity.title}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-500">{activity.user}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;