import React, { useState } from 'react';
import { Schedule } from '../../types';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  platforms: string[];
  contentId: string;
}

interface CalendarProps {
  schedules: Schedule[];
  onEventClick: (eventId: string) => void;
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ schedules, onEventClick, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('month');

  // Convert schedules to calendar events
  const events: CalendarEvent[] = schedules.map(schedule => ({
    id: schedule.id,
    title: `Content for ${schedule.platformIds.join(', ')}`,
    start: new Date(schedule.scheduledFor),
    platforms: schedule.platformIds,
    contentId: schedule.contentId
  }));

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0-6, 0 is Sunday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  // Get previous month's days that appear in the current calendar view
  const prevMonthDays = [];
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
  
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    prevMonthDays.push({
      day: daysInPrevMonth - i,
      month: prevMonth,
      year: prevMonthYear,
      isCurrentMonth: false
    });
  }

  // Current month days
  const currentMonthDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push({
      day: i,
      month,
      year,
      isCurrentMonth: true
    });
  }

  // Next month days to fill the calendar grid
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextMonthYear = month === 11 ? year + 1 : year;
  const nextMonthDays = [];
  const totalDaysShown = prevMonthDays.length + currentMonthDays.length;
  const daysToAdd = 42 - totalDaysShown; // 6 rows of 7 days
  
  for (let i = 1; i <= daysToAdd; i++) {
    nextMonthDays.push({
      day: i,
      month: nextMonth,
      year: nextMonthYear,
      isCurrentMonth: false
    });
  }

  // Combine all days
  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  // Function to find events for a specific day
  const getEventsForDay = (day: number, month: number, year: number) => {
    return events.filter(event => {
      const eventDate = event.start;
      return eventDate.getDate() === day && 
             eventDate.getMonth() === month && 
             eventDate.getFullYear() === year;
    });
  };

  // Month navigation
  const goToPrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Format date for display
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Handle day click
  const handleDayClick = (day: number, month: number, year: number) => {
    onDateSelect(new Date(year, month, day));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Calendar Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {formatMonthYear(currentDate)}
            </h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentView('month')}
              className={`px-3 py-1 text-sm rounded-md ${
                currentView === 'month' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setCurrentView('week')}
              className={`px-3 py-1 text-sm rounded-md ${
                currentView === 'week' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setCurrentView('day')}
              className={`px-3 py-1 text-sm rounded-md ${
                currentView === 'day' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Day
            </button>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={goToPrevMonth}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label="Previous month"
            >
              <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Today
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label="Next month"
            >
              <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid - Month View */}
      {currentView === 'month' && (
        <div className="px-6 py-4">
          {/* Day labels */}
          <div className="grid grid-cols-7 gap-px mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 grid-rows-6 gap-px bg-gray-200">
            {allDays.map((dayObj, index) => {
              const dayEvents = getEventsForDay(dayObj.day, dayObj.month, dayObj.year);
              const isToday = 
                dayObj.day === new Date().getDate() &&
                dayObj.month === new Date().getMonth() &&
                dayObj.year === new Date().getFullYear();

              return (
                <div 
                  key={index}
                  className={`bg-white min-h-[100px] p-1 ${
                    dayObj.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                  } ${isToday ? 'ring-2 ring-primary-500 ring-inset' : ''}`}
                  onClick={() => handleDayClick(dayObj.day, dayObj.month, dayObj.year)}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-medium ${isToday ? 'text-primary-600' : ''}`}>{dayObj.day}</span>
                    {dayEvents.length > 0 && (
                      <span className="text-xs bg-primary-100 text-primary-800 font-medium px-1.5 py-0.5 rounded-full">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
                    {dayEvents.map(event => (
                      <div
                        key={event.id}
                        className="bg-primary-50 border-l-4 border-primary-500 px-2 py-1 text-xs rounded cursor-pointer hover:bg-primary-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(event.id);
                        }}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-primary-600">{event.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week View */}
      {currentView === 'week' && (
        <div className="px-6 py-4 text-center text-gray-500">
          Week view is under development
        </div>
      )}

      {/* Day View */}
      {currentView === 'day' && (
        <div className="px-6 py-4 text-center text-gray-500">
          Day view is under development
        </div>
      )}
    </div>
  );
};

export default Calendar;