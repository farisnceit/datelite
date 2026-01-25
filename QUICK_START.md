# 🚀 Quick Start Guide

Get up and running with DateLite in less than 5 minutes!

## Installation

Choose your preferred method:

### NPM

```bash
npm install @farisnceit/datelite
```

### Yarn

```bash
yarn add @farisnceit/datelite
```

### PNPM

```bash
pnpm add @farisnceit/datelite
```

### CDN

```html
<!-- Add to your HTML <head> -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@farisnceit/datelite/dist/datelite.min.css"
/>

<!-- Add before closing </body> -->
<script src="https://cdn.jsdelivr.net/npm/@farisnceit/datelite/dist/datelite.min.js"></script>
```

## Basic Setup

### 1. Add HTML Input

```html
<input type="text" id="datepicker" placeholder="Select a date" />
```

### 2. Initialize DatePicker

```html
<script>
  const picker = new DatePicker('#datepicker', {
    mode: 'single',
    format: 'Y-m-d',
  });
</script>
```

That's it! You now have a working date picker. 🎉

## Common Use Cases

### Date Range Picker

Perfect for booking systems, date filters, etc.

```html
<input type="text" id="date-range" placeholder="Select date range" />

<script>
  const rangePicker = new DatePicker('#date-range', {
    mode: 'range',
    format: 'Y-m-d',
    onChange: function (dateRange) {
      console.log('Start:', dateRange.start);
      console.log('End:', dateRange.end);
    },
  });
</script>
```

### Date & Time Picker

For appointments, events, etc.

```html
<input type="text" id="datetime" placeholder="Select date and time" />

<script>
  const datetimePicker = new DatePicker('#datetime', {
    mode: 'single',
    enableTime: true,
    time_24hr: false,
    format: 'Y-m-d h:i A',
  });
</script>
```

### Future Dates Only

For booking future appointments.

```html
<input type="text" id="future-dates" placeholder="Select future date" />

<script>
  const futurePicker = new DatePicker('#future-dates', {
    mode: 'single',
    blockPastDates: true,
    format: 'Y-m-d',
  });
</script>
```

### Weekdays Only

For business day selection.

```html
<input type="text" id="weekdays" placeholder="Select weekday" />

<script>
  const weekdayPicker = new DatePicker('#weekdays', {
    mode: 'single',
    disableWeekends: true,
    format: 'Y-m-d',
  });
</script>
```

### Inline Calendar

Always visible calendar.

```html
<div id="inline-calendar"></div>

<script>
  const inlinePicker = new DatePicker('#inline-calendar', {
    inline: true,
    mode: 'single',
    onChange: function (date) {
      console.log('Selected:', date);
    },
  });
</script>
```

## Essential Options

### Mode

```javascript
mode: 'single'; // Single date selection
mode: 'range'; // Date range selection
mode: 'multiple'; // Multiple dates selection
```

### Format

```javascript
format: 'Y-m-d'; // 2024-12-25
format: 'm/d/Y'; // 12/25/2024
format: 'd-m-Y'; // 25-12-2024
format: 'Y-m-d h:i A'; // 2024-12-25 02:30 PM
```

### Position

```javascript
position: 'auto'; // Smart positioning (default)
position: 'bottom'; // Always below input
position: 'top'; // Always above input
```

### Theme

```javascript
theme: 'default'; // Default blue theme
theme: 'dark'; // Dark theme
theme: 'minimal'; // Minimal theme
```

## Working with Selected Dates

### Get Selected Date

```javascript
const picker = new DatePicker('#datepicker');

// Get the selected date
const selectedDate = picker.getDate();
console.log(selectedDate);
```

### Set Date Programmatically

```javascript
// Set to today
picker.setDate(new Date());

// Set to specific date
picker.setDate('2024-12-25');

// Set to date object
picker.setDate(new Date(2024, 11, 25));
```

### Clear Selection

```javascript
picker.clear();
```

## Event Handling

### onChange Event

```javascript
const picker = new DatePicker('#datepicker', {
  onChange: function (selectedDate) {
    // Update your form
    document.getElementById('hidden-date').value = selectedDate;

    // Show confirmation
    alert('You selected: ' + selectedDate.toDateString());
  },
});
```

### Multiple Events

```javascript
const picker = new DatePicker('#datepicker', {
  onReady: function () {
    console.log('DatePicker is ready!');
  },

  onOpen: function () {
    console.log('Calendar opened');
  },

  onChange: function (date) {
    console.log('Date selected:', date);
  },

  onClose: function () {
    console.log('Calendar closed');
  },
});
```

