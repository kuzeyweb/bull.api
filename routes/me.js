import validateEmail from '../controllers/me/validateEmail'
import { Router } from 'express';

const router = Router();

router.post('/validate-email', validateEmail);

export default router;
