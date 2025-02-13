const SalesOrder = require('../models/salesOrder');

exports.getAllSalesOrders = async function (req, res) {
    try {
        SalesOrder.getAllSalesOrders((err, salesOrders) => {
            if (err) {
                console.error('Error fetching salesOrders:', err);
                return res.status(500).json({ error: 'Error fetching salesOrders data' });
            }
            res.json(salesOrders);
        });
    } catch (err) {
        console.error('Unexpected error fetching salesOrders:', err);
        res.status(500).json({ error: 'Unexpected error' });
    }
};

exports.getSalesOrderById = async function (req, res) {
    SalesOrder.getSalesOrderById([req.params.id], (err, salesOrder) => {
        if (err) {
            console.error('Error fetching salesOrder:', err);
            return res.status(500).json({ error: 'Error fetching salesOrder' });
        }
        if (!salesOrder || salesOrder.length === 0) {
            return res.status(404).json({ error: 'SalesOrder not found' });
        }
        res.json(salesOrder[0]);
    });
};

exports.createSalesOrder = function (req, res) {
    const newSalesOrder = {
        orderNo: req.body.orderNo,
        customerNo: req.body.customerNo,
        orderDate: req.body.orderDate,
        status: req.body.status,
        totalAmount: req.body.totalAmount,
        description: req.body.description,
    };

    if (!newSalesOrder.orderNo || !newSalesOrder.customerNo) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    SalesOrder.createSalesOrder(newSalesOrder, (err, result) => {
        if (err) {
            console.error('Error creating salesOrder:', err);
            return res.status(500).json({ error: 'Failed to create salesOrder' });
        }
        res.status(201).json({ message: 'SalesOrder created successfully', salesOrder: newSalesOrder });
    });
};

exports.updateSalesOrder = function (req, res) {
    const updatedSalesOrder = {
        orderNo: req.body.orderNo,
        customerNo: req.body.customerNo,
        orderDate: req.body.orderDate,
        status: req.body.status,
        totalAmount: req.body.totalAmount,
        description: req.body.description,
    };

    if (!req.params.id) {
        return res.status(400).json({ error: 'SalesOrder ID is missing' });
    }

    SalesOrder.updateSalesOrder(req.params.id, updatedSalesOrder, (err, result) => {
        if (err) {
            console.error('Error updating salesOrder:', err);
            return res.status(500).json({ error: 'Failed to update salesOrder' });
        }
        res.json({ message: 'SalesOrder updated successfully', salesOrder: updatedSalesOrder });
    });
};

exports.deleteSalesOrder = function (req, res) {
    SalesOrder.deleteSalesOrder(req.params.id, (err, result) => {
        if (err) {
            console.error('Error deleting salesOrder:', err);
            return res.status(500).json({ error: 'Failed to delete salesOrder' });
        }
        res.json({ message: 'SalesOrder deleted successfully' });
    });
};
