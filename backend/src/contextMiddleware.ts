import { Request, Response, NextFunction } from 'express';
import { extractUnleashContext, FlagContext } from './extractUnleashContext.js';

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
  const flagContext = extractUnleashContext(req);

  // Attach the context to the request object
  req.flagContext = flagContext;

  // Log the context for debugging (remove in production)
  if (Object.keys(flagContext).length > 0) {
    console.log('Unleash context extracted from headers:', flagContext);
  }

  next();
};
