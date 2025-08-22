import React, { useState } from 'react';
import { useCalendar } from '../contexts/CalendarContext';
import { isValidDate } from '../utils/dateUtils';

const ManualEventForm: React.FC = () => {
  const { state, addEvent } = useCalendar();
  const { eventTypes } = state;
  
  const [formData, setFormData] = useState({
    date: '',
    title: '',
    typeId: eventTypes[0]?.id || '',
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: string[] = [];
    
    if (!formData.date) {
      newErrors.push('날짜를 입력해주세요.');
    } else if (!isValidDate(formData.date)) {
      newErrors.push('올바른 날짜 형식을 입력해주세요. (YYYY-MM-DD)');
    }
    
    if (!formData.title.trim()) {
      newErrors.push('일정 제목을 입력해주세요.');
    }
    
    if (!formData.typeId) {
      newErrors.push('일정 유형을 선택해주세요.');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const selectedType = eventTypes.find(type => type.id === formData.typeId);
    if (!selectedType) {
      setErrors(['선택한 일정 유형을 찾을 수 없습니다.']);
      return;
    }

    addEvent({
      date: formData.date,
      title: formData.title.trim(),
      type: selectedType,
    });

    // Reset form
    setFormData({
      date: '',
      title: '',
      typeId: eventTypes[0]?.id || '',
    });
    setErrors([]);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-red-800 mb-2">입력 오류</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="date" className="flex items-center space-x-2 text-xl font-semibold text-slate-800 mb-3">
            <span>날짜</span>
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '16px',
              boxSizing: 'border-box',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              outline: 'none',
              transition: 'all 0.2s ease',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#64748b';
              e.target.style.boxShadow = '0 0 0 3px rgba(100, 116, 139, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#cbd5e1';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div>
          <label htmlFor="title" className="flex items-center space-x-2 text-xl font-semibold text-slate-800 mb-3">
            <span>일정 제목</span>
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="일정 제목을 입력하세요"
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '16px',
              boxSizing: 'border-box',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              outline: 'none',
              transition: 'all 0.2s ease',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#64748b';
              e.target.style.boxShadow = '0 0 0 3px rgba(100, 116, 139, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#cbd5e1';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div>
          <label htmlFor="type" className="flex items-center space-x-2 text-xl font-semibold text-slate-800 mb-3">
            <span>일정 유형</span>
          </label>
          <select
            id="type"
            value={formData.typeId}
            onChange={(e) => handleInputChange('typeId', e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '16px',
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
            {eventTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          padding: '16px 24px',
          fontSize: '16px',
          fontWeight: '600',
          boxSizing: 'border-box',
          borderRadius: '12px',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          backgroundColor: '#1e293b',
          color: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#334155';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#1e293b';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>일정 추가</span>
      </button>
    </form>
  );
};

export default ManualEventForm;