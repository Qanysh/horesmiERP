const express = require('express');
const router = express.Router();
const purchaseHeaderController = require('../controllers/purchaseHeaderController');

router.get('/', purchaseHeaderController.getAllPurchaseHeaders);
router.get('/card/:no', purchaseHeaderController.getPurchaseHeaderById);

router.post('/create', purchaseHeaderController.createPurchaseHeader);

router.get('/update/:no', purchaseHeaderController.getPurchaseHeaderById);
router.put('/update/:no', purchaseHeaderController.updatePurchaseHeader);
router.delete('/delete/:no', purchaseHeaderController.deletePurchaseHeader);

module.exports = router;