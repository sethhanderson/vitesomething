import React, { useState, useEffect } from 'react';
import { ContentItem, ContentType, Platform } from '../../types';
import { platformAPI } from '../../services/api';

interface ContentFormProps {
  initialContent?: Partial<ContentItem>;
  onSubmit: (content: Partial<ContentItem>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ContentForm: React.FC<ContentFormProps> = ({
  initialContent,
  onSubmit,
  onCancel,
  isSubmitting
}) => {
  const [content, setContent] = useState<Partial<ContentItem>>(
    initialContent || {
      title: '',
      description: '',
      contentType: 'post',
      tags: [],
      platforms: []
    }
  );
  const [availablePlatforms, setAvailablePlatforms] = useState<Platform[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [tag, setTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Content type options
  const contentTypes: ContentType[] = ['post', 'article', 'image', 'video', 'story', 'reel'];

  useEffect(() => {
    // Fetch available platforms
    const fetchPlatforms = async () => {
      setIsLoading(true);
      try {
        const response = await platformAPI.getAllPlatforms();
        setAvailablePlatforms(response.data);

        // If editing content, set the selected platforms
        if (initialContent?.platforms) {
          setSelectedPlatforms(initialContent.platforms.map(p => p.platformId));
        }
      } catch (error) {
        console.error('Failed to fetch platforms:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlatforms();
  }, [initialContent]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContent(prev => ({
      ...prev,
      contentType: e.target.value as ContentType
    }));
  };

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        return prev.filter(id => id !== platformId);
      } else {
        return [...prev, platformId];
      }
    });
  };

  const addTag = () => {
    if (tag && !content.tags?.includes(tag)) {
      setContent(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag]
      }));
      setTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setContent(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Transform selected platforms into the format expected by the API
    const platforms = selectedPlatforms.map(platformId => {
      const platform = availablePlatforms.find(p => p.id === platformId);
      return {
        id: platformId,
        name: platform?.name || '',
        platformId: platformId
      };
    });

    onSubmit({
      ...content,
      platforms
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        {initialContent ? 'Edit Content' : 'Create New Content'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={content.title}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter content title"
          />
        </div>

        {/* Content Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contentType">
            Content Type
          </label>
          <select
            id="contentType"
            name="contentType"
            value={content.contentType}
            onChange={handleContentTypeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {contentTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={content.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter content description"
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {content.tags?.map(tag => (
              <div key={tag} className="flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-primary-600 hover:text-primary-800"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-primary-600 text-white px-4 py-2 rounded-r-md hover:bg-primary-700 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Platforms */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Platforms
          </label>
          {isLoading ? (
            <div>Loading platforms...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availablePlatforms.map(platform => (
                <div
                  key={platform.id}
                  className={`border rounded-md p-3 flex items-center cursor-pointer ${
                    selectedPlatforms.includes(platform.id)
                      ? 'bg-primary-50 border-primary-500'
                      : 'border-gray-300'
                  }`}
                  onClick={() => handlePlatformToggle(platform.id)}
                >
                  {platform.iconUrl ? (
                    <img
                      src={platform.iconUrl}
                      alt={platform.name}
                      className="w-6 h-6 mr-2"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/24";
                      }}
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
                  )}
                  <span className="text-sm">{platform.name}</span>
                </div>
              ))}
            </div>
          )}
          {availablePlatforms.length === 0 && !isLoading && (
            <p className="text-gray-500 text-sm mt-1">
              No platforms connected. Connect platforms in settings.
            </p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : initialContent ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentForm;