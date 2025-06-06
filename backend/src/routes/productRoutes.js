const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const salesMiddleware = require('../middlewares/salesMiddleware');

router.get('/', salesMiddleware, productController.getAllProducts);
router.get('/card/:product_no', salesMiddleware, productController.getProductById);
router.get('/:product_no', salesMiddleware, productController.getProductById);

router.post('/create', salesMiddleware, productController.createProduct);

router.put('/update/:product_no', salesMiddleware, productController.updateProduct);

router.delete('/delete/:product_no', salesMiddleware, productController.deleteProduct);

module.exports = router;