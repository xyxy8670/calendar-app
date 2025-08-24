import React, { useState } from 'react';
import { useCalendar } from '../contexts/CalendarContext';
import { getDaysInMonth, getWeekdays, getEventsForDate } from '../utils/dateUtils';
import DateSelector from './DateSelector';

const Calendar: React.FC = () => {
  const { state, setCommonEvents } = useCalendar();
  const { year, month, events, commonEvents, textSettings, headerColor } = state;
  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const [editedMemo, setEditedMemo] = useState(commonEvents);

  const handleMemoEdit = () => {
    setEditedMemo(commonEvents);
    setIsEditingMemo(true);
  };

  const handleMemoSave = () => {
    setCommonEvents(editedMemo);
    setIsEditingMemo(false);
  };

  const handleMemoCancel = () => {
    setEditedMemo(commonEvents);
    setIsEditingMemo(false);
  };

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
        fontFamily: textSettings.fontFamily,
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
        backgroundColor: headerColor,
        color: '#ffffff',
        padding: '32px 24px',
        borderRadius: '12px 12px 0 0',
        textAlign: 'center',
        minHeight: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
      <div 
        id="monthly-memo"
        style={{
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc',
          padding: '24px',
          borderRadius: '0 0 12px 12px'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: '0'
          }}>
            월간 메모
          </h3>
          {!isEditingMemo && (
            <button
              onClick={handleMemoEdit}
              style={{
                backgroundColor: '#f1f5f9',
                color: '#475569',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e2e8f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f5f9';
              }}
            >
              편집
            </button>
          )}
        </div>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '16px',
          minHeight: '80px',
          position: 'relative'
        }}>
          {isEditingMemo ? (
            <div>
              <textarea
                value={editedMemo}
                onChange={(e) => setEditedMemo(e.target.value)}
                placeholder="월간 메모를 입력하세요..."
                style={{
                  width: '100%',
                  minHeight: '120px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: textSettings.memoFontSize,
                  color: textSettings.memoTextColor,
                  fontFamily: 'inherit',
                  lineHeight: '1.6',
                  resize: 'vertical',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#64748b';
                  e.target.style.boxShadow = '0 0 0 3px rgba(100, 116, 139, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
                marginTop: '12px'
              }}>
                <button
                  onClick={handleMemoCancel}
                  style={{
                    backgroundColor: '#f8fafc',
                    color: '#64748b',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                  }}
                >
                  취소
                </button>
                <button
                  onClick={handleMemoSave}
                  style={{
                    backgroundColor: '#1f2937',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#374151';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1f2937';
                  }}
                >
                  저장
                </button>
              </div>
            </div>
          ) : (
            <div>
              {commonEvents ? (
                <div 
                  style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.6',
                    fontSize: textSettings.memoFontSize,
                    color: textSettings.memoTextColor,
                    cursor: 'pointer'
                  }}
                  onClick={handleMemoEdit}
                  title="클릭하여 편집"
                >
                  {commonEvents}
                </div>
              ) : (
                <div 
                  style={{
                    color: '#9ca3af',
                    fontStyle: 'italic',
                    textAlign: 'center',
                    padding: '16px 0',
                    cursor: 'pointer'
                  }}
                  onClick={handleMemoEdit}
                  title="클릭하여 메모 추가"
                >
                  클릭하여 월간 메모를 추가하세요.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;