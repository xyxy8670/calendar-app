import React, { useState } from 'react';
import { useCalendar } from '../contexts/CalendarContext';
import type { EventType } from '../types';

const EventTypeManager: React.FC = () => {
  const { state, addEventType, updateEventType, deleteEventType } = useCalendar();
  const { eventTypes } = state;
  
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newType, setNewType] = useState({ name: '', color: '#3b82f6' });
  const [editingType, setEditingType] = useState<EventType | null>(null);

  const handleAddType = () => {
    if (newType.name.trim()) {
      addEventType({
        name: newType.name.trim(),
        color: newType.color,
      });
      setNewType({ name: '', color: '#3b82f6' });
    }
  };

  const handleEditStart = (type: EventType) => {
    setIsEditing(type.id);
    setEditingType({ ...type });
  };

  const handleEditSave = () => {
    if (editingType && editingType.name.trim()) {
      updateEventType(editingType.id, {
        name: editingType.name.trim(),
        color: editingType.color,
      });
      setIsEditing(null);
      setEditingType(null);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(null);
    setEditingType(null);
  };

  const handleDelete = (id: string) => {
    if (eventTypes.length <= 1) {
      alert('최소 하나의 일정 유형은 있어야 합니다.');
      return;
    }
    
    if (confirm('이 일정 유형을 삭제하시겠습니까?')) {
      deleteEventType(id);
    }
  };

  const predefinedColors = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // yellow
    '#ef4444', // red
    '#8b5cf6', // purple
    '#f97316', // orange
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#ec4899', // pink
    '#6b7280', // gray
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <h3 className="text-xl font-semibold text-slate-800">일정 유형 관리</h3>
      </div>
      
      {/* Add new type */}
      <div style={{
        backgroundColor: 'transparent',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid #d1d5db',
        boxSizing: 'border-box',
        marginBottom: '20px'
      }}>
        <div className="flex items-center space-x-2 mb-4">
          <h4 className="text-lg font-semibold text-slate-800">새 유형 추가</h4>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            value={newType.name}
            onChange={(e) => setNewType(prev => ({ ...prev, name: e.target.value }))}
            placeholder="유형 이름을 입력하세요"
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
          <div className="flex items-center space-x-4">
            <input
              type="color"
              value={newType.color}
              onChange={(e) => setNewType(prev => ({ ...prev, color: e.target.value }))}
              style={{
                width: '48px',
                height: '48px',
                boxSizing: 'border-box',
                borderRadius: '12px',
                border: '2px solid #cbd5e1',
                cursor: 'pointer',
                outline: 'none'
              }}
            />
            <div className="flex flex-wrap gap-2 flex-1">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setNewType(prev => ({ ...prev, color }))}
                  className="w-8 h-8 rounded-lg border-2 border-slate-300 hover:border-slate-400 transition-all duration-200"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
          <button
            onClick={handleAddType}
            disabled={!newType.name.trim()}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              boxSizing: 'border-box',
              borderRadius: '12px',
              border: 'none',
              outline: 'none',
              cursor: !newType.name.trim() ? 'not-allowed' : 'pointer',
              backgroundColor: !newType.name.trim() ? '#94a3b8' : '#1e293b',
              color: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (newType.name.trim()) {
                e.currentTarget.style.backgroundColor = '#334155';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (newType.name.trim()) {
                e.currentTarget.style.backgroundColor = '#1e293b';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>유형 추가</span>
          </button>
        </div>
      </div>

      {/* Existing types */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-slate-800 flex items-center space-x-2">
          <span>등록된 유형</span>
        </h4>
        {eventTypes.map((type) => (
          <div key={type.id} style={{
            backgroundColor: 'transparent',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #d1d5db',
            boxSizing: 'border-box',
            marginBottom: '12px'
          }}>
            {isEditing === type.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editingType?.name || ''}
                  onChange={(e) => setEditingType(prev => prev ? { ...prev, name: e.target.value } : null)}
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
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={editingType?.color || '#3b82f6'}
                    onChange={(e) => setEditingType(prev => prev ? { ...prev, color: e.target.value } : null)}
                    style={{
                      width: '48px',
                      height: '48px',
                      boxSizing: 'border-box',
                      borderRadius: '12px',
                      border: '2px solid #cbd5e1',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  />
                  <div className="flex space-x-3 flex-1">
                    <button
                      onClick={handleEditSave}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-3 focus:ring-green-300 transition-all duration-200 font-medium text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>저장</span>
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-3 focus:ring-slate-300 transition-all duration-200 font-medium text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>취소</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-5 h-5 rounded-full border border-slate-300"
                    style={{ backgroundColor: type.color }}
                  />
                  <span className="font-medium text-slate-800 text-base">{type.name}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditStart(type)}
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-3 focus:ring-blue-300 transition-all duration-200 font-medium text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>수정</span>
                  </button>
                  <button
                    onClick={() => handleDelete(type.id)}
                    disabled={eventTypes.length <= 1}
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-3 focus:ring-red-300 transition-all duration-200 font-medium text-sm disabled:bg-slate-400 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>삭제</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventTypeManager;