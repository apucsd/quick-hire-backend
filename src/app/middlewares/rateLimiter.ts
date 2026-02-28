import rateLimit from 'express-rate-limit';

// need 100 req in per 60sec max
const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 100,
    // Limit each IP to 100 requests per `window` (here, per 1 min).
    legacyHeaders: true,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after 1 min',
    },
});

export default rateLimiter;
