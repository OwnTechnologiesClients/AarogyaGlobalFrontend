# Certificate Swiper Component Documentation

## Overview
The CertificateSwiper component is a reusable React component that displays certificates and accreditations in a beautiful, responsive Swiper carousel. It uses the actual certificate images from the `/public/CertificatesImg/` folder and provides multiple design variants.

## Features
- **Responsive Design**: Adapts to different screen sizes with appropriate breakpoints
- **Multiple Variants**: Default, compact, and minimal styles
- **Swiper Integration**: Smooth carousel navigation with touch/swipe support
- **Image Fallback**: Graceful fallback when certificate images fail to load
- **Customizable**: Flexible props for different use cases
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Usage

### Basic Usage
```jsx
import CertificateSwiper from '@/components/common/CertificateSwiper';

const MyComponent = () => (
  <CertificateSwiper />
);
```

### Custom Certificates
```jsx
const customCertificates = [
  { 
    name: "Custom Certification", 
    logo: "/path/to/image.png", 
    description: "Custom description" 
  }
];

<CertificateSwiper certificates={customCertificates} />
```

### Different Variants

#### Default Variant (Hospital Features)
```jsx
<CertificateSwiper 
  variant="default"
  title="Certifications & Accreditations"
  showNavigation={true}
  className="mb-12"
/>
```

#### Minimal Variant (Hospital Overview)
```jsx
<CertificateSwiper 
  variant="minimal"
  title="Certificates & Accreditations"
  showNavigation={true}
  className="mb-8"
/>
```

#### Compact Variant (Sidebar or Footer)
```jsx
<CertificateSwiper 
  variant="compact"
  title="Our Certifications"
  showNavigation={false}
  className="mb-6"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `certificates` | Array | Default certificates | Array of certificate objects |
| `showNavigation` | Boolean | `true` | Show/hide navigation arrows |
| `showTitle` | Boolean | `true` | Show/hide section title |
| `title` | String | "Certificates & Accreditations" | Section title text |
| `variant` | String | "default" | Design variant: "default", "compact", "minimal" |
| `className` | String | "" | Additional CSS classes |

## Certificate Object Structure
```javascript
{
  name: "Certificate Name",           // Required: Display name
  logo: "/path/to/image.png",        // Required: Image path
  description: "Certificate description" // Optional: Additional info
}
```

## Default Certificates
The component includes 8 default certificates from `/public/CertificatesImg/`:
1. ISO Certification (img1.png)
2. NABH Accreditation (img2.png)
3. JCI Accreditation (img3.png)
4. NABL Certification (img4.png)
5. Quality Award (img5.png)
6. Safety Certification (img6.png)
7. Green Building (img7.jpg)
8. Medical Excellence (img8.jpg)

## Responsive Breakpoints

### Default & Minimal Variants
- Mobile (320px+): 2 slides
- Small tablet (640px+): 3 slides
- Tablet (768px+): 4 slides
- Desktop (1024px+): 5 slides

### Compact Variant
- Mobile (320px+): 3 slides
- Small tablet (640px+): 4 slides
- Tablet (768px+): 5 slides
- Desktop (1024px+): 6 slides

## Styling
The component uses Tailwind CSS classes and includes custom CSS in `app/globals.css`:
- `.certificates-swiper`: Main container styles
- `.line-clamp-1`, `.line-clamp-2`: Text truncation utilities

## Examples in Codebase
1. **HospitalOverview.jsx**: Uses minimal variant for overview section
2. **HospitalFeatures.jsx**: Uses default variant for detailed features page

## Accessibility Features
- Proper ARIA labels for navigation buttons
- Keyboard navigation support
- Screen reader friendly structure
- Focus management

## Browser Support
- Modern browsers with CSS Grid and Flexbox support
- Touch/swipe gestures on mobile devices
- Keyboard navigation
- Screen reader compatibility
