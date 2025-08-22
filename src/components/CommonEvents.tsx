import React, { useState } from 'react';
import { useCalendar } from '../contexts/CalendarContext';

const CommonEvents: React.FC = () => {
  const { state, setCommonEvents } = useCalendar();
  const { commonEvents } = state;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(commonEvents);

  const handleSave = () => {
    setCommonEvents(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(commonEvents);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setEditValue(commonEvents);
    setIsEditing(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <h3 className="text-xl font-semibold text-slate-800">월간 메모</h3>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="ml-auto flex items-center space-x-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-3 focus:ring-slate-300 transition-all duration-200 font-medium text-base"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>편집</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="이번 달에 대한 메모나 공통 일정을 추가하세요..."
              rows={6}
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
                resize: 'none'
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
            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>저장</span>
              </button>
              <button
                onClick={handleCancel}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  boxSizing: 'border-box',
                  borderRadius: '12px',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  backgroundColor: '#94a3b8',
                  color: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#64748b';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#94a3b8';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>취소</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="min-h-[120px] bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            {commonEvents ? (
              <div className="text-slate-700 whitespace-pre-wrap leading-relaxed text-base">
                {commonEvents}
              </div>
            ) : (
              <div className="text-slate-400 text-center py-8 text-base flex flex-col items-center space-y-3">
                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>아직 월간 메모가 없습니다.<br />편집을 클릭해서 추가해보세요.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonEvents;