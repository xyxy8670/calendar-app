import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { useCalendar } from '../contexts/CalendarContext';
import type { Event, ExcelRow } from '../types';
import { DEFAULT_EVENT_TYPES } from '../types';
import { isValidDate } from '../utils/dateUtils';

const ExcelUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { state, setEvents } = useCalendar();
  const { eventTypes, textSettings } = state;
  const [isDragOver, setIsDragOver] = useState(false);

  const processFile = (file: File) => {
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      alert('Excel 파일만 업로드 가능합니다. (.xlsx, .xls)');
      return;
    }

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
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    processFile(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const excelFile = files.find(file => 
      file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
    );

    if (excelFile) {
      processFile(excelFile);
    } else if (files.length > 0) {
      alert('Excel 파일만 업로드 가능합니다. (.xlsx, .xls)');
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* 드래그 앤 드롭 영역 */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
          style={{
            width: '100%',
            padding: '32px 24px',
            border: `2px dashed ${isDragOver ? '#3b82f6' : '#cbd5e1'}`,
            borderRadius: '16px',
            backgroundColor: isDragOver ? '#eff6ff' : '#f8fafc',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <svg 
            width="48" 
            height="48" 
            fill="none" 
            stroke={isDragOver ? '#3b82f6' : '#64748b'} 
            viewBox="0 0 24 24"
            style={{ transition: 'stroke 0.3s ease' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: isDragOver ? '#1e40af' : '#1e293b'
            }}>
              {isDragOver ? 'Excel 파일을 놓으세요' : 'Excel 파일 업로드'}
            </div>
            
            <div style={{
              fontSize: '14px',
              color: '#64748b',
              lineHeight: '1.5'
            }}>
              파일을 이 영역으로 드래그하거나 클릭하여 업로드하세요<br />
              <span style={{ fontWeight: '500' }}>지원 형식: .xlsx, .xls</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={downloadTemplate}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '12px 24px',
            backgroundColor: '#f1f5f9',
            color: '#475569',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '16px',
            fontWeight: '500',
            fontFamily: textSettings.fontFamily
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e2e8f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f1f5f9';
          }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        style={{ display: 'none' }}
      />
      
    </div>
  );
};

export default ExcelUpload;