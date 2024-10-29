const express = require ('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config')

const bookCtrl = require('../controllers/books');

router.post('/', auth, multer, bookCtrl.createBook);
router.put('/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.get('/:id', auth, bookCtrl.getOneBook);
router.get('/', auth, bookCtrl.getAllBook);

module.exports = router;