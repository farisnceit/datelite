# 📅 DateLite

A modern, lightweight, and highly customizable date picker component built with **pure vanilla JavaScript**. Zero dependencies, full-featured, and beautifully designed.

[![npm version](https://img.shields.io/npm/v/@farisnceit/datelite.svg)](https://www.npmjs.com/package/@farisnceit/datelite)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@farisnceit/datelite)](https://bundlephobia.com/package/@farisnceit/datelite)

## ✨ Features

- 🎯 **Zero Dependencies** - Pure vanilla JavaScript
- 🎨 **Modern Design** - Clean, professional UI with smooth animations
- 🔧 **Highly Customizable** - 50+ CSS variables for theming
- 📱 **Fully Responsive** - Works perfectly on all devices
- ♿ **Accessible** - ARIA labels and keyboard navigation
- 🌍 **i18n Support** - Multi-language support
- 🎭 **Multiple Modes** - Single, range, and multiple date selection
- 🚫 **Date Restrictions** - Flexible date blocking options
- ⚡ **Lightweight** - ~25KB JS + ~15KB CSS (minified)
- 🎪 **Framework Agnostic** - Works with any framework or vanilla JS

## 🚀 Quick Start

### Installation

```bash
# NPM
npm install @farisnceit/datelite

# Yarn
yarn add @farisnceit/datelite

# PNPM
pnpm add @farisnceit/datelite
```

### CDN

```html
<!-- CSS -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@farisnceit/datelite/dist/datelite.min.css"
/>

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/@farisnceit/datelite/dist/datelite.min.js"></script>
```

### Basic Usage

```html
<input type="text" id="datepicker" placeholder="Select a date" />

<script>
  const picker = new DatePicker('#datepicker', {
    mode: 'single',
    format: 'Y-m-d',
  });
</script>
```

## � Framework Integration

### 🟨 Vanilla JavaScript

#### Simple Date Picker

```javascript
// Import CSS and JS
import '@farisnceit/datelite/dist/datelite.min.css';
import DatePicker from '@farisnceit/datelite';

// Create instance
const picker = new DatePicker('#datepicker', {
  mode: 'single',
  format: 'Y-m-d',
  onChange: (selectedDate) => {
    console.log('Selected:', selectedDate);
  },
});

// Programmatic control
picker.setDate(new Date());
picker.open();
```

#### Range Picker with Confirmation

```javascript
const rangePicker = new DatePicker('#date-range', {
  mode: 'range',
  confirmRange: true,
  applyButtonText: 'Apply',
  cancelButtonText: 'Cancel',
  onChange: (dates) => {
    console.log('Start:', dates.start);
    console.log('End:', dates.end);
  },
});
```

#### Dynamic Configuration

```javascript
const picker = new DatePicker('#datepicker');

// Update configuration dynamically
picker.updateOptions({
  minDate: new Date(),
  maxDate: new Date(2026, 11, 31),
  disableWeekends: true,
});

// Add disabled dates
picker.addDisabledDates(['2026-12-25', '2026-01-01']);

// Change theme
picker.updateOptions({ theme: 'dark' });
```

### ⚛️ React Integration

#### Functional Component with Hooks

```jsx
import { useEffect, useRef, useState } from 'react';
import DatePicker from '@farisnceit/datelite';
import '@farisnceit/datelite/dist/datelite.min.css';

function DatePickerComponent({ mode = 'single', onChange }) {
  const inputRef = useRef(null);
  const pickerRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Initialize DatePicker
    pickerRef.current = new DatePicker(inputRef.current, {
      mode,
      format: 'Y-m-d',
      onChange: (date) => {
        setSelectedDate(date);
        onChange?.(date);
      },
      onReady: () => {
        console.log('DatePicker ready');
      },
    });

    // Cleanup on unmount
    return () => {
      if (pickerRef.current) {
        pickerRef.current.destroy();
      }
    };
  }, [mode, onChange]);

  // Update picker when props change
  useEffect(() => {
    if (pickerRef.current) {
      pickerRef.current.updateOptions({ mode });
    }
  }, [mode]);

  const handleClear = () => {
    if (pickerRef.current) {
      pickerRef.current.clear();
      setSelectedDate(null);
    }
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Select a date" className="date-input" />
      {selectedDate && (
        <div className="selected-info">
          <p>Selected: {selectedDate.toString()}</p>
          <button onClick={handleClear}>Clear</button>
        </div>
      )}
    </div>
  );
}

export default DatePickerComponent;
```

#### Range Picker Component

```jsx
import { useEffect, useRef, useState } from 'react';
import DatePicker from '@farisnceit/datelite';
import '@farisnceit/datelite/dist/datelite.min.css';

function DateRangePicker({ onRangeSelect }) {
  const inputRef = useRef(null);
  const pickerRef = useRef(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  useEffect(() => {
    pickerRef.current = new DatePicker(inputRef.current, {
      mode: 'range',
      confirmRange: true,
      format: 'Y-m-d',
      blockPastDates: true,
      onChange: (dates) => {
        setDateRange(dates);
        onRangeSelect?.(dates);
      },
    });

    return () => pickerRef.current?.destroy();
  }, [onRangeSelect]);

  return (
    <div className="date-range-picker">
      <input ref={inputRef} type="text" placeholder="Select date range" />
      {dateRange.start && dateRange.end && (
        <div className="range-info">
          <span>From: {dateRange.start.toLocaleDateString()}</span>
          <span>To: {dateRange.end.toLocaleDateString()}</span>
        </div>
      )}
    </div>
  );
}
```

#### Custom Hook for DatePicker

```jsx
import { useEffect, useRef } from 'react';
import DatePicker from '@farisnceit/datelite';

function useDatePicker(options = {}) {
  const inputRef = useRef(null);
  const pickerRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && !pickerRef.current) {
      pickerRef.current = new DatePicker(inputRef.current, options);
    }

    return () => {
      if (pickerRef.current) {
        pickerRef.current.destroy();
        pickerRef.current = null;
      }
    };
  }, []);

  const updateOptions = (newOptions) => {
    if (pickerRef.current) {
      pickerRef.current.updateOptions(newOptions);
    }
  };

  const setDate = (date) => {
    if (pickerRef.current) {
      pickerRef.current.setDate(date);
    }
  };

  const getDate = () => {
    return pickerRef.current ? pickerRef.current.getDate() : null;
  };

  const clear = () => {
    if (pickerRef.current) {
      pickerRef.current.handleClear();
    }
  };

  return { inputRef, pickerRef, updateOptions, setDate, getDate, clear };
}

// Usage
function App() {
  const { inputRef, setDate, clear } = useDatePicker({
    mode: 'single',
    onChange: (date) => console.log('Selected:', date),
  });

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={() => setDate(new Date())}>Today</button>
      <button onClick={clear}>Clear</button>
    </div>
  );
}
```

### 🟩 Vue.js Integration

#### Vue 3 Composition API

```vue
<template>
  <div class="datepicker-wrapper">
    <input ref="dateInput" type="text" placeholder="Select a date" class="date-input" />
    <div v-if="selectedDate" class="date-info">
      <p>Selected: {{ formatDate(selectedDate) }}</p>
      <button @click="clearDate">Clear</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import DatePicker from '@farisnceit/datelite';
import '@farisnceit/datelite/dist/datelite.min.css';

const props = defineProps({
  mode: {
    type: String,
    default: 'single',
  },
  minDate: Date,
  maxDate: Date,
});

const emit = defineEmits(['change', 'select']);

const dateInput = ref(null);
const selectedDate = ref(null);
let picker = null;

onMounted(() => {
  picker = new DatePicker(dateInput.value, {
    mode: props.mode,
    format: 'Y-m-d',
    minDate: props.minDate,
    maxDate: props.maxDate,
    onChange: (date) => {
      selectedDate.value = date;
      emit('change', date);
    },
    onSelect: (date) => {
      emit('select', date);
    },
  });
});

onBeforeUnmount(() => {
  if (picker) {
    picker.destroy();
  }
});

// Watch for prop changes
watch(
  () => props.minDate,
  (newVal) => {
    if (picker) {
      picker.setMinDate(newVal);
    }
  }
);

watch(
  () => props.maxDate,
  (newVal) => {
    if (picker) {
      picker.setMaxDate(newVal);
    }
  }
);

const clearDate = () => {
  if (picker) {
    picker.handleClear();
    selectedDate.value = null;
  }
};

const formatDate = (date) => {
  return date ? date.toLocaleDateString() : '';
};
</script>

<style scoped>
.datepicker-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.date-input {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.date-info {
  padding: 10px;
  background: #f8fafc;
  border-radius: 6px;
}
</style>
```

#### Vue 3 Range Picker Component

```vue
<template>
  <div class="range-picker">
    <input ref="rangeInput" type="text" placeholder="Select date range" />
    <div v-if="range.start && range.end" class="range-display">
      <span>{{ formatDateRange(range.start, range.end) }}</span>
      <button @click="resetRange">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import DatePicker from '@farisnceit/datelite';
import '@farisnceit/datelite/dist/datelite.min.css';

const emit = defineEmits(['rangeChange']);

const rangeInput = ref(null);
const range = ref({ start: null, end: null });
let picker = null;

onMounted(() => {
  picker = new DatePicker(rangeInput.value, {
    mode: 'range',
    confirmRange: true,
    blockPastDates: true,
    onChange: (dates) => {
      range.value = dates;
      emit('rangeChange', dates);
    },
  });
});

onBeforeUnmount(() => {
  picker?.destroy();
});

const resetRange = () => {
  picker?.handleClear();
  range.value = { start: null, end: null };
};

const formatDateRange = (start, end) => {
  const formatDate = (date) =>
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  return `${formatDate(start)} - ${formatDate(end)}`;
};
</script>
```

#### Vue 2 Options API

```vue
<template>
  <div>
    <input ref="datepicker" type="text" placeholder="Select a date" />
  </div>
</template>

<script>
import DatePicker from '@farisnceit/datelite';
import '@farisnceit/datelite/dist/datelite.min.css';

export default {
  name: 'DatePickerComponent',
  props: {
    mode: {
      type: String,
      default: 'single',
    },
    format: {
      type: String,
      default: 'Y-m-d',
    },
  },
  data() {
    return {
      picker: null,
      selectedDate: null,
    };
  },
  mounted() {
    this.picker = new DatePicker(this.$refs.datepicker, {
      mode: this.mode,
      format: this.format,
      onChange: (date) => {
        this.selectedDate = date;
        this.$emit('change', date);
      },
      onOpen: () => {
        this.$emit('open');
      },
      onClose: () => {
        this.$emit('close');
      },
    });
  },
  beforeDestroy() {
    if (this.picker) {
      this.picker.destroy();
    }
  },
  methods: {
    setDate(date) {
      if (this.picker) {
        this.picker.setDate(date);
      }
    },
    clear() {
      if (this.picker) {
        this.picker.handleClear();
      }
    },
  },
};
</script>
```

## �📖 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get started in 5 minutes
- **[User Documentation](examples/documentation.html)** - Complete interactive guide
- **[Developer Guide](DEVELOPER_GUIDE.md)** - Technical documentation
- **[Publishing Guide](PUBLISH_GUIDE.md)** - For contributors

## 🎯 Selection Modes

### Single Date

```javascript
const picker = new DatePicker('#input', {
  mode: 'single',
  format: 'Y-m-d',
});
```

### Date Range

```javascript
const picker = new DatePicker('#input', {
  mode: 'range',
  format: 'Y-m-d',
});
```

### Multiple Dates

```javascript
const picker = new DatePicker('#input', {
  mode: 'multiple',
  closeOnSelect: false,
});
```

### Date & Time

```javascript
const picker = new DatePicker('#input', {
  mode: 'single',
  enableTime: true,
  time_24hr: false,
});
```

### Inline Calendar

```javascript
const picker = new DatePicker('#calendar-container', {
  inline: true,
  mode: 'single',
});
```

## 🚫 Date Restrictions

### Block Weekends

```javascript
const picker = new DatePicker('#input', {
  disableWeekends: true,
});
```

### Block Past Dates

```javascript
const picker = new DatePicker('#input', {
  blockPastDates: true,
});
```

### Min/Max Dates

```javascript
const picker = new DatePicker('#input', {
  minDate: new Date(),
  maxDate: new Date(2024, 11, 31),
});
```

### Disable Specific Dates

```javascript
const picker = new DatePicker('#input', {
  disabledDates: ['2024-12-25', '2024-01-01', new Date(2024, 6, 4)],
});
```

### Custom Disable Function

```javascript
const picker = new DatePicker('#input', {
  disableFunction: function (date) {
    // Disable all Fridays
    return date.getDay() === 5;
  },
});
```

## 🎨 Theming

### Built-in Themes

```javascript
const picker = new DatePicker('#input', {
  theme: 'dark', // 'default', 'dark', 'minimal'
});
```

### Custom Theme with CSS Variables

```css
:root {
  --dp-primary-color: #3b82f6;
  --dp-primary-hover: #1d4ed8;
  --dp-bg-primary: #ffffff;
  --dp-text-primary: #1e293b;
  --dp-border-radius-lg: 12px;
}
```

## 📍 Positioning

### Auto Positioning

```javascript
const picker = new DatePicker('#input', {
  position: 'auto', // Smart positioning
});
```

### Fixed Position

```javascript
const picker = new DatePicker('#input', {
  position: 'bottom', // 'top', 'bottom', 'left', 'right'
  offsetX: 10,
  offsetY: 5,
});
```

### Absolute Coordinates

```javascript
const picker = new DatePicker('#input', {
  positionX: 100, // 100px from left
  positionY: 200, // 200px from top
});
```

## 🔧 API Methods

### Initialization

```javascript
const picker = new DatePicker(element, options);
// element: CSS selector string or HTMLElement
// options: Configuration object (see below)
```

### Date Management

```javascript
// Set single date or range
picker.setDate(new Date());
picker.setDate('2026-12-25');
picker.setStartEndDate('2026-01-01', '2026-01-31'); // Range mode

// Get selected date(s)
const date = picker.getDate();
// Returns: Date object (single), Object with start/end (range), or Array (multiple)

// Clear selection
picker.clear();
```

### Date Restrictions

```javascript
// Set min/max dates
picker.setMinDate(new Date());
picker.setMaxDate(new Date(2026, 11, 31));

// Disable specific dates
picker.addDisabledDates(['2026-12-25', '2026-01-01']);
picker.removeDisabledDates(['2026-01-01']);
picker.clearDisabledDates();

// Disable date ranges
picker.addDisabledDateRange('2026-07-01', '2026-07-15');
picker.clearDisabledDateRanges();

// Disable days of week (0 = Sunday, 6 = Saturday)
picker.setDisabledDaysOfWeek([0, 6]); // Disable weekends
picker.addDisabledDaysOfWeek([5]); // Also disable Friday
picker.removeDisabledDaysOfWeek([5]);

// Quick toggles
picker.setDisableWeekends(true);
picker.setBlockPastDates(true);
picker.setBlockFutureDates(true);

// Enabled dates (whitelist mode)
picker.setEnabledDates(['2026-01-15', '2026-01-20', '2026-01-25']);
picker.clearEnabledDates();

// Custom disable function
picker.setDisableFunction((date) => {
  // Disable all Fridays the 13th
  return date.getDate() === 13 && date.getDay() === 5;
});
```

### UI Controls

```javascript
// Open/Close/Toggle
picker.open();
picker.close();
picker.toggle();

// Icon management
picker.showIcon();
picker.hideIcon();
picker.toggleIcon();
picker.updateIcon('<svg>...</svg>'); // Custom icon HTML
picker.setIconPosition('left'); // 'left' or 'right'
```

### Navigation

```javascript
// Enable/disable dropdowns
picker.enableMonthDropdown();
picker.disableMonthDropdown();
picker.enableYearDropdown();
picker.disableYearDropdown();

// Set year range and limits
picker.setYearRange(50); // 50 years before and after current
picker.setYearLimits(2020, 2030); // Min and max years
```

### Positioning

```javascript
// Set custom position
picker.setPosition(100, 200); // x, y in pixels
picker.setPositionX(100);
picker.setPositionY(200);
picker.setOffset(10, 5); // Offset from calculated position
picker.resetPosition(); // Reset to default

// Change append target
picker.setAppendTo('body');
picker.setAppendTo('#my-container');
picker.setAppendTo(document.getElementById('container'));
```

### Range Confirmation

```javascript
// Enable confirmation buttons for range mode
picker.enableRangeConfirmation('Apply', 'Cancel');
picker.disableRangeConfirmation();

// Get current range (including temporary selection)
const range = picker.getCurrentRange();
// Returns: { start: Date, end: Date, confirmed: { start, end } }
```

### Configuration Updates

```javascript
// Update multiple options at once
picker.updateOptions({
  theme: 'dark',
  format: 'd-m-Y',
  minDate: new Date(),
  disableWeekends: true,
});
```

### Locale

```javascript
// Set locale
picker.setLocale('es');
```

### Cleanup

```javascript
// Destroy instance and remove all event listeners
picker.destroy();
```

### Utility Methods

```javascript
// Format date
const formatted = picker.formatDate(new Date(), 'Y-m-d');

// Parse date string
const date = picker.parseDate('2026-12-25');
```

## ⚙️ Configuration Options

### Core Options

```javascript
{
  mode: 'single',              // 'single', 'range', 'multiple'
  format: 'Y-m-d',             // Date format string
  defaultDate: null,            // Initial date
  locale: 'en',                // Locale for text
  inline: false,               // Display inline vs popup
  theme: 'default',            // 'default', 'dark', 'minimal'
}
```

### Date Constraints

```javascript
{
  minDate: null,               // Minimum selectable date
  maxDate: null,               // Maximum selectable date
  disabledDates: [],           // Array of disabled dates
  disabledDaysOfWeek: [],      // [0-6] Sunday=0
  disabledDateRanges: [],      // [{start: Date, end: Date}]
  enabledDates: [],            // Whitelist (overrides disabled)
  disableWeekends: false,      // Quick weekend disable
  blockPastDates: false,       // Block all past dates
  blockFutureDates: false,     // Block all future dates
  disableFunction: null,       // Custom disable logic
}
```

### UI Options

```javascript
{
  showIcon: true,              // Show calendar icon
  iconPosition: 'right',       // 'left', 'right'
  customIcon: null,            // Custom icon HTML/SVG
  iconClass: 'datepicker-icon', // Icon CSS class
  iconClickOpens: true,        // Click icon to open
  position: 'auto',            // 'auto', 'above', 'below'
  firstDayOfWeek: 0,           // 0=Sun, 1=Mon
  appendTo: null,              // Element to append to
  positionX: null,             // Fixed X position
  positionY: null,             // Fixed Y position
  offsetX: 0,                  // X offset
  offsetY: 0,                  // Y offset
}
```

### Behavior Options

```javascript
{
  closeOnSelect: true,         // Auto-close after selection
  allowInput: true,            // Allow manual input
  clickOpens: true,            // Click input to open
  confirmRange: false,         // Show Apply/Cancel for ranges
  applyButtonText: 'Apply',    // Apply button text
  cancelButtonText: 'Cancel',  // Cancel button text
}
```

### Time Options

```javascript
{
  enableTime: false,           // Enable time picker
  enableSeconds: false,        // Show seconds
  time_24hr: true,            // 24-hour format
}
```

### Dropdown Options

```javascript
{
  enableMonthDropdown: true,   // Month dropdown
  enableYearDropdown: true,    // Year dropdown
  yearRange: 100,              // Years ± current
  minYear: null,               // Min year in dropdown
  maxYear: null,               // Max year in dropdown
}
```

## 🎯 Advanced Usage Examples

### Booking System with Restrictions

```javascript
const bookingPicker = new DatePicker('#booking-date', {
  mode: 'range',
  blockPastDates: true,
  disableWeekends: false,
  confirmRange: true,
  minDate: new Date(),
  maxDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),

  // Block holiday dates
  disabledDates: [
    '2026-12-25', // Christmas
    '2026-01-01', // New Year
    '2026-07-04', // Independence Day
  ],

  // Custom logic: block dates that are already booked
  disableFunction: (date) => {
    const bookedDates = getBookedDatesFromAPI(); // Your API call
    return bookedDates.includes(date.toISOString().split('T')[0]);
  },

  onChange: (dates) => {
    if (dates.start && dates.end) {
      calculatePrice(dates.start, dates.end);
      checkAvailability(dates.start, dates.end);
    }
  },
});
```

### Multi-Select Calendar for Events

```javascript
const eventPicker = new DatePicker('#event-dates', {
  mode: 'multiple',
  closeOnSelect: false,
  inline: true,
  theme: 'minimal',

  onChange: (dates) => {
    console.log(`${dates.length} dates selected`);
    updateEventsList(dates);
  },

  onSelect: (date) => {
    console.log('Date toggled:', date);
  },
});

// Add/remove dates programmatically
eventPicker.setDate('2026-01-15');
eventPicker.setDate('2026-01-20');
```

### Time-Based Appointment Picker

```javascript
const appointmentPicker = new DatePicker('#appointment', {
  mode: 'single',
  enableTime: true,
  time_24hr: false,
  blockPastDates: true,

  // Only allow business days
  disabledDaysOfWeek: [0, 6], // Disable Sun & Sat

  // Only allow business hours (9 AM - 5 PM)
  disableFunction: (date) => {
    const hours = date.getHours();
    return hours < 9 || hours >= 17;
  },

  onChange: (date) => {
    if (date) {
      checkAppointmentAvailability(date);
    }
  },
});
```

### Dynamic Configuration Based on User Role

```javascript
function createDatePicker(userRole) {
  const baseConfig = {
    mode: 'range',
    format: 'Y-m-d',
  };

  // Admin can select any date
  if (userRole === 'admin') {
    return new DatePicker('#date-range', baseConfig);
  }

  // Regular users can only select future dates
  if (userRole === 'user') {
    return new DatePicker('#date-range', {
      ...baseConfig,
      blockPastDates: true,
      maxDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    });
  }

  // Guests can only view, not select
  if (userRole === 'guest') {
    return new DatePicker('#date-range', {
      ...baseConfig,
      inline: true,
      allowInput: false,
      clickOpens: false,
    });
  }
}
```

### Inline Calendar Dashboard Widget

```javascript
const dashboardCalendar = new DatePicker('#dashboard-calendar', {
  inline: true,
  mode: 'multiple',
  theme: 'dark',
  showIcon: false,

  // Highlight dates with events
  disableFunction: (date) => {
    // Don't disable, just use for styling
    const dateStr = date.toISOString().split('T')[0];
    if (hasEvent(dateStr)) {
      // Add custom class via DOM manipulation
      setTimeout(() => {
        const cell = document.querySelector(`[data-date="${dateStr}"]`);
        if (cell) cell.classList.add('has-event');
      }, 0);
    }
    return false; // Don't actually disable
  },

  onChange: (dates) => {
    showEventsForDates(dates);
  },
});
```

### Responsive Mobile-First Implementation

```javascript
const isMobile = window.innerWidth < 768;

const responsivePicker = new DatePicker('#responsive-date', {
  mode: 'single',
  inline: isMobile, // Inline on mobile, popup on desktop
  position: isMobile ? 'auto' : 'below',
  theme: isMobile ? 'minimal' : 'default',
  closeOnSelect: !isMobile, // Don't auto-close on mobile

  onChange: (date) => {
    // Handle responsive layout updates
    if (isMobile) {
      showMobileConfirmation(date);
    } else {
      updateDesktopForm(date);
    }
  },
});

// Handle orientation/resize changes
window.addEventListener('resize', () => {
  const nowMobile = window.innerWidth < 768;
  if (nowMobile !== isMobile) {
    responsivePicker.updateOptions({
      inline: nowMobile,
      closeOnSelect: !nowMobile,
    });
  }
});
```

## 🎪 Event Hooks

```javascript
const picker = new DatePicker('#input', {
  onReady: function () {
    console.log('DatePicker initialized');
  },

  onChange: function (selectedDate) {
    console.log('Date selected:', selectedDate);
  },

  onOpen: function () {
    console.log('Calendar opened');
  },

  onClose: function () {
    console.log('Calendar closed');
  },

  onMonthChange: function (year, month) {
    console.log('Month changed:', year, month);
  },
});
```

## 🌍 Internationalization

```javascript
const picker = new DatePicker('#input', {
  locale: 'es',
  weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
});
```

## 📱 Responsive Design

DateLite automatically adapts to mobile devices:

- Touch-friendly interface
- Optimized for small screens
- Centered modal on mobile
- Swipe gestures support

## ♿ Accessibility

- Full keyboard navigation (Arrow keys, Enter, Escape)
- ARIA labels for screen readers
- Focus management
- High contrast support
- Semantic HTML

## 🎯 Browser Support

| Browser       | Version |
| ------------- | ------- |
| Chrome        | 60+     |
| Firefox       | 55+     |
| Safari        | 12+     |
| Edge          | 79+     |
| iOS Safari    | 12+     |
| Chrome Mobile | 60+     |

## 📦 Bundle Size

- **JavaScript**: ~25KB minified (~8KB gzipped)
- **CSS**: ~15KB minified (~4KB gzipped)
- **Total**: ~40KB minified (~12KB gzipped)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © [FarizBytes](https://github.com/farizbytes)

## 🙏 Acknowledgments

- Inspired by modern date picker libraries
- Built with vanilla JavaScript for maximum compatibility
- Designed with accessibility and user experience in mind

## � Potential Improvements & Roadmap

### High Priority

#### 1. **Internationalization (i18n)**

- **Current State**: English only
- **Improvement**: Add support for multiple languages
- **Implementation**:
  ```javascript
  // Add locale files
  locales: {
    en: { /* English */ },
    es: { /* Spanish */ },
    fr: { /* French */ },
    de: { /* German */ },
    ja: { /* Japanese */ },
    ar: { /* Arabic with RTL support */ }
  }
  ```
- **Impact**: Makes the component globally accessible
- **Effort**: Medium

#### 2. **Code Modularization**

- **Current State**: Single 1,977-line file
- **Improvement**: Break into logical modules
- **Structure**:
  ```
  src/
    ├── core/
    │   ├── DatePicker.js (main class)
    │   ├── state.js (state management)
    │   └── config.js (default options)
    ├── rendering/
    │   ├── calendar.js
    │   ├── header.js
    │   └── timepicker.js
    ├── utils/
    │   ├── date.js (date utilities)
    │   ├── validators.js
    │   └── formatters.js
    └── handlers/
        ├── events.js
        └── keyboard.js
  ```
- **Benefits**: Better maintainability, easier testing, tree-shaking
- **Effort**: High

#### 3. **Enhanced Test Coverage**

- **Current State**: 261 lines of tests for 1,977 lines of code (~13%)
- **Improvement**: Comprehensive test suite
- **Areas to Cover**:
  - All date blocking scenarios
  - Range selection edge cases
  - Time picker functionality
  - Keyboard navigation
  - Accessibility features
  - Integration tests for React/Vue
- **Target**: 80%+ code coverage
- **Effort**: High

### Medium Priority

#### 4. **Performance Optimizations**

- **Virtual Scrolling**: For year/month selection with large ranges
- **Lazy Rendering**: Only render visible calendar days
- **Debouncing**: Input validation and search
- **Memoization**: Cache calculated values (disabled dates, etc.)
- **Implementation**:

  ```javascript
  // Example: Memoize disabled dates check
  const disabledDatesCache = new Map();

  isDateDisabled(date) {
    const key = date.toISOString();
    if (!disabledDatesCache.has(key)) {
      disabledDatesCache.set(key, this._calculateDisabled(date));
    }
    return disabledDatesCache.get(key);
  }
  ```

#### 5. **Advanced Time Picker**

- **Current State**: Basic time selection
- **Improvements**:
  - Slider controls for hours/minutes
  - Custom time intervals (15min, 30min)
  - Time validation (business hours only)
  - Timezone support
  - Duration picker mode

#### 6. **Preset Ranges**

- Quick selection for common date ranges
- **Example**:
  ```javascript
  presets: [
    { label: 'Today', value: () => new Date() },
    { label: 'Yesterday', value: () => /* ... */ },
    { label: 'Last 7 Days', value: () => /* ... */ },
    { label: 'Last 30 Days', value: () => /* ... */ },
    { label: 'This Month', value: () => /* ... */ },
    { label: 'Last Month', value: () => /* ... */ },
    { label: 'Custom', value: null }
  ]
  ```

#### 7. **Animation System**

- **Current State**: CSS transitions
- **Improvements**:
  - Configurable animation speeds
  - Custom easing functions
  - Slide animations for month changes
  - Fade transitions for popup
  - Optional animation disable

### Low Priority (Nice to Have)

#### 8. **Week Picker Mode**

- Select entire weeks instead of individual dates
- Useful for scheduling applications

#### 9. **Month/Year Picker Modes**

- Dedicated views for month-only or year-only selection
- Useful for financial applications

#### 10. **Recurring Dates**

- Pattern-based date selection
- Examples: "Every Monday", "First Friday of month", "Every 2 weeks"

#### 11. **Visual Enhancements**

- **Heat Map**: Show date activity/density
- **Events/Dots**: Display indicators for dates with events
- **Custom Day Rendering**: Allow custom content in day cells
- **Multiple Calendars**: Show 2-3 months side by side

#### 12. **Framework-Specific Packages**

- **@farisnceit/datelite-react**: Native React component
- **@farisnceit/datelite-vue**: Native Vue component
- **@farisnceit/datelite-angular**: Native Angular component
- Benefits: Better integration, TypeScript support, reactive updates

#### 13. **Accessibility Enhancements**

- Screen reader announcements for date changes
- High contrast mode
- Focus visible indicators
- Reduced motion support
- Voice control compatibility

#### 14. **Additional Features**

- **Export/Import**: Save and restore configurations
- **Themes Marketplace**: Pre-built themes gallery
- **Mobile Gestures**: Swipe to change months
- **Touch Optimization**: Larger touch targets on mobile
- **Placeholder Dates**: Show placeholder text in calendar

### Technical Improvements

#### 15. **Build & Distribution**

- **Tree-shakable ESM**: Allow importing only needed features
- **Individual Module Exports**:
  ```javascript
  import { DatePicker } from '@farisnceit/datelite';
  import { formatDate, parseDate } from '@farisnceit/datelite/utils';
  ```
- **Source Maps**: Better debugging experience
- **Performance Budgets**: Set size limits in CI/CD

#### 16. **Developer Experience**

- **TypeScript Migration**: Rewrite in TypeScript for better DX
- **JSDoc Comments**: Complete API documentation
- **Playground**: Interactive demo/sandbox
- **VS Code Extension**: Snippets and IntelliSense
- **Storybook**: Component documentation

#### 17. **Browser Testing**

- Automated testing across browsers (Playwright/Cypress)
- Visual regression testing
- Performance benchmarking
- Mobile device testing

### Architecture Improvements

#### 18. **State Management**

- Consider using a state machine (e.g., XState) for complex flows
- Better separation of concerns
- Predictable state transitions

#### 19. **Plugin System**

- Allow third-party extensions
- **Example**:

  ```javascript
  DatePicker.use(HolidaysPlugin, {
    country: 'US',
    showHolidays: true,
  });

  DatePicker.use(WeatherPlugin, {
    apiKey: 'xxx',
    showForecast: true,
  });
  ```

#### 20. **Event System Enhancement**

- More granular events
- Event bubbling/capturing
- Cancellable events
- Custom event data

### Documentation Improvements

- **Video Tutorials**: Quick start videos
- **Interactive Examples**: CodeSandbox/StackBlitz demos
- **Migration Guides**: From other date pickers
- **Best Practices Guide**: Performance tips, accessibility
- **API Reference**: Auto-generated from code
- **Changelog**: Detailed version history
- **Troubleshooting Guide**: Common issues and solutions

### Community & Ecosystem

- **Community Forum**: GitHub Discussions
- **Discord Server**: Real-time support
- **Blog**: Tips, tricks, and updates
- **Newsletter**: Feature announcements
- **Contributors Guide**: Make it easy to contribute
- **Code of Conduct**: Foster positive community

---

## 🔍 Technical Issues & Specific Code Improvements

### Critical Issues

#### **1. Security Vulnerabilities**

**XSS Risk in Custom Icon**

```javascript
// ⚠️ CURRENT (VULNERABLE):
createIcon() {
  const iconHTML = this.options.customIcon || this.getDefaultIcon();
  icon.innerHTML = iconHTML; // Direct HTML injection - XSS risk!
}

// ✅ RECOMMENDED:
createIcon() {
  const iconHTML = this.sanitizeHTML(this.options.customIcon) || this.getDefaultIcon();
  icon.innerHTML = iconHTML;
}

// Add sanitization method
sanitizeHTML(html) {
  const temp = document.createElement('div');
  temp.textContent = html;
  return temp.innerHTML;
}
```

**Missing Input Validation**

```javascript
// ⚠️ CURRENT:
setMinDate(date) {
  this.options.minDate = date; // No validation!
}

// ✅ RECOMMENDED:
setMinDate(date) {
  if (!date) {
    this.options.minDate = null;
    return this;
  }

  const parsedDate = typeof date === 'string' ? this.parseDate(date) : new Date(date);

  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date provided to setMinDate');
  }

  if (this.options.maxDate && parsedDate > this.options.maxDate) {
    console.warn('minDate is greater than maxDate, swapping values');
    this.options.maxDate = parsedDate;
    this.options.minDate = this.options.maxDate;
  } else {
    this.options.minDate = parsedDate;
  }

  this.rerender();
  return this;
}
```

#### **2. Memory Leaks**

**Event Listeners Not Properly Cleaned**

```javascript
// ⚠️ CURRENT:
setupEvents() {
  document.addEventListener('click', this.handleDocumentClick);
  document.addEventListener('keydown', this.handleKeydown);
  // Multiple listeners added without tracking
}

destroy() {
  // Event listeners removed but may miss some
  document.removeEventListener('click', this.handleDocumentClick);
}

// ✅ RECOMMENDED:
class DatePicker {
  constructor() {
    this.abortController = new AbortController();
    this.signal = this.abortController.signal;
  }

  setupEvents() {
    document.addEventListener('click', this.handleDocumentClick, { signal: this.signal });
    document.addEventListener('keydown', this.handleKeydown, { signal: this.signal });
  }

  destroy() {
    // Abort all listeners at once
    this.abortController.abort();

    // Clear all references
    this.dom = null;
    this.state = null;
    this.callbacks = null;
  }
}
```

**DOM References Not Cleared**

```javascript
// ⚠️ CURRENT:
destroy() {
  this.dom = {};  // Empty object still exists
}

// ✅ RECOMMENDED:
destroy() {
  // Clear all DOM references
  this.dom = null;
  this.state = null;
  this.options = null;
  this.callbacks = null;
  this.element = null;

  // Help garbage collector
  if (window.gc) window.gc();
}
```

#### **3. Performance Bottlenecks**

**No Debouncing on Input**

```javascript
// ⚠️ CURRENT:
handleInputChange(event) {
  const value = event.target.value;
  try {
    const date = this.parseDate(value);
    if (date) {
      this.setDate(date); // Parses on every keystroke!
    }
  } catch (e) {}
}

// ✅ RECOMMENDED:
constructor() {
  this.inputDebounceTimer = null;
}

handleInputChange(event) {
  clearTimeout(this.inputDebounceTimer);

  this.inputDebounceTimer = setTimeout(() => {
    const value = event.target.value;
    try {
      const date = this.parseDate(value);
      if (date) {
        this.setDate(date);
      }
    } catch (e) {
      this.callbacks.onError?.(e);
    }
  }, 300); // Wait 300ms after last keystroke
}
```

**Inefficient Calendar Rendering**

```javascript
// ⚠️ CURRENT:
generateDaysHTML() {
  // Regenerates all 42 days on every render
  for (let week = 0; week < 6; week++) {
    for (let day = 0; day < 7; day++) {
      html += `<button>${currentDate.getDate()}</button>`;
    }
  }
}

// ✅ RECOMMENDED:
constructor() {
  this.cachedHTML = null;
  this.lastRenderState = null;
}

generateDaysHTML() {
  const currentState = this.getStateHash();

  // Use cached HTML if state hasn't changed
  if (this.cachedHTML && this.lastRenderState === currentState) {
    return this.cachedHTML;
  }

  // Generate HTML
  let html = '';
  // ... generation logic

  this.cachedHTML = html;
  this.lastRenderState = currentState;
  return html;
}

getStateHash() {
  return `${this.state.currentMonth}-${this.state.currentYear}-${this.state.selectedDates.length}`;
}
```

**Position Calculated Too Frequently**

```javascript
// ⚠️ CURRENT:
updatePosition() {
  const inputRect = this.dom.input.getBoundingClientRect(); // Expensive!
  // Calculate position...
}

// ✅ RECOMMENDED:
updatePosition() {
  if (this.positionUpdateScheduled) return;

  this.positionUpdateScheduled = true;

  requestAnimationFrame(() => {
    const inputRect = this.dom.input.getBoundingClientRect();
    // Calculate position...
    this.positionUpdateScheduled = false;
  });
}
```

#### **4. Accessibility Issues**

**No Screen Reader Announcements**

```javascript
// ⚠️ CURRENT:
handleDateSelect(date) {
  this.state.selectedDates = [date];
  this.rerender();
  // No feedback for screen readers!
}

// ✅ RECOMMENDED:
setupAccessibility() {
  // Create aria-live region
  this.ariaLive = document.createElement('div');
  this.ariaLive.setAttribute('aria-live', 'polite');
  this.ariaLive.setAttribute('aria-atomic', 'true');
  this.ariaLive.className = 'sr-only';
  document.body.appendChild(this.ariaLive);
}

announce(message) {
  if (this.ariaLive) {
    this.ariaLive.textContent = message;
  }
}

handleDateSelect(date) {
  this.state.selectedDates = [date];
  this.announce(`Selected ${this.formatDate(date, 'F j, Y')}`);
  this.rerender();
}
```

**No Focus Trap in Modal**

```javascript
// ⚠️ CURRENT:
open() {
  this.state.isOpen = true;
  this.dom.container.style.display = 'block';
  // Can tab out of calendar!
}

// ✅ RECOMMENDED:
open() {
  this.state.isOpen = true;
  this.dom.container.style.display = 'block';

  // Store last focused element
  this.lastFocusedElement = document.activeElement;

  // Focus first focusable element in calendar
  const firstFocusable = this.dom.container.querySelector('button, [tabindex="0"]');
  if (firstFocusable) firstFocusable.focus();

  // Trap focus
  this.dom.container.addEventListener('keydown', this.trapFocus.bind(this));
}

trapFocus(e) {
  if (e.key !== 'Tab') return;

  const focusableElements = this.dom.container.querySelectorAll(
    'button:not([disabled]), [tabindex="0"]'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.shiftKey && document.activeElement === firstElement) {
    lastElement.focus();
    e.preventDefault();
  } else if (!e.shiftKey && document.activeElement === lastElement) {
    firstElement.focus();
    e.preventDefault();
  }
}

close() {
  this.state.isOpen = false;
  this.dom.container.style.display = 'none';

  // Restore focus
  if (this.lastFocusedElement) {
    this.lastFocusedElement.focus();
  }
}
```

**Missing Reduced Motion Support**

```javascript
// ⚠️ CURRENT: Always animates

// ✅ RECOMMENDED:
setupAccessibility() {
  this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (this.prefersReducedMotion) {
    this.dom.container.classList.add('no-animations');
  }
}
```

```css
/* Add to CSS */
.datepicker-container.no-animations * {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}
```

#### **5. Error Handling**

**Silent Failures**

```javascript
// ⚠️ CURRENT:
init() {
  try {
    this.setupDOM();
    this.setupEvents();
    this.render();
  } catch (error) {
    console.error('DatePicker initialization failed:', error);
    // Just logs, no user feedback
  }
}

// ✅ RECOMMENDED:
init() {
  try {
    this.setupDOM();
    this.setupEvents();
    this.render();
    this.callbacks.onReady(this);
  } catch (error) {
    this.handleError(error, 'initialization');
    throw error; // Re-throw for developer awareness
  }
}

handleError(error, context) {
  console.error(`DatePicker ${context} failed:`, error);

  // User-facing error
  if (this.options.showErrors) {
    this.showErrorMessage(`Failed to ${context}. Please refresh the page.`);
  }

  // Call error callback
  if (this.callbacks.onError) {
    this.callbacks.onError({
      error,
      context,
      timestamp: new Date()
    });
  }

  // Optional: Send to error tracking service
  if (this.options.errorTracking) {
    this.trackError(error, context);
  }
}
```

#### **6. Date Parsing Issues**

**Limited Format Support**

```javascript
// ⚠️ CURRENT:
parseDate(dateStr) {
  const parts = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (parts) {
    return new Date(parseInt(parts[1]), parseInt(parts[2]) - 1, parseInt(parts[3]));
  }
  return new Date(dateStr); // May fail
}

// ✅ RECOMMENDED:
parseDate(dateStr, format = this.options.format) {
  if (!dateStr) return null;

  // Handle Date objects
  if (dateStr instanceof Date) {
    return new Date(dateStr);
  }

  // Parse based on format string
  const formatMap = {
    'Y': '(\\d{4})',
    'm': '(\\d{2})',
    'd': '(\\d{2})',
    'H': '(\\d{2})',
    'i': '(\\d{2})',
    's': '(\\d{2})'
  };

  let regex = format;
  const tokens = [];

  for (const [token, pattern] of Object.entries(formatMap)) {
    if (format.includes(token)) {
      regex = regex.replace(new RegExp(token, 'g'), pattern);
      tokens.push(token);
    }
  }

  const matches = dateStr.match(new RegExp(`^${regex}$`));
  if (!matches) {
    console.warn(`Date string "${dateStr}" doesn't match format "${format}"`);
    return null;
  }

  const values = {};
  tokens.forEach((token, i) => {
    values[token] = parseInt(matches[i + 1], 10);
  });

  // Create date from parsed values
  return new Date(
    values.Y || new Date().getFullYear(),
    (values.m || 1) - 1,
    values.d || 1,
    values.H || 0,
    values.i || 0,
    values.s || 0
  );
}
```

#### **7. State Management Issues**

**Direct State Mutation**

```javascript
// ⚠️ CURRENT:
handlePrevMonth() {
  this.state.currentMonth--; // Direct mutation
  this.rerender();
}

// ✅ RECOMMENDED:
setState(updates) {
  const oldState = { ...this.state };
  this.state = { ...this.state, ...updates };

  // Emit state change event
  if (this.callbacks.onStateChange) {
    this.callbacks.onStateChange(oldState, this.state);
  }

  return this;
}

handlePrevMonth() {
  const newMonth = this.state.currentMonth === 0 ? 11 : this.state.currentMonth - 1;
  const newYear = this.state.currentMonth === 0 ? this.state.currentYear - 1 : this.state.currentYear;

  this.setState({
    currentMonth: newMonth,
    currentYear: newYear
  });

  this.callbacks.onMonthChange(newMonth, newYear);
  this.rerender();
}
```

#### **8. Keyboard Navigation Not Implemented**

```javascript
// ⚠️ CURRENT:
handleArrowKeys(_key) {
  // TODO: Implement keyboard navigation
  // Still not implemented!
}

// ✅ RECOMMENDED:
handleArrowKeys(key) {
  const focusedDay = this.dom.calendar.querySelector('.datepicker-day:focus');
  if (!focusedDay) return;

  const currentDate = this.parseDate(focusedDay.dataset.date);
  let newDate = new Date(currentDate);

  switch (key) {
    case 'ArrowLeft':
      newDate.setDate(newDate.getDate() - 1);
      break;
    case 'ArrowRight':
      newDate.setDate(newDate.getDate() + 1);
      break;
    case 'ArrowUp':
      newDate.setDate(newDate.getDate() - 7);
      break;
    case 'ArrowDown':
      newDate.setDate(newDate.getDate() + 7);
      break;
    case 'Home':
      newDate.setDate(1); // First day of month
      break;
    case 'End':
      newDate.setMonth(newDate.getMonth() + 1, 0); // Last day of month
      break;
  }

  // Update view if month changed
  if (newDate.getMonth() !== this.state.currentMonth) {
    this.setState({
      currentMonth: newDate.getMonth(),
      currentYear: newDate.getFullYear()
    });
    this.rerender();
  }

  // Focus new day
  const newDayBtn = this.dom.calendar.querySelector(
    `[data-date="${this.formatDate(newDate, 'Y-m-d')}"]`
  );
  if (newDayBtn && !newDayBtn.disabled) {
    newDayBtn.focus();
  }
}
```

#### **9. Missing Feature: Clear Method**

```javascript
// ⚠️ CURRENT:
handleClear() {
  this.state.selectedDates = [];
  // Internal only, not exposed as public method
}

// ✅ RECOMMENDED:
/**
 * Clear all selected dates
 * @public
 */
clear() {
  this.state.selectedDates = [];
  this.state.startDate = null;
  this.state.endDate = null;

  if (this.options.mode === 'range' && this.options.confirmRange) {
    this.state.tempStartDate = null;
    this.state.tempEndDate = null;
    this.state.confirmedStartDate = null;
    this.state.confirmedEndDate = null;
  }

  this.updateInputValue();
  this.rerender();
  this.callbacks.onClear();
  this.callbacks.onChange(null);

  return this; // Chainable
}
```

#### **10. CSS Architecture Issues**

**Lack of Scoping**

```css
/* ⚠️ CURRENT: Global classes - potential conflicts */
.datepicker-container {
}
.day {
}
.selected {
}

/* ✅ RECOMMENDED: Use BEM or prefix all classes */
.datelite-picker {
}
.datelite-picker__day {
}
.datelite-picker__day--selected {
}
```

**Missing CSS Variables for Responsive Breakpoints**

```css
/* ✅ ADD: */
:root {
  --dp-mobile-breakpoint: 768px;
  --dp-tablet-breakpoint: 1024px;
  --dp-day-size-mobile: 36px;
  --dp-day-size-tablet: 38px;
  --dp-day-size-desktop: 40px;
}

@media (max-width: 768px) {
  :root {
    --dp-day-size: var(--dp-day-size-mobile);
    --dp-font-size-base: 12px;
  }
}
```

### Testing Gaps

**Missing Test Categories:**

```javascript
// ⚠️ MISSING: Range mode tests
describe('Range Mode', () => {
  test('should select start date first');
  test('should select end date after start');
  test('should swap if end < start');
  test('should highlight dates in range');
  test('should apply range with confirmation');
  test('should cancel range selection');
});

// ⚠️ MISSING: Accessibility tests
describe('Accessibility', () => {
  test('should announce date selection to screen readers');
  test('should trap focus in modal');
  test('should restore focus on close');
  test('should support keyboard navigation');
  test('should have proper ARIA labels');
});

// ⚠️ MISSING: Performance tests
describe('Performance', () => {
  test('should render within 100ms');
  test('should handle 1000+ disabled dates');
  test('should debounce input changes');
});
```

## 📊 Implementation Priority Matrix

| Priority                 | Impact | Effort | Status               |
| ------------------------ | ------ | ------ | -------------------- |
| Internationalization     | High   | Medium | 🔴 Not Started       |
| Code Modularization      | High   | High   | 🔴 Not Started       |
| Test Coverage            | High   | High   | 🟡 In Progress (13%) |
| Performance Optimization | Medium | Medium | 🔴 Not Started       |
| Framework Packages       | Medium | High   | 🔴 Not Started       |
| TypeScript Migration     | Medium | High   | 🔴 Not Started       |
| Plugin System            | Low    | High   | 🔴 Not Started       |

## 🤝 Contributing to Improvements

We welcome contributions! If you'd like to work on any of these improvements:

1. **Check existing issues** to see if someone is already working on it
2. **Open a discussion** about your proposed implementation
3. **Create a feature branch** and submit a PR
4. **Follow coding standards** and include tests
5. **Update documentation** for new features

## �📞 Support

- 📧 Email: support@farisnceit.com
- 🐛 Issues: [GitHub Issues](https://github.com/farizbytes/datelite/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/farizbytes/datelite/discussions)

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@farisnceit/datelite)
- [GitHub Repository](https://github.com/farizbytes/datelite)
- [Live Demo](https://farizbytes.github.io/datelite)
- [Documentation](https://farizbytes.github.io/datelite/docs)

---

**Made with ❤️ by [FarizBytes](https://farizbytes.com)**
