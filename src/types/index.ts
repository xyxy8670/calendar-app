export interface Event {
  id: string;
  date: string; // YYYY-MM-DD format
  title: string;
  type: EventType;
}

export interface EventType {
  id: string;
  name: string;
  color: string;
}

export interface TextSettings {
  eventFontSize: string; // CSS 크기 값 (예: '14px', '1rem')
  eventTextColor: string; // CSS 색상 값 (예: '#000000')
  memoFontSize: string;
  memoTextColor: string;
  fontFamily: string; // 글꼴 설정
}

export interface CalendarSize {
  width: number; // 가로 크기 (%)
  height: number; // 세로 크기 (%)
}

export interface CalendarState {
  year: number;
  month: number;
  events: Event[];
  eventTypes: EventType[];
  commonEvents: string;
  textSettings: TextSettings;
  calendarSize: CalendarSize;
  headerColor: string; // 헤더 배경색
}

export interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  events: Event[];
}

export interface ExcelRow {
  date: string;
  title: string;
  type?: string;
  날짜?: string;
  일정?: string;
  Date?: string;
  Title?: string;
  내용?: string;
  유형?: string;
  Type?: string;
  [key: string]: any; // Allow any additional properties
}

export const DEFAULT_EVENT_TYPES: EventType[] = [
  { id: '1', name: '일정', color: '#3b82f6' }, // blue
  { id: '2', name: '실적', color: '#10b981' }, // green
  { id: '3', name: '상장', color: '#f59e0b' }, // yellow
  { id: '4', name: '청약', color: '#ef4444' }, // red
];

export const DEFAULT_TEXT_SETTINGS: TextSettings = {
  eventFontSize: '0.875rem',
  eventTextColor: '#1e293b', 
  memoFontSize: '1rem',
  memoTextColor: '#374151',
  fontFamily: "'OnglipBakdahyeonche', sans-serif"
};

export const FONT_OPTIONS = [
  { name: '온글잎 박다현체', value: "'OnglipBakdahyeonche', sans-serif" },
  { name: 'Pretendard', value: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif" },
  { name: '나눔고딕', value: "'Nanum Gothic', sans-serif" },
  { name: '맑은 고딕', value: "'Malgun Gothic', sans-serif" },
  { name: '시스템 기본', value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }
];

export const HEADER_COLOR_OPTIONS = [
  { name: '다크 그레이', value: '#1f2937' },
  { name: '블루', value: '#1e40af' },
  { name: '그린', value: '#166534' },
  { name: '퍼플', value: '#7c2d91' },
  { name: '인디고', value: '#3730a3' },
  { name: '레드', value: '#dc2626' }
];

export const DEFAULT_CALENDAR_SIZE: CalendarSize = {
  width: 70,
  height: 100
};