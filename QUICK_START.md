# DatePicker Quick Start Guide

## Installation

### 1. Include Files

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="src/datelite.css" />
  </head>
  <body>
    <!-- Your HTML -->
    <script src="src/DatePicker.js"></script>
  </body>
</html>
```

### 2. Basic HTML

```html
<input type="text" id="my-datepicker" placeholder="Select a date" />
```

### 3. Initialize

```javascript
const picker = new DatePicker("#my-datepicker");
```

## Common Use Cases

### Single Date Selection

```javascript
const picker = new DatePicker("#date-input", {
  mode: "single",
  format: "Y-m-d",
  onChange: function (date) {
    console.log("Selected:", date);
  },
});
```

### Date Range Selection

```javascript
const rangePicker = new DatePicker("#range-input", {
  mode: "range",
  format: "Y-m-d",
  onChange: function (dateRange) {
    console.log("Range:", dateRange.start, "to", dateRange.end);
  },
});
```

### Multiple Date Selection

```javascript
const multiPicker = new DatePicker("#multi-input", {
  mode: "multiple",
  closeOnSelect: false,
  onChange: function (dates) {
    console.log("Selected dates:", dates);
  },
});
```

### Inline Calendar

```html
<div id="inline-calendar"></div>
```

```javascript
const inlinePicker = new DatePicker("#inline-calendar", {
  inline: true,
  mode: "single",
});
```

### With Time Selection

```javascript
const timePicker = new DatePicker("#datetime-input", {
  enableTime: true,
  time_24hr: true,
  format: "Y-m-d H:i",
});
```

## Configuration Examples

### Date Constraints

```javascript
const picker = new DatePicker("#input", {
  minDate: new Date(), // Today onwards
  maxDate: "2024-12-31", // Until end of year
  disabledDates: ["2024-12-25", "2024-01-01"], // Holidays
  disableWeekends: true,
});
```

### Custom Styling

```javascript
const picker = new DatePicker("#input", {
  theme: "dark",
  showIcon: true,
  iconPosition: "left",
  customIcon: "📅",
});
```

### Range with Confirmation

```javascript
const picker = new DatePicker("#input", {
  mode: "range",
  confirmRange: true,
  applyButtonText: "Confirm",
  cancelButtonText: "Reset",
});
```

## API Quick Reference

### Core Methods

```javascript
picker.open(); // Open datepicker
picker.close(); // Close datepicker
picker.setDate("2024-12-25"); // Set date
const date = picker.getDate(); // Get selected date
picker.destroy(); // Clean up
```

### Date Blocking

```javascript
picker.addDisabledDates(["2024-12-25"]);
picker.setDisableWeekends(true);
picker.setBlockPastDates(true);
picker.clearDisabledDates();
```

### Dynamic Updates

```javascript
picker.updateOptions({
  theme: "dark",
  format: "F j, Y",
});

