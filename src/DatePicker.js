/**
 * Pure JavaScript DatePicker Component
 * Modern ES6+ class-based implementation with full customization
 */
class DatePicker {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;

    if (!this.element) {
      throw new Error('DatePicker: Invalid element provided');
    }

    // Default configuration
    this.defaultOptions = {
      mode: 'single', // 'single', 'range', 'multiple'
      startDate: null,
      endDate: null,
      minDate: null,
      maxDate: null,
      defaultDate: null,
      enableTime: false,
      enableSeconds: false,
      time_24hr: true,
      locale: 'en',
      inline: false,
      firstDayOfWeek: 0, // 0 = Sunday, 1 = Monday
      format: 'Y-m-d',
      position: 'auto', // 'auto', 'above', 'below'
      theme: 'default',
      showWeekNumbers: false,
      weekNumbers: false,
      allowInput: true,
      clickOpens: true,
      closeOnSelect: true,
      disableMobile: false,
      // Icon options
      showIcon: true,
      iconPosition: 'right', // 'left', 'right'
      customIcon: null, // Custom icon HTML or SVG
      iconClass: 'datepicker-icon',
      iconClickOpens: true,
      // Dropdown options
      enableMonthDropdown: true,
      enableYearDropdown: true,
      yearRange: 100, // Years before and after current year
      minYear: null,
      maxYear: null,
      // Range confirmation options
      confirmRange: false, // Show Apply/Cancel buttons for range mode
      applyButtonText: 'Apply',
      cancelButtonText: 'Cancel',
      showRangeButtons: false, // Internal flag for showing buttons
      // Date blocking options
      disabledDates: [], // Array of specific dates to disable
      disabledDaysOfWeek: [], // Array of weekdays to disable (0=Sunday, 6=Saturday)
      disabledDateRanges: [], // Array of date ranges to disable [{start: Date, end: Date}]
      enabledDates: [], // Array of only allowed dates (overrides other disabled options)
      disableWeekends: false, // Quick option to disable weekends
      disableFunction: null, // Custom function to determine if date should be disabled
      blockPastDates: false, // Block all dates before today
      blockFutureDates: false, // Block all dates after today
      // Positioning options
      appendTo: null, // Element to append datepicker to (null = auto, 'body' = document.body, or CSS selector/element)
      positionX: null, // Fixed X position (pixels from left)
      positionY: null, // Fixed Y position (pixels from top)
      offsetX: 0, // X offset from calculated position
      offsetY: 0, // Y offset from calculated position
    };

    // Merge options
    this.options = { ...this.defaultOptions, ...options };

    // Adjust options based on mode
    if (this.options.mode === 'range' && this.options.confirmRange) {
      // Force closeOnSelect to false for confirmation mode
      this.options.closeOnSelect = false;
    }

    // Internal state
    this.state = {
      isOpen: false,
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      selectedDates: [],
      startDate: null,
      endDate: null,
      currentTime: { hours: 12, minutes: 0, seconds: 0 },
      viewMode: 'days', // 'days', 'months', 'years'
      // Range confirmation state
      tempStartDate: null,
      tempEndDate: null,
      confirmedStartDate: null,
      confirmedEndDate: null,
    };

    // DOM references
    this.dom = {
      container: null,
      calendar: null,
      input: null,
      overlay: null,
      inputWrapper: null,
      icon: null,
    };

    // Event callbacks
    this.callbacks = {
      onReady: options.onReady || (() => {}),
      onOpen: options.onOpen || (() => {}),
      onClose: options.onClose || (() => {}),
      onChange: options.onChange || (() => {}),
      onMonthChange: options.onMonthChange || (() => {}),
      onYearChange: options.onYearChange || (() => {}),
      onTimeChange: options.onTimeChange || (() => {}),
      onSelect: options.onSelect || (() => {}),
      onClear: options.onClear || (() => {}),
    };

    // Locale data
    this.locales = {
      en: {
        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        monthsShort: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    };

    // Bind methods
    this.bindMethods();

    // Initialize
    try {
      this.init();
    } catch (error) {
      console.error('DatePicker initialization failed:', error);
      throw error;
    }
  }

  /**
   * Bind all methods to maintain context
   */
  bindMethods() {
    const methods = [
      'handleDocumentClick',
      'handleKeydown',
      'handleInputChange',
      'handleCalendarClick',
      'handlePrevMonth',
      'handleNextMonth',
      'handleYearSelect',
      'handleMonthSelect',
      'handleDateSelect',
      'handleTimeChange',
      'handleClear',
      'open',
      'close',
      'toggle',
    ];

    methods.forEach((method) => {
      if (this[method]) {
        this[method] = this[method].bind(this);
      }
    });
  }

  /**
   * Initialize the DatePicker
   */
  init() {
    this.setupDOM();
    this.setupEvents();
    this.setInitialDate();
    this.render();
    this.callbacks.onReady(this);
    return this;
  }

  /**
   * Setup DOM structure
   */
  setupDOM() {
    try {
      // Create container
      this.dom.container = document.createElement('div');
      this.dom.container.className = `datepicker-container ${this.options.theme}`;

      if (this.options.inline) {
        this.dom.container.classList.add('datepicker-inline');
        this.element.appendChild(this.dom.container);
      } else {
        this.dom.container.classList.add('datepicker-popup');

        // Add positioning classes
        if (this.options.positionX !== null && this.options.positionY !== null) {
          this.dom.container.classList.add('fixed-position');
        } else if (this.options.positionX !== null || this.options.positionY !== null) {
          this.dom.container.classList.add('custom-position');
        }

        // Determine where to append the container
        const appendTarget = this.getAppendTarget();
        appendTarget.appendChild(this.dom.container);

        // Setup input and icon wrapper
        this.setupInputWithIcon();
      }

      // Create calendar structure
      this.createCalendarStructure();
    } catch (error) {
      console.error('Error setting up DOM:', error);
      throw error;
    }
  }

  /**
   * Get the target element to append the datepicker to
   */
  getAppendTarget() {
    if (!this.options.appendTo) {
      return document.body; // Default behavior
    }

    if (this.options.appendTo === 'body') {
      return document.body;
    }

    if (typeof this.options.appendTo === 'string') {
      const target = document.querySelector(this.options.appendTo);
      if (!target) {
        console.warn(
          `DatePicker: appendTo target "${this.options.appendTo}" not found, using body`
        );
        return document.body;
      }
      return target;
    }

    if (this.options.appendTo instanceof HTMLElement) {
      return this.options.appendTo;
    }

    console.warn('DatePicker: Invalid appendTo option, using body');
    return document.body;
  }

