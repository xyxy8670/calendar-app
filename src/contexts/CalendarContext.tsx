import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CalendarState, Event, EventType, TextSettings, CalendarSize } from '../types';
import { DEFAULT_EVENT_TYPES, DEFAULT_TEXT_SETTINGS, DEFAULT_CALENDAR_SIZE } from '../types';

interface CalendarContextType {
  state: CalendarState;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  setEvents: (events: Event[]) => void;
  addEventType: (eventType: Omit<EventType, 'id'>) => void;
  updateEventType: (id: string, eventType: Partial<EventType>) => void;
  deleteEventType: (id: string) => void;
  setCommonEvents: (commonEvents: string) => void;
  updateTextSettings: (textSettings: Partial<TextSettings>) => void;
  updateCalendarSize: (calendarSize: CalendarSize) => void;
  setHeaderColor: (color: string) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};

interface CalendarProviderProps {
  children: ReactNode;
}

export const CalendarProvider: React.FC<CalendarProviderProps> = ({ children }) => {
  const currentDate = new Date();
  const [state, setState] = useState<CalendarState>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    events: [],
    eventTypes: DEFAULT_EVENT_TYPES,
    commonEvents: '',
    textSettings: DEFAULT_TEXT_SETTINGS,
    calendarSize: DEFAULT_CALENDAR_SIZE,
    headerColor: '#1f2937',
  });

  const setYear = (year: number) => {
    setState(prev => ({ ...prev, year }));
  };

  const setMonth = (month: number) => {
    setState(prev => ({ ...prev, month }));
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
    };
    setState(prev => ({
      ...prev,
      events: [...prev.events, newEvent],
    }));
  };

  const updateEvent = (id: string, eventUpdate: Partial<Event>) => {
    setState(prev => ({
      ...prev,
      events: prev.events.map(event =>
        event.id === id ? { ...event, ...eventUpdate } : event
      ),
    }));
  };

  const deleteEvent = (id: string) => {
    setState(prev => ({
      ...prev,
      events: prev.events.filter(event => event.id !== id),
    }));
  };

  const setEvents = (events: Event[]) => {
    setState(prev => ({ ...prev, events }));
  };

  const addEventType = (eventType: Omit<EventType, 'id'>) => {
    const newEventType: EventType = {
      ...eventType,
      id: Date.now().toString(),
    };
    setState(prev => ({
      ...prev,
      eventTypes: [...prev.eventTypes, newEventType],
    }));
  };

  const updateEventType = (id: string, eventTypeUpdate: Partial<EventType>) => {
    setState(prev => ({
      ...prev,
      eventTypes: prev.eventTypes.map(eventType =>
        eventType.id === id ? { ...eventType, ...eventTypeUpdate } : eventType
      ),
    }));
  };

  const deleteEventType = (id: string) => {
    setState(prev => ({
      ...prev,
      eventTypes: prev.eventTypes.filter(eventType => eventType.id !== id),
    }));
  };

  const setCommonEvents = (commonEvents: string) => {
    setState(prev => ({ ...prev, commonEvents }));
  };

  const updateTextSettings = (textSettingsUpdate: Partial<TextSettings>) => {
    setState(prev => ({
      ...prev,
      textSettings: { ...prev.textSettings, ...textSettingsUpdate },
    }));
  };

  const updateCalendarSize = (calendarSize: CalendarSize) => {
    setState(prev => ({ ...prev, calendarSize }));
  };

  const setHeaderColor = (color: string) => {
    setState(prev => ({ ...prev, headerColor: color }));
  };

  const value: CalendarContextType = {
    state,
    setYear,
    setMonth,
    addEvent,
    updateEvent,
    deleteEvent,
    setEvents,
    addEventType,
    updateEventType,
    deleteEventType,
    setCommonEvents,
    updateTextSettings,
    updateCalendarSize,
    setHeaderColor,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};