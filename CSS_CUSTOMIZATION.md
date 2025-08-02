# DatePicker CSS Customization Guide

The DatePicker component uses CSS custom properties (variables) to make customization easy and flexible. You can override these variables to create your own themes and styling.

## 🎨 Available CSS Variables

### Colors
```css
:root {
  /* Primary Colors */
  --dp-primary-color: #007bff;        /* Main theme color */
  --dp-primary-hover: #0056b3;        /* Hover state */
  --dp-primary-light: #e3f2fd;        /* Light background */
  
  /* Secondary Colors */
  --dp-secondary-color: #6c757d;      /* Secondary elements */
  --dp-secondary-hover: #545b62;      /* Secondary hover */
  
  /* Status Colors */
  --dp-success-color: #28a745;        /* Success states */
  --dp-danger-color: #dc3545;         /* Error/danger states */
  --dp-warning-color: #ffc107;        /* Warning states */
  --dp-info-color: #17a2b8;          /* Info states */
}
```

### Background Colors
```css
:root {
  --dp-bg-primary: #ffffff;           /* Main background */
  --dp-bg-secondary: #f8f9fa;         /* Secondary background */
  --dp-bg-muted: #e9ecef;            /* Muted background */
  --dp-bg-dark: #2d3748;             /* Dark theme background */
  --dp-bg-hover: #e9ecef;            /* Hover background */
}
```

### Text Colors
```css
:root {
  --dp-text-primary: #333333;         /* Main text color */
  --dp-text-secondary: #666666;       /* Secondary text */
  --dp-text-muted: #999999;          /* Muted text */
  --dp-text-light: #cccccc;          /* Light text (disabled) */
  --dp-text-white: #ffffff;          /* White text */
  --dp-text-dark: #e2e8f0;           /* Dark theme text */
}
```

### Border Colors
```css
:root {
  --dp-border-color: #dddddd;         /* Default borders */
  --dp-border-light: #e9ecef;         /* Light borders */
  --dp-border-dark: #4a5568;          /* Dark theme borders */
  --dp-border-focus: #007bff;         /* Focus state borders */
}
```

### Spacing
```css
:root {
  --dp-spacing-xs: 4px;               /* Extra small spacing */
  --dp-spacing-sm: 8px;               /* Small spacing */
  --dp-spacing-md: 12px;              /* Medium spacing */
  --dp-spacing-lg: 16px;              /* Large spacing */
  --dp-spacing-xl: 20px;              /* Extra large spacing */
  --dp-spacing-xxl: 24px;             /* Extra extra large spacing */
}
```

### Font Sizes
```css
:root {
  --dp-font-size-xs: 12px;            /* Extra small text */
  --dp-font-size-sm: 13px;            /* Small text */
  --dp-font-size-base: 14px;          /* Base text size */
  --dp-font-size-lg: 16px;            /* Large text */
  --dp-font-size-xl: 18px;            /* Extra large text */
}
```

### Component Sizes
```css
:root {
  --dp-day-size: 36px;                /* Calendar day button size */
  --dp-button-height: 32px;           /* Navigation button height */
  --dp-input-height: 40px;            /* Input field height */
  --dp-container-min-width: 280px;    /* Minimum container width */
}
```

### Border Radius
```css
:root {
  --dp-border-radius-sm: 4px;         /* Small radius */
  --dp-border-radius-md: 6px;         /* Medium radius */
  --dp-border-radius-lg: 8px;         /* Large radius */
  --dp-border-radius-round: 50%;      /* Round (circular) */
}
```

### Shadows
```css
:root {
  --dp-shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);           /* Small shadow */
  --dp-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);         /* Medium shadow */
  --dp-shadow-lg: 0 8px 25px rgba(0, 0, 0, 0.15);         /* Large shadow */
  --dp-shadow-focus: 0 0 0 2px rgba(0, 123, 255, 0.25);   /* Focus shadow */
}
```

### Transitions
```css
:root {
  --dp-transition-fast: 0.15s ease;   /* Fast transitions */
  --dp-transition-base: 0.2s ease;    /* Base transition speed */
  --dp-transition-slow: 0.3s ease;    /* Slow transitions */
}
```

## 🎯 Customization Examples

### 1. Custom Color Theme
```css
/* Green Theme */
.datepicker-container.green-theme {
  --dp-primary-color: #28a745;
  --dp-primary-hover: #218838;
  --dp-primary-light: #d4edda;
  --dp-border-focus: #28a745;
  --dp-shadow-focus: 0 0 0 2px rgba(40, 167, 69, 0.25);
}

/* Purple Theme */
.datepicker-container.purple-theme {
  --dp-primary-color: #6f42c1;
  --dp-primary-hover: #5a32a3;
  --dp-primary-light: #e2d9f3;
  --dp-border-focus: #6f42c1;
  --dp-shadow-focus: 0 0 0 2px rgba(111, 66, 193, 0.25);
}
```

### 2. Size Variations
```css
/* Large Size Theme */
.datepicker-container.large-theme {
  --dp-day-size: 48px;
  --dp-button-height: 40px;
  --dp-font-size-base: 16px;
  --dp-font-size-lg: 18px;
  --dp-spacing-lg: 20px;
  --dp-container-min-width: 320px;
}

/* Compact Theme */
.datepicker-container.compact-theme {
  --dp-day-size: 28px;
  --dp-button-height: 24px;
  --dp-font-size-base: 12px;
  --dp-font-size-lg: 14px;
  --dp-spacing-lg: 12px;
  --dp-container-min-width: 240px;
}
```

