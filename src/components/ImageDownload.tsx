import React, { useState } from 'react';
// @ts-ignore
import domtoimage from 'dom-to-image-more';
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
    let calendarElement: HTMLElement | null = null;
    let originalStyles: any = {};
    
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
      
      // 원본 캘린더의 모든 스타일 저장
      originalStyles = {
        width: calendarElement.style.width,
        maxWidth: calendarElement.style.maxWidth,
        margin: calendarElement.style.margin,
        padding: calendarElement.style.padding,
        position: calendarElement.style.position,
        transform: calendarElement.style.transform,
        fontSize: calendarElement.style.fontSize,
        backgroundColor: calendarElement.style.backgroundColor,
        overflow: calendarElement.style.overflow
      };
      
      // 캘린더에 직접 이미지 캡처용 스타일 적용 (!important로 강제 적용)
      calendarElement.style.setProperty('width', '800px', 'important');
      calendarElement.style.setProperty('max-width', '800px', 'important');
      calendarElement.style.setProperty('margin', '48px', 'important');
      calendarElement.style.setProperty('padding', '0', 'important');
      calendarElement.style.setProperty('position', 'relative', 'important');
      calendarElement.style.setProperty('transform', 'none', 'important');
      calendarElement.style.setProperty('font-size', '14px', 'important');
      calendarElement.style.setProperty('background-color', '#ffffff', 'important');
      calendarElement.style.setProperty('overflow', 'visible', 'important');
      
      // 렌더링 완료 대기
      await new Promise(resolve => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(resolve); // 3번 호출로 확실히 대기
          });
        });
      });

      // 실제 렌더링된 크기 확인
      const rect = calendarElement.getBoundingClientRect();
      console.log('캡처 전 캘린더 사이즈:', rect.width, rect.height);

      // dom-to-image-more를 사용하여 PNG 생성 (원본 캘린더 직접 캡처)
      const dataUrl = await domtoimage.toPng(calendarElement, {
        quality: 1.0,
        bgcolor: '#ffffff',
        scale: 1, // 스케일 1로 안정성 확보
        style: {
          fontFamily: "'OnglipBakdahyeonche', sans-serif"
        },
        filter: function() {
          return true;
        }
      });

      // 직접 다운로드
      const link = document.createElement('a');
      link.download = `calendar-${state.year}-${state.month.toString().padStart(2, '0')}.png`;
      link.href = dataUrl;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Image generation failed:', error);
      alert('이미지 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      // 원본 캘린더 스타일 복원 (!important 제거 후 원래 값 설정)
      if (calendarElement) {
        // !important 스타일들 제거
        calendarElement.style.removeProperty('width');
        calendarElement.style.removeProperty('max-width');
        calendarElement.style.removeProperty('margin');
        calendarElement.style.removeProperty('padding');
        calendarElement.style.removeProperty('position');
        calendarElement.style.removeProperty('transform');
        calendarElement.style.removeProperty('font-size');
        calendarElement.style.removeProperty('background-color');
        calendarElement.style.removeProperty('overflow');
        
        // 원래 스타일 복원
        Object.keys(originalStyles).forEach(key => {
          if (originalStyles[key]) {
            calendarElement!.style[key as any] = originalStyles[key];
          }
        });
      }
      // 스크롤 위치 복원
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