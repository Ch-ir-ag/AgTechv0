import { useCallback } from 'react';
import { trackEvent, setTag, identifyUser, upgradeSession } from '../utils/clarityAnalytics';
import { useAuth } from '../contexts/AuthContext';

/**
 * Custom hook for centralized analytics tracking
 */
export function useAnalytics() {
  const { user } = useAuth();

  /**
   * Track a user action or event
   */
  const trackAction = useCallback((action: string, details?: Record<string, string | number | boolean>) => {
    // Track the base event
    trackEvent(action);
    
    // Track any additional details as tags
    if (details) {
      Object.entries(details).forEach(([key, value]) => {
        setTag(`${action}_${key}`, value.toString());
      });
    }
  }, []);

  /**
   * Track a page view
   */
  const trackPageView = useCallback((pageName: string, pageId?: string) => {
    trackEvent(`view_${pageName}`);
    
    // If user is authenticated, also identify them on this page
    if (user) {
      identifyUser(user.username, undefined, pageId, user.company);
    }
  }, [user]);

  /**
   * Upgrade the importance of the current session
   */
  const markImportantSession = useCallback((reason: string) => {
    upgradeSession(reason);
    trackEvent(`important_session_${reason}`);
  }, []);

  return {
    trackAction,
    trackPageView,
    markImportantSession
  };
} 