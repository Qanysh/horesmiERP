const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

router.get('/', vendorController.getAllVendors);
router.get('/card/:BIN', vendorController.getVendorById);

router.post('/create', vendorController.createVendor);

router.get('/update/:BIN', vendorController.getVendorById);
router.put('/update/:BIN', vendorController.updateVendor);
router.delete('/delete/:BIN', vendorController.deleteVendor);

module.exports = router;