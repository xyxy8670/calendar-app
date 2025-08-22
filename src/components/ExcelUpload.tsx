import React, { useRef } from 'react';
import * as XLSX from 'xlsx';
import { useCalendar } from '../contexts/CalendarContext';
import type { Event, ExcelRow } from '../types';
import { DEFAULT_EVENT_TYPES } from '../types';
import { isValidDate } from '../utils/dateUtils';

const ExcelUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { state, setEvents } = useCalendar();
  const { eventTypes } = state;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet);

        const newEvents: Event[] = [];
        const errors: string[] = [];

        jsonData.forEach((row, index) => {
          const rowNumber = index + 2; // Excel rows start from 1, plus header

          // Extract date from possible column names
          const date = row.date || row['날짜'] || row['Date'] || '';
          const title = row.title || row['일정'] || row['Title'] || row['내용'] || '';
          const typeName = row.type || row['유형'] || row['Type'] || '일정';

          // Validate data
          if (!date) {
            errors.push(`행 ${rowNumber}: 날짜가 없습니다.`);
            return;
          }

          if (!title) {
            errors.push(`행 ${rowNumber}: 일정 제목이 없습니다.`);
            return;
          }

          // Format date if needed
          let formattedDate = String(date);
          if (formattedDate.includes('/')) {
            const parts = formattedDate.split('/');
            if (parts.length === 3) {
              formattedDate = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
            }
          }

          if (!isValidDate(formattedDate)) {
            errors.push(`행 ${rowNumber}: 잘못된 날짜 형식입니다. (${formattedDate})`);
            return;
          }

          // Find event type
          let eventType = eventTypes.find(type => type.name === typeName);
          if (!eventType) {
            eventType = DEFAULT_EVENT_TYPES.find(type => type.name === '일정') || DEFAULT_EVENT_TYPES[0];
          }

          newEvents.push({
            id: `${Date.now()}-${index}`,
            date: formattedDate,
            title: String(title),
            type: eventType,
          });
        });

        if (errors.length > 0) {
          alert(`오류가 발생했습니다:\n${errors.join('\n')}\n\n유효한 데이터만 추가됩니다.`);
        }

        if (newEvents.length > 0) {
          setEvents([...state.events, ...newEvents]);
          alert(`${newEvents.length}개의 일정이 추가되었습니다.`);
        }

      } catch (error) {
        alert('파일을 읽는 중 오류가 발생했습니다. 올바른 Excel 파일인지 확인해주세요.');
        console.error('Excel parsing error:', error);
      }
    };

    reader.readAsArrayBuffer(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const downloadTemplate = () => {
    const template = [
      { date: '2025-08-01', title: '프로젝트 킥오프', type: '일정' },
      { date: '2025-08-15', title: '월간 매출 목표 달성', type: '실적' },
      { date: '2025-08-20', title: '우수 직원 포상', type: '상장' },
      { date: '2025-08-25', title: 'IPO 청약 시작', type: '청약' },
    ];

    const worksheet = XLSX.utils.json_to_sheet(template);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Calendar Template');
    XLSX.writeFile(workbook, 'calendar_template.xlsx');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <button
          onClick={handleUploadClick}
          className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-slate-800 text-white rounded-xl hover:bg-slate-700 focus:outline-none focus:ring-3 focus:ring-slate-300 transition-all duration-200 font-semibold text-base shadow-sm hover:shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          <span>Excel 파일 업로드</span>
        </button>
        
        <button
          onClick={downloadTemplate}
          className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 focus:outline-none focus:ring-3 focus:ring-slate-300 transition-all duration-200 font-medium text-base"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>템플릿 다운로드</span>
        </button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        className="hidden"
      />
      
    </div>
  );
};

export default ExcelUpload;