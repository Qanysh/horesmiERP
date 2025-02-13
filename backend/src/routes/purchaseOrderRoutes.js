const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrderController');

router.get('/', purchaseOrderController.getAllPurchaseOrders);
router.get('/card/:no', purchaseOrderController.getPurchaseOrderById);

router.post('/create', purchaseOrderController.createPurchaseOrder);

router.get('/update/:no', purchaseOrderController.getPurchaseOrderById);
router.put('/update/:no', purchaseOrderController.updatePurchaseOrder);
router.delete('/delete/:no', purchaseOrderController.deletePurchaseOrder);

module.exports = router;