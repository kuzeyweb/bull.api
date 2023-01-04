import Login from '../controllers/auth/login.js'
import register from '../controllers/auth/register.js'
import { Router } from 'express';
import refreshToken from '../controllers/auth/refresh.js';

const router = Router();

router.post('/login', Login);

router.post('/register', register);

router.post('/refresh/:id', refreshToken);

export default router;
