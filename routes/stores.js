import { Router } from 'express';
import createStore from '../controllers/stores/createStore'
import updateStore from '../controllers/stores/updateStore'
import deleteStore from '../controllers/stores/deleteStore'
import getStores from '../controllers/stores/getStores';
import getStore from '../controllers/stores/getStore';
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
]), createStore);

router.get('/', getStores);

router.patch('/:id', upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
]), updateStore);

router.delete('/:id', deleteStore);

router.get('/:id', getStore);

export default router;
