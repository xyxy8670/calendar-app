import React from 'react';
import { useCalendar } from '../contexts/CalendarContext';
import { getDaysInMonth, getWeekdays, getEventsForDate } from '../utils/dateUtils';
import DateSelector from './DateSelector';

const Calendar: React.FC = () => {
  const { state } = useCalendar();
  const { year, month, events, commonEvents, textSettings } = state;

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
        className={`calendar-day ${isCurrentMonth ? 'current-month' : 'other-month'}`}
        style={{
          border: '1px solid #e2e8f0',
          minHeight: '120px',
          padding: '8px',
          backgroundColor: isCurrentMonth ? '#ffffff' : '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <span 
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: todayFlag ? '#ffffff' : (isCurrentMonth ? '#1f2937' : '#9ca3af'),
              backgroundColor: todayFlag ? '#1f2937' : 'transparent',
              borderRadius: todayFlag ? '50%' : '0',
              width: todayFlag ? '28px' : 'auto',
              height: todayFlag ? '28px' : 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {day}
          </span>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          flex: 1
        }}>
          {dayEvents.map((event) => (
            <div
              key={event.id}
              style={{
                backgroundColor: event.type.color + '20',
                borderLeft: `3px solid ${event.type.color}`,
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: textSettings.eventFontSize,
                color: textSettings.eventTextColor,
                wordBreak: 'break-word',
                lineHeight: '1.2'
              }}
              title={event.title}
            >
              {event.title}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div 
      id="calendar-container" 
      style={{
        fontFamily: "'OnglipBakdahyeonche', sans-serif",
        width: '100vw',
        minWidth: '100vw',
        maxWidth: '100vw',
        margin: '0',
        padding: '20px',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Calendar Header */}
      <div style={{
        backgroundColor: '#1f2937',
        color: '#ffffff',
        padding: '24px',
        borderRadius: '12px 12px 0 0',
        textAlign: 'center'
      }}>
        <DateSelector />
      </div>

      {/* Weekday Headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0'
      }}>
        {weekdays.map((weekday) => (
          <div 
            key={weekday}
            style={{
              padding: '16px 8px',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#64748b',
              borderRight: '1px solid #e2e8f0'
            }}
          >
            {weekday}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0'
      }}>
        {days.map((calendarDay, index) => 
          renderDay(calendarDay, index)
        )}
      </div>

      {/* Monthly Memo Section */}
      <div style={{
        borderTop: '1px solid #e2e8f0',
        backgroundColor: '#f8fafc',
        padding: '24px',
        borderRadius: '0 0 12px 12px'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '16px',
          margin: '0 0 16px 0'
        }}>
          월간 메모
        </h3>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '16px',
          minHeight: '80px'
        }}>
          {commonEvents ? (
            <div 
              style={{
                whiteSpace: 'pre-wrap',
                lineHeight: '1.6',
                fontSize: textSettings.memoFontSize,
                color: textSettings.memoTextColor
              }}
            >
              {commonEvents}
            </div>
          ) : (
            <div style={{
              color: '#9ca3af',
              fontStyle: 'italic',
              textAlign: 'center',
              padding: '16px 0'
            }}>
              월간 메모가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;