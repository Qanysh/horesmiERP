const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/purchaseOrder/:no', reportController.getPurchaseInvoicePDF);
router.get('/salesOrder/:no', reportController.getSalesInvoicePDF);
router.get('/generalLedgerEntries', reportController.generalLedgerReportPdf);
router.get('/generalLedgerEntries/sales', reportController.generalLedgerReportPdfSales);
router.get('/generalLedgerEntries/purchases', reportController.generalLedgerReportPdfPurchase);

module.exports = router;