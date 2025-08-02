# Datelite

A fully customizable, feature-rich date picker component built with modern ES6+ JavaScript. No dependencies, no jQuery, just pure vanilla JavaScript with comprehensive functionality.

![Datelite Demo](https://via.placeholder.com/800x400/007bff/ffffff?text=Datelite+Demo)

## ✨ Features

### 🎯 **Selection Modes**
- **Single Date** - Select one date
- **Date Range** - Select start and end dates
- **Multiple Dates** - Select multiple individual dates

### 🎨 **UI & Themes**
- **Multiple Themes** - Default, Dark, Minimal
- **Responsive Design** - Mobile-friendly interface
- **Customizable Icons** - Default SVG or custom icons
- **Inline or Popup** - Display modes for any layout

### 📅 **Advanced Features**
- **Month/Year Dropdowns** - Quick navigation
- **Time Selection** - 24hr or AM/PM format with seconds
- **Range Confirmation** - Apply/Cancel buttons for ranges
- **Date Blocking** - Comprehensive date restriction options
- **Keyboard Navigation** - Full accessibility support
- **Localization Ready** - Multi-language support structure

### 🚫 **Date Blocking Options**
- Block specific dates
- Block date ranges
- Block weekdays/weekends
- Block past/future dates
- Custom blocking functions
- Whitelist mode (only allow specific dates)

### ⚙️ **Developer Friendly**
- **Extensive API** - 50+ methods for complete control
- **Event Callbacks** - React to all user interactions
- **Method Chaining** - Fluent API design
- **TypeScript Ready** - Type definitions available
- **No Dependencies** - Pure vanilla JavaScript

## 🚀 Quick Start

### 1. Include Files
```html
<link rel="stylesheet" href="src/datelite.css">
<script src="src/DatePicker.js"></script>
```

### 2. Create HTML
```html
<input type="text" id="my-datepicker" placeholder="Select a date">
```

### 3. Initialize
```javascript
const picker = new DatePicker('#my-datepicker', {
    mode: 'single',
    format: 'Y-m-d',
    onChange: function(date) {
        console.log('Selected:', date);
    }
});
```

## 📖 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get up and running in minutes
- **[API Reference](API_REFERENCE.md)** - Complete method and option documentation
- **[Developer Guide](DEVELOPER_GUIDE.md)** - Architecture and customization guide
- **[Live Examples](example.html)** - Interactive demos of all features

## 🎮 Live Examples

Open `example.html` in your browser to see:

- **Icon Examples** - Different icon positions and custom icons
- **Selection Modes** - Single, range, and multiple date selection
- **Dropdown Navigation** - Month and year dropdowns
- **Date Blocking** - Various blocking scenarios
- **Range Confirmation** - Apply/Cancel workflow
- **Theme Switching** - Dark and minimal themes
- **API Demonstrations** - Dynamic control examples

## 💡 Usage Examples

### Single Date with Icon
```javascript
const picker = new DatePicker('#date-input', {
    mode: 'single',
    showIcon: true,
    iconPosition: 'right',
    format: 'F j, Y'
});
```

### Date Range with Confirmation
```javascript
const rangePicker = new DatePicker('#range-input', {
    mode: 'range',
    confirmRange: true,
    applyButtonText: 'Confirm Selection',
    cancelButtonText: 'Reset'
});
```

### Block Weekends and Holidays
```javascript
const businessPicker = new DatePicker('#business-input', {
    disableWeekends: true,
    disabledDates: [
        '2024-12-25', // Christmas
        '2024-01-01', // New Year
        '2024-07-04'  // Independence Day
    ]
});
```

### Inline Calendar with Time
```javascript
const inlinePicker = new DatePicker('#calendar-container', {
    inline: true,
    enableTime: true,
    time_24hr: false,
    format: 'Y-m-d h:i A'
});
```

### Custom Blocking Function
```javascript
const customPicker = new DatePicker('#custom-input', {
    disableFunction: function(date) {
        // Block all Fridays
        return date.getDay() === 5;
    }
});
```

## 🎛️ Configuration Options

### Core Options
```javascript
{
    mode: 'single',              // 'single', 'range', 'multiple'
    format: 'Y-m-d',            // Date format
    locale: 'en',               // Localization
    theme: 'default',           // 'default', 'dark', 'minimal'
    inline: false,              // Inline vs popup
    closeOnSelect: true         // Auto-close behavior
}
```

### Date Constraints
```javascript
{
    minDate: null,              // Minimum date
    maxDate: null,              // Maximum date
    disabledDates: [],          // Specific dates to block
    disableWeekends: false,     // Block weekends
    blockPastDates: false,      // Block past dates
    enabledDates: []            // Whitelist mode
}
```

### UI Customization
```javascript
{
    showIcon: true,             // Show calendar icon
    iconPosition: 'right',      // 'left' or 'right'
    customIcon: null,           // Custom icon HTML
    enableMonthDropdown: true,  // Month dropdown
    enableYearDropdown: true,   // Year dropdown
    enableTime: false           // Time selection
}
```

## 🔧 API Methods

### Core Methods
```javascript
picker.open();                  // Open datepicker
picker.close();                 // Close datepicker
picker.setDate('2024-12-25');   // Set date
const date = picker.getDate();  // Get selected date
picker.destroy();               // Clean up
```

### Date Management
```javascript
picker.setMinDate('2024-01-01');
picker.setMaxDate('2024-12-31');
picker.addDisabledDates(['2024-12-25']);
picker.setDisableWeekends(true);
picker.clearDisabledDates();
```

### Feature Control
```javascript
picker.showIcon();
picker.updateIcon('📅');
picker.setIconPosition('left');
picker.enableRangeConfirmation();
picker.setYearRange(50);
```

### Method Chaining
```javascript
const picker = new DatePicker('#input')
    .setMinDate(new Date())
    .setDisableWeekends(true)
    .addDisabledDates(['2024-12-25'])
    .updateOptions({ theme: 'dark' });
```

## 🎨 Themes

### Default Theme
Clean, modern design with blue accents.

### Dark Theme
Dark background with light text, perfect for dark mode applications.

### Minimal Theme
Simplified design with minimal visual elements.

### Custom Themes
```css
.datepicker-container.my-theme {
    --primary-color: #ff6b6b;
    --background-color: #ffffff;
    --border-color: #dee2e6;
}

.datepicker-container.my-theme .datepicker-day.selected {
    background-color: var(--primary-color);
    color: white;
}
```

## 📱 Browser Support

- **Modern Browsers** - Chrome, Firefox, Safari, Edge
- **Mobile Browsers** - iOS Safari, Chrome Mobile, Samsung Internet
- **Legacy Support** - IE11+ (with ES6 polyfills)

## 🏗️ Architecture

### Class Structure
```
DatePicker
├── Configuration Management
├── State Management  
├── DOM Management
├── Event Handling
├── Rendering Engine
├── API Methods
└── Utility Functions
```

### Key Design Principles
- **Modular Design** - Features can be enabled/disabled independently
- **Event-Driven** - Comprehensive callback system
- **Immutable State** - State changes trigger re-renders
- **Accessibility First** - ARIA labels and keyboard navigation
- **Performance Optimized** - Efficient DOM updates and event handling

## 🔌 Extension Points

### Custom Locales
```javascript
picker.locales.es = {
    weekdays: ['Domingo', 'Lunes', 'Martes', ...],
    months: ['Enero', 'Febrero', 'Marzo', ...]
};
picker.setLocale('es');
```

### Custom Disable Functions
```javascript
picker.setDisableFunction(function(date) {
    // Custom business logic
    return isCompanyHoliday(date) || isMaintenanceDay(date);
});
```

### Plugin Architecture
```javascript
DatePicker.prototype.addPlugin = function(plugin) {
    plugin.init.call(this);
    return this;
};
```

## 🐛 Troubleshooting

### Common Issues

**DatePicker not showing?**
- Check if CSS file is loaded
- Verify element exists in DOM
- Check z-index conflicts

**Dates not updating?**
- Ensure `onChange` callback is set
- Check if dates are disabled
- Verify date format

**Performance issues?**
- Batch option updates with `updateOptions()`
- Call `destroy()` when removing from DOM
- Avoid frequent re-renders

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

### Development Setup
```bash
# Clone the repository
git clone https://github.com/your-repo/datepicker.git

# Open in browser
open example.html

# Make changes to src/DatePicker.js, src/datelite.css
# Test in example.html
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern date picker libraries
- Built with accessibility and performance in mind
- Designed for developers who need full control

## 📊 Stats

- **~15KB** minified JavaScript
- **~8KB** minified CSS  
- **Zero dependencies**
- **50+ API methods**
- **100% vanilla JavaScript**
- **Mobile responsive**
- **Accessibility compliant**

---

**Made with ❤️ for developers who need a powerful, customizable DatePicker without the bloat.**