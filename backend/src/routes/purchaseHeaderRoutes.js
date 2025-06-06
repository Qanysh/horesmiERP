const express = require('express');
const router = express.Router();
const purchaseHeaderController = require('../controllers/purchaseHeaderController');
const purchaseMiddleware = require('../middlewares/purchaseMiddleware');

router.get('/', purchaseHeaderController.getAllPurchaseHeaders);
router.get('/card/:no', purchaseHeaderController.getPurchaseHeaderById);

router.post('/create', purchaseMiddleware, purchaseHeaderController.createPurchaseHeader);

router.get('/update/:no', purchaseMiddleware, purchaseHeaderController.getPurchaseHeaderById);
router.put('/update/:no', purchaseMiddleware, purchaseHeaderController.updatePurchaseHeader);
router.delete('/delete/:no', purchaseMiddleware, purchaseHeaderController.deletePurchaseHeader);

module.exports = router;