## Date Restrictions

### Min and Max Dates

```javascript
const picker = new DatePicker('#datepicker', {
  minDate: new Date(), // Today onwards
  maxDate: new Date(2024, 11, 31), // Until end of year
});
```

### Disable Specific Dates

```javascript
const picker = new DatePicker('#datepicker', {
  disabledDates: [
    '2024-12-25', // Christmas
    '2024-01-01', // New Year
    new Date(2024, 6, 4), // July 4th
  ],
});
```

### Disable Weekends

```javascript
const picker = new DatePicker('#datepicker', {
  disableWeekends: true,
});
```

### Custom Disable Logic

```javascript
const picker = new DatePicker('#datepicker', {
  disableFunction: function (date) {
    // Disable all Fridays
    return date.getDay() === 5;
  },
});
```

## Styling & Customization

### Using CSS Variables

```css
:root {
  --dp-primary-color: #3b82f6; /* Primary color */
  --dp-primary-hover: #1d4ed8; /* Hover color */
  --dp-bg-primary: #ffffff; /* Background */
  --dp-text-primary: #1e293b; /* Text color */
  --dp-border-radius-lg: 12px; /* Border radius */
}
```

### Custom Theme Class

```html
<style>
  .datepicker-container.my-theme {
    --dp-primary-color: #10b981;
    --dp-primary-hover: #059669;
  }
</style>

<script>
  const picker = new DatePicker('#datepicker', {
    theme: 'my-theme',
  });
</script>
```

## Framework Integration

### React

```jsx
import { useEffect, useRef } from 'react';

function DatePickerComponent() {
  const inputRef = useRef(null);
  const pickerRef = useRef(null);

  useEffect(() => {
    pickerRef.current = new DatePicker(inputRef.current, {
      mode: 'single',
      onChange: (date) => {
        console.log('Selected:', date);
      },
    });

    return () => {
      pickerRef.current.destroy();
    };
  }, []);

  return <input ref={inputRef} type="text" placeholder="Select date" />;
}
```

### Vue

```vue
<template>
  <input ref="datepicker" type="text" placeholder="Select date" />
</template>

<script>
export default {
  mounted() {
    this.picker = new DatePicker(this.$refs.datepicker, {
      mode: 'single',
      onChange: (date) => {
        this.$emit('date-selected', date);
      },
    });
  },

  beforeUnmount() {
    if (this.picker) {
      this.picker.destroy();
    }
  },
};
</script>
```

### Angular

```typescript
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  template: '<input #datepicker type="text" placeholder="Select date">',
})
export class DatepickerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('datepicker') datepickerInput!: ElementRef;
  private picker: any;

  ngAfterViewInit() {
    this.picker = new DatePicker(this.datepickerInput.nativeElement, {
      mode: 'single',
      onChange: (date: Date) => {
        console.log('Selected:', date);
      },
    });
  }

  ngOnDestroy() {
    if (this.picker) {
      this.picker.destroy();
    }
  }
}
```

## Troubleshooting

### Calendar Not Appearing?

1. **Check CSS is loaded**

   ```html
   <link rel="stylesheet" href="path/to/datelite.css" />
   ```

2. **Check JavaScript is loaded**

   ```html
   <script src="path/to/datelite.js"></script>
   ```

3. **Check z-index conflicts**
   ```css
   .datepicker-calendar {
     z-index: 9999 !important;
   }
   ```

### Position Issues?

```javascript
// Try different position
const picker = new DatePicker('#datepicker', {
  position: 'bottom',
  offsetY: 10,
});

// Or use fixed position
const picker = new DatePicker('#datepicker', {
  positionX: 100,
  positionY: 200,
});
```

### Date Not Selectable?

Check your restrictions:

```javascript
const picker = new DatePicker('#datepicker', {
  // Remove or adjust these
  minDate: null,
  maxDate: null,
  disableWeekends: false,
  blockPastDates: false,
  disabledDates: [],
});
```

## Next Steps

- 📖 Read the [Full Documentation](examples/documentation.html)
- 🎨 Explore [Theming Options](examples/themes-customization.html)
- 🚫 Learn about [Date Blocking](examples/date-blocking.html)
- 👨‍💻 Check the [Developer Guide](DEVELOPER_GUIDE.md)

## Need Help?

- 📧 Email: support@farizbytes.com
- 🐛 Report issues: [GitHub Issues](https://github.com/farizbytes/datelite/issues)
- 💬 Ask questions: [GitHub Discussions](https://github.com/farizbytes/datelite/discussions)

---

**Happy coding! 🎉**
