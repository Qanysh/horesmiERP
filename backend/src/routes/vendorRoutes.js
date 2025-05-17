const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

router.get('/', vendorController.getAllVendors);
router.get('/card/:vendorNo', vendorController.getVendorById);

router.post('/create', vendorController.createVendor);

router.get('/update/:vendorNo', vendorController.getVendorById);
router.put('/update/:vendorNo', vendorController.updateVendor);
router.delete('/delete/:vendorNo', vendorController.deleteVendor);

module.exports = router;