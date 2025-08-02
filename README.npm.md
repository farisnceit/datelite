# 📅 Datelite

[![npm version](https://badge.fury.io/js/%40your-org%2Fdatelite.svg)](https://badge.fury.io/js/%40your-org%2Fdatelite)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@your-org/datelite)](https://bundlephobia.com/package/@your-org/datelite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A fully customizable, feature-rich date picker component built with **pure vanilla JavaScript**. Zero dependencies, modern ES6+ syntax, with comprehensive date selection modes, theming, and accessibility support.

## ✨ Features

- 🎯 **Multiple Selection Modes** - Single, range, and multiple date selection
- 🎨 **50+ CSS Variables** - Complete theming control with CSS custom properties
- 📱 **Mobile Responsive** - Touch-friendly interface with mobile optimizations
- ♿ **Accessibility First** - ARIA labels, keyboard navigation, screen reader support
- 🚫 **Comprehensive Date Blocking** - Disable dates, ranges, weekdays, custom logic
- ⏰ **Time Selection** - Optional time picker with 24hr/AM-PM and seconds
- 🎭 **Icon Customization** - Position control, custom icons, show/hide options
- 📍 **Flexible Positioning** - Custom positioning, append to any element
- 🌍 **Locale Ready** - Multi-language support structure
- 🔗 **Method Chaining** - Fluent API for easy configuration
- 📦 **Zero Dependencies** - Pure vanilla JavaScript, no external libraries
- 🎪 **Framework Agnostic** - Works with React, Vue, Angular, or plain HTML

## 🚀 Quick Start

### Installation

```bash
pnpm add @your-org/datelite
```

### Basic Usage

```html
<!-- Include CSS -->
<link rel="stylesheet" href="node_modules/@your-org/datelite/dist/datelite.min.css">

<!-- HTML -->
<input type="text" id="my-datepicker" placeholder="Select a date">

<!-- Include JS -->
<script src="node_modules/@your-org/datelite/dist/datelite.min.js"></script>
<script>
  const picker = new DatePicker('#my-datepicker');
</script>
```

### ES6 Module

```javascript
import DatePicker from '@your-org/datelite';
import '@your-org/datelite/dist/datelite.min.css';

const picker = new DatePicker('#my-datepicker', {
  mode: 'single',
  format: 'Y-m-d',
  onChange: (date) => {
    console.log('Selected:', date);
  }
});
```

### CommonJS

```javascript
const DatePicker = require('@your-org/datelite');

const picker = new DatePicker('#my-datepicker');
```

## 📖 Examples

### Single Date Selection
```javascript
const picker = new DatePicker('#date-input', {
  mode: 'single',
  format: 'F j, Y',
  onChange: (date) => {
    console.log('Selected:', date);
  }
});
```

### Date Range Selection
```javascript
const rangePicker = new DatePicker('#range-input', {
  mode: 'range',
  confirmRange: true, // Show Apply/Cancel buttons
  onChange: (dateRange) => {
    console.log('Range:', dateRange.start, 'to', dateRange.end);
  }
});
```

### Multiple Date Selection
```javascript
const multiPicker = new DatePicker('#multi-input', {
  mode: 'multiple',
  closeOnSelect: false,
  onChange: (dates) => {
    console.log('Selected dates:', dates);
  }
});
```

### With Time Selection
```javascript
const timePicker = new DatePicker('#datetime-input', {
  enableTime: true,
  time_24hr: false,
  enableSeconds: true,
  format: 'Y-m-d h:i:s A'
});
```

### Date Blocking
```javascript
const businessPicker = new DatePicker('#business-input', {
  disableWeekends: true,
  blockPastDates: true,
  disabledDates: ['2024-12-25', '2024-01-01'], // Holidays
  disableFunction: (date) => {
    // Custom logic - block company holidays
    return isCompanyHoliday(date);
  }
});
```

### Custom Positioning
```javascript
const positionedPicker = new DatePicker('#positioned-input', {
  appendTo: '#custom-container',
  positionX: 100,
  positionY: 200,
  offsetX: 10,
  offsetY: -5
});
```

### Custom Theme
```css
.my-custom-theme {
  --dp-primary-color: #ff6b6b;
  --dp-primary-hover: #ff5252;
  --dp-day-size: 42px;
  --dp-border-radius-md: 12px;
}
```

```javascript
const themedPicker = new DatePicker('#themed-input', {
  theme: 'my-custom-theme'
});
```

## 🎛️ Configuration Options

### Core Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `mode` | string | `'single'` | Selection mode: `'single'`, `'range'`, `'multiple'` |
| `format` | string | `'Y-m-d'` | Date format string |
| `locale` | string | `'en'` | Locale for month/day names |
| `theme` | string | `'default'` | Theme: `'default'`, `'dark'`, `'minimal'` |
| `inline` | boolean | `false` | Display inline instead of popup |

### Date Constraints
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `minDate` | Date\|string | `null` | Minimum selectable date |
| `maxDate` | Date\|string | `null` | Maximum selectable date |
| `disabledDates` | Array | `[]` | Array of dates to disable |
| `disableWeekends` | boolean | `false` | Disable weekends |
| `blockPastDates` | boolean | `false` | Block all past dates |

### UI Customization
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `showIcon` | boolean | `true` | Show calendar icon |
| `iconPosition` | string | `'right'` | Icon position: `'left'`, `'right'` |
| `customIcon` | string | `null` | Custom icon HTML/SVG |
| `enableMonthDropdown` | boolean | `true` | Show month dropdown |
| `enableYearDropdown` | boolean | `true` | Show year dropdown |

[View all options →](./API_REFERENCE.md)

## 🔧 API Methods

### Core Methods
```javascript
picker.open();                    // Open datepicker
picker.close();                   // Close datepicker
picker.setDate('2024-12-25');     // Set date
const date = picker.getDate();    // Get selected date
picker.destroy();                 // Clean up
```

### Date Management
```javascript
picker.setMinDate('2024-01-01');
picker.setMaxDate('2024-12-31');
picker.addDisabledDates(['2024-12-25']);
picker.setDisableWeekends(true);
```

### Customization
```javascript
picker.updateIcon('📅');
picker.setIconPosition('left');
picker.updateOptions({ theme: 'dark' });
```

### Method Chaining
```javascript
const picker = new DatePicker('#input')
  .setMinDate('2024-01-01')
  .setDisableWeekends(true)
  .updateOptions({ theme: 'dark' });
```

[View complete API →](./API_REFERENCE.md)

## 🎨 Theming & Customization

Datelite uses **50+ CSS custom properties** for complete theming control:

```css
:root {
  /* Colors */
  --dp-primary-color: #007bff;
  --dp-primary-hover: #0056b3;
  --dp-primary-light: #e3f2fd;
  
  /* Sizes */
  --dp-day-size: 36px;
  --dp-font-size-base: 14px;
  --dp-spacing-lg: 16px;
  
  /* Border Radius */
  --dp-border-radius-md: 6px;
  
  /* Shadows */
  --dp-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### Pre-built Themes
- **Default** - Clean blue theme
- **Dark** - Dark mode optimized
- **Minimal** - Simplified design

[Complete customization guide →](./CSS_CUSTOMIZATION.md)

## 📱 Framework Integration

### React
```jsx
import { useEffect, useRef } from 'react';
import DatePicker from '@your-org/datelite';

function MyDatePicker({ onChange }) {
  const inputRef = useRef();
  const pickerRef = useRef();

  useEffect(() => {
    pickerRef.current = new DatePicker(inputRef.current, {
      onChange: onChange
    });

    return () => pickerRef.current?.destroy();
  }, []);

  return <input ref={inputRef} type="text" />;
}
```

### Vue
```vue
<template>
  <input ref="dateInput" type="text" />
</template>

<script>
import DatePicker from '@your-org/datelite';

export default {
  mounted() {
    this.picker = new DatePicker(this.$refs.dateInput, {
      onChange: this.handleChange
    });
  },
  beforeDestroy() {
    this.picker?.destroy();
  }
};
</script>
```

### Angular
```typescript
import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import DatePicker from '@your-org/datelite';

@Component({
  template: '<input #dateInput type="text">'
})
export class DatePickerComponent implements OnDestroy {
  @ViewChild('dateInput') dateInput!: ElementRef;
  private picker!: DatePicker;

  ngAfterViewInit() {
    this.picker = new DatePicker(this.dateInput.nativeElement);
  }

  ngOnDestroy() {
    this.picker?.destroy();
  }
}
```

## 🧪 TypeScript Support

Full TypeScript definitions included:

```typescript
import DatePicker, { DatePickerOptions, DateRange } from '@your-org/datelite';

const options: DatePickerOptions = {
  mode: 'range',
  format: 'Y-m-d',
  onChange: (dateRange: DateRange) => {
    console.log(dateRange.start, dateRange.end);
  }
};

const picker = new DatePicker('#input', options);
```

## 📊 Bundle Size

- **JavaScript**: ~25KB minified (~8KB gzipped)
- **CSS**: ~15KB minified (~4KB gzipped)
- **Zero dependencies**

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Chrome Mobile 60+

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Setup
```bash
git clone https://github.com/your-username/datelite.git
cd datelite
pnpm install
pnpm run dev
```

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern date picker libraries
- Built with accessibility and performance in mind
- Designed for developers who need full control

---

**Made with ❤️ for developers who need a powerful, customizable date picker without the bloat.**