picker.setMinDate("2024-01-01");
picker.setMaxDate("2024-12-31");
```

## Event Handling

```javascript
const picker = new DatePicker("#input", {
  onReady: function () {
    console.log("DatePicker initialized");
  },

  onChange: function (date) {
    console.log("Date changed:", date);
    // Update other UI elements
    document.getElementById("output").textContent = date;
  },

  onOpen: function () {
    console.log("DatePicker opened");
  },

  onClose: function () {
    console.log("DatePicker closed");
  },
});
```

## Styling Customization

### CSS Variables (if supported)

```css
.datepicker-container {
  --primary-color: #007bff;
  --background-color: #ffffff;
  --border-color: #dee2e6;
  --text-color: #495057;
}
```

### Custom Theme

```css
.datepicker-container.my-theme {
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.datepicker-container.my-theme .datepicker-day.selected {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
}
```

```javascript
const picker = new DatePicker("#input", {
  theme: "my-theme",
});
```

## Common Patterns

### Form Integration

```html
<form id="booking-form">
  <label>Check-in Date:</label>
  <input type="text" id="checkin" name="checkin" required />

  <label>Check-out Date:</label>
  <input type="text" id="checkout" name="checkout" required />

  <button type="submit">Book Now</button>
</form>
```

```javascript
const checkinPicker = new DatePicker("#checkin", {
  minDate: new Date(),
  onChange: function (date) {
    // Update checkout minimum date
    checkoutPicker.setMinDate(date);
  },
});

const checkoutPicker = new DatePicker("#checkout", {
  minDate: new Date(),
});

document
  .getElementById("booking-form")
  .addEventListener("submit", function (e) {
    const checkin = checkinPicker.getDate();
    const checkout = checkoutPicker.getDate();

    if (!checkin || !checkout) {
      e.preventDefault();
      alert("Please select both dates");
    }
  });
```

### Dynamic Date Blocking

```javascript
const picker = new DatePicker("#input");

// Block dates based on API response
fetch("/api/unavailable-dates")
  .then((response) => response.json())
  .then((dates) => {
    picker.addDisabledDates(dates);
  });

// Block weekends for business days only
document
  .getElementById("business-only")
  .addEventListener("change", function (e) {
    picker.setDisableWeekends(e.target.checked);
  });
```

### Multiple DatePickers Coordination

```javascript
const startPicker = new DatePicker("#start-date", {
  onChange: function (date) {
    // Update end date minimum
    endPicker.setMinDate(date);

    // Clear end date if it's before start
    const endDate = endPicker.getDate();
    if (endDate && endDate < date) {
      endPicker.setDate(null);
    }
  },
});

const endPicker = new DatePicker("#end-date", {
  onChange: function (date) {
    // Update start date maximum
    startPicker.setMaxDate(date);
  },
});
```

## Troubleshooting

### DatePicker Not Showing

```javascript
// Check if element exists
const element = document.getElementById("my-input");
if (!element) {
  console.error("Input element not found");
}

// Check CSS is loaded
const styles = getComputedStyle(
  document.querySelector(".datepicker-container")
);
if (!styles.position) {
  console.error("DatePicker CSS not loaded");
}
```

### Dates Not Updating

```javascript
// Ensure onChange callback is set
const picker = new DatePicker("#input", {
  onChange: function (date) {
    console.log("Date changed:", date);
    // Your update logic here
  },
});

// Check if date is disabled
const testDate = new Date("2024-12-25");
if (picker.isDateDisabled(testDate)) {
  console.log("Date is disabled");
}
```

### Performance Issues

```javascript
// Batch updates instead of multiple calls
picker.updateOptions({
  minDate: "2024-01-01",
  maxDate: "2024-12-31",
  disableWeekends: true,
  theme: "dark",
}); // Single re-render

// Instead of:
// picker.setMinDate('2024-01-01');  // Re-render
// picker.setMaxDate('2024-12-31');  // Re-render
// picker.setDisableWeekends(true);  // Re-render
// picker.updateOptions({theme: 'dark'}); // Re-render
```

## Best Practices

### 1. Always Clean Up

```javascript
// When removing DatePicker from DOM
picker.destroy();
picker = null;
```

### 2. Use Method Chaining

```javascript
const picker = new DatePicker("#input")
  .setMinDate(new Date())
  .setDisableWeekends(true)
  .addDisabledDates(["2024-12-25"]);
```

### 3. Validate User Input

```javascript
const picker = new DatePicker("#input", {
  onChange: function (date) {
    if (date) {
      // Valid date selected
      this.element.classList.remove("error");
    } else {
      // No date or invalid date
      this.element.classList.add("error");
    }
  },
});
```

### 4. Provide User Feedback

```javascript
const picker = new DatePicker("#input", {
  onOpen: function () {
    document.body.classList.add("datepicker-open");
  },
  onClose: function () {
    document.body.classList.remove("datepicker-open");
  },
  onChange: function (date) {
    // Show confirmation
    const message = date
      ? `Selected: ${date.toDateString()}`
      : "No date selected";
    document.getElementById("status").textContent = message;
  },
});
```

## Next Steps

- Read the [Developer Guide](DEVELOPER_GUIDE.md) for advanced customization
- Check the [API Reference](API_REFERENCE.md) for complete method documentation
- View `example.html` for comprehensive examples
- Explore the source code in `DatePicker.js` for implementation details
