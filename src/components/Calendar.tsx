import React from 'react';
import { useCalendar } from '../contexts/CalendarContext';
import { getDaysInMonth, formatDateForDisplay, getWeekdays, getEventsForDate } from '../utils/dateUtils';

const Calendar: React.FC = () => {
  const { state } = useCalendar();
  const { year, month, events } = state;

  const days = getDaysInMonth(year, month);
  const weekdays = getWeekdays();
  const today = new Date();
  const isToday = (day: number, isCurrentMonth: boolean) => {
    return isCurrentMonth && 
           today.getFullYear() === year && 
           today.getMonth() + 1 === month && 
           today.getDate() === day;
  };

  const renderDay = (day: number, isCurrentMonth: boolean, index: number) => {
    const dayEvents = isCurrentMonth ? getEventsForDate(events, year, month, day) : [];
    const todayFlag = isToday(day, isCurrentMonth);
    
    return (
      <div
        key={index}
        className={`relative h-32 border-r border-b border-gray-200 p-3 hover:bg-gray-50 ${
          isCurrentMonth ? 'bg-white' : 'bg-gray-50'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm ${
            todayFlag 
              ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium' 
              : isCurrentMonth 
                ? 'text-gray-900 font-medium' 
                : 'text-gray-400'
          }`}>
            {day}
          </span>
          {dayEvents.length > 3 && (
            <span className="text-xs text-gray-500">
              +{dayEvents.length - 3}
            </span>
          )}
        </div>
        
        <div className="space-y-1">
          {dayEvents.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="text-xs px-2 py-1 rounded font-medium"
              style={{ 
                backgroundColor: event.type.color + '20', 
                color: event.type.color
              }}
              title={event.title}
            >
              <div className="truncate">{event.title}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div id="calendar-container" className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Calendar Header */}
      <div className="bg-blue-600 text-white py-6 px-6">
        <h1 className="text-2xl font-semibold text-center">
          {formatDateForDisplay(year, month)}
        </h1>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {weekdays.map((weekday, index) => (
          <div 
            key={weekday} 
            className={`py-3 text-center text-sm font-medium ${
              index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            {weekday}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => 
          renderDay(day.date, day.isCurrentMonth, index)
        )}
      </div>
    </div>
  );
};

export default Calendar;