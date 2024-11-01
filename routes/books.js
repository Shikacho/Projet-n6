const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { upload, processImage } = require('../middleware/multer-config'); 

const bookCtrl = require('../controllers/books');


router.post('/', auth, upload, processImage, bookCtrl.createBook);
router.put('/:id', auth, upload, processImage, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.get('/:id', auth, bookCtrl.getOneBook);
router.get('/', auth, bookCtrl.getAllBook);

module.exports = router;