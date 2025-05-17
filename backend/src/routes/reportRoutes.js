const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/purchaseOrder/:no', reportController.getPurchaseInvoicePDF);
router.get('/salesOrder/:no', reportController.getSalesInvoicePDF);


module.exports = router;