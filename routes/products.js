import { Router } from 'express';
import createProduct from '../controllers/products/createProduct'
import updateProduct from '../controllers/products/updateProduct'
import deleteProduct from '../controllers/products/deleteProduct'
import getProducts from '../controllers/products/getProducts';
import multer from 'multer';

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, "")}`)
    }
})

const fileFilter = function (req, file, cb) {
    // Only allow jpg, png, and webp files
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB file size limit
    },
    fileFilter: fileFilter
})

router.post('/', upload.any(), createProduct);

router.get('/', getProducts);

router.patch('/:id', upload.any(), updateProduct);

router.delete('/:id', deleteProduct);

export default router;
