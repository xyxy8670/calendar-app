import React from 'react';
import { useCalendar } from '../contexts/CalendarContext';

const DateSelector: React.FC = () => {
  const { state, setYear, setMonth } = useCalendar();
  const { year, month } = state;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  const months = [
    { value: 1, label: '1월' },
    { value: 2, label: '2월' },
    { value: 3, label: '3월' },
    { value: 4, label: '4월' },
    { value: 5, label: '5월' },
    { value: 6, label: '6월' },
    { value: 7, label: '7월' },
    { value: 8, label: '8월' },
    { value: 9, label: '9월' },
    { value: 10, label: '10월' },
    { value: 11, label: '11월' },
    { value: 12, label: '12월' },
  ];

  const goToPrevious = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const goToNext = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div style={{
      fontFamily: "'OnglipBakdahyeonche', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(8px)',
      borderRadius: '16px',
      padding: '20px 32px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      margin: '0 auto',
      maxWidth: 'fit-content',
      width: 'auto'
    }}>
      {/* 큰 텍스트로 년월 표시 */}
      <div style={{
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#1e293b',
        textAlign: 'center',
        lineHeight: '1.2',
        marginBottom: '8px'
      }}>
        {year}년 {months.find(m => m.value === month)?.label}
      </div>
      
      {/* 컨트롤 버튼들 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <button
          onClick={goToPrevious}
          style={{
            padding: '10px',
            backgroundColor: '#f1f5f9',
            borderRadius: '12px',
            border: 'none',
            color: '#475569',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e2e8f0';
            e.currentTarget.style.color = '#1e293b';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f1f5f9';
            e.currentTarget.style.color = '#475569';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{ position: 'relative' }}>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              style={{
                appearance: 'none',
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '8px 32px 8px 12px',
                color: '#1e293b',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                minWidth: '80px',
                textAlign: 'center',
                fontFamily: "'OnglipBakdahyeonche', sans-serif"
              }}
            >
              {years.map((y) => (
                <option key={y} value={y} style={{ backgroundColor: '#ffffff', color: '#1e293b' }}>
                  {y}
                </option>
              ))}
            </select>
            <svg style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '14px',
              height: '14px',
              color: '#64748b',
              pointerEvents: 'none'
            }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          <div style={{ position: 'relative' }}>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              style={{
                appearance: 'none',
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '8px 32px 8px 12px',
                color: '#1e293b',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                minWidth: '80px',
                textAlign: 'center',
                fontFamily: "'OnglipBakdahyeonche', sans-serif"
              }}
            >
              {months.map((m) => (
                <option key={m.value} value={m.value} style={{ backgroundColor: '#ffffff', color: '#1e293b' }}>
                  {m.label}
                </option>
              ))}
            </select>
            <svg style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '14px',
              height: '14px',
              color: '#64748b',
              pointerEvents: 'none'
            }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <button
          onClick={goToNext}
          style={{
            padding: '10px',
            backgroundColor: '#f1f5f9',
            borderRadius: '12px',
            border: 'none',
            color: '#475569',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e2e8f0';
            e.currentTarget.style.color = '#1e293b';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f1f5f9';
            e.currentTarget.style.color = '#475569';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DateSelector;