const express = require('express');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.get('/', saleController.getAll);
router.get('/:id', saleController.getByID);
router.post('/', saleController.create);
router.put('/:id', saleController.edit);
router.delete('/:id', saleController.exclude);

module.exports = router;
