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
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">일정 유형 관리</h3>
        
        {/* Add new type */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">새 유형 추가</h4>
          <div className="flex space-x-3">
            <input
              type="text"
              value={newType.name}
              onChange={(e) => setNewType(prev => ({ ...prev, name: e.target.value }))}
              placeholder="유형 이름"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={newType.color}
                onChange={(e) => setNewType(prev => ({ ...prev, color: e.target.value }))}
                className="w-10 h-10 border border-gray-300 rounded-md cursor-pointer"
              />
              <div className="flex space-x-1">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewType(prev => ({ ...prev, color }))}
                    className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-gray-400"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={handleAddType}
              disabled={!newType.name.trim()}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              추가
            </button>
          </div>
        </div>

        {/* Existing types */}
        <div className="space-y-2">
          {eventTypes.map((type) => (
            <div key={type.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
              {isEditing === type.id ? (
                <div className="flex items-center space-x-3 flex-1">
                  <input
                    type="text"
                    value={editingType?.name || ''}
                    onChange={(e) => setEditingType(prev => prev ? { ...prev, name: e.target.value } : null)}
                    className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <input
                    type="color"
                    value={editingType?.color || '#3b82f6'}
                    onChange={(e) => setEditingType(prev => prev ? { ...prev, color: e.target.value } : null)}
                    className="w-8 h-8 border border-gray-300 rounded-md cursor-pointer"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleEditSave}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                    >
                      저장
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: type.color }}
                    />
                    <span className="font-medium text-gray-900">{type.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditStart(type)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(type.id)}
                      disabled={eventTypes.length <= 1}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      삭제
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventTypeManager;