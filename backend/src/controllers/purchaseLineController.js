const PurchaseLine = require('../models/purchaseLine');
const Item = require('../models/item');
const GeneralLedgerEntry = require('../models/generalLedgerEntry');
const GeneralLedgerEntryController = require('./generalLedgerEntryController');

exports.getAllPurchaseLines = async function (req, res) {
    try {
        PurchaseLine.getAllPurchaseLines((err, purchaseLines) => {
            if (err) {
                console.error('Error fetching purchaseLines:', err);
                return res.status(500).json({ error: 'Error fetching purchaseLines data' });
            }
            res.json(purchaseLines);
        });
    } catch (err) {
        console.error('Unexpected error fetching purchaseLines:', err);
        res.status(500).json({ error: 'Unexpected error' });
    }
};

exports.getPurchaseLineById = async function (req, res) {
    PurchaseLine.getPurchaseLineById([req.params.id], (err, purchaseLine) => {
        if (err) {
            console.error('Error fetching purchaseLine:', err);
            return res.status(500).json({ error: 'Error fetching purchaseLine' });
        }
        if (!purchaseLine || purchaseLine.length === 0) {
            return res.status(404).json({ error: 'PurchaseLine not found' });
        }
        res.json(purchaseLine[0]);
    });
};

exports.getPurchaseLineByDocumentNo = async function (documentNo, req, res) {
    PurchaseLine.getPurchaseLineByDocumentNo(documentNo, (err, purchaseLine) => {
        if (err) {
            console.error('Error fetching purchaseLine:', err);
            return res.status(500).json({ error: 'Error fetching purchaseLine' });
        }
        if (!purchaseLine || purchaseLine.length === 0) {
            return res.status(404).json({ error: 'PurchaseLine not found' });
        }
        res.json(purchaseLine);
    });
};

exports.getPurchaseLineByDocumentNoForRouter = async function (req, res) {
    const documentNo = req.params.documentNo;
    PurchaseLine.getPurchaseLineByDocumentNo(documentNo, (err, purchaseLine) => {
        if (err) {
            console.error('Error fetching purchaseLine:', err);
            return res.status(500).json({ error: 'Error fetching purchaseLine' });
        }
        if (!purchaseLine || purchaseLine.length === 0) {
            return res.status(404).json({ error: 'PurchaseLine not found' });
        }
        res.json(purchaseLine);
    });
};

