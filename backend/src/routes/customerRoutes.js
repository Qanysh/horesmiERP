const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.getAllCustomers);
router.get('/card/:customer_no', customerController.getCustomerById);

router.post('/create', customerController.createCustomer);

router.get('/update/:customer_no', customerController.getCustomerById);
router.put('/update/:customer_no', customerController.updateCustomer);
router.delete('/delete/:customer_no', customerController.deleteCustomer);

module.exports = router;