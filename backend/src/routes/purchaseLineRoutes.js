const express = require('express');
const router = express.Router();
const purchaseLineController = require('../controllers/purchaseLineController');

router.get('/', purchaseLineController.getAllPurchaseLines);
router.get('/card/:id', purchaseLineController.getPurchaseLineById);
router.get('/byDocumentNo/:documentNo', purchaseLineController.getPurchaseLineByDocumentNoForRouter);

router.post('/create', purchaseLineController.createPurchaseLine);

router.get('/update/:id', purchaseLineController.getPurchaseLineById);
router.put('/update/:id', purchaseLineController.updatePurchaseLine);
router.delete('/delete/:id', purchaseLineController.deletePurchaseLine);

module.exports = router;