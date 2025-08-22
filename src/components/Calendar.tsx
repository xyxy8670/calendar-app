import React from 'react';
import { useCalendar } from '../contexts/CalendarContext';
import { getDaysInMonth, getWeekdays, getEventsForDate } from '../utils/dateUtils';
import DateSelector from './DateSelector';

const Calendar: React.FC = () => {
  const { state } = useCalendar();
  const { year, month, events, commonEvents, textSettings, calendarSize } = state;

  const days = getDaysInMonth(year, month);
  const weekdays = getWeekdays();
  const today = new Date();
  const isToday = (day: number, isCurrentMonth: boolean) => {
    return isCurrentMonth && 
           today.getFullYear() === year && 
           today.getMonth() + 1 === month && 
           today.getDate() === day;
  };

  const renderDay = (calendarDay: { date: number; isCurrentMonth: boolean }, index: number) => {
    const { date: day, isCurrentMonth } = calendarDay;
    const dayEvents = isCurrentMonth ? getEventsForDate(events, year, month, day) : [];
    const todayFlag = isToday(day, isCurrentMonth);
    
    return (
      <div
        key={`${year}-${month}-${day}-${index}`}
        data-cell
        data-date-value={day}
        className={`relative min-h-[6.25rem] h-auto border-b border-slate-200 p-3 hover:bg-slate-50 transition-colors duration-200 flex flex-col ${
          isCurrentMonth ? 'bg-white' : 'bg-slate-50'
        }`}
        style={{ aspectRatio: '1.2 / 1' }}
      >
        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <span 
            data-date
            data-today={todayFlag ? 'true' : undefined}
            className={`text-2xl leading-none ${
              todayFlag 
                ? 'bg-slate-800 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md'" 
                : isCurrentMonth 
                  ? 'text-slate-800 font-bold' 
                  : 'text-slate-400'
            }`}
          >
            {day}
          </span>
          {dayEvents.length > 3 && (
            <span className="text-sm text-slate-500 font-medium mt-auto">
              +{dayEvents.length - 3} more
            </span>
          )}
        </div>
        
        <div className="space-y-1 flex-1 overflow-hidden">
          {dayEvents.slice(0, 3).map((event) => (
            <div
              key={event.id}
              data-event
              className="px-2 py-1 rounded-lg font-medium border leading-tight"
              style={{ 
                backgroundColor: event.type.color + '15', 
                borderColor: event.type.color + '40',
                fontSize: textSettings.eventFontSize,
                color: textSettings.eventTextColor
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
    <div id="calendar-container" className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" style={{
      fontFamily: "'OnglipBakdahyeonche', sans-serif",
      width: `${calendarSize.width}%`,
      maxWidth: '50rem',
      margin: '2rem auto 3rem auto',
      transform: `scaleY(${calendarSize.height / 100})`
    }}>
      {/* Calendar Header with DateSelector */}
      <div className="bg-slate-800 text-white py-4 md:py-8 px-4 md:px-8 relative">
        <div className="flex justify-center">
          <DateSelector />
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 bg-slate-50">
        {weekdays.map((weekday) => (
          <div 
            key={weekday} 
            data-weekday
            className="py-3 px-2 text-center text-xl font-bold text-slate-600 border-b border-slate-200 min-h-[3.75rem] flex items-center justify-center"
          >
            {weekday}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid grid grid-cols-7 gap-0">
        {days.map((calendarDay, index) => 
          renderDay(calendarDay, index)
        )}
      </div>

      {/* Monthly Memo Section */}
      <div id="monthly-memo" className="border-t border-slate-200 bg-slate-50 p-4 md:p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4">월간 메모</h3>
        <div className="bg-white rounded-xl p-4 min-h-[5rem]">
          {commonEvents ? (
            <div 
              className="whitespace-pre-wrap leading-relaxed"
              style={{ 
                fontSize: textSettings.memoFontSize,
                color: textSettings.memoTextColor
              }}
            >
              {commonEvents}
            </div>
          ) : (
            <div className="text-slate-400 italic text-center py-4 text-base">
              월간 메모가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;