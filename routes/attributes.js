import { Router } from 'express';
import createAttribute from '../controllers/attributes/createAttribute'
import updateAttribute from '../controllers/attributes/updateAttribute'
import deleteAttribute from '../controllers/attributes/deleteAttribute'
import assignAttributes from '../controllers/attributes/assignAttributes'
import getAttributes from '../controllers/attributes/getAttributes';
import getAttribute from '../controllers/attributes/getAttribute';

const router = Router();

router.post('/', createAttribute);

router.get('/', getAttributes);

router.get('/:id', getAttribute);

router.delete('/:id', deleteAttribute);

router.patch('/:id', updateAttribute);

router.put('/assign', assignAttributes);

export default router;
