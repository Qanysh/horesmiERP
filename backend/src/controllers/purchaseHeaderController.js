const PurchaseHeader = require('../models/purchaseHeader');

exports.getAllPurchaseHeaders = async function (req, res) {
    try {
        PurchaseHeader.getAllPurchaseHeaders((err, purchaseHeaders) => {
            if (err) {
                console.error('Error fetching purchaseHeaders:', err);
                return res.status(500).json({ error: 'Error fetching purchaseHeaders data' });
            }
            res.json(purchaseHeaders);
        });
    } catch (err) {
        console.error('Unexpected error fetching purchaseHeaders:', err);
        res.status(500).json({ error: 'Unexpected error' });
    }
};

exports.getPurchaseHeaderById = async function (req, res) {
    PurchaseHeader.getPurchaseHeaderById([req.params.no], (err, purchaseHeader) => {
        if (err) {
            console.error('Error fetching purchaseHeader:', err);
            return res.status(500).json({ error: 'Error fetching purchaseHeader' });
        }
        if (!purchaseHeader || purchaseHeader.length === 0) {
            return res.status(404).json({ error: 'PurchaseHeader not found' });
        }
        res.json(purchaseHeader[0]);
    });
};

exports.createPurchaseHeader = function (req, res) {
    const newPurchaseHeader = {
        no: req.body.no,
        vendorNo: req.body.vendorNo,
        orderDate: req.body.orderDate,
        status: req.body.status,
        buyFromVendorName: req.body.buyFromVendorName,
        postingDescription: req.body.postingDescription,
        buyFromAddress: req.body.buyFromAddress,
        buyFromAddress2: req.body.buyFromAddress2,
        buyFromCity: req.body.buyFromCity,
        buyFromCounty: req.body.buyFromCounty,
        buyFromPostCode: req.body.buyFromPostCode,
        buyFromCountryRegionCode: req.body.buyFromCountryRegionCode,
        buyFromContactNo: req.body.buyFromContactNo,
        buyFromContact: req.body.buyFromContact,
        buyFromContactPhoneNo: req.body.buyFromContactPhoneNo,
        buyFromContactMobilePhoneNo: req.body.buyFromContactMobilePhoneNo,
        buyFromContactEmail: req.body.buyFromContactEmail,
        documentDate: req.body.documentDate,
        invoiceReceivedDate: req.body.invoiceReceivedDate,
        postingDate: req.body.postingDate,
        vatReportingDate: req.body.vatReportingDate,
        dueDate: req.body.dueDate,
        vendorInvoiceNo: req.body.vendorInvoiceNo,
        yourReference: req.body.yourReference,
        purchaserCode: req.body.purchaserCode,
        noOfArchivedVersions: req.body.noOfArchivedVersions,
        quoteNo: req.body.quoteNo,
        vendorOrderNo: req.body.vendorOrderNo,
        vendorShipmentNo: req.body.vendorShipmentNo,
        orderAddressCode: req.body.orderAddressCode,
        responsibilityCenter: req.body.responsibilityCenter,
        assignedUserId: req.body.assignedUserId,
        jobQueueStatus: req.body.jobQueueStatus,
        languageCode: req.body.languageCode,
        formatRegion: req.body.formatRegion,
        currencyCode: req.body.currencyCode,
        expectedReceiptDate: req.body.expectedReceiptDate,
        pricesIncludingVAT: req.body.pricesIncludingVAT,
        vatBusPostingGroup: req.body.vatBusPostingGroup,
        vendorPostingGroup: req.body.vendorPostingGroup,
        paymentTermsCode: req.body.paymentTermsCode,
        paymentMethodCode: req.body.paymentMethodCode,
        shortcutDimension1Code: req.body.shortcutDimension1Code,
        shortcutDimension2Code: req.body.shortcutDimension2Code,
        paymentDiscountPercent: req.body.paymentDiscountPercent,
        paymentDiscountDate: req.body.paymentDiscountDate,
        journalTemplName: req.body.journalTemplName,
        taxLiable: req.body.taxLiable,
        taxAreaCode: req.body.taxAreaCode,
        shipmentMethodCode: req.body.shipmentMethodCode,
        paymentReference: req.body.paymentReference,
        creditorNo: req.body.creditorNo,
        onHold: req.body.onHold,
        inboundWhseHandlingTime: req.body.inboundWhseHandlingTime,
        leadTimeCalculation: req.body.leadTimeCalculation,
        requestedReceiptDate: req.body.requestedReceiptDate,
        promisedReceiptDate: req.body.promisedReceiptDate,
        remitToCode: req.body.remitToCode,
        remitToName: req.body.remitToName,
        remitToAddress: req.body.remitToAddress,
        remitToAddress2: req.body.remitToAddress2,
        remitToCity: req.body.remitToCity,
        remitToCounty: req.body.remitToCounty,
        remitToPostCode: req.body.remitToPostCode,
        remitToCountryRegionCode: req.body.remitToCountryRegionCode,
        remitToContact: req.body.remitToContact,
        transactionSpecification: req.body.transactionSpecification,
        transactionType: req.body.transactionType,
        transportMethod: req.body.transportMethod,
        entryPoint: req.body.entryPoint,
        area: req.body.area,
        prepaymentPercent: req.body.prepaymentPercent,
        compressPrepayment: req.body.compressPrepayment,
        prepmtPaymentTermsCode: req.body.prepmtPaymentTermsCode,
        prepaymentDueDate: req.body.prepaymentDueDate,
        prepmtPaymentDiscountPercent: req.body.prepmtPaymentDiscountPercent,
        prepmtPaymentDiscountDate: req.body.prepmtPaymentDiscountDate,
        vendorCrMemoNo: req.body.vendorCrMemoNo,
        isArchived: req.body.isArchived || false,
        created_at: new Date(),
        updated_at: new Date()
    };

    if (!newPurchaseHeader.no || !newPurchaseHeader.vendorNo) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    PurchaseHeader.createPurchaseHeader(newPurchaseHeader, (err, result) => {
        if (err) {
            console.error('Error creating purchaseHeader:', err);
            return res.status(500).json({ error: 'Failed to create purchaseHeader' });
        }
        res.status(201).json({ message: 'PurchaseHeader created successfully', purchaseHeader: newPurchaseHeader });
    });
};

exports.updatePurchaseHeader = function (req, res) {
    const updatedPurchaseHeader = {
        no: req.body.no,
        vendorNo: req.body.vendorNo,
        orderDate: req.body.orderDate,
        status: req.body.status,
        buyFromVendorName: req.body.buyFromVendorName,
        postingDescription: req.body.postingDescription,
        buyFromAddress: req.body.buyFromAddress,
        buyFromAddress2: req.body.buyFromAddress2,
        buyFromCity: req.body.buyFromCity,
        buyFromCounty: req.body.buyFromCounty,
        buyFromPostCode: req.body.buyFromPostCode,
        buyFromCountryRegionCode: req.body.buyFromCountryRegionCode,
        buyFromContactNo: req.body.buyFromContactNo,
        buyFromContact: req.body.buyFromContact,
        buyFromContactPhoneNo: req.body.buyFromContactPhoneNo,
        buyFromContactMobilePhoneNo: req.body.buyFromContactMobilePhoneNo,
        buyFromContactEmail: req.body.buyFromContactEmail,
        documentDate: req.body.documentDate,
        invoiceReceivedDate: req.body.invoiceReceivedDate,
        postingDate: req.body.postingDate,
        vatReportingDate: req.body.vatReportingDate,
        dueDate: req.body.dueDate,
        vendorInvoiceNo: req.body.vendorInvoiceNo,
        yourReference: req.body.yourReference,
        purchaserCode: req.body.purchaserCode,
        noOfArchivedVersions: req.body.noOfArchivedVersions,
        quoteNo: req.body.quoteNo,
        vendorOrderNo: req.body.vendorOrderNo,
        vendorShipmentNo: req.body.vendorShipmentNo,
        orderAddressCode: req.body.orderAddressCode,
        responsibilityCenter: req.body.responsibilityCenter,
        assignedUserId: req.body.assignedUserId,
        jobQueueStatus: req.body.jobQueueStatus,
        languageCode: req.body.languageCode,
        formatRegion: req.body.formatRegion,
        currencyCode: req.body.currencyCode,
        expectedReceiptDate: req.body.expectedReceiptDate,
        pricesIncludingVAT: req.body.pricesIncludingVAT,
        vatBusPostingGroup: req.body.vatBusPostingGroup,
        vendorPostingGroup: req.body.vendorPostingGroup,
        paymentTermsCode: req.body.paymentTermsCode,
        paymentMethodCode: req.body.paymentMethodCode,
        shortcutDimension1Code: req.body.shortcutDimension1Code,
        shortcutDimension2Code: req.body.shortcutDimension2Code,
        paymentDiscountPercent: req.body.paymentDiscountPercent,
        paymentDiscountDate: req.body.paymentDiscountDate,
        journalTemplName: req.body.journalTemplName,
        taxLiable: req.body.taxLiable,
        taxAreaCode: req.body.taxAreaCode,
        shipmentMethodCode: req.body.shipmentMethodCode,
        paymentReference: req.body.paymentReference,
        creditorNo: req.body.creditorNo,
        onHold: req.body.onHold,
        inboundWhseHandlingTime: req.body.inboundWhseHandlingTime,
        leadTimeCalculation: req.body.leadTimeCalculation,
        requestedReceiptDate: req.body.requestedReceiptDate,
        promisedReceiptDate: req.body.promisedReceiptDate,
        remitToCode: req.body.remitToCode,
        remitToName: req.body.remitToName,
        remitToAddress: req.body.remitToAddress,
        remitToAddress2: req.body.remitToAddress2,
        remitToCity: req.body.remitToCity,
        remitToCounty: req.body.remitToCounty,
        remitToPostCode: req.body.remitToPostCode,
        remitToCountryRegionCode: req.body.remitToCountryRegionCode,
        remitToContact: req.body.remitToContact,
        transactionSpecification: req.body.transactionSpecification,
        transactionType: req.body.transactionType,
        transportMethod: req.body.transportMethod,
        entryPoint: req.body.entryPoint,
        area: req.body.area,
        prepaymentPercent: req.body.prepaymentPercent,
        compressPrepayment: req.body.compressPrepayment,
        prepmtPaymentTermsCode: req.body.prepmtPaymentTermsCode,
        prepaymentDueDate: req.body.prepaymentDueDate,
        prepmtPaymentDiscountPercent: req.body.prepmtPaymentDiscountPercent,
        prepmtPaymentDiscountDate: req.body.prepmtPaymentDiscountDate,
        vendorCrMemoNo: req.body.vendorCrMemoNo,
        updated_at: new Date()
    };

    if (!req.params.no) {
        return res.status(400).json({ error: 'PurchaseHeader No is missing' });
    }

    PurchaseHeader.updatePurchaseHeader(req.params.no, updatedPurchaseHeader, (err, result) => {
        if (err) {
            console.error('Error updating purchaseHeader:', err);
            return res.status(500).json({ error: 'Failed to update purchaseHeader' });
        }
        res.json({ message: 'PurchaseHeader updated successfully', purchaseHeader: updatedPurchaseHeader });
    });
};

exports.deletePurchaseHeader = function (req, res) {
    PurchaseHeader.deletePurchaseHeader(req.params.no, (err, result) => {
        if (err) {
            console.error('Error deleting purchaseHeader:', err);
            return res.status(500).json({ error: 'Failed to delete purchaseHeader' });
        }
        res.json({ message: 'PurchaseHeader deleted successfully' });
    });
};

exports.createManyPurchaseHeaders = function (req, res) {
    const headers = req.body; // Ожидается массив объектов purchaseHeader

    if (!Array.isArray(headers) || headers.length === 0) {
        return res.status(400).json({ error: 'Request body must be a non-empty array' });
    }

    let created = [];
    let errors = [];

    Promise.all(headers.map(header => {
        return new Promise((resolve) => {
            if (!header.no || !header.vendorNo) {
                errors.push({ header, error: 'Missing required fields' });
                return resolve();
            }
            PurchaseHeader.createPurchaseHeader(
                {
                    ...header,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                (err, result) => {
                    if (err) {
                        errors.push({ header, error: err.message });
                    } else {
                        created.push(header);
                    }
                    resolve();
                }
            );
        });
    })).then(() => {
        res.status(201).json({
            message: 'Batch purchase header creation finished',
            created,
            errors
        });
    });
};
