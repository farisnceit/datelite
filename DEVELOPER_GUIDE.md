# DatePicker Developer Guide

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Core Components](#core-components)
3. [State Management](#state-management)
4. [Event System](#event-system)
5. [Rendering Pipeline](#rendering-pipeline)
6. [Configuration System](#configuration-system)
7. [API Methods](#api-methods)
8. [Styling Architecture](#styling-architecture)
9. [Extension Points](#extension-points)
10. [Best Practices](#best-practices)
11. [Troubleshooting](#troubleshooting)

## Architecture Overview

The DatePicker is built using modern ES6+ class-based architecture with a clear separation of concerns:

```
DatePicker Class
├── Configuration Management
├── State Management
├── DOM Management
├── Event Handling
├── Rendering Engine
├── API Methods
└── Utility Functions
```

### Key Design Principles

1. **Modular Design**: Each feature is self-contained and can be enabled/disabled
2. **Event-Driven**: Uses callbacks for all user interactions
3. **Immutable State**: State changes trigger re-renders
4. **Progressive Enhancement**: Works without JavaScript (basic input)
5. **Accessibility First**: ARIA labels, keyboard navigation, screen reader support

## Core Components

### 1. Constructor & Initialization

```javascript
constructor(element, options = {}) {
    // Element validation and setup
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    
    // Configuration merging
    this.options = { ...this.defaultOptions, ...options };
    
    // State initialization
    this.state = { /* initial state */ };
    
    // DOM references
    this.dom = { /* DOM element references */ };
    
    // Event callbacks
    this.callbacks = { /* user-defined callbacks */ };
    
    // Method binding and initialization
    this.bindMethods();
    this.init();
}
```

**Key Points:**
- Validates element existence before proceeding
- Merges user options with defaults
- Initializes all internal state
- Binds methods to maintain `this` context

### 2. DOM Management

The DatePicker creates and manages several DOM structures:

```javascript
// Main container structure
<div class="datepicker-container">
    <div class="datepicker-calendar">
        <div class="datepicker-header">
            <!-- Navigation and month/year selectors -->
        </div>
        <div class="datepicker-body">
            <!-- Calendar grid -->
        </div>
        <div class="datepicker-time">
            <!-- Time picker (if enabled) -->
        </div>
        <div class="datepicker-footer">
            <!-- Action buttons -->
        </div>
    </div>
</div>
```

**DOM Creation Flow:**
1. `setupDOM()` - Creates main container
2. `setupInputWithIcon()` - Handles input wrapper and icon
3. `createCalendarStructure()` - Builds calendar HTML
4. `render()` - Populates with data

## State Management

### State Structure

```javascript
this.state = {
    // UI State
    isOpen: false,
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    viewMode: 'days', // 'days', 'months', 'years'
    
    // Selection State
    selectedDates: [],        // For single/multiple modes
    startDate: null,          // For range mode
    endDate: null,            // For range mode
    
    // Range Confirmation State
    tempStartDate: null,      // Temporary selection
    tempEndDate: null,        // Temporary selection
    confirmedStartDate: null, // Confirmed selection
    confirmedEndDate: null,   // Confirmed selection
    
    // Time State
    currentTime: { hours: 12, minutes: 0, seconds: 0 }
};
```

### State Update Pattern

```javascript
// 1. Update state
this.state.currentMonth = newMonth;

// 2. Trigger re-render
this.rerender();

// 3. Fire callbacks
this.callbacks.onMonthChange(this.state.currentMonth, this.state.currentYear);
```

**Important:** Always call `rerender()` after state changes to update the UI.

## Event System

### Event Binding Architecture

```javascript
setupEvents() {
    // Input events (for popup mode)
    if (!this.options.inline && this.dom.input) {
        this.dom.input.addEventListener('click', this.open);
        this.dom.input.addEventListener('keydown', this.handleKeydown);
    }
    
    // Calendar events
    this.dom.calendar.addEventListener('click', this.handleCalendarClick);
    this.dom.calendar.addEventListener('change', this.handleDropdownChange);
    
    // Document events (for closing)
    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('keydown', this.handleKeydown);
}
```

### Event Delegation Pattern

The DatePicker uses event delegation for efficiency:

```javascript
handleCalendarClick(event) {
    const target = event.target;
    
    // Route to specific handlers based on CSS classes
    if (target.classList.contains('datepicker-day')) {
        this.handleDateSelect(new Date(target.dataset.date));
    } else if (target.classList.contains('datepicker-prev-btn')) {
        this.handlePrevMonth();
    } else if (target.classList.contains('datepicker-next-btn')) {
        this.handleNextMonth();
    }
    // ... more handlers
}
```

### Callback System

```javascript
// User-defined callbacks
this.callbacks = {
    onReady: options.onReady || (() => {}),
    onOpen: options.onOpen || (() => {}),
    onClose: options.onClose || (() => {}),
    onChange: options.onChange || (() => {}),
    onSelect: options.onSelect || (() => {}),
    // ... more callbacks
};

// Triggering callbacks
this.callbacks.onChange(this.getDate());
```

## Rendering Pipeline

### Render Flow

```javascript
render() {
    this.renderHeader();      // Month/year navigation
    this.renderWeekdays();    // Weekday headers
    this.renderDays();        // Calendar grid
    this.updateInputValue();  // Input field value
    this.updatePosition();    // Popup positioning
    return this;
}
```

### Day Rendering Logic

```javascript
generateDaysHTML() {
    // 1. Calculate calendar boundaries
    const firstDay = new Date(this.state.currentYear, this.state.currentMonth, 1);
    const lastDay = new Date(this.state.currentYear, this.state.currentMonth + 1, 0);
    
    // 2. Adjust for first day of week
    const startDate = new Date(firstDay);
    const dayOfWeek = (firstDay.getDay() - this.options.firstDayOfWeek + 7) % 7;
    startDate.setDate(startDate.getDate() - dayOfWeek);
    
    // 3. Generate 6 weeks (42 days)
    let html = '';
    let currentDate = new Date(startDate);
    
    for (let week = 0; week < 6; week++) {
        html += '<div class="datepicker-week">';
        for (let day = 0; day < 7; day++) {
            html += this.generateDayHTML(currentDate);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        html += '</div>';
    }
    
    return html;
}
```

### CSS Class Generation

```javascript
getDayClasses(date) {
    const classes = [];
    
    // State-based classes
    if (this.isSameDay(date, new Date())) classes.push('today');
    if (this.isDateSelected(date)) classes.push('selected');
    if (this.isDateDisabled(date)) classes.push('disabled-custom');
    
    // Mode-specific classes
    if (this.options.mode === 'range') {
        if (this.isDateInRange(date)) classes.push('in-range');
        if (this.state.startDate && this.isSameDay(date, this.state.startDate)) {
            classes.push('range-start');
        }
    }
    
    return classes.join(' ');
}
```

## Configuration System

### Option Categories

```javascript
this.defaultOptions = {
    // Core Options
    mode: 'single',           // 'single', 'range', 'multiple'
    format: 'Y-m-d',         // Date format string
    locale: 'en',            // Localization
    
    // UI Options
    inline: false,           // Inline vs popup
    theme: 'default',        // Theme selection
    position: 'auto',        // Popup positioning
    
    // Behavior Options
    closeOnSelect: true,     // Auto-close behavior
    allowInput: true,        // Manual input allowed
    clickOpens: true,        // Click to open
    
    // Date Constraints
    minDate: null,           // Minimum selectable date
    maxDate: null,           // Maximum selectable date
    disabledDates: [],       // Specific disabled dates
    
    // Feature Toggles
    enableTime: false,       // Time picker
    enableMonthDropdown: true, // Month dropdown
    enableYearDropdown: true,  // Year dropdown
    showIcon: true,          // Input icon
    confirmRange: false,     // Range confirmation
    
    // Callbacks
    onChange: null,          // Date change callback
    onOpen: null,           // Open callback
    onClose: null           // Close callback
};
```

### Option Processing

```javascript
// Constructor processes options in this order:
constructor(element, options = {}) {
    // 1. Merge with defaults
    this.options = { ...this.defaultOptions, ...options };
    
    // 2. Apply mode-specific adjustments
    if (this.options.mode === 'range' && this.options.confirmRange) {
        this.options.closeOnSelect = false;
    }
    
    // 3. Validate and sanitize
    this.validateOptions();
}
```

## API Methods

### Method Categories

#### Core Methods
```javascript
init()          // Initialize the datepicker
render()        // Render the calendar
rerender()      // Re-render with current state
destroy()       // Clean up and remove
```

#### Visibility Control
```javascript
open()          // Show the datepicker
close()         // Hide the datepicker
toggle()        // Toggle visibility
```

#### Date Management
```javascript
setDate(date)                    // Set selected date(s)
getDate()                       // Get selected date(s)
setStartEndDate(start, end)     // Set range dates
setMinDate(date)                // Set minimum date
setMaxDate(date)                // Set maximum date
```

#### Feature Control
```javascript
// Icon control
showIcon()
hideIcon()
updateIcon(customIcon)
setIconPosition(position)

// Dropdown control
enableMonthDropdown()
disableMonthDropdown()
enableYearDropdown()
disableYearDropdown()

// Date blocking
addDisabledDates(dates)
removeDisabledDates(dates)
setDisableWeekends(enabled)
```

### Method Implementation Pattern

```javascript
// Standard API method pattern
methodName(param1, param2) {
    // 1. Validate parameters
    if (!param1) return this;
    
    // 2. Update internal state/options
    this.options.someOption = param1;
    this.state.someState = param2;
    
    // 3. Update DOM if needed
    if (this.dom.calendar) {
        this.rerender();
    }
    
    // 4. Return this for chaining
    return this;
}
```

## Styling Architecture

### CSS Organization

```css
/* 1. Base Container Styles */
.datepicker-container { /* ... */ }

/* 2. Component Styles */
.datepicker-header { /* ... */ }
.datepicker-body { /* ... */ }
.datepicker-footer { /* ... */ }

/* 3. Interactive Elements */
.datepicker-day { /* ... */ }
.datepicker-day:hover { /* ... */ }
.datepicker-day:disabled { /* ... */ }

/* 4. State Classes */
.datepicker-day.today { /* ... */ }
.datepicker-day.selected { /* ... */ }
.datepicker-day.in-range { /* ... */ }

/* 5. Theme Variations */
.datepicker-container.dark { /* ... */ }
.datepicker-container.minimal { /* ... */ }

/* 6. Responsive Design */
@media (max-width: 480px) { /* ... */ }
```

### CSS Class Naming Convention

- **Component**: `.datepicker-[component]` (e.g., `.datepicker-header`)
- **Element**: `.datepicker-[component]-[element]` (e.g., `.datepicker-month-btn`)
- **State**: `.datepicker-[element].[state]` (e.g., `.datepicker-day.selected`)
- **Modifier**: `.datepicker-[component].[modifier]` (e.g., `.datepicker-container.dark`)

### Theme System

```javascript
// Theme switching
switchTheme(theme) {
    document.querySelectorAll('.datepicker-container').forEach(container => {
        container.className = container.className.replace(/\b(default|dark|minimal)\b/g, '');
        container.classList.add(theme);
    });
}
```

## Extension Points

### 1. Custom Locales

```javascript
// Add new locale
this.locales.es = {
    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    months: ['Enero', 'Febrero', 'Marzo', /* ... */],
    monthsShort: ['Ene', 'Feb', 'Mar', /* ... */]
};
```

### 2. Custom Disable Functions

```javascript
const picker = new DatePicker('#input', {
    disableFunction: function(date) {
        // Custom logic - e.g., disable company holidays
        const holidays = getCompanyHolidays();
        return holidays.some(holiday => isSameDay(date, holiday));
    }
});
```

### 3. Custom Themes

```css
.datepicker-container.corporate {
    --primary-color: #0066cc;
    --background-color: #ffffff;
    --border-color: #cccccc;
    --text-color: #333333;
}

.datepicker-container.corporate .datepicker-day.selected {
    background-color: var(--primary-color);
    color: white;
}
```

### 4. Plugin Architecture

```javascript
// Example plugin structure
DatePicker.prototype.addPlugin = function(plugin) {
    if (typeof plugin.init === 'function') {
        plugin.init.call(this);
    }
    return this;
};

// Usage
const myPicker = new DatePicker('#input');
myPicker.addPlugin(new HolidayPlugin());
```

## Best Practices

### 1. Performance Optimization

```javascript
// ✅ Good: Batch DOM updates
updateMultipleDates(dates) {
    // Update all state first
    dates.forEach(date => this.state.selectedDates.push(date));
    
    // Single re-render at the end
    this.rerender();
}

// ❌ Bad: Multiple re-renders
updateMultipleDates(dates) {
    dates.forEach(date => {
        this.state.selectedDates.push(date);
        this.rerender(); // Expensive!
    });
}
```

### 2. Memory Management

```javascript
// Always clean up in destroy()
destroy() {
    // Remove event listeners
    document.removeEventListener('click', this.handleDocumentClick);
    
    // Clear DOM references
    this.dom = {};
    
    // Clear callbacks
    this.callbacks = {};
    
    return this;
}
```

### 3. Error Handling

```javascript
// Validate inputs
setDate(date) {
    try {
        const parsedDate = this.parseDate(date);
        if (!parsedDate) {
            console.warn('DatePicker: Invalid date provided');
            return this;
        }
        // ... rest of method
    } catch (error) {
        console.error('DatePicker: Error setting date', error);
        return this;
    }
}
```

### 4. Accessibility

```javascript
// Always include ARIA attributes
generateDayHTML(date) {
    const isDisabled = this.isDateDisabled(date);
    const isSelected = this.isDateSelected(date);
    
    return `
        <button type="button" 
                class="datepicker-day ${this.getDayClasses(date)}"
                data-date="${this.formatDate(date, 'Y-m-d')}"
                aria-label="${this.formatDate(date, 'F j, Y')}"
                aria-selected="${isSelected}"
                ${isDisabled ? 'disabled aria-disabled="true"' : ''}>
            ${date.getDate()}
        </button>
    `;
}
```

## Troubleshooting

### Common Issues

#### 1. DatePicker Not Opening
```javascript
// Check element exists
if (!this.element) {
    console.error('DatePicker: Element not found');
}

// Check clickOpens option
if (!this.options.clickOpens) {
    // Manually call open()
    picker.open();
}
```

#### 2. Dates Not Updating
```javascript
// Ensure onChange callback is set
const picker = new DatePicker('#input', {
    onChange: function(date) {
        console.log('Date changed:', date);
    }
});

// Check if date is disabled
if (picker.isDateDisabled(someDate)) {
    console.log('Date is disabled');
}
```

#### 3. Styling Issues
```css
/* Ensure CSS is loaded */
@import url('src/datelite.css');

/* Check z-index for popup */
.datepicker-popup {
    z-index: 9999 !important;
}
```

#### 4. Memory Leaks
```javascript
// Always destroy when removing from DOM
picker.destroy();

// Remove references
picker = null;
```

### Debugging Tools

```javascript
// Enable debug mode
const picker = new DatePicker('#input', {
    debug: true, // Add this option
    onChange: function(date) {
        console.log('Debug: Date changed', {
            date: date,
            state: this.state,
            options: this.options
        });
    }
});

// Inspect internal state
console.log('Current state:', picker.state);
console.log('Current options:', picker.options);
console.log('DOM references:', picker.dom);
```

### Performance Monitoring

```javascript
// Monitor render performance
const originalRender = DatePicker.prototype.render;
DatePicker.prototype.render = function() {
    const start = performance.now();
    const result = originalRender.call(this);
    const end = performance.now();
    console.log(`Render took ${end - start} milliseconds`);
    return result;
};
```

## Conclusion

This DatePicker is designed to be:
- **Flexible**: Extensive configuration options
- **Extensible**: Clear extension points for customization
- **Maintainable**: Well-structured, documented code
- **Performant**: Efficient rendering and event handling
- **Accessible**: Full keyboard and screen reader support

For additional help or feature requests, refer to the example implementations in `example.html` or create custom extensions using the patterns outlined in this guide.