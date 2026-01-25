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

## 📖 Documentation

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

```javascript
const picker = new DatePicker('#input');

// Open/Close
picker.open();
picker.close();
picker.toggle();

// Get/Set Dates
picker.setDate(new Date());
const date = picker.getDate();
picker.clear();

// Dynamic Configuration
picker.setMinDate(new Date());
picker.setMaxDate(new Date(2024, 11, 31));
picker.setDisableWeekends(true);
picker.addDisabledDates(['2024-12-25']);
picker.clearDisabledDates();

// Cleanup
picker.destroy();
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

## 📞 Support

- 📧 Email: support@farizbytes.com
- 🐛 Issues: [GitHub Issues](https://github.com/farizbytes/datelite/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/farizbytes/datelite/discussions)

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@farisnceit/datelite)
- [GitHub Repository](https://github.com/farizbytes/datelite)
- [Live Demo](https://farizbytes.github.io/datelite)
- [Documentation](https://farizbytes.github.io/datelite/docs)

---

**Made with ❤️ by [FarizBytes](https://farizbytes.com)**
