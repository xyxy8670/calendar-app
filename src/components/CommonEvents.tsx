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
    <div id="common-events" className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          Month Notes
        </h3>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder="Add notes or common events for this month..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-[80px]">
          {commonEvents ? (
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {commonEvents}
            </div>
          ) : (
            <div className="text-gray-400 italic">
              No month notes yet. Click Edit to add some.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommonEvents;