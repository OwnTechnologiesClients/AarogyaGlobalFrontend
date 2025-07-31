import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import { getPageHeaderData, getPageHeaderDataByKey } from "@/utils/navigationUtils";

/**
 * Example page showing how to use the unified navigation system
 */
const PageExample = () => {
  // Method 1: Get page header data by route path (recommended for new pages)
  const { title, routes } = getPageHeaderData('/about');
  
  // Method 2: Get page header data by key (for backward compatibility)
  // const { title, routes } = getPageHeaderDataByKey('aboutUs');
  
  // Method 3: For pages not in navigation (like notification, appointment, login)
  // const { title, routes } = getPageHeaderDataByKey('notification');

  return (
    <div>
      <PageHeader title={title} routes={routes} />
      
      {/* Your page content here */}
      <div className="container mx-auto px-4 py-8">
        <h2>Page Content</h2>
        <p>This is an example of how to use the unified navigation system.</p>
      </div>
    </div>
  );
};

export default PageExample;

/**
 * Usage Examples:
 * 
 * 1. For existing navigation pages:
 *    const { title, routes } = getPageHeaderData('/about');
 *    const { title, routes } = getPageHeaderData('/contact');
 *    const { title, routes } = getPageHeaderData('/hospitalSearch');
 * 
 * 2. For dropdown navigation pages:
 *    const { title, routes } = getPageHeaderData('/doctorDetails');
 *    const { title, routes } = getPageHeaderData('/hospitalDetails');
 * 
 * 3. For additional pages (not in main navigation):
 *    const { title, routes } = getPageHeaderDataByKey('notification');
 *    const { title, routes } = getPageHeaderDataByKey('appointment');
 *    const { title, routes } = getPageHeaderDataByKey('login');
 * 
 * 4. For backward compatibility with old keys:
 *    const { title, routes } = getPageHeaderDataByKey('aboutUs');
 *    const { title, routes } = getPageHeaderDataByKey('contactUs');
 */
