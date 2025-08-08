import navbarData from "@/data/navbarlink.json";

/**
 * Get page header data by route path
 * @param {string} path - The route path (e.g., "/about", "/contact")
 * @returns {object} - Object containing title and routes for PageHeader component
 */
export const getPageHeaderData = (path) => {
  // Remove leading slash and convert to lowercase for comparison
  const cleanPath = path.replace(/^\//, '').toLowerCase();

  // First, check navigation items
  for (const navItem of navbarData.navigation) {
    // Check main navigation item
    if (navItem.href && navItem.href.replace(/^\//, '').toLowerCase() === cleanPath) {
      return navItem.pageHeader;
    }

    // Check dropdown items
    if (navItem.dropdown) {
      for (const dropdownItem of navItem.dropdown) {
        if (dropdownItem.href && dropdownItem.href.replace(/^\//, '').toLowerCase() === cleanPath) {
          return dropdownItem.pageHeader;
        }
      }
    }
  }

  // Check additional pages
  for (const [key, pageData] of Object.entries(navbarData.additionalPages)) {
    if (key.toLowerCase() === cleanPath) {
      return pageData;
    }
  }

  // Return default if not found
  return {
    title: "Page Not Found",
    routes: [
      { label: "Home", href: "/" },
      { label: "Page Not Found" }
    ]
  };
};

/**
 * Get page header data by key (for backward compatibility)
 * @param {string} key - The key from the old pageHeadersData.json structure
 * @returns {object} - Object containing title and routes for PageHeader component
 */
export const getPageHeaderDataByKey = (key) => {
  // Map old keys to new structure
  const keyMapping = {
    'home': '/',
    'aboutUs': '/about',
    'contactUs': '/contact',
    'hospitalSearch': '/hospitalSearch',
    'hospitalDetails': '/hospitalDetails',
    'doctorDetails': '/doctorDetails',
    'orthopaedicsTreatment': '/orthopaedicsTreatment',
    'partnerWithUs': '/partner/partnerWithUs',
    'notification': 'notification',
    'appointment': 'appointment',
    'login': 'login'
  };

  const mappedPath = keyMapping[key];
  if (!mappedPath) {
    return getPageHeaderData('');
  }

  // If it's an additional page (no leading slash), get from additionalPages
  if (!mappedPath.startsWith('/')) {
    return navbarData.additionalPages[mappedPath] || getPageHeaderData('');
  }

  return getPageHeaderData(mappedPath);
};

/**
 * Get all navigation items for navbar
 * @returns {array} - Array of navigation items
 */
export const getNavigationItems = () => {
  return navbarData.navigation;
};

/**
 * Get additional pages data
 * @returns {object} - Object containing additional pages data
 */
export const getAdditionalPages = () => {
  return navbarData.additionalPages;
};
