const express = require ('express');
const auth = require('../middleware/auth');
const router = express.Router();

const bookCtrl = require('../controllers/books');

router.post('/', auth, bookCtrl.createBook);
router.put('/:id', auth,bookCtrl.modifyBook);
router.delete('/:id', auth,bookCtrl.deleteBook);
router.get('/:id', auth, bookCtrl.getOneBook);
router.get('/', auth, bookCtrl.getAllBook);

module.exports = router;