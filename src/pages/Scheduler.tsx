import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Calendar from '../components/calendar/Calendar';
import { Schedule, ContentItem } from '../types';
// These imports are commented out as we're using mock data for now
// import { Platform } from '../types';
// import { contentAPI, scheduleAPI } from '../services/api';

// Mock data for development
const mockSchedules: Schedule[] = [
  {
    id: 'sch1',
    contentId: '1',
    scheduledFor: '2025-04-20T14:30:00Z',
    timeZone: 'America/New_York',
    status: 'scheduled',
    platformIds: ['1', '2']
  },
  {
    id: 'sch2',
    contentId: '2',
    scheduledFor: '2025-04-18T16:30:00Z',
    timeZone: 'America/New_York',
    status: 'scheduled',
    platformIds: ['1', '3']
  },
  {
    id: 'sch3',
    contentId: '3',
    scheduledFor: '2025-04-17T12:00:00Z',
    timeZone: 'America/New_York',
    status: 'scheduled',
    platformIds: ['3', '4']
  }
];

const mockContent: Record<string, ContentItem> = {
  '1': {
    id: '1',
    title: 'Social Media Strategy 2025',
    description: 'Key insights for social media marketing in 2025',
    contentType: 'article',
    status: 'scheduled',
    platforms: [
      { id: '1', name: 'LinkedIn', platformId: '1' },
      { id: '2', name: 'Twitter', platformId: '2' }
    ],
    tags: ['strategy', 'social media', '2025'],
    createdBy: 'user123',
    createdAt: '2025-04-10T12:00:00Z',
    updatedAt: '2025-04-10T12:00:00Z'
  },
  '2': {
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
    updatedAt: '2025-04-12T10:15:00Z'
  },
  '3': {
    id: '3',
    title: 'Weekly Tips and Tricks',
    description: 'Helpful tips for productivity and creativity',
    contentType: 'video',
    status: 'scheduled',
    platforms: [
      { id: '3', name: 'Instagram', platformId: '3' },
      { id: '4', name: 'YouTube', platformId: '4' }
    ],
    tags: ['tips', 'productivity', 'weekly'],
    createdBy: 'user456',
    createdAt: '2025-04-08T14:20:00Z',
    updatedAt: '2025-04-15T11:00:00Z'
  }
};

interface ScheduleEventModalProps {
  schedule: Schedule | null;
  content: ContentItem | null;
  onClose: () => void;
  onDelete: (scheduleId: string) => void;
  onReschedule: (scheduleId: string, newDate: string) => void;
  isSubmitting: boolean;
}

