# Unified Navigation System

This document explains the new unified navigation system that centralizes both navbar links and page header data in a single JSON file.

## Overview

Previously, navigation data was split between:
- `data/navlinks.json` - for navbar navigation
- `data/pageHeadersData.json` - for page headers and breadcrumbs

Now everything is unified in:
- `data/navbarlink.json` - contains both navigation and page header data

## File Structure

```json
{
  "navigation": [
    {
      "label": "Home",
      "href": "/",
      "highlight": true,
      "pageHeader": {
        "title": "Home",
        "routes": [
          { "label": "Home" }
        ]
      }
    },
    {
      "label": "Treatments",
      "dropdown": [
        {
          "label": "Treatment 1",
          "href": "/treatments/1",
          "pageHeader": {
            "title": "Treatment 1",
            "routes": [
              { "label": "Home", "href": "/" },
              { "label": "Treatments", "href": "/treatments" },
              { "label": "Treatment 1" }
            ]
          }
        }
      ]
    }
  ],
  "additionalPages": {
    "notification": {
      "title": "Notification",
      "routes": [
        { "label": "Home", "href": "/" },
        { "label": "Notification" }
      ]
    }
  }
}
```

## Usage in Components

### Navbar Components

The navbar components automatically use the new structure:

```jsx
import navbarData from "@/data/navbarlink.json";

// Access navigation items
const navigationItems = navbarData.navigation;
```

### Page Components

Use the utility functions to get page header data:

```jsx
import { getPageHeaderData } from "@/utils/navigationUtils";

const MyPage = () => {
  const { title, routes } = getPageHeaderData('/about');
  
  return (
    <div>
      <PageHeader title={title} routes={routes} />
      {/* Your page content */}
    </div>
  );
};
```

## Utility Functions

### `getPageHeaderData(path)`
Get page header data by route path (recommended for new pages).

```jsx
const { title, routes } = getPageHeaderData('/about');
const { title, routes } = getPageHeaderData('/hospitalSearch');
```

### `getPageHeaderDataByKey(key)`
Get page header data by key (for backward compatibility).

```jsx
const { title, routes } = getPageHeaderDataByKey('aboutUs');
const { title, routes } = getPageHeaderDataByKey('notification');
```

### `getNavigationItems()`
Get all navigation items for navbar.

```jsx
const navigationItems = getNavigationItems();
```

### `getAdditionalPages()`
Get additional pages data.

```jsx
const additionalPages = getAdditionalPages();
```

## Benefits

1. **Single Source of Truth**: All navigation and page header data in one file
2. **Easy Maintenance**: Add/modify routes in one place
3. **Consistency**: Ensures navbar and page headers stay in sync
4. **Backward Compatibility**: Old key-based access still works
5. **Type Safety**: Centralized structure makes it easier to validate

## Migration Guide

### For Existing Pages

Replace:
```jsx
import PageHeadrsData from "@/data/pageHeadersData.json";
const { title, routes } = PageHeadrsData.aboutUs;
```

With:
```jsx
import { getPageHeaderData } from "@/utils/navigationUtils";
const { title, routes } = getPageHeaderData('/about');
```

### For New Pages

1. Add the route to `data/navbarlink.json` in the appropriate section
2. Include the `pageHeader` data with `title` and `routes`
3. Use `getPageHeaderData('/your-route')` in your page component

## Adding New Routes

### Main Navigation Item

```json
{
  "label": "New Page",
  "href": "/new-page",
  "pageHeader": {
    "title": "New Page Title",
    "routes": [
      { "label": "Home", "href": "/" },
      { "label": "New Page Title" }
    ]
  }
}
```

### Dropdown Item

```json
{
  "label": "New Dropdown Item",
  "href": "/category/new-item",
  "pageHeader": {
    "title": "New Item Title",
    "routes": [
      { "label": "Home", "href": "/" },
      { "label": "Category", "href": "/category" },
      { "label": "New Item Title" }
    ]
  }
}
```

### Additional Page (not in main navigation)

```json
"newAdditionalPage": {
  "title": "Additional Page Title",
  "routes": [
    { "label": "Home", "href": "/" },
    { "label": "Additional Page Title" }
  ]
}
```

## File Locations

- **Main Config**: `data/navbarlink.json`
- **Utilities**: `utils/navigationUtils.js`
- **Example**: `examples/PageExample.jsx`
- **Documentation**: `docs/NAVIGATION_SYSTEM.md`
