const SalesLine = require('../models/salesLine');
const GeneralLedgerEntry = require('../models/generalLedgerEntry');
const Item = require('../models/item');

exports.getAllSalesLines = async function (req, res) {
    try {
        SalesLine.getAllSalesLines((err, salesLines) => {
            if (err) {
                console.error('Error fetching salesLines:', err);
                return res.status(500).json({ error: 'Error fetching salesLines data' });
            }
            res.json(salesLines);
        });
    } catch (err) {
        console.error('Unexpected error fetching salesLines:', err);
        res.status(500).json({ error: 'Unexpected error' });
    }
};

exports.getSalesLineById = async function (req, res) {
    SalesLine.getSalesLineById([req.params.id], (err, salesLine) => {
        if (err) {
            console.error('Error fetching salesLine:', err);
            return res.status(500).json({ error: 'Error fetching salesLine' });
        }
        if (!salesLine || salesLine.length === 0) {
            return res.status(404).json({ error: 'SalesLine not found' });
        }
        res.json(salesLine[0]);
    });
};

exports.getSalesLineByDocumentNo = async function (documentNo, req, res) {
    SalesLine.getSalesLineByDocumentNo(documentNo, (err, salesLine) => {
        if (err) {
            console.error('Error fetching salesLine:', err);
            return res.status(500).json({ error: 'Error fetching salesLine' });
        }
        if (!salesLine || salesLine.length === 0) {
            return res.status(404).json({ error: 'SalesLine not found' });
        }
        res.json(salesLine[0]);
    });
};

exports.createSalesLine = function (req, res) {
    const newSalesLine = {
        documentType: req.body.documentType,
        documentNo: req.body.documentNo,
        sellToCustomerNo: req.body.sellToCustomerNo,
        lineNo: req.body.lineNo,
        type: req.body.type,
        no: req.body.no,
        variantCode: req.body.variantCode,
        description: req.body.description,
        description2: req.body.description2,
        locationCode: req.body.locationCode,
        quantity: req.body.quantity,
        reservedQtyBase: req.body.reservedQtyBase,
        unitOfMeasureCode: req.body.unitOfMeasureCode,
        unitPrice: req.body.unitPrice,
        unitCostLCY: req.body.unitCostLCY,
        lineAmount: req.body.lineAmount,
        orderNo: req.body.orderNo,
        allocationAccountNo: req.body.allocationAccountNo,
        jobNo: req.body.jobNo,
        jobTaskNo: req.body.jobTaskNo,
        jobLineType: req.body.jobLineType,
        shortcutDim1Code: req.body.shortcutDim1Code,
        shortcutDim2Code: req.body.shortcutDim2Code,
        shortcutDimCode3: req.body.shortcutDimCode3,
        shortcutDimCode4: req.body.shortcutDimCode4,
        shortcutDimCode5: req.body.shortcutDimCode5,
        shortcutDimCode6: req.body.shortcutDimCode6,
        shortcutDimCode7: req.body.shortcutDimCode7,
        shortcutDimCode8: req.body.shortcutDimCode8,
        shipmentDate: req.body.shipmentDate,
        outstandingQuantity: req.body.outstandingQuantity,
        outstandingAmountLCY: req.body.outstandingAmountLCY,
        amountShippedNotInvoicedLCY: req.body.amountShippedNotInvoicedLCY,
        discountPercent: req.body.discountPercent,
        allowInvoiceDiscount: req.body.allowInvoiceDiscount,
        vatIdentifier: req.body.vatIdentifier,
        created_at: new Date(),
        updated_at: new Date()
    };

    if (!newSalesLine.no || !newSalesLine.lineNo || !newSalesLine.orderNo) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    SalesLine.createSalesLine(newSalesLine, (err, result) => {
        if (err) {
            console.error('Error creating salesLine:', err);
            return res.status(500).json({ error: 'Failed to create salesLine' });
        }
        res.status(201).json({ message: 'SalesLine created successfully', salesLine: newSalesLine });
    });

    const itemNo = newSalesLine.no;
    const qty = Number(newSalesLine.quantity) || 0;

    Item.getItemById(itemNo, (err, items) => {
        if (err) {
            console.error('Error fetching item:', err);
            return res.status(500).json({ error: 'Failed to fetch item' });
        }
        if (items && items.length > 0) {
            const item = items[0];
            const newInventory = Number(item.inventory || 0) - qty;
            if (newInventory > 0) {
                Item.updateItem(itemNo, { ...item, inventory: newInventory, updated_at: new Date() }, (err) => {
                    if (err) {
                        console.error('Error updating item inventory:', err);
                        return res.status(500).json({ error: 'Failed to update item inventory' });
                    }
                    return res.status(201).json({ message: 'SalesLine created, item inventory updated', salesLine: newSalesLine });
                });
            } else {
                // Если количество стало 0 или меньше — удаляем товар
                Item.deleteItem(itemNo, (err) => {
                    if (err) {
                        console.error('Error deleting item:', err);
                        return res.status(500).json({ error: 'Failed to delete item' });
                    }
                    return res.status(201).json({ message: 'SalesLine created, item deleted (inventory <= 0)', salesLine: newSalesLine });
                });
            }
        } else {
            // Товар не найден, просто возвращаем успех по продаже
            return res.status(201).json({ message: 'SalesLine created, item not found', salesLine: newSalesLine });
        }
    });

    const generalLedgerEntry = {
        entryType: 'Sale',
        documentNo: newSalesLine.documentNo,
        itemNo: newSalesLine.no,
        quantity: newSalesLine.quantity,
        amount: newSalesLine.lineAmount,
        postingDate: new Date(),
        description: newSalesLine.description,
        created_at: new Date(),
        updated_at: new Date()
    };
    GeneralLedgerEntry.createGeneralLedgerEntry(generalLedgerEntry, (err) => {
        if (err) {
            console.error('Error creating general ledger entry:', err);
        }
        // Возврат ответа клиенту (как раньше)
    });
};

