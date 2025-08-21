import { useState } from 'react';
import { isValidDate } from '../utils/dateUtils';
import type { EventType } from '../types';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const useValidation = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const validateEvent = (
    date: string,
    title: string,
    typeId: string,
    eventTypes: EventType[]
  ): ValidationResult => {
    const validationErrors: string[] = [];

    // Date validation
    if (!date) {
      validationErrors.push('날짜를 입력해주세요.');
    } else if (!isValidDate(date)) {
      validationErrors.push('올바른 날짜 형식을 입력해주세요. (YYYY-MM-DD)');
    }

    // Title validation
    if (!title.trim()) {
      validationErrors.push('일정 제목을 입력해주세요.');
    } else if (title.trim().length > 50) {
      validationErrors.push('일정 제목은 50자를 초과할 수 없습니다.');
    }

    // Type validation
    if (!typeId) {
      validationErrors.push('일정 유형을 선택해주세요.');
    } else if (!eventTypes.find(type => type.id === typeId)) {
      validationErrors.push('선택한 일정 유형을 찾을 수 없습니다.');
    }

    setErrors(validationErrors);
    return {
      isValid: validationErrors.length === 0,
      errors: validationErrors,
    };
  };

  const validateEventType = (name: string, color: string): ValidationResult => {
    const validationErrors: string[] = [];

    // Name validation
    if (!name.trim()) {
      validationErrors.push('유형 이름을 입력해주세요.');
    } else if (name.trim().length > 20) {
      validationErrors.push('유형 이름은 20자를 초과할 수 없습니다.');
    }

    // Color validation
    if (!color) {
      validationErrors.push('색상을 선택해주세요.');
    } else if (!/^#[0-9A-F]{6}$/i.test(color)) {
      validationErrors.push('올바른 색상 형식이 아닙니다.');
    }

    setErrors(validationErrors);
    return {
      isValid: validationErrors.length === 0,
      errors: validationErrors,
    };
  };

  const validateExcelData = (data: any[]): { validRows: any[], errors: string[] } => {
    const validRows: any[] = [];
    const validationErrors: string[] = [];

    data.forEach((row, index) => {
      const rowNumber = index + 2; // Excel rows start from 1, plus header
      const rowErrors: string[] = [];

      // Extract data
      const date = row.date || row['날짜'] || row['Date'] || '';
      const title = row.title || row['일정'] || row['Title'] || row['내용'] || '';
      
      // Validate each row
      if (!date) {
        rowErrors.push(`행 ${rowNumber}: 날짜가 없습니다.`);
      } else {
        // Format date if needed
        let formattedDate = String(date);
        if (formattedDate.includes('/')) {
          const parts = formattedDate.split('/');
          if (parts.length === 3) {
            formattedDate = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
          }
        }
        
        if (!isValidDate(formattedDate)) {
          rowErrors.push(`행 ${rowNumber}: 잘못된 날짜 형식입니다. (${formattedDate})`);
        } else {
          row.formattedDate = formattedDate;
        }
      }

      if (!title) {
        rowErrors.push(`행 ${rowNumber}: 일정 제목이 없습니다.`);
      } else if (String(title).length > 50) {
        rowErrors.push(`행 ${rowNumber}: 일정 제목이 너무 깁니다. (최대 50자)`);
      }

      if (rowErrors.length === 0) {
        validRows.push(row);
      } else {
        validationErrors.push(...rowErrors);
      }
    });

    setErrors(validationErrors);
    return { validRows, errors: validationErrors };
  };

  const clearErrors = () => {
    setErrors([]);
  };

  return {
    errors,
    validateEvent,
    validateEventType,
    validateExcelData,
    clearErrors,
  };
};