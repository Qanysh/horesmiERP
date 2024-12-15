const Customer = require('../models/customer');

exports.getAllCustomers = async function(req, res) {
    try {
        Customer.getAllCustomers((err, customers) => {
            res.render('customers', { customers });
        });
    } catch {
        console.log('Error fetching customers:', err);
        res.status(500).send('Error fetching customers data');
    };
};

exports.getCustomerById = async function(req, res) {
        Customer.getCustomerById([req.params.no], (err, customerCard) => {
            if (!customerCard) {
                return res.status(400).send('Customer not found!')
            }
            let customer = customerCard[0];
            res.render('customerCard', { customer });
        });
};

exports.createCustomer = function(req, res) {
    const newCustomer = {
        no: req.body.no, // Извлечение данных из req.body
        name: req.body.name,
        balance: req.body.balance,
        creditLimit: req.body.creditLimit,
        totalSales: req.body.totalSales,
        costs: req.body.costs,
        address: req.body.address,
        country: req.body.country,
        city: req.body.city,
        phone: req.body.phone,
        email: req.body.email,
        contactName: req.body.contactName
    };

    if (!newCustomer.no || !newCustomer.name) {
        return res.status(400).send('Missing required fields');
    }

    Customer.createCustomer(newCustomer, (err, result) => {
        if (err) {
            console.error('Error creating customer:', err);
            return res.status(500).send('Failed to create customer');
        }
        res.redirect('/customers');
    });
};


exports.updateCustomer = function(req, res) {
    const updatedCustomer = {
        name: req.body.name,
        balance: req.body.balance,
        creditLimit: req.body.creditLimit,
        totalSales: req.body.totalSales,
        costs: req.body.costs,
        address: req.body.address,
        country: req.body.country,
        city: req.body.city,
        phone: req.body.phone,
        email: req.body.email,
        contactName: req.body.contactName
    };

    if (!req.params.no) {
        return res.status(400).send('Customer ID is missing');
    }

    Customer.updateCustomer(req.params.no, updatedCustomer, (err, result) => {
        if (err) {
            console.error('Error updating customer:', err);
            return res.status(500).send('Failed to update customer');
        }
        res.redirect('/customers');
    });
};


exports.deleteCustomer = function(req, res) {
    Customer.deleteCustomer(req.params.no, (err, result) => {
        if(err) throw err;
        res.redirect('/customers');
    });
};