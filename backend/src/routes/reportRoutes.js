const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/purchaseOrder/:orderId', reportController.getPurchaseInvoicePDF);
router.get('/salesOrder/:orderId', reportController.getSalesInvoicePDF);


module.exports = router;