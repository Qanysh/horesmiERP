const Customer = require('../models/customer');

exports.getAllCustomers = async function(req, res) {
    try {
        Customer.getAllCustomers((err, customers) => {
            if (err) {
                console.error('Error fetching customers:', err);
                return res.status(500).json({ error: 'Error fetching customers data' });
            }
            res.json(customers); // Отправляем данные JSON на фронтенд
        });
    } catch (err) {
        console.error('Unexpected error fetching customers:', err);
        res.status(500).json({ error: 'Unexpected error' });
    }
};

exports.getCustomerById = async function(req, res) {
    Customer.getCustomerById([req.params.no], (err, customerCard) => {
        if (err) {
            console.error('Error fetching customer:', err);
            return res.status(500).json({ error: 'Error fetching customer' });
        }
        if (!customerCard || customerCard.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customerCard[0]); // Отправляем данные одного клиента JSON
    });
};

exports.createCustomer = function(req, res) {
    const newCustomer = {
        no: req.body.no,
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
        return res.status(400).json({ error: 'Missing required fields' });
    }

    Customer.createCustomer(newCustomer, (err, result) => {
        if (err) {
            console.error('Error creating customer:', err);
            return res.status(500).json({ error: 'Failed to create customer' });
        }
        res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
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
        return res.status(400).json({ error: 'Customer ID is missing' });
    }

    Customer.updateCustomer(req.params.no, updatedCustomer, (err, result) => {
        if (err) {
            console.error('Error updating customer:', err);
            return res.status(500).json({ error: 'Failed to update customer' });
        }
        res.json({ message: 'Customer updated successfully', customer: updatedCustomer });
    });
};

exports.deleteCustomer = function(req, res) {
    Customer.deleteCustomer(req.params.no, (err, result) => {
        if (err) {
            console.error('Error deleting customer:', err);
            return res.status(500).json({ error: 'Failed to delete customer' });
        }
        res.json({ message: 'Customer deleted successfully' });
    });
};
