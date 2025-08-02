// TypeScript definitions for Vanilla DatePicker

export interface DatePickerOptions {
  // Core Options
  mode?: 'single' | 'range' | 'multiple';
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  minDate?: Date | string | null;
  maxDate?: Date | string | null;
  defaultDate?: Date | string | null;
  format?: string;
  locale?: string;
  theme?: string;

  // UI Options
  inline?: boolean;
  position?: 'auto' | 'above' | 'below';
  firstDayOfWeek?: number;
  showWeekNumbers?: boolean;
  weekNumbers?: boolean;

  // Behavior Options
  allowInput?: boolean;
  clickOpens?: boolean;
  closeOnSelect?: boolean;
  disableMobile?: boolean;

  // Icon Options
  showIcon?: boolean;
  iconPosition?: 'left' | 'right';
  customIcon?: string | null;
  iconClass?: string;
  iconClickOpens?: boolean;

  // Time Options
  enableTime?: boolean;
  enableSeconds?: boolean;
  time_24hr?: boolean;

  // Dropdown Options
  enableMonthDropdown?: boolean;
  enableYearDropdown?: boolean;
  yearRange?: number;
  minYear?: number | null;
  maxYear?: number | null;

  // Range Confirmation Options
  confirmRange?: boolean;
  applyButtonText?: string;
  cancelButtonText?: string;

  // Date Blocking Options
  disabledDates?: (Date | string)[];
  disabledDaysOfWeek?: number[];
  disabledDateRanges?: Array<{ start: Date | string; end: Date | string }>;
  enabledDates?: (Date | string)[];
  disableWeekends?: boolean;
  disableFunction?: ((date: Date) => boolean) | null;
  blockPastDates?: boolean;
  blockFutureDates?: boolean;

  // Positioning Options
  appendTo?: string | HTMLElement | null;
  positionX?: number | null;
  positionY?: number | null;
  offsetX?: number;
  offsetY?: number;

  // Event Callbacks
  onReady?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  onChange?: (date: Date | DateRange | Date[] | null) => void;
  onSelect?: (date: Date) => void;
  onClear?: () => void;
  onMonthChange?: (month: number, year: number) => void;
  onYearChange?: (year: number) => void;
  onTimeChange?: (time: TimeObject) => void;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface TimeObject {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CurrentRange {
  start: Date | null;
  end: Date | null;
  confirmed: {
    start: Date | null;
    end: Date | null;
  } | null;
}

export declare class DatePicker {
  constructor(element: string | HTMLElement, options?: DatePickerOptions);

  // Core Methods
  init(): DatePicker;
  render(): DatePicker;
  rerender(): DatePicker;
  destroy(): DatePicker;

  // Visibility Control
  open(): DatePicker;
  close(): DatePicker;
  toggle(): DatePicker;

  // Date Management
  setDate(date: Date | string | null): DatePicker;
  getDate(): Date | DateRange | Date[] | null;
  setStartEndDate(startDate: Date | string | null, endDate: Date | string | null): DatePicker;
  setMinDate(date: Date | string | null): DatePicker;
  setMaxDate(date: Date | string | null): DatePicker;

  // Icon Control
  showIcon(): DatePicker;
  hideIcon(): DatePicker;
  toggleIcon(): DatePicker;
  updateIcon(customIcon: string | null): DatePicker;
  setIconPosition(position: 'left' | 'right'): DatePicker;

  // Dropdown Control
  enableMonthDropdown(): DatePicker;
  disableMonthDropdown(): DatePicker;
  enableYearDropdown(): DatePicker;
  disableYearDropdown(): DatePicker;
  setYearRange(range: number): DatePicker;
  setYearLimits(minYear: number, maxYear: number): DatePicker;

  // Date Blocking
  addDisabledDates(dates: (Date | string)[] | Date | string): DatePicker;
  removeDisabledDates(dates: (Date | string)[] | Date | string): DatePicker;
  clearDisabledDates(): DatePicker;
  addDisabledDateRange(startDate: Date | string, endDate: Date | string): DatePicker;
  removeDisabledDateRange(startDate: Date | string, endDate: Date | string): DatePicker;
  clearDisabledDateRanges(): DatePicker;
  setDisabledDaysOfWeek(days: number[] | number): DatePicker;
  addDisabledDaysOfWeek(days: number[] | number): DatePicker;
  removeDisabledDaysOfWeek(days: number[] | number): DatePicker;
  setDisableWeekends(disable: boolean): DatePicker;
  setBlockPastDates(block: boolean): DatePicker;
  setBlockFutureDates(block: boolean): DatePicker;
  setEnabledDates(dates: (Date | string)[]): DatePicker;
  clearEnabledDates(): DatePicker;
  setDisableFunction(fn: ((date: Date) => boolean) | null): DatePicker;

  // Range Confirmation
  enableRangeConfirmation(applyText?: string, cancelText?: string): DatePicker;
  disableRangeConfirmation(): DatePicker;
  getCurrentRange(): CurrentRange | null;

  // Positioning
  setAppendTo(target: string | HTMLElement | null): DatePicker;
  setPosition(x: number | null, y: number | null): DatePicker;
  setPositionX(x: number | null): DatePicker;
  setPositionY(y: number | null): DatePicker;
  setOffset(offsetX: number, offsetY: number): DatePicker;
  resetPosition(): DatePicker;

  // Locale and Options
  setLocale(locale: string): DatePicker;
  updateOptions(newOptions: Partial<DatePickerOptions>): DatePicker;

  // Utility Methods
  formatDate(date: Date, format: string): string;
  parseDate(dateStr: string): Date | null;
  isSameDay(date1: Date, date2: Date): boolean;
  isDateDisabled(date: Date): boolean;
  isDateSelected(date: Date): boolean;
}

export default DatePicker;