exports.updateSalesLine = function (req, res) {
    const updatedSalesLine = {
        documentType: req.body.documentType,
        documentNo: req.body.documentNo,
        sellToCustomerNo: req.body.sellToCustomerNo,
        lineNo: req.body.lineNo,
        type: req.body.type,
        no: req.body.no,
        variantCode: req.body.variantCode,
        description: req.body.description,
        description2: req.body.description2,
        locationCode: req.body.locationCode,
        quantity: req.body.quantity,
        reservedQtyBase: req.body.reservedQtyBase,
        unitOfMeasureCode: req.body.unitOfMeasureCode,
        unitPrice: req.body.unitPrice,
        unitCostLCY: req.body.unitCostLCY,
        lineAmount: req.body.lineAmount,
        orderNo: req.body.orderNo,
        allocationAccountNo: req.body.allocationAccountNo,
        jobNo: req.body.jobNo,
        jobTaskNo: req.body.jobTaskNo,
        jobLineType: req.body.jobLineType,
        shortcutDim1Code: req.body.shortcutDim1Code,
        shortcutDim2Code: req.body.shortcutDim2Code,
        shortcutDimCode3: req.body.shortcutDimCode3,
        shortcutDimCode4: req.body.shortcutDimCode4,
        shortcutDimCode5: req.body.shortcutDimCode5,
        shortcutDimCode6: req.body.shortcutDimCode6,
        shortcutDimCode7: req.body.shortcutDimCode7,
        shortcutDimCode8: req.body.shortcutDimCode8,
        shipmentDate: req.body.shipmentDate,
        outstandingQuantity: req.body.outstandingQuantity,
        outstandingAmountLCY: req.body.outstandingAmountLCY,
        amountShippedNotInvoicedLCY: req.body.amountShippedNotInvoicedLCY,
        discountPercent: req.body.discountPercent,
        allowInvoiceDiscount: req.body.allowInvoiceDiscount,
        vatIdentifier: req.body.vatIdentifier,
        created_at: req.body.created_at,
        updated_at: new Date()
    };

    if (!req.params.lineNo) {
        return res.status(400).json({ error: 'SalesLine lineNo is missing' });
    }

    SalesLine.updateSalesLine(req.params.lineNo, updatedSalesLine, (err, result) => {
        if (err) {
            console.error('Error updating salesLine:', err);
            return res.status(500).json({ error: 'Failed to update salesLine' });
        }
        res.json({ message: 'SalesLine updated successfully', salesLine: updatedSalesLine });
    });
};

exports.deleteSalesLine = function (req, res) {
    SalesLine.deleteSalesLine(req.params.lineNo, (err, result) => {
        if (err) {
            console.error('Error deleting salesLine:', err);
            return res.status(500).json({ error: 'Failed to delete salesLine' });
        }
        res.json({ message: 'SalesLine deleted successfully' });
    });
};
