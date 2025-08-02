const DatePicker = require('../src/DatePicker.js');

describe('DatePicker', () => {
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

  describe('Constructor', () => {
    test('should create DatePicker instance with valid element', () => {
      datePicker = new DatePicker(input);
      expect(datePicker).toBeInstanceOf(DatePicker);
      expect(datePicker.element).toBe(input);
    });

    test('should create DatePicker instance with CSS selector', () => {
      datePicker = new DatePicker('#test-input');
      expect(datePicker).toBeInstanceOf(DatePicker);
      expect(datePicker.element).toBe(input);
    });

    test('should throw error with invalid element', () => {
      expect(() => {
        new DatePicker('#non-existent');
      }).toThrow('DatePicker: Invalid element provided');
    });

    test('should merge options with defaults', () => {
      const options = {
        mode: 'range',
        format: 'Y-m-d',
        theme: 'dark'
      };
      datePicker = new DatePicker(input, options);
      
      expect(datePicker.options.mode).toBe('range');
      expect(datePicker.options.format).toBe('Y-m-d');
      expect(datePicker.options.theme).toBe('dark');
      expect(datePicker.options.locale).toBe('en'); // default value
    });
  });

  describe('Core Methods', () => {
    beforeEach(() => {
      datePicker = new DatePicker(input);
    });

    test('should initialize properly', () => {
      expect(datePicker.init()).toBe(datePicker);
      expect(datePicker.dom.container).toBeTruthy();
    });

    test('should render calendar', () => {
      datePicker.init();
      expect(datePicker.render()).toBe(datePicker);
    });

    test('should destroy properly', () => {
      datePicker.init();
      expect(datePicker.destroy()).toBe(datePicker);
      expect(datePicker.dom).toEqual({});
    });
  });

  describe('Date Management', () => {
    beforeEach(() => {
      datePicker = new DatePicker(input, { mode: 'single' });
      datePicker.init();
    });

    test('should set and get date', () => {
      const testDate = new Date('2024-01-15');
      datePicker.setDate(testDate);
      
      const retrievedDate = datePicker.getDate();
      expect(retrievedDate).toEqual(testDate);
    });

    test('should set date from string', () => {
      datePicker.setDate('2024-01-15');
      const retrievedDate = datePicker.getDate();
      expect(retrievedDate).toBeInstanceOf(Date);
    });

    test('should handle null date', () => {
      datePicker.setDate(null);
      expect(datePicker.getDate()).toBeNull();
    });
  });

  describe('Range Mode', () => {
    beforeEach(() => {
      datePicker = new DatePicker(input, { mode: 'range' });
      datePicker.init();
    });

    test('should return range object', () => {
      const startDate = new Date('2024-01-15');
      const endDate = new Date('2024-01-20');
      
      datePicker.setStartEndDate(startDate, endDate);
      const range = datePicker.getDate();
      
      expect(range).toHaveProperty('start');
      expect(range).toHaveProperty('end');
      expect(range.start).toEqual(startDate);
      expect(range.end).toEqual(endDate);
    });
  });

  describe('Multiple Mode', () => {
    beforeEach(() => {
      datePicker = new DatePicker(input, { mode: 'multiple' });
      datePicker.init();
    });

    test('should return array of dates', () => {
      const dates = datePicker.getDate();
      expect(Array.isArray(dates)).toBe(true);
    });
  });

  describe('Options Management', () => {
    beforeEach(() => {
      datePicker = new DatePicker(input);
      datePicker.init();
    });

    test('should update options', () => {
      const newOptions = { theme: 'dark', format: 'Y-m-d' };
      datePicker.updateOptions(newOptions);
      
      expect(datePicker.options.theme).toBe('dark');
      expect(datePicker.options.format).toBe('Y-m-d');
    });

    test('should set min and max dates', () => {
      const minDate = new Date('2024-01-01');
      const maxDate = new Date('2024-12-31');
      
      datePicker.setMinDate(minDate);
      datePicker.setMaxDate(maxDate);
      
      expect(datePicker.options.minDate).toEqual(minDate);
      expect(datePicker.options.maxDate).toEqual(maxDate);
    });
  });

  describe('Icon Control', () => {
    beforeEach(() => {
      datePicker = new DatePicker(input, { showIcon: true });
      datePicker.init();
    });

    test('should show and hide icon', () => {
      expect(datePicker.showIcon()).toBe(datePicker);
      expect(datePicker.hideIcon()).toBe(datePicker);
      expect(datePicker.toggleIcon()).toBe(datePicker);
    });

    test('should update icon', () => {
      expect(datePicker.updateIcon('📅')).toBe(datePicker);
    });

    test('should set icon position', () => {
      expect(datePicker.setIconPosition('left')).toBe(datePicker);
      expect(datePicker.setIconPosition('right')).toBe(datePicker);
    });
  });

  describe('Date Blocking', () => {
    beforeEach(() => {
      datePicker = new DatePicker(input);
      datePicker.init();
    });

    test('should add and remove disabled dates', () => {
      const testDate = new Date('2024-01-15');
      
      datePicker.addDisabledDates([testDate]);
      expect(datePicker.isDateDisabled(testDate)).toBe(true);
      
      datePicker.removeDisabledDates([testDate]);
      expect(datePicker.isDateDisabled(testDate)).toBe(false);
    });

    test('should clear disabled dates', () => {
      const testDate = new Date('2024-01-15');
      datePicker.addDisabledDates([testDate]);
      
      datePicker.clearDisabledDates();
      expect(datePicker.isDateDisabled(testDate)).toBe(false);
    });

    test('should disable weekends', () => {
      datePicker.setDisableWeekends(true);
      
      // Test a Saturday (day 6)
      const saturday = new Date('2024-01-13'); // This should be a Saturday
      expect(datePicker.isDateDisabled(saturday)).toBe(true);
    });
  });

  describe('Utility Methods', () => {
    beforeEach(() => {
      datePicker = new DatePicker(input);
    });

    test('should format date correctly', () => {
      const testDate = new Date('2024-01-15');
      const formatted = datePicker.formatDate(testDate, 'Y-m-d');
      expect(formatted).toBe('2024-01-15');
    });

    test('should parse date string', () => {
      const parsed = datePicker.parseDate('2024-01-15');
      expect(parsed).toBeInstanceOf(Date);
      expect(parsed.getFullYear()).toBe(2024);
      expect(parsed.getMonth()).toBe(0); // January is 0
      expect(parsed.getDate()).toBe(15);
    });

    test('should compare dates correctly', () => {
      const date1 = new Date('2024-01-15');
      const date2 = new Date('2024-01-15');
      const date3 = new Date('2024-01-16');
      
      expect(datePicker.isSameDay(date1, date2)).toBe(true);
      expect(datePicker.isSameDay(date1, date3)).toBe(false);
    });
  });

  describe('Method Chaining', () => {
    beforeEach(() => {
      datePicker = new DatePicker(input);
      datePicker.init();
    });

    test('should support method chaining', () => {
      const result = datePicker
        .setMinDate('2024-01-01')
        .setMaxDate('2024-12-31')
        .setDisableWeekends(true)
        .updateOptions({ theme: 'dark' });
      
      expect(result).toBe(datePicker);
      expect(datePicker.options.theme).toBe('dark');
      expect(datePicker.options.disableWeekends).toBe(true);
    });
  });
});