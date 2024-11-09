const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router(); 
const multer = require('../middleware/multer-config');

const bookCtrl = require('../controllers/books');
const sharpMiddleware = require('../middleware/sharp');


router.put('/:id', auth, multer, sharpMiddleware, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.get('/:id', bookCtrl.getOneBook);
router.get('/', bookCtrl.getAllBook);
router.post('/', auth, multer, sharpMiddleware, bookCtrl.createBook);

module.exports = router;