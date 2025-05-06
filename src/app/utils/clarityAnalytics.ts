import Clarity from '@microsoft/clarity';
import { CLARITY_PROJECT_ID } from '../config/analytics';

/**
 * Initialize Microsoft Clarity analytics with the provided project ID
 * @param projectId Your Microsoft Clarity project ID
 */
export const initClarity = (projectId: string): void => {
  if (typeof window !== 'undefined') {
    try {
      Clarity.init(projectId);
      console.log('Microsoft Clarity initialized via API');
    } catch (error) {
      console.error('Error initializing Microsoft Clarity:', error);
    }
  }
};

/**
 * Identify a user in Microsoft Clarity
 * @param customId Required unique identifier for the customer
 * @param customSessionId Optional custom session identifier
 * @param customPageId Optional custom page identifier
 * @param friendlyName Optional friendly name for the customer
 */
export const identifyUser = (
  customId: string,
  customSessionId?: string,
  customPageId?: string,
  friendlyName?: string
): void => {
  if (typeof window !== 'undefined') {
    Clarity.identify(customId, customSessionId, customPageId, friendlyName);
  }
};

/**
 * Set a custom tag for the current session
 * @param key Tag key
 * @param value Tag value or array of values
 */
export const setTag = (key: string, value: string | string[]): void => {
  if (typeof window !== 'undefined') {
    Clarity.setTag(key, value);
  }
};

/**
 * Track a custom event in Clarity
 * @param eventName Name of the custom event
 */
export const trackEvent = (eventName: string): void => {
  if (typeof window !== 'undefined') {
    Clarity.event(eventName);
  }
};

/**
 * Set user consent for cookies
 * @param hasConsent Whether the user has given consent (defaults to true)
 */
export const setConsent = (hasConsent: boolean = true): void => {
  if (typeof window !== 'undefined') {
    Clarity.consent(hasConsent);
  }
};

/**
 * Upgrade the current session priority for recording
 * @param reason Reason for upgrading the session
 */
export const upgradeSession = (reason: string): void => {
  if (typeof window !== 'undefined') {
    Clarity.upgrade(reason);
  }
}; 