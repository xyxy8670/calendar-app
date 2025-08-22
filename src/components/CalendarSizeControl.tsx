import React from 'react';
import { useCalendar } from '../contexts/CalendarContext';

const CalendarSizeControl: React.FC = () => {
  const { state, updateCalendarSize } = useCalendar();
  const { calendarSize } = state;

  return (
    <div style={{
      backgroundColor: 'transparent',
      borderRadius: '0.75rem',
      padding: '1.25rem',
      border: '1px solid #d1d5db',
      boxSizing: 'border-box',
      marginBottom: '1.25rem'
    }}>
      <h4 className="text-lg font-semibold text-slate-800 mb-4">캘린더 크기 조정</h4>
      
      <div className="space-y-4">
        {/* 가로 크기 조정 */}
        <div>
          <label className="block text-base font-semibold text-slate-800 mb-2">
            가로 크기: {calendarSize.width}%
          </label>
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
              width: '100%',
              height: '0.5rem',
              borderRadius: '0.25rem',
              background: '#e2e8f0',
              outline: 'none',
              cursor: 'pointer'
            }}
            className="slider"
          />
          <div className="flex justify-between text-sm text-slate-500 mt-1">
            <span>작게 (40%)</span>
            <span>크게 (100%)</span>
          </div>
        </div>

        {/* 세로 크기 조정 */}
        <div>
          <label className="block text-base font-semibold text-slate-800 mb-2">
            세로 크기: {calendarSize.height}%
          </label>
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
              width: '100%',
              height: '0.5rem',
              borderRadius: '0.25rem',
              background: '#e2e8f0',
              outline: 'none',
              cursor: 'pointer'
            }}
            className="slider"
          />
          <div className="flex justify-between text-sm text-slate-500 mt-1">
            <span>작게 (60%)</span>
            <span>크게 (140%)</span>
          </div>
        </div>

        {/* 초기화 버튼 */}
        <div className="pt-2">
          <button
            onClick={() => updateCalendarSize({ width: 70, height: 100 })}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              borderRadius: '0.5rem',
              border: '1px solid #cbd5e1',
              backgroundColor: '#f8fafc',
              color: '#475569',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f5f9';
              e.currentTarget.style.borderColor = '#94a3b8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            기본 크기로 초기화
          </button>
        </div>

        {/* 미리보기 */}
        <div className="mt-4 p-4 bg-white rounded-lg border">
          <p className="text-sm text-slate-600 mb-2">미리보기:</p>
          <div 
            className="border-2 border-slate-300 rounded bg-slate-50 flex items-center justify-center text-slate-500 text-sm"
            style={{ 
              width: `${calendarSize.width}%`,
              height: `${Math.max(60, calendarSize.height * 0.6)}px`,
              margin: '0 auto'
            }}
          >
            캘린더 크기: {calendarSize.width}% × {calendarSize.height}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSizeControl;