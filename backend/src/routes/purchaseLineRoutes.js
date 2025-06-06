const express = require('express');
const router = express.Router();
const purchaseLineController = require('../controllers/purchaseLineController');
const purchaseMiddleware = require('../middlewares/purchaseMiddleware');

router.get('/', purchaseMiddleware, purchaseLineController.getAllPurchaseLines);
router.get('/card/:id', purchaseMiddleware, purchaseLineController.getPurchaseLineById);
router.get('/byDocumentNo/:documentNo', purchaseMiddleware, purchaseLineController.getPurchaseLineByDocumentNoForRouter);

router.post('/create', purchaseMiddleware, purchaseLineController.createPurchaseLine);

router.get('/update/:id', purchaseMiddleware, purchaseLineController.getPurchaseLineById);
router.put('/update/:id', purchaseMiddleware, purchaseLineController.updatePurchaseLine);
router.delete('/delete/:id', purchaseMiddleware, purchaseLineController.deletePurchaseLine);

module.exports = router;