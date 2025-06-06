const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const salesMiddleware = require('../middlewares/salesMiddleware');

router.get('/', salesMiddleware, customerController.getAllCustomers);
router.get('/card/:customer_no', salesMiddleware, customerController.getCustomerById);

router.post('/create', salesMiddleware, customerController.createCustomer);

router.get('/update/:customer_no', salesMiddleware, customerController.getCustomerById);
router.put('/update/:customer_no', salesMiddleware, customerController.updateCustomer);
router.delete('/delete/:customer_no', salesMiddleware, customerController.deleteCustomer);

module.exports = router;