import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import ContentForm from '../components/content/ContentForm';
import { ContentItem, ContentStatus } from '../types';
// contentAPI is commented out as we're using mock data for now
// import { contentAPI } from '../services/api';

const ContentLibrary: React.FC = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ContentStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for development
  const mockContentItems: ContentItem[] = [
    {
      id: '1',
      title: 'Social Media Strategy 2025',
      description: 'Key insights for social media marketing in 2025',
      contentType: 'article',
      status: 'draft',
      platforms: [
        { id: '1', name: 'LinkedIn', platformId: '1' },
        { id: '2', name: 'Twitter', platformId: '2' }
      ],
      tags: ['strategy', 'social media', '2025'],
      createdBy: 'user123',
      createdAt: '2025-04-10T12:00:00Z',
      updatedAt: '2025-04-10T12:00:00Z'
    },
    {
      id: '2',
      title: 'Product Launch Announcement',
      description: 'Exciting new product launch details',
      contentType: 'post',
      status: 'scheduled',
      platforms: [
        { id: '1', name: 'LinkedIn', platformId: '1' },
        { id: '3', name: 'Instagram', platformId: '3' }
      ],
      tags: ['product', 'launch', 'announcement'],
      createdBy: 'user123',
      createdAt: '2025-04-12T09:30:00Z',
      updatedAt: '2025-04-12T10:15:00Z',
      schedule: {
        id: 'sch1',
        contentId: '2',
        scheduledFor: '2025-04-18T16:30:00Z',
        timeZone: 'America/New_York',
        status: 'scheduled',
        platformIds: ['1', '3']
      }
    },
    {
      id: '3',
      title: 'Weekly Tips and Tricks',
      description: 'Helpful tips for productivity and creativity',
      contentType: 'video',
      status: 'published',
      platforms: [
        { id: '3', name: 'Instagram', platformId: '3' },
        { id: '4', name: 'YouTube', platformId: '4' }
      ],
      tags: ['tips', 'productivity', 'weekly'],
      createdBy: 'user456',
      createdAt: '2025-04-08T14:20:00Z',
      updatedAt: '2025-04-15T11:00:00Z',
      publishedAt: '2025-04-15T11:00:00Z'
    }
  ];

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would fetch from the API
      // const response = await contentAPI.getAllContent();
      // setContentItems(response.data);
      
      // For development, using mock data
      setContentItems(mockContentItems);
    } catch (err) {
      console.error('Failed to fetch content:', err);
      setError('Failed to load content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateContent = () => {
    setEditingContent(null);
    setShowForm(true);
  };

  const handleEditContent = (content: ContentItem) => {
    setEditingContent(content);
    setShowForm(true);
  };

  const handleDeleteContent = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this content?')) {
      return;
    }
    
    setIsLoading(true);
    try {
      // In a real app, this would call the API
      // await contentAPI.deleteContent(id);
      
      // For development, just filter the list
      setContentItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Failed to delete content:', err);
      setError('Failed to delete content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitContent = async (contentData: Partial<ContentItem>) => {
    setIsSubmitting(true);
    try {
      if (editingContent) {
        // Update existing content
        // In a real app, this would call the API
        // const response = await contentAPI.updateContent(editingContent.id, contentData);
        
        // For development, update the local state
        setContentItems(prev =>
          prev.map(item => (item.id === editingContent.id ? { ...item, ...contentData } : item))
        );
      } else {
        // Create new content
        // In a real app, this would call the API
        // const response = await contentAPI.createContent(contentData);
        
        // For development, create a mock response and add to the list
        const newContent: ContentItem = {
          ...contentData as ContentItem,
          id: Date.now().toString(), // Generate a temp ID
          status: 'draft',
          createdBy: 'user123',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        setContentItems(prev => [...prev, newContent]);
      }
      
      setShowForm(false);
    } catch (err) {
      console.error('Failed to save content:', err);
      setError('Failed to save content. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingContent(null);
  };

  const getStatusBadgeColor = (status: ContentStatus) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-600';
      case 'scheduled':
        return 'bg-blue-100 text-blue-600';
      case 'published':
        return 'bg-green-100 text-green-600';
      case 'archived':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredContent = contentItems.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.status === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Content Library</h1>
          
          <button
            onClick={handleCreateContent}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition flex items-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-1" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Content
          </button>
        </div>
        
        {showForm ? (
          <ContentForm 
            initialContent={editingContent || undefined}
            onSubmit={handleSubmitContent}
            onCancel={handleCancelForm}
            isSubmitting={isSubmitting}
          />
        ) : (
          <>
            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      activeFilter === 'all' 
                        ? 'bg-primary-100 text-primary-800 font-medium' 
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveFilter('draft')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      activeFilter === 'draft' 
                        ? 'bg-gray-200 text-gray-800 font-medium' 
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Drafts
                  </button>
                  <button
                    onClick={() => setActiveFilter('scheduled')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      activeFilter === 'scheduled' 
                        ? 'bg-blue-100 text-blue-800 font-medium' 
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Scheduled
                  </button>
                  <button
                    onClick={() => setActiveFilter('published')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      activeFilter === 'published' 
                        ? 'bg-green-100 text-green-800 font-medium' 
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Published
                  </button>
                  <button
                    onClick={() => setActiveFilter('archived')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      activeFilter === 'archived' 
                        ? 'bg-yellow-100 text-yellow-800 font-medium' 
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Archived
                  </button>
                </div>
                
                <div className="w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            {/* Content List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {isLoading && !contentItems.length ? (
                <div className="p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-200 border-t-primary-600"></div>
                  <p className="mt-2 text-gray-600">Loading content...</p>
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-600">
                  {error}
                  <button 
                    onClick={fetchContent}
                    className="block mx-auto mt-2 text-primary-600 hover:text-primary-800"
                  >
                    Try Again
                  </button>
                </div>
              ) : filteredContent.length === 0 ? (
                <div className="p-8 text-center text-gray-600">
                  {contentItems.length === 0 
                    ? "No content yet. Create your first content piece to get started!" 
                    : "No content matches your current filters."}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Platforms
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredContent.map(content => (
                        <tr key={content.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{content.title}</div>
                                <div className="text-sm text-gray-500 line-clamp-1">{content.description}</div>
                                {content.tags && content.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {content.tags.map(tag => (
                                      <span key={tag} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 capitalize">{content.contentType}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(content.status)}`}>
                              {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                            </span>
                            {content.status === 'scheduled' && content.schedule && (
                              <div className="text-xs text-gray-500 mt-1">
                                {new Date(content.schedule.scheduledFor).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {content.platforms.map(platform => (
                                <span key={platform.id} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                                  {platform.name}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {formatDate(content.updatedAt)}
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-medium">
                            <button
                              onClick={() => handleEditContent(content)}
                              className="text-primary-600 hover:text-primary-900 mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteContent(content.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentLibrary;