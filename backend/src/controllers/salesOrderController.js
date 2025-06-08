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
    SalesOrder.getSalesOrderById([req.params.no], (err, salesOrder) => {
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
        no: req.body.no,
        sellToCustomerNo: req.body.sellToCustomerNo,
        sellToCustomerName: req.body.sellToCustomerName,
        quoteNo: req.body.quoteNo,
        postingDescription: req.body.postingDescription,
        sellToAddress: req.body.sellToAddress,
        sellToAddress2: req.body.sellToAddress2,
        sellToCity: req.body.sellToCity,
        sellToCounty: req.body.sellToCounty,
        sellToPostCode: req.body.sellToPostCode,
        sellToCountryRegionCode: req.body.sellToCountryRegionCode,
        sellToContactNo: req.body.sellToContactNo,
        sellToPhoneNo: req.body.sellToPhoneNo,
        sellToMobilePhoneNo: req.body.sellToMobilePhoneNo,
        sellToEmail: req.body.sellToEmail,
        sellToContact: req.body.sellToContact,
        noOfArchivedVersions: req.body.noOfArchivedVersions,
        documentDate: req.body.documentDate,
        postingDate: req.body.postingDate,
        vatReportingDate: req.body.vatReportingDate,
        orderDate: req.body.orderDate,
        dueDate: req.body.dueDate,
        requestedDeliveryDate: req.body.requestedDeliveryDate,
        promisedDeliveryDate: req.body.promisedDeliveryDate,
        externalDocumentNo: req.body.externalDocumentNo,
        yourReference: req.body.yourReference,
        salespersonCode: req.body.salespersonCode,
        campaignNo: req.body.campaignNo,
        opportunityNo: req.body.opportunityNo,
        responsibilityCenter: req.body.responsibilityCenter,
        assignedUserId: req.body.assignedUserId,
        jobQueueStatus: req.body.jobQueueStatus,
        status: req.body.status,
        isArchived: req.body.isArchived || false,
        created_at: new Date(),
        updated_at: new Date()
    };


    if (!newSalesOrder.no || !newSalesOrder.sellToCustomerNo) {
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
        no: req.body.no,
        sellToCustomerNo: req.body.sellToCustomerNo,
        sellToCustomerName: req.body.sellToCustomerName,
        quoteNo: req.body.quoteNo,
        postingDescription: req.body.postingDescription,
        sellToAddress: req.body.sellToAddress,
        sellToAddress2: req.body.sellToAddress2,
        sellToCity: req.body.sellToCity,
        sellToCounty: req.body.sellToCounty,
        sellToPostCode: req.body.sellToPostCode,
        sellToCountryRegionCode: req.body.sellToCountryRegionCode,
        sellToContactNo: req.body.sellToContactNo,
        sellToPhoneNo: req.body.sellToPhoneNo,
        sellToMobilePhoneNo: req.body.sellToMobilePhoneNo,
        sellToEmail: req.body.sellToEmail,
        sellToContact: req.body.sellToContact,
        noOfArchivedVersions: req.body.noOfArchivedVersions,
        documentDate: req.body.documentDate,
        postingDate: req.body.postingDate,
        vatReportingDate: req.body.vatReportingDate,
        orderDate: req.body.orderDate,
        dueDate: req.body.dueDate,
        requestedDeliveryDate: req.body.requestedDeliveryDate,
        promisedDeliveryDate: req.body.promisedDeliveryDate,
        externalDocumentNo: req.body.externalDocumentNo,
        yourReference: req.body.yourReference,
        salespersonCode: req.body.salespersonCode,
        campaignNo: req.body.campaignNo,
        opportunityNo: req.body.opportunityNo,
        responsibilityCenter: req.body.responsibilityCenter,
        assignedUserId: req.body.assignedUserId,
        jobQueueStatus: req.body.jobQueueStatus,
        status: req.body.status,
        isArchived: req.body.isArchived || false,
        updated_at: new Date()
    };

    if (!req.params.no) {
        return res.status(400).json({ error: 'SalesOrder ID is missing' });
    }

    SalesOrder.updateSalesOrder(req.params.no, updatedSalesOrder, (err, result) => {
        if (err) {
            console.error('Error updating salesOrder:', err);
            return res.status(500).json({ error: 'Failed to update salesOrder' });
        }
        res.json({ message: 'SalesOrder updated successfully', salesOrder: updatedSalesOrder });
    });
};

exports.deleteSalesOrder = function (req, res) {
    SalesOrder.deleteSalesOrder(req.params.no, (err, result) => {
        if (err) {
            console.error('Error deleting salesOrder:', err);
            return res.status(500).json({ error: 'Failed to delete salesOrder' });
        }
        res.json({ message: 'SalesOrder deleted successfully' });
    });
};

exports.createManySalesOrders = function (req, res) {
    const orders = req.body; // Ожидается массив объектов salesOrder

    if (!Array.isArray(orders) || orders.length === 0) {
        return res.status(400).json({ error: 'Request body must be a non-empty array' });
    }

    let created = [];
    let errors = [];

    Promise.all(orders.map(order => {
        return new Promise((resolve) => {
            if (!order.no || !order.sellToCustomerNo) {
                errors.push({ order, error: 'Missing required fields' });
                return resolve();
            }
            SalesOrder.createSalesOrder(
                {
                    ...order,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                (err, result) => {
                    if (err) {
                        errors.push({ order, error: err.message });
                    } else {
                        created.push(order);
                    }
                    resolve();
                }
            );
        });
    })).then(() => {
        res.status(201).json({
            message: 'Batch sales order creation finished',
            created,
            errors
        });
    });
};
