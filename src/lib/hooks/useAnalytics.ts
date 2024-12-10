import { useEffect } from 'react';
import { logEvent } from '../analytics';
import { useLocation } from '../router';

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    logEvent('page_view', {
      path: location.pathname,
      title: document.title,
    });
  }, [location]);
}

export function useFeatureTracking(featureName: string) {
  return () => {
    logEvent('feature_use', {
      feature: featureName,
      timestamp: new Date().toISOString(),
    });
  };
}