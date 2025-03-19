import rateLimit from "express-rate-limit";

export const defaultLimiter = rateLimit({
  //Default rate limiter is 5 request in 2 second
  windowMs: 2000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Slow down!",
});