  /**
   * Setup input with icon wrapper
   */
  setupInputWithIcon() {
    // Get or create input
    this.dom.input =
      this.element.tagName === 'INPUT'
        ? this.element
        : this.element.querySelector('input') || this.createInput();

    // If icon is enabled and input doesn't already have a wrapper
    if (
      this.options.showIcon &&
      !this.dom.input.parentElement.classList.contains('datepicker-input-wrapper')
    ) {
      this.wrapInputWithIcon();
    }
  }

  /**
   * Wrap input with icon container
   */
  wrapInputWithIcon() {
    // Create wrapper
    this.dom.inputWrapper = document.createElement('div');
    this.dom.inputWrapper.className = `datepicker-input-wrapper icon-${this.options.iconPosition}`;

    // Insert wrapper before input
    this.dom.input.parentNode.insertBefore(this.dom.inputWrapper, this.dom.input);

    // Move input into wrapper
    this.dom.inputWrapper.appendChild(this.dom.input);

    // Create and add icon
    this.createIcon();
  }

  /**
   * Create datepicker icon
   */
  createIcon() {
    this.dom.icon = document.createElement('span');
    this.dom.icon.className = this.options.iconClass;

    // Use custom icon if provided, otherwise use default
    if (this.options.customIcon) {
      this.dom.icon.innerHTML = this.options.customIcon;
    } else {
      this.dom.icon.innerHTML = this.getDefaultIcon();
    }

    // Add icon to wrapper
    if (this.options.iconPosition === 'left') {
      this.dom.inputWrapper.insertBefore(this.dom.icon, this.dom.input);
    } else {
      this.dom.inputWrapper.appendChild(this.dom.icon);
    }

    // Add click event if enabled
    if (this.options.iconClickOpens) {
      this.dom.icon.addEventListener('click', () => this.toggle());
    }
  }

  /**
   * Get default calendar icon SVG
   */
  getDefaultIcon() {
    return `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
        `;
  }

  /**
   * Create input element if needed
   */
  createInput() {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'datepicker-input';
    input.placeholder = this.getPlaceholder();
    this.element.appendChild(input);
    return input;
  }

  /**
   * Create calendar DOM structure
   */
  createCalendarStructure() {
    try {
      this.dom.calendar = document.createElement('div');
      this.dom.calendar.className = 'datepicker-calendar';
      this.dom.calendar.innerHTML = this.getCalendarHTML();
      this.dom.container.appendChild(this.dom.calendar);
    } catch (error) {
      console.error('Error creating calendar structure:', error);
      throw error;
    }
  }

  /**
   * Get calendar HTML structure
   */
  getCalendarHTML() {
    return `
            <div class="datepicker-header">
                <button type="button" class="datepicker-prev-btn" aria-label="Previous month">&lt;</button>
                <div class="datepicker-month-year">
                    ${this.getMonthYearHTML()}
                </div>
                <button type="button" class="datepicker-next-btn" aria-label="Next month">&gt;</button>
            </div>
            <div class="datepicker-body">
                <div class="datepicker-weekdays"></div>
                <div class="datepicker-days"></div>
            </div>
            ${this.options.enableTime ? this.getTimePickerHTML() : ''}
            <div class="datepicker-footer">
                ${this.getRangeButtonsHTML()}
                <button type="button" class="datepicker-clear-btn">Clear</button>
                <button type="button" class="datepicker-today-btn">Today</button>
            </div>
        `;
  }

  /**
   * Get month/year selector HTML
   */
  getMonthYearHTML() {
    if (this.options.enableMonthDropdown || this.options.enableYearDropdown) {
      return `
                ${
                  this.options.enableMonthDropdown
                    ? this.getMonthDropdownHTML()
                    : '<button type="button" class="datepicker-month-btn"></button>'
                }
                ${
                  this.options.enableYearDropdown
                    ? this.getYearDropdownHTML()
                    : '<button type="button" class="datepicker-year-btn"></button>'
                }
            `;
    } else {
      return `
                <button type="button" class="datepicker-month-btn"></button>
                <button type="button" class="datepicker-year-btn"></button>
            `;
    }
  }

  /**
   * Get month dropdown HTML
   */
  getMonthDropdownHTML() {
    const locale = this.locales[this.options.locale];
    const months = locale.months;

    let options = '';
    months.forEach((month, index) => {
      options += `<option value="${index}">${month}</option>`;
    });

    return `<select class="datepicker-month-dropdown" aria-label="Select month">${options}</select>`;
  }

  /**
   * Get year dropdown HTML
   */
  getYearDropdownHTML() {
    const currentYear = new Date().getFullYear();
    const minYear = this.options.minYear || currentYear - this.options.yearRange;
    const maxYear = this.options.maxYear || currentYear + this.options.yearRange;

    let options = '';
    for (let year = minYear; year <= maxYear; year++) {
      options += `<option value="${year}">${year}</option>`;
    }

    return `<select class="datepicker-year-dropdown" aria-label="Select year">${options}</select>`;
  }

  /**
   * Get range confirmation buttons HTML
   */
  getRangeButtonsHTML() {
    if (this.options.mode === 'range' && this.options.confirmRange) {
      return `
                <div class="datepicker-range-buttons">
                    <button type="button" class="datepicker-apply-btn">${this.options.applyButtonText}</button>
                    <button type="button" class="datepicker-cancel-btn">${this.options.cancelButtonText}</button>
                </div>
            `;
    }
    return '';
  }

  /**
   * Get time picker HTML
   */
  getTimePickerHTML() {
    return `
            <div class="datepicker-time">
                <div class="time-input-group">
                    <input type="number" class="time-hours" min="0" max="${
                      this.options.time_24hr ? '23' : '12'
                    }" value="12">
                    <span>:</span>
                    <input type="number" class="time-minutes" min="0" max="59" value="00">
                    ${
                      this.options.enableSeconds
                        ? '<span>:</span><input type="number" class="time-seconds" min="0" max="59" value="00">'
                        : ''
                    }
                    ${
                      !this.options.time_24hr
                        ? '<select class="time-ampm"><option value="AM">AM</option><option value="PM">PM</option></select>'
                        : ''
                    }
                </div>
            </div>
        `;
  }

