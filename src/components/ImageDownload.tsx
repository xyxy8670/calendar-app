import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { useCalendar } from '../contexts/CalendarContext';
import { formatDateForDisplay } from '../utils/dateUtils';

const ImageDownload: React.FC = () => {
  const { state } = useCalendar();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCalendarImage = async () => {
    setIsGenerating(true);
    
    // 상태 복원을 위한 변수들
    let originalScrollX = 0;
    let originalScrollY = 0;
    let originalHeight = '';
    let originalWidth = '';
    let originalMaxWidth = '';
    let originalMargin = '';
    let calendarElement: HTMLElement | null = null;
    
    try {
      // 캘린더 컨테이너만 정확히 타겟팅 (월간메모 포함)
      calendarElement = document.getElementById('calendar-container');
      
      if (!calendarElement) {
        throw new Error('캘린더를 찾을 수 없습니다.');
      }

      // 스크롤 위치 저장 및 최상단으로 이동
      originalScrollX = window.scrollX;
      originalScrollY = window.scrollY;
      window.scrollTo(0, 0);
      
      // 캘린더 요소의 원래 스타일 저장
      originalHeight = calendarElement.style.height;
      originalWidth = calendarElement.style.width;
      originalMaxWidth = calendarElement.style.maxWidth;
      originalMargin = calendarElement.style.margin;
      
      // 캘린더를 전체 크기로 임시 확장
      calendarElement.style.width = 'auto';
      calendarElement.style.maxWidth = 'none';
      calendarElement.style.height = 'auto';
      calendarElement.style.margin = '0';
      calendarElement.style.position = 'relative';
      calendarElement.style.transform = 'none';
      
      // 잠시 대기하여 렌더링 완료 보장
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 실제 렌더링된 크기 확인
      const rect = calendarElement.getBoundingClientRect();
      console.log('Calendar dimensions:', rect.width, rect.height);
      console.log('Scroll dimensions:', calendarElement.scrollWidth, calendarElement.scrollHeight);

      const canvas = await html2canvas(calendarElement, {
        backgroundColor: '#ffffff',
        scale: 1, // 스케일을 1로 줄여서 안정성 확보
        logging: true,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        // 고정된 큰 윈도우 크기 사용
        windowWidth: Math.max(1400, calendarElement.scrollWidth),
        windowHeight: Math.max(1200, calendarElement.scrollHeight),
        width: calendarElement.scrollWidth,
        height: calendarElement.scrollHeight,
        onclone: (clonedDoc) => {
          // 클론된 문서에서 모든 텍스트 크기 유지
          const clonedElement = clonedDoc.getElementById('calendar-container');
          if (clonedElement) {
            // 원본 스타일 유지하면서 폰트만 보장
            clonedElement.style.fontFamily = "'OnglipBakdahyeonche', sans-serif";
            
            // 모든 텍스트 요소의 크기 강제 설정
            const textElements = clonedElement.querySelectorAll('*');
            textElements.forEach((el: any) => {
              const originalEl = calendarElement?.querySelector(`[data-clone-id="${el.dataset.cloneId}"]`) || el;
              const computedStyle = window.getComputedStyle(originalEl);
              
              // 텍스트 크기 및 스타일 강제 적용
              if (computedStyle.fontSize) {
                el.style.fontSize = computedStyle.fontSize;
                el.style.setProperty('font-size', computedStyle.fontSize, 'important');
              }
              if (computedStyle.lineHeight) {
                el.style.lineHeight = computedStyle.lineHeight;
              }
              if (computedStyle.fontWeight) {
                el.style.fontWeight = computedStyle.fontWeight;
              }
              if (computedStyle.color) {
                el.style.color = computedStyle.color;
              }
              
              // 박스 크기도 유지
              if (computedStyle.width && el.tagName === 'SELECT') {
                el.style.width = computedStyle.width;
                el.style.minWidth = computedStyle.minWidth;
              }
            });
          }
        }
      });

      // 직접 다운로드
      const link = document.createElement('a');
      link.download = `calendar-${state.year}-${state.month.toString().padStart(2, '0')}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Image generation failed:', error);
      alert('이미지 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      // 원래 상태 복원
      if (calendarElement) {
        calendarElement.style.height = originalHeight;
        calendarElement.style.width = originalWidth;
        calendarElement.style.maxWidth = originalMaxWidth;
        calendarElement.style.margin = originalMargin;
        calendarElement.style.position = '';
        calendarElement.style.transform = '';
      }
      window.scrollTo(originalScrollX, originalScrollY);
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