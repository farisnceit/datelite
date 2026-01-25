# @farisnceit/datelite

A modern, lightweight, and highly customizable date picker component built with pure vanilla JavaScript.

## Installation

```bash
npm install @farisnceit/datelite
```

## Quick Start

```javascript
import '@farisnceit/datelite/dist/datelite.min.css';
import DatePicker from '@farisnceit/datelite';

const picker = new DatePicker('#datepicker', {
  mode: 'single',
  format: 'Y-m-d',
});
```

## Features

- 🎯 **Zero Dependencies** - Pure vanilla JavaScript
- 🎨 **Modern Design** - Clean, professional UI
- 🔧 **Highly Customizable** - 50+ CSS variables
- 📱 **Fully Responsive** - Works on all devices
- ♿ **Accessible** - ARIA labels and keyboard navigation
- 🌍 **i18n Support** - Multi-language ready
- ⚡ **Lightweight** - ~25KB JS + ~15KB CSS (minified)

## Basic Usage

### Single Date Selection

```javascript
const picker = new DatePicker('#input', {
  mode: 'single',
  format: 'Y-m-d',
  onChange: function (date) {
    console.log('Selected:', date);
  },
});
```

### Date Range Selection

```javascript
const picker = new DatePicker('#input', {
  mode: 'range',
  format: 'Y-m-d',
  onChange: function (dateRange) {
    console.log('Start:', dateRange.start);
    console.log('End:', dateRange.end);
  },
});
```

### Multiple Date Selection

```javascript
const picker = new DatePicker('#input', {
  mode: 'multiple',
  closeOnSelect: false,
  onChange: function (dates) {
    console.log('Selected dates:', dates);
  },
});
```

### Date & Time Picker

```javascript
const picker = new DatePicker('#input', {
  mode: 'single',
  enableTime: true,
  time_24hr: false,
  format: 'Y-m-d h:i A',
});
```

### Inline Calendar

```javascript
const picker = new DatePicker('#container', {
  inline: true,
  mode: 'single',
});
```

## Configuration Options

### Mode Options

| Option       | Type    | Default    | Description                                   |
| ------------ | ------- | ---------- | --------------------------------------------- |
| `mode`       | string  | `'single'` | Selection mode: 'single', 'range', 'multiple' |
| `inline`     | boolean | `false`    | Display calendar inline                       |
| `enableTime` | boolean | `false`    | Enable time selection                         |
| `time_24hr`  | boolean | `true`     | Use 24-hour time format                       |

### Display Options

| Option            | Type    | Default     | Description                         |
| ----------------- | ------- | ----------- | ----------------------------------- |
| `format`          | string  | `'Y-m-d'`   | Date format string                  |
| `theme`           | string  | `'default'` | Theme: 'default', 'dark', 'minimal' |
| `closeOnSelect`   | boolean | `true`      | Close calendar after selection      |
| `showWeekNumbers` | boolean | `false`     | Display week numbers                |

### Position Options

| Option     | Type           | Default  | Description                                        |
| ---------- | -------------- | -------- | -------------------------------------------------- |
| `position` | string         | `'auto'` | Position: 'auto', 'top', 'bottom', 'left', 'right' |
| `appendTo` | string/element | `'body'` | Element to append calendar to                      |
| `offsetX`  | number         | `0`      | X offset from calculated position                  |
| `offsetY`  | number         | `0`      | Y offset from calculated position                  |

### Date Restrictions

| Option            | Type        | Default | Description                           |
| ----------------- | ----------- | ------- | ------------------------------------- |
| `minDate`         | Date/string | `null`  | Minimum selectable date               |
| `maxDate`         | Date/string | `null`  | Maximum selectable date               |
| `disableWeekends` | boolean     | `false` | Disable weekend dates                 |
| `blockPastDates`  | boolean     | `false` | Disable past dates                    |
| `disabledDates`   | Array       | `[]`    | Array of specific dates to disable    |
| `enabledDates`    | Array       | `[]`    | Only allow specific dates (whitelist) |
| `disableFunction` | Function    | `null`  | Custom function to disable dates      |

## API Methods

### Core Methods

