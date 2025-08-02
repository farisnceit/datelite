# DatePicker API Reference

## Table of Contents
1. [Constructor](#constructor)
2. [Configuration Options](#configuration-options)
3. [Core Methods](#core-methods)
4. [Date Management](#date-management)
5. [Feature Control](#feature-control)
6. [Event Callbacks](#event-callbacks)
7. [Utility Methods](#utility-methods)
8. [Static Properties](#static-properties)

## Constructor

### `new DatePicker(element, options)`

Creates a new DatePicker instance.

**Parameters:**
- `element` (string|HTMLElement) - CSS selector or DOM element
- `options` (Object) - Configuration options

**Returns:** DatePicker instance

**Example:**
```javascript
// Using CSS selector
const picker1 = new DatePicker('#my-input');

// Using DOM element
const input = document.getElementById('my-input');
const picker2 = new DatePicker(input);

// With options
const picker3 = new DatePicker('#my-input', {
    mode: 'range',
    format: 'Y-m-d',
    theme: 'dark'
});
```

## Configuration Options

### Core Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `mode` | string | `'single'` | Selection mode: `'single'`, `'range'`, `'multiple'` |
| `format` | string | `'Y-m-d'` | Date format string |
| `locale` | string | `'en'` | Locale for month/day names |
| `defaultDate` | Date\|string | `null` | Default selected date |
| `inline` | boolean | `false` | Display inline instead of popup |
| `theme` | string | `'default'` | Theme: `'default'`, `'dark'`, `'minimal'` |

### Date Constraints

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `minDate` | Date\|string | `null` | Minimum selectable date |
| `maxDate` | Date\|string | `null` | Maximum selectable date |
| `disabledDates` | Array | `[]` | Array of specific dates to disable |
| `disabledDaysOfWeek` | Array | `[]` | Array of weekdays to disable (0=Sunday) |
| `disabledDateRanges` | Array | `[]` | Array of date ranges to disable |
| `enabledDates` | Array | `[]` | Whitelist of allowed dates |
| `disableWeekends` | boolean | `false` | Disable weekends |
| `blockPastDates` | boolean | `false` | Block all past dates |
| `blockFutureDates` | boolean | `false` | Block all future dates |
| `disableFunction` | Function | `null` | Custom function to disable dates |

### UI Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `showIcon` | boolean | `true` | Show calendar icon |
| `iconPosition` | string | `'right'` | Icon position: `'left'`, `'right'` |
| `customIcon` | string | `null` | Custom icon HTML/SVG |
| `iconClass` | string | `'datepicker-icon'` | CSS class for icon |
| `iconClickOpens` | boolean | `true` | Click icon to open |
| `position` | string | `'auto'` | Popup position: `'auto'`, `'above'`, `'below'` |
| `firstDayOfWeek` | number | `0` | First day of week (0=Sunday) |

### Behavior Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `closeOnSelect` | boolean | `true` | Auto-close after selection |
| `allowInput` | boolean | `true` | Allow manual input |
| `clickOpens` | boolean | `true` | Click input to open |
| `confirmRange` | boolean | `false` | Show Apply/Cancel for ranges |
| `applyButtonText` | string | `'Apply'` | Apply button text |
| `cancelButtonText` | string | `'Cancel'` | Cancel button text |

### Time Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableTime` | boolean | `false` | Enable time selection |
| `enableSeconds` | boolean | `false` | Enable seconds in time |
| `time_24hr` | boolean | `true` | Use 24-hour format |

### Dropdown Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableMonthDropdown` | boolean | `true` | Show month dropdown |
| `enableYearDropdown` | boolean | `true` | Show year dropdown |
| `yearRange` | number | `100` | Years before/after current |
| `minYear` | number | `null` | Minimum year in dropdown |
| `maxYear` | number | `null` | Maximum year in dropdown |

## Core Methods

### `init()`
Initialize the DatePicker.

**Returns:** DatePicker instance

**Example:**
```javascript
const picker = new DatePicker('#input');
picker.init(); // Usually called automatically
```

### `render()`
Render the calendar.

**Returns:** DatePicker instance

### `rerender()`
Re-render the calendar with current state.

**Returns:** DatePicker instance

### `destroy()`
Clean up and remove the DatePicker.

**Returns:** DatePicker instance

**Example:**
```javascript
picker.destroy();
picker = null; // Clear reference
```

### `open()`
Open the DatePicker popup.

**Returns:** DatePicker instance

### `close()`
Close the DatePicker popup.

**Returns:** DatePicker instance

### `toggle()`
Toggle DatePicker visibility.

**Returns:** DatePicker instance

## Date Management

### `setDate(date)`
Set the selected date(s).

**Parameters:**
- `date` (Date|string) - Date to select

**Returns:** DatePicker instance

**Example:**
```javascript
picker.setDate(new Date());
picker.setDate('2024-12-25');
```

### `getDate()`
Get the selected date(s).

**Returns:** 
- Single mode: Date or null
- Range mode: `{start: Date, end: Date}`
- Multiple mode: Array of Dates

**Example:**
```javascript
// Single mode
const date = picker.getDate(); // Date or null

// Range mode
const range = picker.getDate(); // {start: Date, end: Date}
console.log(range.start, range.end);

// Multiple mode
const dates = picker.getDate(); // [Date, Date, ...]
```

### `setStartEndDate(startDate, endDate)`
Set range dates (range mode only).

**Parameters:**
- `startDate` (Date|string) - Start date
- `endDate` (Date|string) - End date

**Returns:** DatePicker instance

### `setMinDate(date)`
Set minimum selectable date.

**Parameters:**
- `date` (Date|string|null) - Minimum date

**Returns:** DatePicker instance

### `setMaxDate(date)`
Set maximum selectable date.

**Parameters:**
- `date` (Date|string|null) - Maximum date

**Returns:** DatePicker instance

## Feature Control

### Icon Control

#### `showIcon()`
Show the calendar icon.

**Returns:** DatePicker instance

#### `hideIcon()`
Hide the calendar icon.

**Returns:** DatePicker instance

#### `toggleIcon()`
Toggle icon visibility.

**Returns:** DatePicker instance

#### `updateIcon(customIcon)`
Update the icon.

**Parameters:**
- `customIcon` (string|null) - Custom icon HTML or null for default

**Returns:** DatePicker instance

#### `setIconPosition(position)`
Set icon position.

**Parameters:**
- `position` (string) - `'left'` or `'right'`

**Returns:** DatePicker instance

### Dropdown Control

#### `enableMonthDropdown()`
Enable month dropdown.

**Returns:** DatePicker instance

#### `disableMonthDropdown()`
Disable month dropdown.

**Returns:** DatePicker instance

#### `enableYearDropdown()`
Enable year dropdown.

**Returns:** DatePicker instance

#### `disableYearDropdown()`
Disable year dropdown.

**Returns:** DatePicker instance

#### `setYearRange(range)`
Set year range for dropdown.

**Parameters:**
- `range` (number) - Years before/after current year

**Returns:** DatePicker instance

#### `setYearLimits(minYear, maxYear)`
Set year limits for dropdown.

**Parameters:**
- `minYear` (number) - Minimum year
- `maxYear` (number) - Maximum year

**Returns:** DatePicker instance

### Date Blocking

#### `addDisabledDates(dates)`
Add dates to disable list.

**Parameters:**
- `dates` (Array|Date|string) - Date(s) to disable

**Returns:** DatePicker instance

**Example:**
```javascript
picker.addDisabledDates(['2024-12-25', '2024-01-01']);
picker.addDisabledDates(new Date('2024-07-04'));
```

#### `removeDisabledDates(dates)`
Remove dates from disable list.

**Parameters:**
- `dates` (Array|Date|string) - Date(s) to enable

**Returns:** DatePicker instance

#### `clearDisabledDates()`
Clear all disabled dates.

**Returns:** DatePicker instance

#### `addDisabledDateRange(startDate, endDate)`
Add date range to disable.

**Parameters:**
- `startDate` (Date|string) - Range start
- `endDate` (Date|string) - Range end

**Returns:** DatePicker instance

#### `removeDisabledDateRange(startDate, endDate)`
Remove date range from disable list.

**Parameters:**
- `startDate` (Date|string) - Range start
- `endDate` (Date|string) - Range end

**Returns:** DatePicker instance

#### `clearDisabledDateRanges()`
Clear all disabled date ranges.

**Returns:** DatePicker instance

#### `setDisabledDaysOfWeek(days)`
Set disabled days of week.

**Parameters:**
- `days` (Array|number) - Day(s) to disable (0=Sunday)

**Returns:** DatePicker instance

**Example:**
```javascript
picker.setDisabledDaysOfWeek([0, 6]); // Disable weekends
picker.setDisabledDaysOfWeek(1); // Disable Mondays
```

#### `addDisabledDaysOfWeek(days)`
Add days of week to disable.

**Parameters:**
- `days` (Array|number) - Day(s) to disable

**Returns:** DatePicker instance

#### `removeDisabledDaysOfWeek(days)`
Remove days of week from disable list.

**Parameters:**
- `days` (Array|number) - Day(s) to enable

**Returns:** DatePicker instance

#### `setDisableWeekends(disable)`
Enable/disable weekend blocking.

**Parameters:**
- `disable` (boolean) - True to disable weekends

**Returns:** DatePicker instance

#### `setBlockPastDates(block)`
Enable/disable past date blocking.

**Parameters:**
- `block` (boolean) - True to block past dates

**Returns:** DatePicker instance

#### `setBlockFutureDates(block)`
Enable/disable future date blocking.

**Parameters:**
- `block` (boolean) - True to block future dates

**Returns:** DatePicker instance

#### `setEnabledDates(dates)`
Set whitelist of allowed dates.

**Parameters:**
- `dates` (Array) - Array of allowed dates

**Returns:** DatePicker instance

#### `clearEnabledDates()`
Clear whitelist (allow all dates).

**Returns:** DatePicker instance

#### `setDisableFunction(fn)`
Set custom disable function.

**Parameters:**
- `fn` (Function|null) - Function that returns true to disable date

**Returns:** DatePicker instance

**Example:**
```javascript
picker.setDisableFunction(function(date) {
    // Disable Fridays
    return date.getDay() === 5;
});
```

### Range Confirmation

#### `enableRangeConfirmation(applyText, cancelText)`
Enable range confirmation mode.

**Parameters:**
- `applyText` (string) - Apply button text (default: 'Apply')
- `cancelText` (string) - Cancel button text (default: 'Cancel')

**Returns:** DatePicker instance

#### `disableRangeConfirmation()`
Disable range confirmation mode.

**Returns:** DatePicker instance

#### `getCurrentRange()`
Get current range selection (including temporary).

**Returns:** Object with current range info

**Example:**
```javascript
const range = picker.getCurrentRange();
console.log('Current:', range.start, range.end);
console.log('Confirmed:', range.confirmed.start, range.confirmed.end);
```

### Locale and Options

#### `setLocale(locale)`
Set locale for month/day names.

**Parameters:**
- `locale` (string) - Locale code

**Returns:** DatePicker instance

#### `updateOptions(newOptions)`
Update configuration options.

**Parameters:**
- `newOptions` (Object) - Options to update

**Returns:** DatePicker instance

**Example:**
```javascript
picker.updateOptions({
    theme: 'dark',
    format: 'F j, Y',
    closeOnSelect: false
});
```

## Event Callbacks

All callbacks receive the DatePicker instance as `this` context.

### `onReady()`
Called when DatePicker is initialized.

**Example:**
```javascript
const picker = new DatePicker('#input', {
    onReady: function() {
        console.log('DatePicker ready');
    }
});
```

### `onChange(date)`
Called when date selection changes.

**Parameters:**
- `date` - Selected date(s) (format depends on mode)

**Example:**
```javascript
const picker = new DatePicker('#input', {
    onChange: function(date) {
        console.log('Date changed:', date);
    }
});
```

### `onSelect(date)`
Called when a date is clicked.

**Parameters:**
- `date` (Date) - Clicked date

### `onOpen()`
Called when DatePicker opens.

### `onClose()`
Called when DatePicker closes.

### `onClear()`
Called when dates are cleared.

### `onMonthChange(month, year)`
Called when month changes.

**Parameters:**
- `month` (number) - New month (0-11)
- `year` (number) - Current year

### `onYearChange(year)`
Called when year changes.

**Parameters:**
- `year` (number) - New year

### `onTimeChange(time)`
Called when time changes.

**Parameters:**
- `time` (Object) - Time object `{hours, minutes, seconds}`

## Utility Methods

### `formatDate(date, format)`
Format a date according to format string.

**Parameters:**
- `date` (Date) - Date to format
- `format` (string) - Format string

**Returns:** Formatted date string

**Format Tokens:**
- `Y` - 4-digit year
- `m` - Month with leading zero
- `d` - Day with leading zero
- `H` - Hours with leading zero
- `i` - Minutes with leading zero
- `s` - Seconds with leading zero

### `parseDate(dateStr)`
Parse date string to Date object.

**Parameters:**
- `dateStr` (string) - Date string

**Returns:** Date object or null

### `isSameDay(date1, date2)`
Check if two dates are the same day.

**Parameters:**
- `date1` (Date) - First date
- `date2` (Date) - Second date

**Returns:** Boolean

### `isDateDisabled(date)`
Check if a date is disabled.

**Parameters:**
- `date` (Date) - Date to check

**Returns:** Boolean

### `isDateSelected(date)`
Check if a date is selected.

**Parameters:**
- `date` (Date) - Date to check

**Returns:** Boolean

## Static Properties

### `DatePicker.version`
Current version of the DatePicker.

### `DatePicker.defaults`
Default configuration options.

## Method Chaining

Most methods return the DatePicker instance, allowing for method chaining:

```javascript
const picker = new DatePicker('#input')
    .setMinDate('2024-01-01')
    .setMaxDate('2024-12-31')
    .addDisabledDates(['2024-12-25', '2024-01-01'])
    .setDisableWeekends(true)
    .updateOptions({ theme: 'dark' });
```

## Error Handling

The DatePicker handles errors gracefully:

```javascript
// Invalid dates return null
const invalidDate = picker.parseDate('invalid-date'); // null

// Invalid elements throw errors
try {
    const picker = new DatePicker('#nonexistent');
} catch (error) {
    console.error('Element not found');
}

// Methods validate parameters
picker.setDate('invalid-date'); // Logs warning, returns this
```

## Browser Support

- Modern browsers (ES6+ support required)
- IE11+ (with polyfills for ES6 features)
- Mobile browsers (iOS Safari, Chrome Mobile)

## TypeScript Support

TypeScript definitions can be added:

```typescript
interface DatePickerOptions {
    mode?: 'single' | 'range' | 'multiple';
    format?: string;
    locale?: string;
    // ... other options
}

declare class DatePicker {
    constructor(element: string | HTMLElement, options?: DatePickerOptions);
    setDate(date: Date | string): DatePicker;
    getDate(): Date | null | {start: Date, end: Date} | Date[];
    // ... other methods
}
```