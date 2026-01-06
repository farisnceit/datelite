# DateLite Developer Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Code Structure](#code-structure)
3. [Core Components](#core-components)
4. [Styling System](#styling-system)
5. [State Management](#state-management)
6. [Event System](#event-system)
7. [Positioning Engine](#positioning-engine)
8. [Date Restriction System](#date-restriction-system)
9. [Rendering Pipeline](#rendering-pipeline)
10. [API Design](#api-design)
11. [Build System](#build-system)
12. [Contributing Guidelines](#contributing-guidelines)

---

## Architecture Overview

DateLite is a **vanilla JavaScript** date picker component built with modern ES6+ features. It follows an **object-oriented** design pattern with a single `DatePicker` class that encapsulates all functionality.

### Design Principles

1. **Zero Dependencies**: Pure JavaScript with no external libraries
2. **Modular Architecture**: Clear separation of concerns
3. **Event-Driven**: Reactive updates through event hooks
4. **CSS Variables**: Highly customizable theming system
5. **Accessibility First**: ARIA labels and keyboard navigation
6. **Progressive Enhancement**: Works with or without JavaScript

### File Structure

```
datelite/
├── src/
│   ├── DatePicker.js       # Main component class (1977 lines)
│   └── datelite.css        # Styles with CSS variables (918 lines)
├── dist/
│   ├── datelite.js         # Bundled JavaScript
│   ├── datelite.min.js     # Minified JavaScript
│   ├── datelite.css        # Processed CSS
│   └── datelite.min.css    # Minified CSS
├── examples/               # Demo pages
└── package.json           # Build configuration
```

---

## Code Structure

### DatePicker Class (src/DatePicker.js)

The main class is organized into logical sections:

#### 1. **Constructor & Initialization** (Lines 6-209)

```javascript
constructor(element, (options = {}));
```

- Initializes default options (67 configuration options)
- Merges user options with defaults
- Sets up initial state
- Binds methods to maintain context
- Calls initialization methods

**Key Default Options:**

- `mode`: 'single' | 'range' | 'multiple'
- `format`: Date format string (default: 'Y-m-d')
- `inline`: Boolean for always-visible calendar
- `position`: 'auto' | 'top' | 'bottom' | 'left' | 'right'
- `theme`: 'default' | 'dark' | 'minimal'

#### 2. **DOM Setup** (Lines 211-506)

Methods for creating and managing DOM elements:

```javascript
setupDOM(); // Main DOM setup orchestrator
createCalendarStructure(); // Creates calendar container
getCalendarHTML(); // Generates calendar HTML
createIcon(); // Creates calendar icon
wrapInputWithIcon(); // Wraps input with icon container
```

**DOM Structure:**

```
.datepicker-container
  └── .datepicker-input-wrapper
      ├── input (user's input element)
      └── .datepicker-icon (calendar icon)
  └── .datepicker-calendar
      ├── .datepicker-header
      │   ├── .datepicker-prev-btn
      │   ├── .datepicker-month-year
      │   └── .datepicker-next-btn
      ├── .datepicker-body
      │   ├── .datepicker-weekdays
      │   └── .datepicker-days
      ├── .datepicker-time (if enableTime)
      └── .datepicker-footer
```

#### 3. **Event Handling** (Lines 508-1208)

Comprehensive event system:

```javascript
setupEvents(); // Attaches all event listeners
handleDocumentClick(); // Outside click detection
handleKeydown(); // Keyboard navigation
handleDateSelect(); // Date selection logic
handlePrevMonth(); // Month navigation
handleNextMonth(); // Month navigation
handleTimeChange(); // Time picker updates
```

**Event Flow:**

1. User interacts with UI
2. Event handler captures action
3. State is updated
4. Hooks are triggered (onChange, onOpen, etc.)
5. UI is re-rendered
6. Position is updated

#### 4. **Public API** (Lines 1212-1639)

Methods exposed to users:

**Core Methods:**

- `open()` - Opens the calendar
- `close()` - Closes the calendar
- `toggle()` - Toggles visibility
- `setDate(date)` - Sets selected date
- `getDate()` - Returns selected date(s)
- `clear()` - Clears selection
- `destroy()` - Cleanup and removal

**Configuration Methods:**

- `setMinDate(date)` - Set minimum date
- `setMaxDate(date)` - Set maximum date
- `setDisableWeekends(bool)` - Toggle weekend blocking
- `setBlockPastDates(bool)` - Toggle past date blocking
- `addDisabledDates(dates)` - Add disabled dates
- `clearDisabledDates()` - Clear disabled dates

#### 5. **Utility Methods** (Lines 1641-1977)

Helper functions for internal operations:

```javascript
formatDate(date, format); // Date formatting
parseDate(dateStr); // Date parsing
isSameDay(date1, date2); // Date comparison
isDateDisabled(date); // Check if date is disabled
isDateSelected(date); // Check if date is selected
isDateInRange(date); // Check if date in range
getDaysInMonth(year, month); // Get days count
getFirstDayOfMonth(year, month); // Get first day
```

---

## Core Components

### 1. **State Management**

The component maintains state in the `state` object:

```javascript
this.state = {
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  selectedDate: null, // For 'single' mode
  selectedDates: [], // For 'multiple' mode
  rangeStart: null, // For 'range' mode
  rangeEnd: null, // For 'range' mode
  isOpen: false,
  focusedDate: null,
};
```

**State Updates:**

- All state changes trigger re-renders
- State is immutable (new objects created)
- Hooks are called after state updates

### 2. **Date Selection Modes**

#### Single Mode

```javascript
handleDateSelect(date) {
  this.state.selectedDate = date;
  this.updateInputValue();
  this.triggerChange();
  if (this.options.closeOnSelect) {
    this.close();
  }
}
```

#### Range Mode

```javascript
handleDateSelect(date) {
  if (!this.state.rangeStart || this.state.rangeEnd) {
    // Start new range
    this.state.rangeStart = date;
    this.state.rangeEnd = null;
  } else {
    // Complete range
    this.state.rangeEnd = date;
    this.updateInputValue();
    this.triggerChange();
  }
}
```

#### Multiple Mode

```javascript
handleDateSelect(date) {
  const index = this.state.selectedDates.findIndex(
    d => this.isSameDay(d, date)
  );
  if (index > -1) {
    // Remove date
    this.state.selectedDates.splice(index, 1);
  } else {
    // Add date
    this.state.selectedDates.push(date);
  }
}
```

### 3. **Rendering System**

The rendering pipeline follows this flow:

```
render()
  ├── renderHeader()      // Month/year navigation
  ├── renderWeekdays()    // Day name headers
  └── renderDays()        // Calendar grid
      └── generateDaysHTML()
          └── getDayClasses()  // Apply CSS classes
```

**Rendering Optimization:**

- Only re-renders changed elements
- Uses `innerHTML` for batch updates
- Debounced position updates

---

## Styling System

### CSS Architecture (src/datelite.css)

The stylesheet is organized into sections:

#### 1. **CSS Custom Properties** (Lines 6-88)

```css
:root {
  /* Colors */
  --dp-primary-color: #3b82f6;
  --dp-primary-hover: #1d4ed8;
  --dp-bg-primary: #ffffff;
  --dp-text-primary: #1e293b;

  /* Spacing */
  --dp-spacing-xs: 4px;
  --dp-spacing-sm: 8px;
  --dp-spacing-md: 12px;

  /* Sizes */
  --dp-day-size: 40px;
  --dp-button-height: 36px;

  /* Shadows */
  --dp-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --dp-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --dp-transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Theming Strategy:**

- All colors use CSS variables
- Easy to override for custom themes
- Dark mode support via variable overrides

#### 2. **Component Styles** (Lines 90-863)

**Container & Layout:**

```css
.datepicker-container {
  position: relative;
  display: inline-block;
}

.datepicker-calendar {
  position: absolute;
  z-index: var(--dp-z-index-popup);
  background: var(--dp-bg-primary);
  border-radius: var(--dp-border-radius-lg);
  box-shadow: var(--dp-shadow-lg);
}
```

**Calendar Grid:**

```css
.datepicker-days {
  display: grid;
  grid-template-columns: repeat(7, var(--dp-day-size));
  gap: 4px;
}

.datepicker-day {
  width: var(--dp-day-size);
  height: var(--dp-day-size);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--dp-border-radius-md);
  transition: var(--dp-transition-base);
}
```

**State Classes:**

```css
.datepicker-day.selected {
  background: var(--dp-primary-color);
  color: var(--dp-text-white);
  font-weight: 700;
}

.datepicker-day.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.datepicker-day.in-range {
  background: var(--dp-primary-light);
}
```

#### 3. **Responsive Design** (Lines 864-918)

```css
@media (max-width: 768px) {
  .datepicker-calendar {
    position: fixed;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
  }
}
```

---

## State Management

### State Object Structure

```javascript
this.state = {
  // Calendar view state
  currentMonth: number,      // 0-11
  currentYear: number,       // Full year

  // Selection state
  selectedDate: Date | null,
  selectedDates: Date[],
  rangeStart: Date | null,
  rangeEnd: Date | null,

  // UI state
  isOpen: boolean,
  focusedDate: Date | null,

  // Time state (if enableTime)
  selectedHour: number,
  selectedMinute: number,
  selectedPeriod: 'AM' | 'PM'
};
```

### State Update Pattern

```javascript
// 1. Update state
this.state.selectedDate = newDate;

// 2. Update UI
this.updateInputValue();
this.rerender();

// 3. Trigger hooks
this.triggerChange();

// 4. Update position (if needed)
this.updatePosition();
```

---

## Event System

### Event Hooks

All hooks receive relevant data and are called at specific lifecycle points:

```javascript
// Initialization
onReady: function() {
  // Called when picker is initialized
}

// User interactions
onChange: function(selectedDate) {
  // Called when date selection changes
}

onOpen: function() {
  // Called when calendar opens
}

onClose: function() {
  // Called when calendar closes
}

// Navigation
onMonthChange: function(year, month) {
  // Called when month changes
}

onYearChange: function(year) {
  // Called when year changes
}
```

### Hook Triggering

```javascript
triggerChange() {
  if (this.options.onChange) {
    const value = this.getDate();
    this.options.onChange.call(this, value);
  }
}
```

---

## Positioning Engine

### Position Calculation (Lines 854-946)

The positioning system handles:

1. **Auto positioning** - Stays within viewport
2. **Fixed positioning** - Specific coordinates
3. **Relative positioning** - Relative to input
4. **Offset adjustments** - Fine-tune position

```javascript
updatePosition() {
  // 1. Get input position
  const inputRect = this.dom.input.getBoundingClientRect();

  // 2. Get calendar dimensions
  const calendarRect = this.dom.calendar.getBoundingClientRect();

  // 3. Calculate viewport space
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  // 4. Determine best position
  let top, left;

  if (this.options.position === 'auto') {
    // Smart positioning
    const spaceBelow = viewportHeight - inputRect.bottom;
    const spaceAbove = inputRect.top;

    if (spaceBelow >= calendarRect.height) {
      top = inputRect.bottom + this.options.offsetY;
    } else if (spaceAbove >= calendarRect.height) {
      top = inputRect.top - calendarRect.height + this.options.offsetY;
    } else {
      top = Math.max(10, (viewportHeight - calendarRect.height) / 2);
    }
  }

  // 5. Apply position
  this.dom.calendar.style.top = `${top}px`;
  this.dom.calendar.style.left = `${left}px`;
}
```

---

## Date Restriction System

### Restriction Types

1. **Min/Max Dates**

```javascript
isDateDisabled(date) {
  if (this.options.minDate && date < this.options.minDate) {
    return true;
  }
  if (this.options.maxDate && date > this.options.maxDate) {
    return true;
  }
}
```

2. **Specific Dates**

```javascript
if (this.options.disabledDates.length > 0) {
  return this.options.disabledDates.some((disabledDate) => this.isSameDay(date, disabledDate));
}
```

3. **Date Ranges**

```javascript
if (this.options.disabledDateRanges.length > 0) {
  return this.options.disabledDateRanges.some((range) => {
    return date >= range.start && date <= range.end;
  });
}
```

4. **Days of Week**

```javascript
if (this.options.disableWeekends) {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
}
```

5. **Custom Function**

```javascript
if (this.options.disableFunction) {
  return this.options.disableFunction(date);
}
```

6. **Whitelist Mode**

```javascript
if (this.options.enabledDates.length > 0) {
  return !this.options.enabledDates.some((enabledDate) => this.isSameDay(date, enabledDate));
}
```

---

## Rendering Pipeline

### Render Flow

```
User Action
    ↓
Event Handler
    ↓
State Update
    ↓
render() / rerender()
    ↓
┌─────────────────┐
│  renderHeader() │ → Month/Year display
├─────────────────┤
│renderWeekdays() │ → Day name headers
├─────────────────┤
│  renderDays()   │ → Calendar grid
│       ↓         │
│generateDaysHTML()│ → HTML generation
│       ↓         │
│ getDayClasses() │ → CSS class logic
└─────────────────┘
    ↓
DOM Update (innerHTML)
    ↓
updatePosition()
    ↓
Trigger Hooks
```

### Day Rendering Logic

```javascript
generateDaysHTML() {
  const year = this.state.currentYear;
  const month = this.state.currentMonth;

  // Get calendar grid data
  const firstDay = this.getFirstDayOfMonth(year, month);
  const daysInMonth = this.getDaysInMonth(year, month);
  const daysInPrevMonth = this.getDaysInMonth(
    month === 0 ? year - 1 : year,
    month === 0 ? 11 : month - 1
  );

  let html = '';
  let dayCount = 1;
  let nextMonthDay = 1;

  // Generate 6 weeks (42 days)
  for (let i = 0; i < 42; i++) {
    const date = this.getDateForCell(i, year, month);
    const classes = this.getDayClasses(date);
    const disabled = this.isDateDisabled(date);

    html += `
      <button
        type="button"
        class="${classes}"
        data-date="${date.toISOString()}"
        ${disabled ? 'disabled' : ''}
      >
        ${date.getDate()}
      </button>
    `;
  }

  return html;
}
```

---

## API Design

### Method Naming Convention

- **get/set** - Getters and setters (e.g., `getDate()`, `setDate()`)
- **enable/disable** - Toggle features (e.g., `enableMonthDropdown()`)
- **add/remove** - Modify collections (e.g., `addDisabledDates()`)
- **clear** - Reset to default (e.g., `clearDisabledDates()`)
- **handle** - Event handlers (e.g., `handleDateSelect()`)
- **render** - UI updates (e.g., `renderDays()`)
- **update** - State/UI sync (e.g., `updatePosition()`)

### Chainable Methods

Some methods return `this` for chaining:

```javascript
picker
  .setMinDate(new Date())
  .setMaxDate(new Date(2024, 11, 31))
  .setDisableWeekends(true)
  .open();
```

---

## Build System

### Build Configuration (package.json)

```json
{
  "scripts": {
    "build": "pnpm run build:js && pnpm run build:css",
    "watch": "rollup -c rollup.config.js --w",
    "build:js": "rollup -c rollup.config.js",
    "build:css": "pnpm run build:css:main && pnpm run build:css:min",
    "build:css:main": "postcss src/datelite.css -o dist/datelite.css",
    "build:css:min": "postcss src/datelite.css -o dist/datelite.min.css --env production"
  }
}
```

### Rollup Configuration

The build process:

1. Bundles JavaScript (ES6 → ES5)
2. Minifies code
3. Processes CSS (autoprefixer, minification)
4. Generates source maps

---

## Contributing Guidelines

### Code Style

1. **Use ES6+ features**
   - Arrow functions
   - Template literals
   - Destructuring
   - Spread operator

2. **Naming conventions**
   - camelCase for variables and methods
   - PascalCase for classes
   - UPPER_CASE for constants

3. **Comments**
   - JSDoc for public methods
   - Inline comments for complex logic
   - Section headers for organization

### Adding New Features

1. **Update options** in constructor
2. **Add state** if needed
3. **Create methods** for functionality
4. **Update rendering** if UI changes
5. **Add CSS** for styling
6. **Write tests** (if test suite exists)
7. **Update documentation**

### Example: Adding a New Option

```javascript
// 1. Add to default options
this.options = {
  ...
  highlightWeekends: false,  // New option
  ...
};

// 2. Use in getDayClasses()
getDayClasses(date) {
  const classes = ['datepicker-day'];

  if (this.options.highlightWeekends) {
    const day = date.getDay();
    if (day === 0 || day === 6) {
      classes.push('weekend');
    }
  }

  return classes.join(' ');
}

// 3. Add CSS
.datepicker-day.weekend {
  background-color: var(--dp-bg-muted);
}
```

---

## Performance Considerations

### Optimization Techniques

1. **Event Delegation**
   - Single listener on calendar container
   - Uses `event.target` to determine clicked element

2. **Debounced Position Updates**
   - Position recalculated on scroll/resize
   - Debounced to prevent excessive calculations

3. **Minimal Re-renders**
   - Only affected elements updated
   - Batch DOM updates with `innerHTML`

4. **CSS Transitions**
   - Hardware-accelerated transforms
   - Efficient animations

### Memory Management

```javascript
destroy() {
  // Remove event listeners
  document.removeEventListener('click', this.handleDocumentClick);
  window.removeEventListener('resize', this.updatePosition);

  // Remove DOM elements
  if (this.dom.calendar && this.dom.calendar.parentNode) {
    this.dom.calendar.parentNode.removeChild(this.dom.calendar);
  }

  // Clear references
  this.dom = null;
  this.state = null;
  this.options = null;
}
```

---

## Testing Strategy

### Manual Testing Checklist

- [ ] Single date selection
- [ ] Range date selection
- [ ] Multiple date selection
- [ ] Time picker functionality
- [ ] Keyboard navigation
- [ ] Mobile responsiveness
- [ ] Date restrictions
- [ ] Position calculations
- [ ] Theme switching
- [ ] Locale support

### Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Debugging Tips

### Enable Debug Mode

```javascript
const picker = new DatePicker('#input', {
  onReady: () => console.log('Ready'),
  onOpen: () => console.log('Opened'),
  onChange: (date) => console.log('Changed:', date),
  onClose: () => console.log('Closed'),
});

// Access internals
console.log(picker.state);
console.log(picker.options);
console.log(picker.dom);
```

### Common Issues

1. **Calendar not appearing**
   - Check z-index conflicts
   - Verify `appendTo` target exists
   - Check CSS is loaded

2. **Position incorrect**
   - Verify input has layout (not `display: none`)
   - Check for CSS transforms on parents
   - Review `position` option

3. **Dates not selectable**
   - Check `isDateDisabled()` logic
   - Verify min/max dates
   - Review custom disable function

---

## Future Enhancements

### Planned Features

1. **Accessibility improvements**
   - Better screen reader support
   - Enhanced keyboard navigation
   - Focus management

2. **Performance optimizations**
   - Virtual scrolling for year dropdown
   - Lazy rendering for large date ranges

3. **Additional features**
   - Week selection mode
   - Quarter selection
   - Preset date ranges
   - Custom cell rendering

---

## Resources

- **Source Code**: `src/DatePicker.js`, `src/datelite.css`
- **Examples**: `examples/` directory
- **User Documentation**: `examples/documentation.html`
- **Build Config**: `rollup.config.js`, `postcss.config.js`

---

**Last Updated**: January 2026  
**Version**: 1.0.0  
**Maintainer**: DateLite Team