const ScheduleEventModal: React.FC<ScheduleEventModalProps> = ({
  schedule,
  content,
  onClose,
  onDelete,
  onReschedule,
  isSubmitting
}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (schedule) {
      const scheduleDate = new Date(schedule.scheduledFor);
      setDate(scheduleDate.toISOString().split('T')[0]);
      setTime(scheduleDate.toISOString().split('T')[1].substring(0, 5));
    }
  }, [schedule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (schedule && date && time) {
      const newDate = `${date}T${time}:00Z`;
      onReschedule(schedule.id, newDate);
    }
  };

  if (!schedule || !content) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Scheduled Content</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium text-gray-900">{content.title}</h4>
          <p className="text-gray-600 text-sm mt-1">{content.description}</p>
          
          <div className="mt-3 flex flex-wrap gap-1">
            {content.platforms.map(platform => (
              <span key={platform.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {platform.name}
              </span>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="scheduleDate">
              Date
            </label>
            <input
              type="date"
              id="scheduleDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="scheduleTime">
              Time
            </label>
            <input
              type="time"
              id="scheduleTime"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => onDelete(schedule.id)}
              className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition"
              disabled={isSubmitting}
            >
              Delete
            </button>
            
            <div className="space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Update Schedule'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const NewScheduleModal: React.FC<{
  date: Date;
  onClose: () => void;
  onSubmit: (contentId: string, date: string, platformIds: string[]) => void;
  isSubmitting: boolean;
}> = ({ date, onClose, onSubmit, isSubmitting }) => {
  const [selectedContent, setSelectedContent] = useState('');
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  
  // Mock available content for scheduling
  const availableContent = Object.values(mockContent);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedContent && selectedTime) {
      const scheduledDateStr = `${date.toISOString().split('T')[0]}T${selectedTime}:00Z`;
      onSubmit(selectedContent, scheduledDateStr, selectedPlatforms);
    }
  };
  
  // Update selected platforms when content changes
  useEffect(() => {
    if (selectedContent) {
      const content = mockContent[selectedContent];
      if (content) {
        setSelectedPlatforms(content.platforms.map(p => p.platformId));
      }
    }
  }, [selectedContent]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Schedule Content for {date.toLocaleDateString()}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="content">
              Content
            </label>
            <select
              id="content"
              value={selectedContent}
              onChange={(e) => setSelectedContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            >
              <option value="">Select content</option>
              {availableContent.map(content => (
                <option key={content.id} value={content.id}>
                  {content.title}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="scheduleTime">
              Time
            </label>
            <input
              type="time"
              id="scheduleTime"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          
          {selectedContent && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platforms
              </label>
              <div className="space-y-2">
                {mockContent[selectedContent]?.platforms.map(platform => (
                  <div key={platform.id} className="flex items-center">
                    <input
                      id={`platform-${platform.id}`}
                      type="checkbox"
                      checked={selectedPlatforms.includes(platform.platformId)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPlatforms([...selectedPlatforms, platform.platformId]);
                        } else {
                          setSelectedPlatforms(selectedPlatforms.filter(id => id !== platform.platformId));
                        }
                      }}
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor={`platform-${platform.id}`} className="ml-2 text-sm text-gray-700">
                      {platform.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
              disabled={isSubmitting || !selectedContent || selectedPlatforms.length === 0}
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Content'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Scheduler: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewScheduleModal, setShowNewScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would fetch from the API
      // const response = await scheduleAPI.getSchedule();
      // setSchedules(response.data);
      
      // For development, using mock data
      setSchedules(mockSchedules);
    } catch (err) {
      console.error('Failed to fetch schedules:', err);
      setError('Failed to load schedules. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventClick = (scheduleId: string) => {
    const schedule = schedules.find(s => s.id === scheduleId);
    if (schedule) {
      setSelectedSchedule(schedule);
      // In a real app, this would fetch from the API
      // contentAPI.getContentById(schedule.contentId).then(response => {
      //   setSelectedContent(response.data);
      // });
      
      // For development, using mock data
      setSelectedContent(mockContent[schedule.contentId]);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowNewScheduleModal(true);
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    if (!window.confirm('Are you sure you want to delete this schedule?')) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      // In a real app, this would call the API
      // await scheduleAPI.cancelSchedule(scheduleId);
      
      // For development, just filter the list
      setSchedules(prev => prev.filter(s => s.id !== scheduleId));
      setSelectedSchedule(null);
    } catch (err) {
      console.error('Failed to delete schedule:', err);
      setError('Failed to delete schedule. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRescheduleContent = async (scheduleId: string, newDate: string) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would call the API
      // await scheduleAPI.rescheduleContent(scheduleId, newDate);
      
      // For development, update the local state
      setSchedules(prev =>
        prev.map(s => (s.id === scheduleId ? { ...s, scheduledFor: newDate } : s))
      );
      setSelectedSchedule(null);
    } catch (err) {
      console.error('Failed to reschedule content:', err);
      setError('Failed to reschedule content. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateSchedule = async (contentId: string, scheduledFor: string, platformIds: string[]) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would call the API
      // const response = await contentAPI.scheduleContent(contentId, {
      //   scheduledFor,
      //   platformIds,
      //   timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      // });
      
      // For development, create a mock response and add to the list
      const newSchedule: Schedule = {
        id: `new-${Date.now()}`,
        contentId,
        scheduledFor,
        platformIds,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        status: 'scheduled'
      };
      
      setSchedules(prev => [...prev, newSchedule]);
      setShowNewScheduleModal(false);
    } catch (err) {
      console.error('Failed to schedule content:', err);
      setError('Failed to schedule content. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Content Calendar</h1>
          
          <button
            onClick={() => setSelectedDate(new Date())}
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
            Schedule Content
          </button>
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-200 border-t-primary-600"></div>
            <p className="mt-2 text-gray-600">Loading calendar...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-red-600">
            {error}
            <button 
              onClick={fetchSchedules}
              className="block mx-auto mt-2 text-primary-600 hover:text-primary-800"
            >
              Try Again
            </button>
          </div>
        ) : (
          <Calendar 
            schedules={schedules}
            onEventClick={handleEventClick}
            onDateSelect={handleDateSelect}
          />
        )}
        
        {/* Schedule Event Modal */}
        {selectedSchedule && (
          <ScheduleEventModal 
            schedule={selectedSchedule}
            content={selectedContent}
            onClose={() => setSelectedSchedule(null)}
            onDelete={handleDeleteSchedule}
            onReschedule={handleRescheduleContent}
            isSubmitting={isSubmitting}
          />
        )}
        
        {/* New Schedule Modal */}
        {showNewScheduleModal && selectedDate && (
          <NewScheduleModal 
            date={selectedDate}
            onClose={() => setShowNewScheduleModal(false)}
            onSubmit={handleCreateSchedule}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default Scheduler;