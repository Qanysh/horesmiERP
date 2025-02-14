const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

router.get('/', vendorController.getAllVendors);
router.get('/card/:no', vendorController.getVendorById);

router.post('/create', vendorController.createVendor);

router.get('/update/:no', vendorController.getVendorById);
router.put('/update/:no', vendorController.updateVendor);
router.delete('/delete/:no', vendorController.deleteVendor);

module.exports = router;