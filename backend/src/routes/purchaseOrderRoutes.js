const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrderController');
const purchaseMiddleware = require('../middlewares/purchaseMiddleware');

router.get('/', purchaseOrderController.getAllPurchaseOrders);
router.get('/card/:no', purchaseOrderController.getPurchaseOrderById);

router.post('/create', purchaseMiddleware, purchaseOrderController.createPurchaseOrder);

router.get('/update/:no', purchaseMiddleware, purchaseOrderController.getPurchaseOrderById);
router.put('/update/:no', purchaseMiddleware, purchaseOrderController.updatePurchaseOrder);
router.delete('/delete/:no', purchaseMiddleware, purchaseOrderController.deletePurchaseOrder);

module.exports = router;