  /**
   * Setup event listeners
   */
  setupEvents() {
    if (!this.options.inline && this.dom.input) {
      if (this.options.clickOpens) {
        this.dom.input.addEventListener('click', this.open);
      }
      this.dom.input.addEventListener('keydown', this.handleKeydown);
      if (this.options.allowInput) {
        this.dom.input.addEventListener('input', this.handleInputChange);
      }
    }

    // Calendar events
    if (this.dom.calendar) {
      this.dom.calendar.addEventListener('click', this.handleCalendarClick);
      this.dom.calendar.addEventListener('change', this.handleDropdownChange.bind(this));
    }

    // Document events for closing
    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('keydown', this.handleKeydown);
  }

  /**
   * Set initial date based on options
   */
  setInitialDate() {
    if (this.options.defaultDate) {
      this.setDate(this.options.defaultDate);
    } else if (this.options.startDate && this.options.mode === 'range') {
      this.setStartEndDate(this.options.startDate, this.options.endDate);
    }
  }

  /**
   * Main render method
   */
  render() {
    if (!this.dom || !this.dom.calendar) return this;

    this.renderHeader();
    this.renderWeekdays();
    this.renderDays();
    this.updateInputValue();
    this.updatePosition();
    return this;
  }

  /**
   * Re-render the calendar (useful for state changes)
   */
  rerender() {
    this.render();
    return this;
  }

  /**
   * Render calendar header (month/year navigation)
   */
  renderHeader() {
    const locale = this.locales[this.options.locale];

    // Handle month display/dropdown
    if (this.options.enableMonthDropdown) {
      const monthDropdown = this.dom.calendar.querySelector('.datepicker-month-dropdown');
      if (monthDropdown) {
        monthDropdown.value = this.state.currentMonth;
      }
    } else {
      const monthBtn = this.dom.calendar.querySelector('.datepicker-month-btn');
      if (monthBtn) {
        monthBtn.textContent = locale.months[this.state.currentMonth];
      }
    }

    // Handle year display/dropdown
    if (this.options.enableYearDropdown) {
      const yearDropdown = this.dom.calendar.querySelector('.datepicker-year-dropdown');
      if (yearDropdown) {
        yearDropdown.value = this.state.currentYear;
      }
    } else {
      const yearBtn = this.dom.calendar.querySelector('.datepicker-year-btn');
      if (yearBtn) {
        yearBtn.textContent = this.state.currentYear;
      }
    }
  }

  /**
   * Render weekday headers
   */
  renderWeekdays() {
    const weekdaysContainer = this.dom.calendar.querySelector('.datepicker-weekdays');
    const locale = this.locales[this.options.locale];
    const weekdays = locale.weekdaysShort;

    // Adjust for first day of week
    const adjustedWeekdays = [
      ...weekdays.slice(this.options.firstDayOfWeek),
      ...weekdays.slice(0, this.options.firstDayOfWeek),
    ];

    weekdaysContainer.innerHTML = adjustedWeekdays
      .map((day) => `<div class="weekday">${day}</div>`)
      .join('');
  }

  /**
   * Render calendar days
   */
  renderDays() {
    const daysContainer = this.dom.calendar.querySelector('.datepicker-days');
    const daysHTML = this.generateDaysHTML();
    daysContainer.innerHTML = daysHTML;
  }

  /**
   * Generate HTML for calendar days
   */
  generateDaysHTML() {
    const firstDay = new Date(this.state.currentYear, this.state.currentMonth, 1);

    const startDate = new Date(firstDay);

    // Adjust start date to first day of week
    const dayOfWeek = (firstDay.getDay() - this.options.firstDayOfWeek + 7) % 7;
    startDate.setDate(startDate.getDate() - dayOfWeek);

    let html = '';
    let currentDate = new Date(startDate);

    // Generate 6 weeks (42 days)
    for (let week = 0; week < 6; week++) {
      html += '<div class="datepicker-week">';

      for (let day = 0; day < 7; day++) {
        const dayClasses = this.getDayClasses(currentDate);
        const isDisabled = this.isDateDisabled(currentDate);

        html += `
                    <button type="button" 
                            class="datepicker-day ${dayClasses}" 
                            data-date="${this.formatDate(currentDate, 'Y-m-d')}"
                            ${isDisabled ? 'disabled' : ''}>
                        ${currentDate.getDate()}
                    </button>
                `;

        currentDate.setDate(currentDate.getDate() + 1);
      }

      html += '</div>';
    }

    return html;
  }

  /**
   * Get CSS classes for a day
   */
  getDayClasses(date) {
    const classes = [];
    const today = new Date();

    // Today
    if (this.isSameDay(date, today)) {
      classes.push('today');
    }

    // Other month
    if (date.getMonth() !== this.state.currentMonth) {
      classes.push('other-month');
    }

    // Selected
    if (this.isDateSelected(date)) {
      classes.push('selected');
    }

    // Range
    if (this.options.mode === 'range' && this.isDateInRange(date)) {
      classes.push('in-range');
    }

    // Range start/end
    if (this.options.mode === 'range') {
      if (this.state.startDate && this.isSameDay(date, this.state.startDate)) {
        classes.push('range-start');
      }
      if (this.state.endDate && this.isSameDay(date, this.state.endDate)) {
        classes.push('range-end');
      }
    }

    // Add specific disabled classes for styling
    if (this.isDateDisabled(date)) {
      const dayOfWeek = date.getDay();

      // Weekend disabled
      if (this.options.disableWeekends && (dayOfWeek === 0 || dayOfWeek === 6)) {
        classes.push('disabled-weekend');
      }
      // Past date disabled
      else if (this.options.blockPastDates && date < today) {
        classes.push('disabled-past');
      }
      // Future date disabled
      else if (this.options.blockFutureDates && date > today) {
        classes.push('disabled-future');
      }
      // Custom disabled
      else {
        classes.push('disabled-custom');
      }
    }

    return classes.join(' ');
  }

