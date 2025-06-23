# Wrapper System Documentation

## Overview
The Wrapper component provides a consistent layout system across your entire website with flexible padding, background, and styling options that match your reference design.

## Features
- **Consistent rounded corners** (rounded-2xl)
- **Light gray body background** (bg-gray-50)
- **White content areas** with subtle shadows
- **Flexible padding system** with 5 different sizes
- **Customizable backgrounds** and styling
- **Easy to override** for special cases

## Usage

### Basic Usage
```jsx
import Wrapper from "@/components/Wrapper";

const MyComponent = () => (
  <Wrapper>
    <div>Your content here</div>
  </Wrapper>
);
```

### Advanced Usage with Props
```jsx
<Wrapper 
  padding="lg"           // Padding size
  background="white"     // Background color
  rounded={true}         // Rounded corners
  className="shadow-lg"  // Additional classes
>
  <div>Your content here</div>
</Wrapper>
```

## Props

### `padding` (string)
Controls the internal spacing of the wrapper:
- `"none"` - No padding
- `"sm"` - Small padding (px-4 py-2)
- `"default"` - Default padding (px-6 py-4 md:px-8 md:py-6)
- `"lg"` - Large padding (px-8 py-6 md:px-12 md:py-8)
- `"xl"` - Extra large padding (px-12 py-8 md:px-16 md:py-12)

### `background` (string)
Sets the background color:
- `"white"` - White background (default)
- `"transparent"` - Transparent background
- `"gray"` - Light gray background

### `rounded` (boolean)
- `true` - Applies rounded-2xl corners (default)
- `false` - No rounded corners

### `className` (string)
Additional CSS classes to apply to the wrapper.

## Examples

### Standard Content Section
```jsx
<Wrapper padding="default" background="white">
  <h2>Section Title</h2>
  <p>Section content...</p>
</Wrapper>
```

### Hero Section (No Background)
```jsx
<Wrapper padding="lg" background="transparent">
  <div>Hero content with background image</div>
</Wrapper>
```

### Compact Section
```jsx
<Wrapper padding="sm" background="white" className="border-t">
  <div>Compact content</div>
</Wrapper>
```

### Full-Width Section
```jsx
<Wrapper padding="none" background="transparent" rounded={false}>
  <div className="w-full">Full width content</div>
</Wrapper>
```

## Layout Structure

The current layout follows this structure:
```
Body (bg-gray-50)
├── TopBar (outside main wrapper)
├── Main Content Container (full-width, padded)
│   └── Main Wrapper (white, rounded, shadow)
│       ├── NavbarToFilterLayout (background image)
│       ├── Page Content (children)
│       └── Footer
└── BottomFooter (outside main wrapper)
```

## Migration Guide

### Before (Old System)
```jsx
<section className="w-full py-8 bg-white flex flex-col items-center">
  <div>Content</div>
</section>
```

### After (New System)
```jsx
<Wrapper padding="default" background="transparent">
  <section className="w-full flex flex-col items-center">
    <div>Content</div>
  </section>
</Wrapper>
```

## Best Practices

1. **Use `background="transparent"`** for most content sections since the main wrapper provides the white background
2. **Use `padding="default"`** for most sections
3. **Use `padding="lg"` or `padding="xl"`** for important sections like hero or contact forms
4. **Use `padding="sm"`** for compact sections like trusted by logos
5. **Add `className`** for additional styling like borders or shadows
6. **Use `background="white"`** only when you need a distinct white section within the layout

## Customization

You can easily customize individual components by:
1. Using different padding sizes
2. Adding custom className props
3. Overriding background colors
4. Disabling rounded corners when needed

This system ensures consistency while maintaining flexibility for future modifications.
