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
    <div className="flex items-center space-x-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white border-opacity-30" style={{fontFamily: "'OnglipBakdahyeonche', sans-serif"}}>
      <button
        onClick={goToPrevious}
        className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-300 text-slate-700 hover:text-slate-900 hover:scale-105 shadow-sm hover:shadow-md"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div className="flex items-center space-x-3">
        <div className="relative">
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="appearance-none bg-slate-100 hover:bg-slate-200 focus:bg-slate-200 border border-slate-300 focus:border-slate-500 rounded-xl px-4 py-3 pr-10 text-slate-800 font-bold text-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all duration-300 shadow-sm hover:shadow-md min-w-[6.25rem] text-center"
          >
            {years.map((y) => (
              <option key={y} value={y} className="bg-white text-slate-800">
                {y}
              </option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        <div className="relative">
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="appearance-none bg-slate-100 hover:bg-slate-200 focus:bg-slate-200 border border-slate-300 focus:border-slate-500 rounded-xl px-4 py-3 pr-10 text-slate-800 font-bold text-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all duration-300 shadow-sm hover:shadow-md min-w-[10rem] text-center"
          >
            {months.map((m) => (
              <option key={m.value} value={m.value} className="bg-white text-slate-800">
                {m.label}
              </option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <button
        onClick={goToNext}
        className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-300 text-slate-700 hover:text-slate-900 hover:scale-105 shadow-sm hover:shadow-md"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default DateSelector;