  /**
   * Check if date is disabled
   */
  isDateDisabled(date) {
    // Basic min/max date checks
    if (this.options.minDate && date < this.options.minDate) return true;
    if (this.options.maxDate && date > this.options.maxDate) return true;

    // Block past dates
    if (this.options.blockPastDates) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) return true;
    }

    // Block future dates
    if (this.options.blockFutureDates) {
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (date > today) return true;
    }

    // If enabledDates is specified, only those dates are allowed
    if (this.options.enabledDates && this.options.enabledDates.length > 0) {
      return !this.options.enabledDates.some((enabledDate) => this.isSameDay(date, enabledDate));
    }

    // Check specific disabled dates
    if (this.options.disabledDates && this.options.disabledDates.length > 0) {
      if (this.options.disabledDates.some((disabledDate) => this.isSameDay(date, disabledDate))) {
        return true;
      }
    }

    // Check disabled date ranges
    if (this.options.disabledDateRanges && this.options.disabledDateRanges.length > 0) {
      for (const range of this.options.disabledDateRanges) {
        if (date >= range.start && date <= range.end) {
          return true;
        }
      }
    }

    // Check disabled days of week
    const dayOfWeek = date.getDay();
    if (this.options.disabledDaysOfWeek && this.options.disabledDaysOfWeek.includes(dayOfWeek)) {
      return true;
    }

    // Quick weekend disable
    if (this.options.disableWeekends && (dayOfWeek === 0 || dayOfWeek === 6)) {
      return true;
    }

    // Custom disable function
    if (this.options.disableFunction && typeof this.options.disableFunction === 'function') {
      return this.options.disableFunction(date);
    }

    return false;
  }

  /**
   * Check if date is selected
   */
  isDateSelected(date) {
    return this.state.selectedDates.some((selectedDate) => this.isSameDay(date, selectedDate));
  }

  /**
   * Check if date is in range (for range mode)
   */
  isDateInRange(date) {
    if (!this.state.startDate || !this.state.endDate) return false;
    return date >= this.state.startDate && date <= this.state.endDate;
  }

  /**
   * Check if two dates are the same day
   */
  isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  /**
   * Update input value based on selected dates
   */
  updateInputValue() {
    if (!this.dom.input) return;

    let value = '';

    switch (this.options.mode) {
      case 'single':
        if (this.state.selectedDates.length > 0) {
          value = this.formatDate(this.state.selectedDates[0], this.options.format);
        }
        break;

      case 'range':
        if (this.state.startDate && this.state.endDate) {
          value = `${this.formatDate(
            this.state.startDate,
            this.options.format
          )} - ${this.formatDate(this.state.endDate, this.options.format)}`;
        } else if (this.state.startDate) {
          value = this.formatDate(this.state.startDate, this.options.format);
        }
        break;

      case 'multiple':
        value = this.state.selectedDates
          .map((date) => this.formatDate(date, this.options.format))
          .join(', ');
        break;
    }

    this.dom.input.value = value;
  }

  /**
   * Update popup position
   */
  updatePosition() {
    if (!this.options || this.options.inline || !this.dom.container) return;

    // Make sure container is visible for measurement
    const wasHidden = this.dom.container.style.visibility === 'hidden';
    if (wasHidden) {
      this.dom.container.style.visibility = 'visible';
      this.dom.container.style.opacity = '0';
    }

    let top, left;

    // Check if custom position is specified
    if (this.options.positionX !== null && this.options.positionY !== null) {
      // Use fixed positioning
      left = this.options.positionX + this.options.offsetX;
      top = this.options.positionY + this.options.offsetY;
    } else if (this.options.positionX !== null || this.options.positionY !== null) {
      // Partial custom positioning - calculate the other coordinate
      if (!this.dom.input) {
        console.warn('DatePicker: Cannot calculate position without input element');
        return;
      }

      const inputRect = this.dom.input.getBoundingClientRect();

      if (this.options.positionX !== null) {
        left = this.options.positionX + this.options.offsetX;
        // Calculate Y based on input position
        top = inputRect.bottom + window.scrollY + 5 + this.options.offsetY;
      } else {
        top = this.options.positionY + this.options.offsetY;
        // Calculate X based on input position
        left = inputRect.left + window.scrollX + this.options.offsetX;
      }
    } else {
      // Standard positioning relative to input
      if (!this.dom.input) {
        console.warn('DatePicker: Cannot position without input element and custom coordinates');
        return;
      }

      const inputRect = this.dom.input.getBoundingClientRect();
      const containerRect = this.dom.container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Calculate horizontal position
      left = inputRect.left + window.scrollX + this.options.offsetX;

      // Ensure container doesn't go off-screen horizontally
      if (left + containerRect.width > viewportWidth) {
        left = viewportWidth - containerRect.width - 10;
      }
      if (left < 10) {
        left = 10;
      }

      // Calculate vertical position
      if (this.options.position === 'above') {
        top = inputRect.top + window.scrollY - containerRect.height - 5 + this.options.offsetY;
      } else if (this.options.position === 'below') {
        top = inputRect.bottom + window.scrollY + 5 + this.options.offsetY;
      } else {
        // Auto positioning
        const spaceBelow = viewportHeight - inputRect.bottom;
        const spaceAbove = inputRect.top;

        if (spaceBelow >= containerRect.height + 10 || spaceBelow >= spaceAbove) {
          top = inputRect.bottom + window.scrollY + 5 + this.options.offsetY;
        } else {
          top = inputRect.top + window.scrollY - containerRect.height - 5 + this.options.offsetY;
        }
      }

      // Ensure container doesn't go off-screen vertically (only for auto positioning)
      if (this.options.positionY === null && top < window.scrollY + 10) {
        top = window.scrollY + 10;
      }
    }

    this.dom.container.style.left = `${left}px`;
    this.dom.container.style.top = `${top}px`;

    // Restore visibility
    if (wasHidden) {
      this.dom.container.style.opacity = '';
      this.dom.container.style.visibility = '';
    }
  }

  // Event Handlers
  handleDocumentClick(event) {
    if (!this.state || !this.state.isOpen || !this.dom) return;

    if (
      !this.dom.container.contains(event.target) &&
      (!this.dom.input || !this.dom.input.contains(event.target))
    ) {
      this.close();
    }
  }

  handleKeydown(event) {
    if (!this.state || !this.state.isOpen) return;

    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      case 'Enter':
        // Handle date selection
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowUp':
      case 'ArrowDown':
        // Handle keyboard navigation
        event.preventDefault();
        this.handleArrowKeys(event.key);
        break;
    }
  }

  handleInputChange(event) {
    // Parse input value and update selected dates
    const value = event.target.value;
    try {
      const date = this.parseDate(value);
      if (date) {
        this.setDate(date);
      }
    } catch (e) {
      // Invalid date format
    }
  }

  handleCalendarClick(event) {
    const target = event.target;

    if (target.classList.contains('datepicker-day') && !target.disabled) {
      const dateStr = target.dataset.date;
      const date = this.parseDate(dateStr);
      this.handleDateSelect(date);
    } else if (target.classList.contains('datepicker-prev-btn')) {
      this.handlePrevMonth();
    } else if (target.classList.contains('datepicker-next-btn')) {
      this.handleNextMonth();
    } else if (target.classList.contains('datepicker-month-btn')) {
      this.handleMonthSelect();
    } else if (target.classList.contains('datepicker-year-btn')) {
      this.handleYearSelect();
    } else if (target.classList.contains('datepicker-clear-btn')) {
      this.handleClear();
    } else if (target.classList.contains('datepicker-today-btn')) {
      this.setDate(new Date());
    } else if (target.classList.contains('datepicker-apply-btn')) {
      this.handleApply();
    } else if (target.classList.contains('datepicker-cancel-btn')) {
      this.handleCancel();
    }
  }

  handleDropdownChange(event) {
    const target = event.target;

    if (target.classList.contains('datepicker-month-dropdown')) {
      const newMonth = parseInt(target.value);
      this.state.currentMonth = newMonth;
      this.callbacks.onMonthChange(this.state.currentMonth, this.state.currentYear);
      this.rerender();
    } else if (target.classList.contains('datepicker-year-dropdown')) {
      const newYear = parseInt(target.value);
      this.state.currentYear = newYear;
      this.callbacks.onYearChange(this.state.currentYear);
      this.callbacks.onMonthChange(this.state.currentMonth, this.state.currentYear);
      this.rerender();
    }
  }

  handleDateSelect(date) {
    switch (this.options.mode) {
      case 'single':
        this.state.selectedDates = [date];
        if (this.options.closeOnSelect) {
          this.close();
        }
        break;

      case 'range':
        if (this.options.confirmRange) {
          // Use temporary dates for confirmation mode
          if (!this.state.tempStartDate || (this.state.tempStartDate && this.state.tempEndDate)) {
            // Start new range
            this.state.tempStartDate = date;
            this.state.tempEndDate = null;
          } else {
            // Complete range
            if (date < this.state.tempStartDate) {
              this.state.tempEndDate = this.state.tempStartDate;
              this.state.tempStartDate = date;
            } else {
              this.state.tempEndDate = date;
            }
          }
          // Update display dates for preview
          this.state.startDate = this.state.tempStartDate;
          this.state.endDate = this.state.tempEndDate;
        } else {
          // Original behavior for non-confirmation mode
          if (!this.state.startDate || (this.state.startDate && this.state.endDate)) {
            // Start new range - don't close on first date
            this.state.startDate = date;
            this.state.endDate = null;
          } else {
            // Complete range - only close when both dates are selected
            if (date < this.state.startDate) {
              this.state.endDate = this.state.startDate;
              this.state.startDate = date;
            } else {
              this.state.endDate = date;
            }
            // Only close when we have both start and end dates
            if (this.options.closeOnSelect && this.state.startDate && this.state.endDate) {
              this.close();
            }
          }
        }
        break;

      case 'multiple': {
        const existingIndex = this.state.selectedDates.findIndex((d) => this.isSameDay(d, date));
        if (existingIndex >= 0) {
          this.state.selectedDates.splice(existingIndex, 1);
        } else {
          this.state.selectedDates.push(date);
        }
        break;
      }
    }

    this.rerender();
    this.callbacks.onSelect(date);
    this.callbacks.onChange(this.getDate());
  }

  handlePrevMonth() {
    if (this.state.currentMonth === 0) {
      this.state.currentMonth = 11;
      this.state.currentYear--;
      this.callbacks.onYearChange(this.state.currentYear);
    } else {
      this.state.currentMonth--;
    }
    this.callbacks.onMonthChange(this.state.currentMonth, this.state.currentYear);
    this.rerender();
  }

  handleNextMonth() {
    if (this.state.currentMonth === 11) {
      this.state.currentMonth = 0;
      this.state.currentYear++;
      this.callbacks.onYearChange(this.state.currentYear);
    } else {
      this.state.currentMonth++;
    }
    this.callbacks.onMonthChange(this.state.currentMonth, this.state.currentYear);
    this.rerender();
  }

  handleMonthSelect() {
    // TODO: Implement month selection view
    // console.log("Month selection not implemented yet");
  }

  handleYearSelect() {
    // TODO: Implement year selection view
    // console.log("Year selection not implemented yet");
  }

  handleTimeChange(event) {
    const target = event.target;
    const value = parseInt(target.value);

    if (target.classList.contains('time-hours')) {
      this.state.currentTime.hours = value;
    } else if (target.classList.contains('time-minutes')) {
      this.state.currentTime.minutes = value;
    } else if (target.classList.contains('time-seconds')) {
      this.state.currentTime.seconds = value;
    }

    this.callbacks.onTimeChange(this.state.currentTime);
  }

  handleClear() {
    this.state.selectedDates = [];
    this.state.startDate = null;
    this.state.endDate = null;

    // Clear confirmation state if in range confirmation mode
    if (this.options.mode === 'range' && this.options.confirmRange) {
      this.state.tempStartDate = null;
      this.state.tempEndDate = null;
      this.state.confirmedStartDate = null;
      this.state.confirmedEndDate = null;
    }

    this.rerender();
    this.callbacks.onClear();
    this.callbacks.onChange(null);
  }

  handleApply() {
    if (this.options.mode === 'range' && this.options.confirmRange) {
      // Confirm the temporary selection
      this.state.confirmedStartDate = this.state.tempStartDate;
      this.state.confirmedEndDate = this.state.tempEndDate;

      // Update actual dates
      this.state.startDate = this.state.tempStartDate;
      this.state.endDate = this.state.tempEndDate;

      // Trigger callbacks
      this.callbacks.onChange(this.getDate());
      this.callbacks.onSelect(this.state.endDate || this.state.startDate);

      // Close datepicker
      this.close();
    }
  }

  handleCancel() {
    if (this.options.mode === 'range' && this.options.confirmRange) {
      // Restore confirmed dates or clear if none
      this.state.tempStartDate = this.state.confirmedStartDate;
      this.state.tempEndDate = this.state.confirmedEndDate;
      this.state.startDate = this.state.confirmedStartDate;
      this.state.endDate = this.state.confirmedEndDate;

      // Re-render to show restored state
      this.rerender();

      // Close datepicker
      this.close();
    }
  }

  handleArrowKeys(_key) {
    // TODO: Implement keyboard navigation
    // console.log(`Arrow key navigation: ${_key}`);
  }

  // Public API Methods

  /**
   * Open the datepicker
   */
  open() {
    if (!this.options || this.options.inline || this.state.isOpen) return this;

    this.state.isOpen = true;
    this.dom.container.classList.add('datepicker-open');
    this.updatePosition();

    if (this.callbacks && this.callbacks.onOpen) {
      this.callbacks.onOpen();
    }
    return this;
  }

  /**
   * Close the datepicker
   */
  close() {
    if (!this.options || this.options.inline || !this.state.isOpen) return this;

    this.state.isOpen = false;
    this.dom.container.classList.remove('datepicker-open');
    this.callbacks.onClose();
    return this;
  }

  /**
   * Toggle datepicker visibility
   */
  toggle() {
    return this.state.isOpen ? this.close() : this.open();
  }

  /**
   * Set selected date(s)
   */
  setDate(date) {
    if (!date) return this;

    const parsedDate = typeof date === 'string' ? this.parseDate(date) : new Date(date);

    switch (this.options.mode) {
      case 'single':
        this.state.selectedDates = [parsedDate];
        break;
      case 'multiple':
        if (!this.isDateSelected(parsedDate)) {
          this.state.selectedDates.push(parsedDate);
        }
        break;
      case 'range':
        this.state.startDate = parsedDate;
        this.state.endDate = null;
        break;
    }

    // Update current month/year to show the selected date
    this.state.currentMonth = parsedDate.getMonth();
    this.state.currentYear = parsedDate.getFullYear();

    this.rerender();
    this.callbacks.onChange(this.getDate());
    return this;
  }

  /**
   * Get selected date(s)
   */
  getDate() {
    switch (this.options.mode) {
      case 'single':
        return this.state.selectedDates.length > 0 ? this.state.selectedDates[0] : null;
      case 'range':
        if (this.options.confirmRange) {
          // Return confirmed dates, not temporary ones
          return {
            start: this.state.confirmedStartDate,
            end: this.state.confirmedEndDate,
          };
        } else {
          return {
            start: this.state.startDate,
            end: this.state.endDate,
          };
        }
      case 'multiple':
        return [...this.state.selectedDates];
      default:
        return null;
    }
  }

  /**
   * Set start and end dates for range mode
   */
  setStartEndDate(startDate, endDate) {
    if (this.options.mode !== 'range') return this;

    this.state.startDate = startDate
      ? typeof startDate === 'string'
        ? this.parseDate(startDate)
        : new Date(startDate)
      : null;
    this.state.endDate = endDate
      ? typeof endDate === 'string'
        ? this.parseDate(endDate)
        : new Date(endDate)
      : null;

    if (this.state.startDate) {
      this.state.currentMonth = this.state.startDate.getMonth();
      this.state.currentYear = this.state.startDate.getFullYear();
    }

    this.rerender();
    this.callbacks.onChange(this.getDate());
    return this;
  }

  /**
   * Set minimum selectable date
   */
  setMinDate(date) {
    this.options.minDate = date
      ? typeof date === 'string'
        ? this.parseDate(date)
        : new Date(date)
      : null;
    this.rerender();
    return this;
  }

  /**
   * Set maximum selectable date
   */
  setMaxDate(date) {
    this.options.maxDate = date
      ? typeof date === 'string'
        ? this.parseDate(date)
        : new Date(date)
      : null;
    this.rerender();
    return this;
  }

  /**
   * Set locale
   */
  setLocale(locale) {
    if (this.locales[locale]) {
      this.options.locale = locale;
      this.rerender();
    }
    return this;
  }

  /**
   * Enable month dropdown
   */
  enableMonthDropdown() {
    this.options.enableMonthDropdown = true;
    this.dom.calendar.innerHTML = this.getCalendarHTML();
    this.rerender();
    return this;
  }

  /**
   * Disable month dropdown
   */
  disableMonthDropdown() {
    this.options.enableMonthDropdown = false;
    this.dom.calendar.innerHTML = this.getCalendarHTML();
    this.rerender();
    return this;
  }

  /**
   * Enable year dropdown
   */
  enableYearDropdown() {
    this.options.enableYearDropdown = true;
    this.dom.calendar.innerHTML = this.getCalendarHTML();
    this.rerender();
    return this;
  }

  /**
   * Disable year dropdown
   */
  disableYearDropdown() {
    this.options.enableYearDropdown = false;
    this.dom.calendar.innerHTML = this.getCalendarHTML();
    this.rerender();
    return this;
  }

  /**
   * Set year range for dropdown
   */
  setYearRange(range) {
    this.options.yearRange = range;
    if (this.options.enableYearDropdown) {
      this.dom.calendar.innerHTML = this.getCalendarHTML();
      this.rerender();
    }
    return this;
  }

  /**
   * Set min/max years for dropdown
   */
  setYearLimits(minYear, maxYear) {
    this.options.minYear = minYear;
    this.options.maxYear = maxYear;
    if (this.options.enableYearDropdown) {
      this.dom.calendar.innerHTML = this.getCalendarHTML();
      this.rerender();
    }
    return this;
  }

  /**
   * Add specific dates to disable
   */
  addDisabledDates(dates) {
    if (!Array.isArray(dates)) dates = [dates];

    dates.forEach((date) => {
      const dateObj = typeof date === 'string' ? this.parseDate(date) : new Date(date);
      if (dateObj && !this.options.disabledDates.some((d) => this.isSameDay(d, dateObj))) {
        this.options.disabledDates.push(dateObj);
      }
    });

    this.rerender();
    return this;
  }

  /**
   * Remove specific dates from disabled list
   */
  removeDisabledDates(dates) {
    if (!Array.isArray(dates)) dates = [dates];

    dates.forEach((date) => {
      const dateObj = typeof date === 'string' ? this.parseDate(date) : new Date(date);
      if (dateObj) {
        this.options.disabledDates = this.options.disabledDates.filter(
          (d) => !this.isSameDay(d, dateObj)
        );
      }
    });

    this.rerender();
    return this;
  }

  /**
   * Clear all disabled dates
   */
  clearDisabledDates() {
    this.options.disabledDates = [];
    this.rerender();
    return this;
  }

  /**
   * Add date range to disable
   */
  addDisabledDateRange(startDate, endDate) {
    const start = typeof startDate === 'string' ? this.parseDate(startDate) : new Date(startDate);
    const end = typeof endDate === 'string' ? this.parseDate(endDate) : new Date(endDate);

    if (start && end) {
      this.options.disabledDateRanges.push({ start, end });
      this.rerender();
    }
    return this;
  }

  /**
   * Remove date range from disabled list
   */
  removeDisabledDateRange(startDate, endDate) {
    const start = typeof startDate === 'string' ? this.parseDate(startDate) : new Date(startDate);
    const end = typeof endDate === 'string' ? this.parseDate(endDate) : new Date(endDate);

    if (start && end) {
      this.options.disabledDateRanges = this.options.disabledDateRanges.filter(
        (range) => !(this.isSameDay(range.start, start) && this.isSameDay(range.end, end))
      );
      this.rerender();
    }
    return this;
  }

  /**
   * Clear all disabled date ranges
   */
  clearDisabledDateRanges() {
    this.options.disabledDateRanges = [];
    this.rerender();
    return this;
  }

  /**
   * Set disabled days of week
   */
  setDisabledDaysOfWeek(days) {
    this.options.disabledDaysOfWeek = Array.isArray(days) ? days : [days];
    this.rerender();
    return this;
  }

  /**
   * Add days of week to disable
   */
  addDisabledDaysOfWeek(days) {
    if (!Array.isArray(days)) days = [days];

    days.forEach((day) => {
      if (!this.options.disabledDaysOfWeek.includes(day)) {
        this.options.disabledDaysOfWeek.push(day);
      }
    });

    this.rerender();
    return this;
  }

  /**
   * Remove days of week from disabled list
   */
  removeDisabledDaysOfWeek(days) {
    if (!Array.isArray(days)) days = [days];

    days.forEach((day) => {
      const index = this.options.disabledDaysOfWeek.indexOf(day);
      if (index > -1) {
        this.options.disabledDaysOfWeek.splice(index, 1);
      }
    });

    this.rerender();
    return this;
  }

  /**
   * Enable/disable weekends
   */
  setDisableWeekends(disable) {
    this.options.disableWeekends = disable;
    this.rerender();
    return this;
  }

  /**
   * Enable/disable past dates
   */
  setBlockPastDates(block) {
    this.options.blockPastDates = block;
    this.rerender();
    return this;
  }

  /**
   * Enable/disable future dates
   */
  setBlockFutureDates(block) {
    this.options.blockFutureDates = block;
    this.rerender();
    return this;
  }

  /**
   * Set only enabled dates (whitelist mode)
   */
  setEnabledDates(dates) {
    if (!Array.isArray(dates)) dates = [dates];

    this.options.enabledDates = dates
      .map((date) => (typeof date === 'string' ? this.parseDate(date) : new Date(date)))
      .filter((date) => date !== null);

    this.rerender();
    return this;
  }

  /**
   * Clear enabled dates (exit whitelist mode)
   */
  clearEnabledDates() {
    this.options.enabledDates = [];
    this.rerender();
    return this;
  }

  /**
   * Set custom disable function
   */
  setDisableFunction(fn) {
    this.options.disableFunction = typeof fn === 'function' ? fn : null;
    this.rerender();
    return this;
  }

  /**
   * Set append target for the datepicker
   */
  setAppendTo(target) {
    if (this.options.inline) {
      console.warn('DatePicker: Cannot change appendTo for inline mode');
      return this;
    }

    this.options.appendTo = target;

    // Move container to new parent if it exists
    if (this.dom.container && this.dom.container.parentNode) {
      const newParent = this.getAppendTarget();
      newParent.appendChild(this.dom.container);
      this.updatePosition();
    }

    return this;
  }

  /**
   * Set fixed position coordinates
   */
  setPosition(x, y) {
    this.options.positionX = typeof x === 'number' ? x : null;
    this.options.positionY = typeof y === 'number' ? y : null;

    if (this.dom.container && this.state.isOpen) {
      this.updatePosition();
    }

    return this;
  }

  /**
   * Set X position
   */
  setPositionX(x) {
    this.options.positionX = typeof x === 'number' ? x : null;

    if (this.dom.container && this.state.isOpen) {
      this.updatePosition();
    }

    return this;
  }

  /**
   * Set Y position
   */
  setPositionY(y) {
    this.options.positionY = typeof y === 'number' ? y : null;

    if (this.dom.container && this.state.isOpen) {
      this.updatePosition();
    }

    return this;
  }

  /**
   * Set position offset
   */
  setOffset(offsetX, offsetY) {
    this.options.offsetX = typeof offsetX === 'number' ? offsetX : 0;
    this.options.offsetY = typeof offsetY === 'number' ? offsetY : 0;

    if (this.dom.container && this.state.isOpen) {
      this.updatePosition();
    }

    return this;
  }

  /**
   * Reset to automatic positioning
   */
  resetPosition() {
    this.options.positionX = null;
    this.options.positionY = null;
    this.options.offsetX = 0;
    this.options.offsetY = 0;

    if (this.dom.container && this.state.isOpen) {
      this.updatePosition();
    }

    return this;
  }

  /**
   * Show the datepicker icon
   */
  showIcon() {
    this.options.showIcon = true;
    if (!this.options.inline && this.dom.input && !this.dom.inputWrapper) {
      this.wrapInputWithIcon();
    } else if (this.dom.icon) {
      this.dom.icon.style.display = '';
    }
    return this;
  }

  /**
   * Hide the datepicker icon
   */
  hideIcon() {
    this.options.showIcon = false;
    if (this.dom.icon) {
      this.dom.icon.style.display = 'none';
    }
    return this;
  }

  /**
   * Toggle icon visibility
   */
  toggleIcon() {
    return this.options.showIcon ? this.hideIcon() : this.showIcon();
  }

  /**
   * Update the icon (change custom icon)
   */
  updateIcon(customIcon) {
    this.options.customIcon = customIcon;
    if (this.dom.icon) {
      this.dom.icon.innerHTML = customIcon || this.getDefaultIcon();
    }
    return this;
  }

  /**
   * Set icon position (left or right)
   */
  setIconPosition(position) {
    if (position !== 'left' && position !== 'right') return this;

    this.options.iconPosition = position;

    if (this.dom.inputWrapper && this.dom.icon) {
      // Update wrapper class
      this.dom.inputWrapper.className = this.dom.inputWrapper.className.replace(
        /icon-(left|right)/,
        `icon-${position}`
      );

      // Move icon to correct position
      if (position === 'left') {
        this.dom.inputWrapper.insertBefore(this.dom.icon, this.dom.input);
      } else {
        this.dom.inputWrapper.appendChild(this.dom.icon);
      }
    }

    return this;
  }

  /**
   * Enable range confirmation mode
   */
  enableRangeConfirmation(applyText = 'Apply', cancelText = 'Cancel') {
    if (this.options.mode === 'range') {
      this.options.confirmRange = true;
      this.options.applyButtonText = applyText;
      this.options.cancelButtonText = cancelText;
      this.options.closeOnSelect = false; // Disable auto-close
      this.dom.calendar.innerHTML = this.getCalendarHTML();
      this.rerender();
    }
    return this;
  }

  /**
   * Disable range confirmation mode
   */
  disableRangeConfirmation() {
    this.options.confirmRange = false;
    // Note: We don't automatically set closeOnSelect to true here
    // because the user might have explicitly set it to false

    // Clear temporary state
    this.state.tempStartDate = null;
    this.state.tempEndDate = null;
    this.state.confirmedStartDate = null;
    this.state.confirmedEndDate = null;

    this.dom.calendar.innerHTML = this.getCalendarHTML();
    this.rerender();
    return this;
  }

  /**
   * Get current range selection (including temporary)
   */
  getCurrentRange() {
    if (this.options.mode === 'range') {
      return {
        start: this.state.startDate,
        end: this.state.endDate,
        confirmed: this.options.confirmRange
          ? {
              start: this.state.confirmedStartDate,
              end: this.state.confirmedEndDate,
            }
          : null,
      };
    }
    return null;
  }

  /**
   * Update options dynamically
   */
  updateOptions(newOptions) {
    const oldOptions = { ...this.options };
    this.options = { ...this.options, ...newOptions };

    // Update callbacks if provided
    Object.keys(this.callbacks).forEach((key) => {
      if (newOptions[key] && typeof newOptions[key] === 'function') {
        this.callbacks[key] = newOptions[key];
      }
    });

    // Handle icon-related option changes
    if ('showIcon' in newOptions) {
      if (newOptions.showIcon && !oldOptions.showIcon) {
        this.showIcon();
      } else if (!newOptions.showIcon && oldOptions.showIcon) {
        this.hideIcon();
      }
    }

    if ('customIcon' in newOptions) {
      this.updateIcon(newOptions.customIcon);
    }

    if ('iconPosition' in newOptions) {
      this.setIconPosition(newOptions.iconPosition);
    }

    // Handle confirmation mode changes
    if ('confirmRange' in newOptions && this.options.mode === 'range') {
      if (newOptions.confirmRange && !oldOptions.confirmRange) {
        this.enableRangeConfirmation(newOptions.applyButtonText, newOptions.cancelButtonText);
      } else if (!newOptions.confirmRange && oldOptions.confirmRange) {
        this.disableRangeConfirmation();
      }
    }

    this.rerender();
    return this;
  }

  /**
   * Destroy the datepicker
   */
  destroy() {
    // Remove event listeners
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('keydown', this.handleKeydown);

    if (this.dom.input) {
      this.dom.input.removeEventListener('click', this.open);
      this.dom.input.removeEventListener('keydown', this.handleKeydown);
      this.dom.input.removeEventListener('input', this.handleInputChange);
    }

    if (this.dom.icon) {
      this.dom.icon.removeEventListener('click', this.toggle);
    }

    // Remove DOM elements
    if (this.dom.container && this.dom.container.parentNode) {
      this.dom.container.parentNode.removeChild(this.dom.container);
    }

    // Unwrap input if it was wrapped
    if (this.dom.inputWrapper && this.dom.input) {
      const parent = this.dom.inputWrapper.parentNode;
      if (parent) {
        parent.insertBefore(this.dom.input, this.dom.inputWrapper);
        parent.removeChild(this.dom.inputWrapper);
      }
    }

    // Clear references
    this.dom = {};
    this.state = {};
    this.callbacks = {};

    return this;
  }

  // Utility Methods

  /**
   * Format date according to format string
   */
  formatDate(date, format) {
    if (!date) return '';

    const map = {
      Y: date.getFullYear(),
      m: String(date.getMonth() + 1).padStart(2, '0'),
      d: String(date.getDate()).padStart(2, '0'),
      H: String(date.getHours()).padStart(2, '0'),
      i: String(date.getMinutes()).padStart(2, '0'),
      s: String(date.getSeconds()).padStart(2, '0'),
    };

    return format.replace(/[Ymdis]/g, (match) => map[match] || match);
  }

  /**
   * Parse date string
   */
  parseDate(dateStr) {
    // Handle null/undefined
    if (!dateStr) return null;
    
    // Parse YYYY-MM-DD format as local date to avoid timezone shifts
    const parts = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (parts) {
      return new Date(parseInt(parts[1], 10), parseInt(parts[2], 10) - 1, parseInt(parts[3], 10));
    }
    // Fallback for other formats
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  }

  /**
   * Get placeholder text for input
   */
  getPlaceholder() {
    switch (this.options.mode) {
      case 'single':
        return 'Select date';
      case 'range':
        return 'Select date range';
      case 'multiple':
        return 'Select dates';
      default:
        return 'Select date';
    }
  }
}

// Export for use
/* eslint-disable no-undef */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DatePicker;
} else if (typeof window !== 'undefined') {
  window.DatePicker = DatePicker;
}
