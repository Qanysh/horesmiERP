const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.getAllCustomers);
router.get('/card/:no', customerController.getCustomerById);

router.get('/create', (req, res) => {
    res.render('CustomerCard', { customer: {} });
});
router.post('/create', customerController.createCustomer);

router.get('/update/:no', customerController.getCustomerById);
router.post('/update/:no', customerController.updateCustomer);
router.post('/delete/:no', customerController.deleteCustomer);

module.exports = router;