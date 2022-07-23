const express = require('express');
const controller = require('../controllers/productController');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getByID);

module.exports = router;
