const express = require('express');
const { getProduct, postProduct } = require('../controller/product.contraller');
const router = express.Router();

router.get('/product', getProduct);
router.post('/product', postProduct);

module.exports = router;
