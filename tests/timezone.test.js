const DatePicker = require('../src/DatePicker.js');

describe('DatePicker Timezone Handling', () => {
  let input;
  let datePicker;

  beforeEach(() => {
    input = createTestElement();
  });

  afterEach(() => {
    if (datePicker) {
      datePicker.destroy();
      datePicker = null;
    }
    cleanupTestElements();
  });

  describe('parseDate method', () => {
    beforeEach(() => {
      datePicker = new DatePicker(input);
    });

    test('should parse YYYY-MM-DD format as local date, not UTC', () => {
      const dateStr = '2024-01-15';
      const parsed = datePicker.parseDate(dateStr);
      
      // The parsed date should be local midnight, not UTC midnight
      expect(parsed).toBeInstanceOf(Date);
      expect(parsed.getFullYear()).toBe(2024);
      expect(parsed.getMonth()).toBe(0); // January is 0
      expect(parsed.getDate()).toBe(15);
    });

    test('should preserve date when parsing YYYY-MM-DD regardless of timezone', () => {
      const dateStr = '2024-01-15';
      const parsed = datePicker.parseDate(dateStr);
      
      // The date should remain 2024-01-15 in local time
      // This test would fail with the old `new Date(dateStr)` approach
      // in timezones behind UTC
      expect(parsed.getFullYear()).toBe(2024);
      expect(parsed.getMonth()).toBe(0);
      expect(parsed.getDate()).toBe(15);
    });

    test('should handle invalid date strings', () => {
      const invalidDate = datePicker.parseDate('invalid-date');
      expect(invalidDate).toBeNull();
    });

    test('should handle out-of-range dates gracefully', () => {
      // JavaScript Date handles invalid dates by adjusting (e.g., month 13 becomes January of next year)
      // This is expected behavior - the Date constructor normalizes values
      const outOfRange = datePicker.parseDate('2024-13-40');
      expect(outOfRange).toBeInstanceOf(Date);
      // Date(2024, 12, 40) = Date(2025, 1, 9) - this is JavaScript's standard behavior
      expect(outOfRange.getFullYear()).toBe(2025);
    });

    test('should handle null or undefined input', () => {
      expect(datePicker.parseDate(null)).toBeNull();
      expect(datePicker.parseDate(undefined)).toBeNull();
    });

    test('should parse other date formats as fallback', () => {
      // Test ISO 8601 format with time
      const isoDate = datePicker.parseDate('2024-01-15T12:00:00Z');
      expect(isoDate).toBeInstanceOf(Date);
      
      // Test other valid formats
      const usDate = datePicker.parseDate('1/15/2024');
      expect(usDate).toBeInstanceOf(Date);
    });
  });

  describe('handleCalendarClick with timezone-safe date parsing', () => {
    beforeEach(() => {
      datePicker = new DatePicker(input, { mode: 'single' });
      datePicker.init();
    });

    test('should correctly select date from data-date attribute', () => {
      // Simulate clicking a day button
      const dayButton = document.createElement('button');
      dayButton.className = 'datepicker-day';
      dayButton.dataset.date = '2024-01-15';
      
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      
      Object.defineProperty(clickEvent, 'target', {
        value: dayButton,
        enumerable: true
      });
      
      datePicker.handleCalendarClick(clickEvent);
      
      const selectedDate = datePicker.getDate();
      expect(selectedDate).toBeInstanceOf(Date);
      expect(selectedDate.getFullYear()).toBe(2024);
      expect(selectedDate.getMonth()).toBe(0);
      expect(selectedDate.getDate()).toBe(15);
    });
  });
});
