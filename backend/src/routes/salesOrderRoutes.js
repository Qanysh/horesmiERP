const express = require('express');
const router = express.Router();
const salesOrderController = require('../controllers/salesOrderController');
const salesMiddleware = require('../middlewares/salesMiddleware');

router.post('/batch', salesOrderController.createManySalesOrders);
router.get('/', salesOrderController.getAllSalesOrders);
router.get('/card/:no', salesOrderController.getSalesOrderById);

router.post('/create', salesMiddleware, salesOrderController.createSalesOrder);

router.get('/update/:no', salesMiddleware, salesOrderController.getSalesOrderById);
router.put('/update/:no', salesMiddleware, salesOrderController.updateSalesOrder);
router.delete('/delete/:no', salesMiddleware, salesOrderController.deleteSalesOrder);

module.exports = router;