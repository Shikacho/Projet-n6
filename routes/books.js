const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config');

const bookCtrl = require('../controllers/books');
const sharpMiddleware = require('../middleware/sharp');

router.get('/bestrating', bookCtrl.getBestRatedBooks);

router.get('/', bookCtrl.getAllBook);
router.post('/', auth, multer, sharpMiddleware, bookCtrl.createBook);
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', auth, multer, sharpMiddleware, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);

router.post('/:id/rating', auth, bookCtrl.rateBook);

module.exports = router;