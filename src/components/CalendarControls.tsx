import React from 'react';
import { useCalendar } from '../contexts/CalendarContext';

const CalendarControls: React.FC = () => {
  const { state, updateCalendarSize } = useCalendar();
  const { calendarSize } = state;

  return (
    <>
      {/* 오른쪽 세로 슬라이더 */}
      <div style={{
        position: 'fixed',
        right: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        padding: '1rem 0.75rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            writing: 'vertical-rl',
            textOrientation: 'mixed',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#475569',
            marginBottom: '0.5rem'
          }}>
            세로
          </div>
          
          <input
            type="range"
            min="60"
            max="140"
            value={calendarSize.height}
            onChange={(e) => updateCalendarSize({ 
              ...calendarSize, 
              height: parseInt(e.target.value) 
            })}
            style={{
              width: '150px',
              height: '6px',
              borderRadius: '3px',
              background: '#e2e8f0',
              outline: 'none',
              cursor: 'pointer',
              transform: 'rotate(-90deg)',
              transformOrigin: 'center'
            }}
          />
          
          <div style={{
            fontSize: '0.75rem',
            color: '#64748b',
            fontWeight: '500',
            marginTop: '0.5rem'
          }}>
            {calendarSize.height}%
          </div>
        </div>
      </div>

      {/* 아래쪽 가로 슬라이더 */}
      <div style={{
        position: 'fixed',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        padding: '0.75rem 1.5rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#475569',
            whiteSpace: 'nowrap'
          }}>
            가로
          </div>
          
          <input
            type="range"
            min="40"
            max="100"
            value={calendarSize.width}
            onChange={(e) => updateCalendarSize({ 
              ...calendarSize, 
              width: parseInt(e.target.value) 
            })}
            style={{
              width: '200px',
              height: '6px',
              borderRadius: '3px',
              background: '#e2e8f0',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
          
          <div style={{
            fontSize: '0.75rem',
            color: '#64748b',
            fontWeight: '500',
            whiteSpace: 'nowrap'
          }}>
            {calendarSize.width}%
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarControls;