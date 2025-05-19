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
    PurchaseOrder.getPurchaseOrderById([req.params.no], (err, purchaseOrder) => {
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
        no: req.body.no,
        buyFromVendorNo: req.body.buyFromVendorNo,
        orderAddressCode: req.body.orderAddressCode,
        buyFromVendorName: req.body.buyFromVendorName,
        vendorAuthorizationNo: req.body.vendorAuthorizationNo,
        buyFromPostCode: req.body.buyFromPostCode,
        buyFromCountryRegionCode: req.body.buyFromCountryRegionCode,
        buyFromContact: req.body.buyFromContact,
        payToVendorNo: req.body.payToVendorNo,
        payToName: req.body.payToName,
        payToPostCode: req.body.payToPostCode,
        payToCountryRegionCode: req.body.payToCountryRegionCode,
        payToContact: req.body.payToContact,
        shipToCode: req.body.shipToCode,
        shipToName: req.body.shipToName,
        shipToPostCode: req.body.shipToPostCode,
        shipToCountryRegionCode: req.body.shipToCountryRegionCode,
        shipToContact: req.body.shipToContact,
        postingDate: req.body.postingDate,
        shortcutDimension1Code: req.body.shortcutDimension1Code,
        shortcutDimension2Code: req.body.shortcutDimension2Code,
        locationCode: req.body.locationCode,
        purchaserCode: req.body.purchaserCode,
        assignedUserId: req.body.assignedUserId,
        currencyCode: req.body.currencyCode,
        created_at: new Date(),
        updated_at: new Date()
    };


    if (!newPurchaseOrder.no || !newPurchaseOrder.buyFromVendorNo) {
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
        no: req.body.no,
        buyFromVendorNo: req.body.buyFromVendorNo,
        orderAddressCode: req.body.orderAddressCode,
        buyFromVendorName: req.body.buyFromVendorName,
        vendorAuthorizationNo: req.body.vendorAuthorizationNo,
        buyFromPostCode: req.body.buyFromPostCode,
        buyFromCountryRegionCode: req.body.buyFromCountryRegionCode,
        buyFromContact: req.body.buyFromContact,
        payToVendorNo: req.body.payToVendorNo,
        payToName: req.body.payToName,
        payToPostCode: req.body.payToPostCode,
        payToCountryRegionCode: req.body.payToCountryRegionCode,
        payToContact: req.body.payToContact,
        shipToCode: req.body.shipToCode,
        shipToName: req.body.shipToName,
        shipToPostCode: req.body.shipToPostCode,
        shipToCountryRegionCode: req.body.shipToCountryRegionCode,
        shipToContact: req.body.shipToContact,
        postingDate: req.body.postingDate,
        shortcutDimension1Code: req.body.shortcutDimension1Code,
        shortcutDimension2Code: req.body.shortcutDimension2Code,
        locationCode: req.body.locationCode,
        purchaserCode: req.body.purchaserCode,
        assignedUserId: req.body.assignedUserId,
        currencyCode: req.body.currencyCode,
        created_at: req.body.created_at,
        updated_at: new Date()
    };


    if (!req.params.no) {
        return res.status(400).json({ error: 'PurchaseOrder No is missing' });
    }

    PurchaseOrder.updatePurchaseOrder(req.params.no, updatedPurchaseOrder, (err, result) => {
        if (err) {
            console.error('Error updating purchaseOrder:', err);
            return res.status(500).json({ error: 'Failed to update purchaseOrder' });
        }
        res.json({ message: 'PurchaseOrder updated successfully', purchaseOrder: updatedPurchaseOrder });
    });
};

exports.deletePurchaseOrder = function (req, res) {
    PurchaseOrder.deletePurchaseOrder(req.params.no, (err, result) => {
        if (err) {
            console.error('Error deleting purchaseOrder:', err);
            return res.status(500).json({ error: 'Failed to delete purchaseOrder' });
        }
        res.json({ message: 'PurchaseOrder deleted successfully' });
    });
};
