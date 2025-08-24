import React from 'react';
import { useCalendar } from '../contexts/CalendarContext';
import { FONT_OPTIONS, HEADER_COLOR_OPTIONS } from '../types';

const TextSettings: React.FC = () => {
  const { state, updateTextSettings, setHeaderColor } = useCalendar();
  const { textSettings, headerColor } = state;

  const fontSizeOptions = [
    { value: '0.75rem', label: '작게' },
    { value: '0.875rem', label: '보통' },
    { value: '1rem', label: '크게' },
    { value: '1.125rem', label: '더 크게' },
    { value: '1.25rem', label: '매우 크게' },
    { value: '1.375rem', label: '특대' },
    { value: '1.5rem', label: '초대형' },
  ];

  const colorOptions = [
    { value: '#1e293b', label: '진한 회색' },
    { value: '#374151', label: '회색' },
    { value: '#000000', label: '검정' },
    { value: '#dc2626', label: '빨강' },
    { value: '#2563eb', label: '파랑' },
    { value: '#16a34a', label: '초록' },
    { value: '#7c3aed', label: '보라' },
    { value: '#ea580c', label: '주황' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <h3 className="text-xl font-semibold text-slate-800">텍스트 설정</h3>
      </div>
      
      {/* Font Family Settings */}
      <div style={{
        backgroundColor: 'transparent',
        borderRadius: '12px',
        padding: '1.25rem',
        border: '1px solid #d1d5db',
        boxSizing: 'border-box',
        marginBottom: '20px'
      }}>
        <h4 className="text-lg font-semibold text-slate-800 mb-4">전체 글꼴</h4>
        
        <div>
          <label className="block text-base font-semibold text-slate-800 mb-2">
            글꼴 선택
          </label>
          <select
            value={textSettings.fontFamily}
            onChange={(e) => updateTextSettings({ fontFamily: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              boxSizing: 'border-box',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              outline: 'none',
              transition: 'all 0.2s ease',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#64748b';
              e.target.style.boxShadow = '0 0 0 3px rgba(100, 116, 139, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#cbd5e1';
              e.target.style.boxShadow = 'none';
            }}
          >
            {FONT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          <div className="mt-4 p-4 bg-white rounded-lg border">
            <p className="text-sm text-slate-600 mb-2">미리보기:</p>
            <div 
              style={{ 
                fontFamily: textSettings.fontFamily,
                fontSize: '1.125rem'
              }}
            >
              이 글꼴로 캘린더가 표시됩니다
            </div>
          </div>
        </div>
      </div>

      {/* Header Color Settings */}
      <div style={{
        backgroundColor: 'transparent',
        borderRadius: '12px',
        padding: '1.25rem',
        border: '1px solid #d1d5db',
        boxSizing: 'border-box',
        marginBottom: '20px'
      }}>
        <h4 className="text-lg font-semibold text-slate-800 mb-4">캘린더 헤더 색상</h4>
        
        <div>
          <label className="block text-base font-semibold text-slate-800 mb-2">
            헤더 배경색
          </label>
          <select
            value={headerColor}
            onChange={(e) => setHeaderColor(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              boxSizing: 'border-box',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              outline: 'none',
              transition: 'all 0.2s ease',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#64748b';
              e.target.style.boxShadow = '0 0 0 3px rgba(100, 116, 139, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#cbd5e1';
              e.target.style.boxShadow = 'none';
            }}
          >
            {HEADER_COLOR_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          <div className="mt-4 p-4 bg-white rounded-lg border">
            <p className="text-sm text-slate-600 mb-2">미리보기:</p>
            <div 
              style={{ 
                backgroundColor: headerColor,
                color: '#ffffff',
                padding: '12px 16px',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '600'
              }}
            >
              2025년 8월
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Text Settings */}
      <div className="space-y-6">
        <div style={{
          backgroundColor: 'transparent',
          borderRadius: '12px',
          padding: '1.25rem',
          border: '1px solid #d1d5db',
          boxSizing: 'border-box',
          marginBottom: '20px'
        }}>
          <h4 className="text-lg font-semibold text-slate-800 mb-4">일정 텍스트</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-base font-semibold text-slate-800 mb-2">
                글자 크기
              </label>
              <select
                value={textSettings.eventFontSize}
                onChange={(e) => updateTextSettings({ eventFontSize: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#64748b';
                  e.target.style.boxShadow = '0 0 0 3px rgba(100, 116, 139, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {fontSizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-base font-semibold text-slate-800 mb-2">
                글자 색상
              </label>
              <select
                value={textSettings.eventTextColor}
                onChange={(e) => updateTextSettings({ eventTextColor: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#64748b';
                  e.target.style.boxShadow = '0 0 0 3px rgba(100, 116, 139, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {colorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg border">
              <p className="text-sm text-slate-600 mb-2">미리보기:</p>
              <div 
                className="px-2 py-1 rounded-lg font-medium border leading-tight inline-block"
                style={{ 
                  backgroundColor: '#3b82f615', 
                  borderColor: '#3b82f640',
                  fontSize: textSettings.eventFontSize,
                  color: textSettings.eventTextColor
                }}
              >
                샘플 일정
              </div>
            </div>
          </div>
        </div>

        {/* Memo Text Settings */}
        <div style={{
          backgroundColor: 'transparent',
          borderRadius: '12px',
          padding: '1.25rem',
          border: '1px solid #d1d5db',
          boxSizing: 'border-box'
        }}>
          <h4 className="text-lg font-semibold text-slate-800 mb-4">월간 메모 텍스트</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-base font-semibold text-slate-800 mb-2">
                글자 크기
              </label>
              <select
                value={textSettings.memoFontSize}
                onChange={(e) => updateTextSettings({ memoFontSize: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#64748b';
                  e.target.style.boxShadow = '0 0 0 3px rgba(100, 116, 139, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {fontSizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-base font-semibold text-slate-800 mb-2">
                글자 색상
              </label>
              <select
                value={textSettings.memoTextColor}
                onChange={(e) => updateTextSettings({ memoTextColor: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#64748b';
                  e.target.style.boxShadow = '0 0 0 3px rgba(100, 116, 139, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {colorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg border">
              <p className="text-sm text-slate-600 mb-2">미리보기:</p>
              <div 
                style={{ 
                  fontSize: textSettings.memoFontSize,
                  color: textSettings.memoTextColor
                }}
              >
                이번 달 중요한 일들을 기록해보세요.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSettings;