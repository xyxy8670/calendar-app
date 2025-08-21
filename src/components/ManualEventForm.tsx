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
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <ul className="text-sm text-red-600 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          날짜
        </label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          일정 제목
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="일정 제목을 입력하세요"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          일정 유형
        </label>
        <select
          id="type"
          value={formData.typeId}
          onChange={(e) => handleInputChange('typeId', e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        >
          {eventTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        일정 추가
      </button>
    </form>
  );
};

export default ManualEventForm;