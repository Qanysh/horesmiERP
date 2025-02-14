const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.getAllCustomers);
router.get('/card/:no', customerController.getCustomerById);

router.post('/create', customerController.createCustomer);

router.get('/update/:no', customerController.getCustomerById);
router.put('/update/:no', customerController.updateCustomer);
router.delete('/delete/:no', customerController.deleteCustomer);

module.exports = router;