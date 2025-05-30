const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/card/:product_no', productController.getProductById);
router.get('/:product_no', productController.getProductById);

router.post('/create', productController.createProduct);

router.put('/update/:product_no', productController.updateProduct);

router.delete('/delete/:product_no', productController.deleteProduct);

module.exports = router;