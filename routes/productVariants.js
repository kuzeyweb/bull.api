import { Router } from 'express';
import createProductVariant from '../controllers/product-variants/createProductVariant';
import updateProductVariant from '../controllers/product-variants/updateProductVariant';
import deleteProductVariant from '../controllers/product-variants/deleteProductVariant';
import getProductVariant from '../controllers/product-variants/getProductVariant';
import multer from 'multer';

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

const router = Router();

router.post('/', upload.any(), createProductVariant);

router.get('/:id', getProductVariant);

router.patch('/:id', upload.any(), updateProductVariant);

router.delete('/:id', deleteProductVariant);

export default router;