```javascript
picker.open(); // Open the calendar
picker.close(); // Close the calendar
picker.toggle(); // Toggle calendar visibility
picker.setDate(date); // Set selected date
picker.getDate(); // Get selected date(s)
picker.clear(); // Clear selection
picker.destroy(); // Cleanup and remove
```

### Configuration Methods

```javascript
picker.setMinDate(date); // Set minimum date
picker.setMaxDate(date); // Set maximum date
picker.setDisableWeekends(bool); // Toggle weekend blocking
picker.setBlockPastDates(bool); // Toggle past date blocking
picker.addDisabledDates(dates); // Add disabled dates
picker.clearDisabledDates(); // Clear disabled dates
```

## Event Hooks

```javascript
const picker = new DatePicker('#input', {
  onReady: function () {
    // Called when picker is initialized
  },

  onChange: function (selectedDate) {
    // Called when date selection changes
  },

  onOpen: function () {
    // Called when calendar opens
  },

  onClose: function () {
    // Called when calendar closes
  },

  onMonthChange: function (year, month) {
    // Called when month changes
  },

  onYearChange: function (year) {
    // Called when year changes
  },
});
```

## Date Restrictions Examples

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

## Theming

### Using CSS Variables

```css
:root {
  --dp-primary-color: #3b82f6;
  --dp-primary-hover: #1d4ed8;
  --dp-bg-primary: #ffffff;
  --dp-text-primary: #1e293b;
  --dp-border-radius-lg: 12px;
}
```

### Built-in Themes

```javascript
const picker = new DatePicker('#input', {
  theme: 'dark', // 'default', 'dark', 'minimal'
});
```

## Internationalization

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

## Framework Integration

### React

```jsx
import { useEffect, useRef } from 'react';
import DatePicker from '@farisnceit/datelite';
import '@farisnceit/datelite/dist/datelite.min.css';

function DatePickerComponent() {
  const inputRef = useRef(null);
  const pickerRef = useRef(null);

  useEffect(() => {
    pickerRef.current = new DatePicker(inputRef.current, {
      mode: 'single',
      onChange: (date) => console.log(date),
    });

    return () => pickerRef.current.destroy();
  }, []);

  return <input ref={inputRef} type="text" />;
}
```

### Vue

```vue
<template>
  <input ref="datepicker" type="text" />
</template>

<script>
import DatePicker from '@farisnceit/datelite';
import '@farisnceit/datelite/dist/datelite.min.css';

export default {
  mounted() {
    this.picker = new DatePicker(this.$refs.datepicker, {
      mode: 'single',
    });
  },
  beforeUnmount() {
    this.picker?.destroy();
  },
};
</script>
```

### Angular

```typescript
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import DatePicker from '@farisnceit/datelite';
import '@farisnceit/datelite/dist/datelite.min.css';

@Component({
  selector: 'app-datepicker',
  template: '<input #datepicker type="text">',
})
export class DatepickerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('datepicker') datepickerInput!: ElementRef;
  private picker: any;

  ngAfterViewInit() {
    this.picker = new DatePicker(this.datepickerInput.nativeElement, {
      mode: 'single',
    });
  }

  ngOnDestroy() {
    this.picker?.destroy();
  }
}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Chrome Mobile 60+

## Bundle Size

- JavaScript: ~25KB minified (~8KB gzipped)
- CSS: ~15KB minified (~4KB gzipped)
- Total: ~40KB minified (~12KB gzipped)

## TypeScript Support

TypeScript definitions are included in the package.

```typescript
import DatePicker from '@farisnceit/datelite';

const picker: DatePicker = new DatePicker('#input', {
  mode: 'single',
  format: 'Y-m-d',
});
```

## License

MIT © [FarizBytes](https://github.com/farizbytes)

## Links

- [GitHub Repository](https://github.com/farizbytes/datelite)
- [Documentation](https://farizbytes.github.io/datelite)
- [Issues](https://github.com/farizbytes/datelite/issues)
- [Changelog](https://github.com/farizbytes/datelite/blob/main/CHANGELOG.md)

## Support

- 📧 Email: support@farizbytes.com
- 🐛 Issues: [GitHub Issues](https://github.com/farizbytes/datelite/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/farizbytes/datelite/discussions)
