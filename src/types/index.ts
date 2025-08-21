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

export interface CalendarState {
  year: number;
  month: number;
  events: Event[];
  eventTypes: EventType[];
  commonEvents: string;
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