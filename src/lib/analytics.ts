// Initialize analytics based on environment
const ANALYTICS_ENABLED = import.meta.env.PROD;

type EventName = 
  | 'page_view'
  | 'button_click'
  | 'feature_use'
  | 'error'
  | 'auth_success'
  | 'auth_failure';

type EventProperties = Record<string, string | number | boolean>;

export function logEvent(name: EventName, properties?: EventProperties) {
  if (!ANALYTICS_ENABLED) {
    console.log('Analytics Event:', name, properties);
    return;
  }

  // Send to your analytics service
  try {
    // Example: Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', name, properties);
    }
  } catch (error) {
    console.error('Analytics Error:', error);
  }
}