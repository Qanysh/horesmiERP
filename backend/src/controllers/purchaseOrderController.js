const PurchaseOrder = require('../models/purchaseOrder');

exports.getAllPurchaseOrders = async function (req, res) {
    try {
        PurchaseOrder.getAllPurchaseOrders((err, purchaseOrders) => {
            if (err) {
                console.error('Error fetching purchaseOrders:', err);
                return res.status(500).json({ error: 'Error fetching purchaseOrders data' });
            }
            res.json(purchaseOrders);
        });
    } catch (err) {
        console.error('Unexpected error fetching purchaseOrders:', err);
        res.status(500).json({ error: 'Unexpected error' });
    }
};

exports.getPurchaseOrderById = async function (req, res) {
    PurchaseOrder.getPurchaseOrderById([req.params.id], (err, purchaseOrder) => {
        if (err) {
            console.error('Error fetching purchaseOrder:', err);
            return res.status(500).json({ error: 'Error fetching purchaseOrder' });
        }
        if (!purchaseOrder || purchaseOrder.length === 0) {
            return res.status(404).json({ error: 'PurchaseOrder not found' });
        }
        res.json(purchaseOrder[0]);
    });
};

exports.createPurchaseOrder = function (req, res) {
    const newPurchaseOrder = {
        orderNo: req.body.orderNo,
        supplierNo: req.body.supplierNo,
        orderDate: req.body.orderDate,
        status: req.body.status,
        totalAmount: req.body.totalAmount,
        description: req.body.description,
    };

    if (!newPurchaseOrder.orderNo || !newPurchaseOrder.supplierNo) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    PurchaseOrder.createPurchaseOrder(newPurchaseOrder, (err, result) => {
        if (err) {
            console.error('Error creating purchaseOrder:', err);
            return res.status(500).json({ error: 'Failed to create purchaseOrder' });
        }
        res.status(201).json({ message: 'PurchaseOrder created successfully', purchaseOrder: newPurchaseOrder });
    });
};

exports.updatePurchaseOrder = function (req, res) {
    const updatedPurchaseOrder = {
        orderNo: req.body.orderNo,
        supplierNo: req.body.supplierNo,
        orderDate: req.body.orderDate,
        status: req.body.status,
        totalAmount: req.body.totalAmount,
        description: req.body.description,
    };

    if (!req.params.id) {
        return res.status(400).json({ error: 'PurchaseOrder ID is missing' });
    }

    PurchaseOrder.updatePurchaseOrder(req.params.id, updatedPurchaseOrder, (err, result) => {
        if (err) {
            console.error('Error updating purchaseOrder:', err);
            return res.status(500).json({ error: 'Failed to update purchaseOrder' });
        }
        res.json({ message: 'PurchaseOrder updated successfully', purchaseOrder: updatedPurchaseOrder });
    });
};

exports.deletePurchaseOrder = function (req, res) {
    PurchaseOrder.deletePurchaseOrder(req.params.id, (err, result) => {
        if (err) {
            console.error('Error deleting purchaseOrder:', err);
            return res.status(500).json({ error: 'Failed to delete purchaseOrder' });
        }
        res.json({ message: 'PurchaseOrder deleted successfully' });
    });
};
