const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getByID);
router.post('/', productController.create);
router.put('/:id', productController.edit);

module.exports = router;
