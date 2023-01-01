import { Router } from 'express';
import createCategory from '../controllers/categories/createCategory'
import updateCategory from '../controllers/categories/updateCategory'
import deleteCategory from '../controllers/categories/deleteCategory'
import getCategories from '../controllers/categories/getCategories';
import getCategoryAttributes from '../controllers/categories/getCategoryAttributes';
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

router.post('/', upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
]), createCategory);

router.get('/', getCategories);

router.patch('/:id', upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
]), updateCategory);

router.delete('/:id', deleteCategory);

router.get('/:id/attributes', getCategoryAttributes);

export default router;
