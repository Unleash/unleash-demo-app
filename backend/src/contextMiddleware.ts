import { Request, Response, NextFunction } from 'express';

// Define the type for the flag context
export interface FlagContext {
  [key: string]: string;
}

// Extend the Express Request interface to include flagContext
declare global {
  namespace Express {
    interface Request {
      flagContext?: FlagContext;
    }
  }
}

/**
 * Middleware to extract Unleash context from request headers
 * Headers in the format "Unleash-ContextParam: ContextValue" will be extracted
 * and added to req.flagContext
 */
export const unleashContextMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const flagContext: FlagContext = {};

  // Iterate through all headers
  Object.entries(req.headers).forEach(([key, value]) => {
    // Convert header name to lowercase for case-insensitive comparison
    const headerName = key.toLowerCase();

    // Check if this is an Unleash context header
    if (headerName.startsWith('unleash-contextparam-')) {
      // Extract the parameter name from the header
      // Format: unleash-contextparam-{paramName}
      const paramName = headerName.replace('unleash-contextparam-', '');

      // Add to context if value exists
      if (value && paramName) {
        // If the value is an array, use the first value
        flagContext[paramName] = Array.isArray(value) ? value[0] : value;
      }
    }
  });

  // Attach the context to the request object
  req.flagContext = flagContext;

  // Log the context for debugging (remove in production)
  if (Object.keys(flagContext).length > 0) {
    console.log('Unleash context extracted from headers:', flagContext);
  }

  next();
};
