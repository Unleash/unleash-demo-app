import { IContext } from 'unleash-proxy-client';

/**
 * Creates headers with Unleash context parameters
 * @param context The Unleash context object
 * @returns Headers object with Unleash context parameters
 */
export const createUnleashContextHeaders = (context: IContext): Record<string, string> => {
  // Create headers with Content-Type
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add all context parameters as headers
  Object.entries(context).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object') {
        // Handle properties object
        if (key === 'properties') {
          Object.entries(value).forEach(([propKey, propValue]) => {
            if (propValue !== undefined && propValue !== null) {
              headers[`Unleash-ContextParam-${propKey}`] = String(propValue);
            }
          });
        }
      } else {
        headers[`Unleash-ContextParam-${key}`] = String(value);
      }
    }
  });

  return headers;
};