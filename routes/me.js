import validateEmail from '../controllers/me/validateEmail'
import { Router } from 'express';
import forgotPassword from '../controllers/me/forgotPassword';
import { rateLimit } from 'express-rate-limit';
import { checkEmail } from '../middlewares/checkEmail';
import resetPassword from '../controllers/me/resetPassword';

const router = Router();

router.post('/validate-email', validateEmail);

router.post('/forgot-password', checkEmail, rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1,
    message: { error: true, message: "Please wait before retrying.", payload: [] }
}), forgotPassword);

router.post('/reset-password', resetPassword);

export default router;

/* rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1, // limit each IP to 1 requests per windowMs
    middleware: function (req, res, next) {
        // check the condition
        if (req.body.emailValidation) {
            // apply rate limit of 1 request per 15 minutes
            return rateLimit({
                max: 1,
                message: { error: true, message: "Please wait before retrying.", payload: [] },
            })(req, res, next);
        } else {
            // apply rate limit of 5 requests per 15 minutes
            return rateLimit({
                max: 5,
                message: { error: true, message: "Please wait before retrying.", payload: [] },
            })(req, res, next);
        }
    },
}) */