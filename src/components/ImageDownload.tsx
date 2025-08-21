import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { useCalendar } from '../contexts/CalendarContext';
import { formatDateForDisplay } from '../utils/dateUtils';

const ImageDownload: React.FC = () => {
  const { state } = useCalendar();
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadType, setDownloadType] = useState<'calendar' | 'full'>('full');

  const generateImage = async () => {
    setIsGenerating(true);
    
    try {
      let element: HTMLElement | null = null;
      
      if (downloadType === 'calendar') {
        element = document.getElementById('calendar-container');
      } else {
        element = document.getElementById('app-container');
      }

      if (!element) {
        throw new Error('캘린더 요소를 찾을 수 없습니다.');
      }

      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher resolution
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `calendar-${state.year}-${state.month.toString().padStart(2, '0')}.png`;
      link.href = canvas.toDataURL('image/png');
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Image generation failed:', error);
      alert('이미지 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">이미지 다운로드</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            다운로드 옵션
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="downloadType"
                value="full"
                checked={downloadType === 'full'}
                onChange={(e) => setDownloadType(e.target.value as 'calendar' | 'full')}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">전체 화면 (공통 일정 포함)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="downloadType"
                value="calendar"
                checked={downloadType === 'calendar'}
                onChange={(e) => setDownloadType(e.target.value as 'calendar' | 'full')}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">캘린더만</span>
            </label>
          </div>
        </div>

        <button
          onClick={generateImage}
          disabled={isGenerating}
          className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              이미지 생성 중...
            </>
          ) : (
            <>
              📸 {formatDateForDisplay(state.year, state.month)} 캘린더 다운로드
            </>
          )}
        </button>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p>• 고해상도 PNG 파일로 다운로드됩니다</p>
        <p>• 파일명: calendar-YYYY-MM.png</p>
        <p>• 다운로드 시간은 일정 수에 따라 달라질 수 있습니다</p>
      </div>
    </div>
  );
};

export default ImageDownload;