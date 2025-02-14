const Vendor = require('../models/vendor');

exports.getAllVendors = async function (req, res) {
    try {
        Vendor.getAllVendors((err, vendors) => {
            if (err) {
                console.error('Error fetching vendors:', err);
                return res.status(500).json({ error: 'Error fetching vendors data' });
            }
            res.json(vendors); // Отправляем данные JSON на фронтенд
        });
    } catch (err) {
        console.error('Unexpected error fetching vendors:', err);
        res.status(500).json({ error: 'Unexpected error' });
    }
};

exports.getVendorById = async function (req, res) {
    Vendor.getVendorById([req.params.no], (err, vendorCard) => {
        if (err) {
            console.error('Error fetching vendor:', err);
            return res.status(500).json({ error: 'Error fetching vendor' });
        }
        if (!vendorCard || vendorCard.length === 0) {
            return res.status(404).json({ error: 'Vendor not found' });
        }
        res.json(vendorCard[0]); // Отправляем данные одного клиента JSON
    });
};

exports.createVendor = function (req, res) {
    const newVendor = {
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

    if (!newVendor.no || !newVendor.name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    Vendor.createVendor(newVendor, (err, result) => {
        if (err) {
            console.error('Error creating vendor:', err);
            return res.status(500).json({ error: 'Failed to create vendor' });
        }
        res.status(201).json({ message: 'Vendor created successfully', vendor: newVendor });
    });
};

exports.updateVendor = function (req, res) {
    const updatedVendor = {
        name: req.body.name,
        balance: req.body.balance,
        address: req.body.address,
        country: req.body.country,
        city: req.body.city,
        phone: req.body.phone,
        email: req.body.email,
        contactName: req.body.contactName
    };

    if (!req.params.no) {
        return res.status(400).json({ error: 'Vendor ID is missing' });
    }

    Vendor.updateVendor(req.params.no, updatedvendor, (err, result) => {
        if (err) {
            console.error('Error updating vendor:', err);
            return res.status(500).json({ error: 'Failed to update vendor' });
        }
        res.json({ message: 'Vendor updated successfully', vendor: updatedVendor });
    });
};

exports.deleteVendor = function (req, res) {
    Vendor.deleteVendor(req.params.no, (err, result) => {
        if (err) {
            console.error('Error deleting vendor:', err);
            return res.status(500).json({ error: 'Failed to delete vendor' });
        }
        res.json({ message: 'Vendor deleted successfully' });
    });
};