exports.createPurchaseLine = function (req, res) {
    const newPurchaseLine = {
        documentType: req.body.documentType,
        documentNo: req.body.documentNo,
        buyFromVendorNo: req.body.buyFromVendorNo,
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
        directUnitCost: req.body.directUnitCost,
        indirectCostPercent: req.body.indirectCostPercent,
        unitCostLCY: req.body.unitCostLCY,
        unitPriceLCY: req.body.unitPriceLCY,
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
        expectedReceiptDate: req.body.expectedReceiptDate,
        outstandingQuantity: req.body.outstandingQuantity,
        outstandingAmountLCY: req.body.outstandingAmountLCY,
        amountRcdNotInvoicedLCY: req.body.amountRcdNotInvoicedLCY,
        discountPercent: req.body.discountPercent,
        allowInvoiceDiscount: req.body.allowInvoiceDiscount,
        isArchived: req.body.isArchived || false,
        vatIdentifier: req.body.vatIdentifier,
        created_at: new Date(),
        updated_at: new Date()
    };

    if (!newPurchaseLine.no || !newPurchaseLine.lineNo || !newPurchaseLine.orderNo) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    PurchaseLine.createPurchaseLine(newPurchaseLine, (err, result) => {
        if (err) {
            console.error('Error creating purchaseLine:', err);
            return res.status(500).json({ error: 'Failed to create purchaseLine' });
        }

        const itemNo = req.body.no;
        const qty = Number(req.body.quantity) || 0;

        Item.getItemById(itemNo, (err, items) => {
            if (err) {
                console.error('Error fetching item:', err);
                return res.status(500).json({ error: 'Failed to fetch item' });
            }

            const afterLedger = () => {
                res.status(201).json({ message: 'PurchaseLine and item processed, ledger entry created', purchaseLine: newPurchaseLine });
            };

            const createLedgerEntry = () => {
                GeneralLedgerEntry.getLastEntryNo((err, lastentryNo) => {
                    if (err) {
                        console.error('Error fetching last entryNo:', err);
                        return res.status(500).json({ error: 'Failed to fetch last entryNo' });
                    }
                    const nextEntryNo = lastentryNo ? Number(lastentryNo) + 1 : 1;
                    const generalLedgerEntry = {
                        entryNo: nextEntryNo,
                        documentType: 'Purchase',
                        documentNo: newPurchaseLine.documentNo,
                        quantity: newPurchaseLine.quantity,
                        amount: -Math.abs(Number(newPurchaseLine.lineAmount)),
                        postingDate: new Date(),
                        description: newPurchaseLine.description,
                        created_at: new Date(),
                        updated_at: new Date()
                    };
                    GeneralLedgerEntry.createGeneralLedgerEntry(generalLedgerEntry, (err) => {
                        if (err) {
                            console.error('Error creating general ledger entry:', err);
                        }
                        afterLedger();
                    });
                });
            };

            if (items && items.length > 0) {
                const item = items[0];
                const newInventory = Number(item.inventory || 0) + qty;
                Item.updateItem(itemNo, { ...item, inventory: newInventory, updated_at: new Date() }, (err) => {
                    if (err) {
                        console.error('Error updating item inventory:', err);
                        return res.status(500).json({ error: 'Failed to update item inventory' });
                    }
                    createLedgerEntry();
                });
            } else {
                const newItem = {
                    item_no: itemNo,
                    description: req.body.description,
                    description2: req.body.description2,
                    type: req.body.type,
                    inventory: qty,
                    baseUnitOfMeasure: req.body.unitOfMeasureCode,
                    created_at: new Date(),
                    updated_at: new Date()
                };
                Item.createItem(newItem, (err) => {
                    if (err) {
                        console.error('Error creating item:', err);
                        return res.status(500).json({ error: 'Failed to create item' });
                    }
                    createLedgerEntry();
                });
            }
        });
    });
};

exports.updatePurchaseLine = function (req, res) {
    const updatedPurchaseLine = {
        documentType: req.body.documentType,
        documentNo: req.body.documentNo,
        buyFromVendorNo: req.body.buyFromVendorNo,
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
        directUnitCost: req.body.directUnitCost,
        indirectCostPercent: req.body.indirectCostPercent,
        unitCostLCY: req.body.unitCostLCY,
        unitPriceLCY: req.body.unitPriceLCY,
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
        expectedReceiptDate: req.body.expectedReceiptDate,
        outstandingQuantity: req.body.outstandingQuantity,
        outstandingAmountLCY: req.body.outstandingAmountLCY,
        amountRcdNotInvoicedLCY: req.body.amountRcdNotInvoicedLCY,
        isArchived: req.body.isArchived || false,
        created_at: req.body.created_at,
        updated_at: new Date()
    };

    if (!req.params.id) {
        return res.status(400).json({ error: 'PurchaseLine id is missing' });
    }

    PurchaseLine.updatePurchaseLine(req.params.id, updatedPurchaseLine, (err, result) => {
        if (err) {
            console.error('Error updating purchaseLine:', err);
            return res.status(500).json({ error: 'Failed to update purchaseLine' });
        }
        res.json({ message: 'PurchaseLine updated successfully', purchaseLine: updatedPurchaseLine });
    });
};

exports.deletePurchaseLine = function (req, res) {
    PurchaseLine.deletePurchaseLine(req.params.id, (err, result) => {
        if (err) {
            console.error('Error deleting purchaseLine:', err);
            return res.status(500).json({ error: 'Failed to delete purchaseLine' });
        }
        res.json({ message: 'PurchaseLine deleted successfully' });
    });
};
