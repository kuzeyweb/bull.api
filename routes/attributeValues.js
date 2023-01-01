import { Router } from 'express';
import createAttributeValue from '../controllers/attributeValues/createAttributeValue'
import updateAttributeValue from '../controllers/attributeValues/updateAttributeValue'
import deleteAttributeValue from '../controllers/attributeValues/deleteAttributeValue'
import getAttributeValues from '../controllers/attributeValues/getAttributeValues'

const router = Router();

router.post('/', createAttributeValue);

router.get('/:id', getAttributeValues);

router.delete('/:id', deleteAttributeValue);

router.patch('/:id', updateAttributeValue);

export default router;
