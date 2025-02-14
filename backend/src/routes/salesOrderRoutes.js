const express = require('express');
const router = express.Router();
const salesOrderController = require('../controllers/salesOrderController');

router.get('/', salesOrderController.getAllSalesOrders);
router.get('/card/:no', salesOrderController.getSalesOrderById);

router.post('/create', salesOrderController.createSalesOrder);

router.get('/update/:no', salesOrderController.getSalesOrderById);
router.put('/update/:no', salesOrderController.updateSalesOrder);
router.delete('/delete/:no', salesOrderController.deleteSalesOrder);

module.exports = router;