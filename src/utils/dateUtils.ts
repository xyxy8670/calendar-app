import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { CalendarDay, Event } from '../types';

export const getDaysInMonth = (year: number, month: number): CalendarDay[] => {
  const startDate = new Date(year, month - 1, 1);
  const monthStart = startOfMonth(startDate);
  const monthEnd = endOfMonth(startDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Start on Sunday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  return days.map(day => ({
    date: day.getDate(),
    isCurrentMonth: isSameMonth(day, startDate),
    events: []
  }));
};

export const formatDateForDisplay = (year: number, month: number): string => {
  const date = new Date(year, month - 1, 1);
  return format(date, 'yyyy년 M월', { locale: ko });
};

export const getWeekdays = (): string[] => {
  return ['일', '월', '화', '수', '목', '금', '토'];
};

export const formatDateKey = (year: number, month: number, day: number): string => {
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

export const getEventsForDate = (events: Event[], year: number, month: number, day: number): Event[] => {
  const dateKey = formatDateKey(year, month, day);
  return events.filter(event => event.date === dateKey);
};

export const isValidDate = (dateString: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};