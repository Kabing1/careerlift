import { useEffect } from 'react';
import { logEvent } from '../analytics';

export function usePerformanceMonitoring() {
  useEffect(() => {
    if ('performance' in window) {
      // Monitor page load performance
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');

        logEvent('performance', {
          loadTime: navigation.loadEventEnd - navigation.startTime,
          firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
          firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        });
      });

      // Monitor long tasks
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) { // Tasks longer than 50ms
            logEvent('performance', {
              type: 'long_task',
              duration: entry.duration,
              startTime: entry.startTime,
            });
          }
        });
      });

      observer.observe({ entryTypes: ['longtask'] });

      return () => {
        observer.disconnect();
      };
    }
  }, []);
}