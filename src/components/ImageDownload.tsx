import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { useCalendar } from '../contexts/CalendarContext';
import { formatDateForDisplay } from '../utils/dateUtils';

const ImageDownload: React.FC = () => {
  const { state } = useCalendar();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCalendarImage = async () => {
    setIsGenerating(true);
    
    try {
      // 캘린더 컨테이너만 정확히 타겟팅
      const calendarElement = document.getElementById('calendar-container');
      
      if (!calendarElement) {
        throw new Error('캘린더를 찾을 수 없습니다.');
      }

      // 스크롤 위치 저장 및 최상단으로 이동
      const originalScrollX = window.scrollX;
      const originalScrollY = window.scrollY;
      window.scrollTo(0, 0);
      
      // 렌더링 완료 대기
      await new Promise(resolve => setTimeout(resolve, 500));

      // 고정된 크기로 캘린더 캡처 (창 크기와 무관)
      const fixedWidth = 1600;
      const fixedHeight = Math.max(1200, calendarElement.scrollHeight + 100);
      
      const canvas = await html2canvas(calendarElement, {
        allowTaint: true,
        useCORS: true,
        scale: 2, // 고해상도를 위한 스케일
        backgroundColor: '#ffffff',
        width: fixedWidth,
        height: fixedHeight,
        scrollX: 0,
        scrollY: 0,
        logging: false,
        windowWidth: fixedWidth,
        windowHeight: fixedHeight,
        onclone: (clonedDoc) => {
          // 클론된 문서에서 폰트 및 크기 고정
          const clonedElement = clonedDoc.getElementById('calendar-container');
          if (clonedElement) {
            clonedElement.style.fontFamily = "'OnglipBakdahyeonche', sans-serif";
            clonedElement.style.width = fixedWidth + 'px';
            clonedElement.style.minWidth = fixedWidth + 'px';
            clonedElement.style.maxWidth = fixedWidth + 'px';
            clonedElement.style.padding = '20px';
            clonedElement.style.boxSizing = 'border-box';
            
            // 캘린더 내부 요소들도 고정 크기로 설정
            const calendarGrid = clonedElement.querySelector('.calendar-grid, div[style*="grid-template-columns"]');
            if (calendarGrid) {
              (calendarGrid as HTMLElement).style.width = '100%';
              (calendarGrid as HTMLElement).style.minWidth = '100%';
            }
            
            // 날짜 셀들이 제대로 표시되도록 설정
            const dateCells = clonedElement.querySelectorAll('div[style*="min-height"]');
            dateCells.forEach(cell => {
              (cell as HTMLElement).style.minHeight = '120px';
              (cell as HTMLElement).style.height = 'auto';
            });
          }
        }
      });

      // Canvas를 Blob으로 변환하여 다운로드
      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement('a');
          link.download = `calendar-${state.year}-${state.month.toString().padStart(2, '0')}.png`;
          link.href = URL.createObjectURL(blob);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
        }
      }, 'image/png', 1.0);
      
      // 스크롤 위치 복원
      window.scrollTo(originalScrollX, originalScrollY);
      
    } catch (error) {
      console.error('Image generation failed:', error);
      alert('이미지 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <h3 className="text-xl font-semibold text-slate-800">이미지 다운로드</h3>
      </div>
      
      {/* Information */}
      <div style={{
        backgroundColor: 'transparent',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid #d1d5db',
        boxSizing: 'border-box',
        marginBottom: '20px'
      }}>
        <div className="flex items-start space-x-3">
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-2">다운로드 안내</h4>
            <p className="text-base text-slate-700">
              캘린더와 월간메모가 고품질로 저장됩니다<br />
              (넓은 가로형 비율, 3배 해상도)
            </p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div style={{
        backgroundColor: 'transparent',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid #d1d5db',
        boxSizing: 'border-box'
      }}>
        <button
          onClick={generateCalendarImage}
          disabled={isGenerating}
          className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-slate-800 text-white rounded-xl hover:bg-slate-700 focus:outline-none focus:ring-3 focus:ring-slate-300 transition-all duration-200 font-semibold text-lg shadow-sm hover:shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>이미지 생성 중...</span>
            </>
          ) : (
            <>
              <span>{formatDateForDisplay(state.year, state.month)} 달력 다운로드</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};

export default ImageDownload;