### 3. Border Radius Variations
```css
/* Rounded Theme */
.datepicker-container.rounded-theme {
  --dp-border-radius-sm: 8px;
  --dp-border-radius-md: 12px;
  --dp-border-radius-lg: 16px;
  --dp-day-size: 40px;
}

/* Square Theme */
.datepicker-container.square-theme {
  --dp-border-radius-sm: 0px;
  --dp-border-radius-md: 0px;
  --dp-border-radius-lg: 0px;
  --dp-border-radius-round: 0px;
}
```

### 4. Dark Theme Customization
```css
.datepicker-container.custom-dark {
  --dp-bg-primary: #1a202c;
  --dp-bg-secondary: #2d3748;
  --dp-bg-hover: #4a5568;
  --dp-text-primary: #e2e8f0;
  --dp-text-secondary: #a0aec0;
  --dp-border-color: #4a5568;
  --dp-primary-color: #63b3ed;
  --dp-primary-hover: #4299e1;
  --dp-primary-light: #2c5282;
}
```

## 🚀 Usage Examples

### Method 1: CSS Classes
```css
/* Define your theme */
.my-custom-datepicker {
  --dp-primary-color: #ff6b6b;
  --dp-primary-hover: #ff5252;
  --dp-day-size: 42px;
  --dp-border-radius-md: 10px;
}
```

```javascript
// Use the theme
const picker = new DatePicker('#my-input', {
  theme: 'my-custom-datepicker'
});
```

### Method 2: Inline Styles
```html
<div id="custom-datepicker" style="
  --dp-primary-color: #e91e63;
  --dp-primary-hover: #c2185b;
  --dp-primary-light: #fce4ec;
">
  <input type="text" id="my-input">
</div>
```

### Method 3: Dynamic CSS
```javascript
// Change theme dynamically
document.documentElement.style.setProperty('--dp-primary-color', '#ff9800');
document.documentElement.style.setProperty('--dp-primary-hover', '#f57c00');
```

## 🎨 Pre-built Themes

The DatePicker comes with several pre-built themes:

### Default Theme
```javascript
const picker = new DatePicker('#input', {
  theme: 'default' // Blue theme
});
```

### Dark Theme
```javascript
const picker = new DatePicker('#input', {
  theme: 'dark' // Dark background theme
});
```

### Minimal Theme
```javascript
const picker = new DatePicker('#input', {
  theme: 'minimal' // Clean, minimal design
});
```

### Custom Themes (from examples)
```javascript
// Green theme
const picker1 = new DatePicker('#input1', {
  theme: 'green-theme'
});

// Purple theme
const picker2 = new DatePicker('#input2', {
  theme: 'purple-theme'
});

// Large size theme
const picker3 = new DatePicker('#input3', {
  theme: 'large-theme'
});
```

## 🔧 Advanced Customization

### Custom Component Styling
```css
/* Customize specific components */
.my-datepicker .datepicker-header {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border-radius: var(--dp-border-radius-lg) var(--dp-border-radius-lg) 0 0;
}

.my-datepicker .datepicker-day.selected {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  transform: scale(1.1);
}

.my-datepicker .datepicker-day:hover {
  transform: scale(1.05);
  transition: transform var(--dp-transition-fast);
}
```

### Responsive Customization
```css
/* Mobile-specific customization */
@media (max-width: 768px) {
  .datepicker-container {
    --dp-day-size: 44px;
    --dp-font-size-base: 16px;
    --dp-spacing-lg: 20px;
  }
}
```

### Animation Customization
```css
.datepicker-container {
  --dp-transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.datepicker-day {
  transition: all var(--dp-transition-base);
}

.datepicker-day:hover {
  transform: translateY(-2px);
  box-shadow: var(--dp-shadow-md);
}
```

## 📱 Framework Integration

### React/Vue/Angular
```css
/* Component-scoped styling */
.my-component .datepicker-container {
  --dp-primary-color: var(--brand-color);
  --dp-font-family: var(--app-font);
  --dp-border-radius-md: var(--app-border-radius);
}
```

### CSS-in-JS
```javascript
const theme = {
  '--dp-primary-color': '#ff6b6b',
  '--dp-primary-hover': '#ff5252',
  '--dp-day-size': '40px',
  '--dp-border-radius-md': '8px'
};

// Apply to container
Object.assign(container.style, theme);
```

## 🎯 Best Practices

1. **Use semantic naming**: Create theme classes with meaningful names
2. **Maintain contrast**: Ensure text remains readable with custom colors
3. **Test responsiveness**: Verify your customizations work on all screen sizes
4. **Consider accessibility**: Maintain proper color contrast ratios
5. **Use CSS custom properties**: Leverage the variable system for consistency
6. **Document your themes**: Keep track of your custom theme configurations

## 🔍 Debugging Tips

### Inspect Variables
```javascript
// Check current variable values
const container = document.querySelector('.datepicker-container');
const styles = getComputedStyle(container);
console.log('Primary color:', styles.getPropertyValue('--dp-primary-color'));
```

### Override Detection
```css
/* Use !important sparingly for debugging */
.debug-theme {
  --dp-primary-color: red !important;
}
```

This comprehensive variable system gives you complete control over the DatePicker's appearance while maintaining consistency and ease of maintenance.