import { ValidationError } from '../core/errors';

/**
 * Format a date to YYYY-MM-DD format required by the NHL API
 * @param date - Date string or Date object
 * @returns Date string in YYYY-MM-DD format
 * @throws ValidationError if date format is invalid
 */
export function formatDate(date: string | Date): string {
  if (typeof date === 'string') {
    // Validate YYYY-MM-DD format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new ValidationError(
        `Invalid date format: "${date}". Expected YYYY-MM-DD`
      );
    }

    // Validate that it's a valid date
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      throw new ValidationError(
        `Invalid date: "${date}". Date is not valid`
      );
    }

    return date;
  }

  if (!(date instanceof Date)) {
    throw new ValidationError(
      'Date must be a string in YYYY-MM-DD format or a Date object'
    );
  }

  if (isNaN(date.getTime())) {
    throw new ValidationError('Invalid Date object');
  }

  // Convert Date object to YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Get today's date in YYYY-MM-DD format
 * @returns Today's date string
 */
export function getTodayDate(): string {
  return formatDate(new Date());
}

/**
 * Parse a date string to a Date object
 * @param dateStr - Date string in YYYY-MM-DD format
 * @returns Date object
 */
export function parseDate(dateStr: string): Date {
  const formatted = formatDate(dateStr);
  return new Date(formatted);
}
