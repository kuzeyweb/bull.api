import Login from '../controllers/auth/login.js'
import register from '../controllers/auth/register.js'
import { Router } from 'express';


const router = Router();

router.post('/login', Login);

router.post('/register', register);

export default router;
