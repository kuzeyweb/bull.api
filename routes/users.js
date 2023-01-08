import { Router } from 'express';
import createUser from '../controllers/users/createUser';
import deleteUser from '../controllers/users/deleteUser';
import getUsers from '../controllers/users/getUsers';
import updateUser from '../controllers/users/updateUser';

const router = Router();

router.get('/', getUsers);

router.post('/', createUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;
