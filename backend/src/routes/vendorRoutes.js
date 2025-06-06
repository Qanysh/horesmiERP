const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const purchaseMiddleware = require('../middlewares/purchaseMiddleware');

router.get('/', purchaseMiddleware, vendorController.getAllVendors);
router.get('/card/:BIN', purchaseMiddleware, vendorController.getVendorById);

router.post('/create', purchaseMiddleware, vendorController.createVendor);

router.get('/update/:BIN', purchaseMiddleware, vendorController.getVendorById);
router.put('/update/:BIN', purchaseMiddleware, vendorController.updateVendor);
router.delete('/delete/:BIN', purchaseMiddleware, vendorController.deleteVendor);

module.exports = router;