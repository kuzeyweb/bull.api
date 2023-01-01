import { Router } from 'express';
import createProductInventory from '../controllers/product-inventories/createProductInventory'
import updateProductInventory from '../controllers/product-inventories/updateProductInventory'

const router = Router();

router.post('/', createProductInventory);

router.patch('/', updateProductInventory);

export default router;
