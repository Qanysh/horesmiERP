const SalesLine = require('../models/salesLine');
const GeneralLedgerEntry = require('../models/generalLedgerEntry');
const Item = require('../models/item');
const Product = require('../models/product');
const ProductionTool = require('../models/productionTool');

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
        res.json(salesLine);
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
        res.json(salesLine);
    });
};

exports.getSalesLineByDocumentNoForRouter = async function (req, res) {
    const documentNo = req.params.documentNo;
    SalesLine.getSalesLineByDocumentNo(documentNo, (err, salesLine) => {
        if (err) {
            console.error('Error fetching salesLine:', err);
            return res.status(500).json({ error: 'Error fetching salesLine' });
        }
        if (!salesLine || salesLine.length === 0) {
            return res.status(404).json({ error: 'SalesLine not found' });
        }
        res.json(salesLine);
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
        isArchived: req.body.isArchived || false,
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

        const itemNo = newSalesLine.no;
        const qty = Number(newSalesLine.quantity) || 0;
        const type = newSalesLine.type; // предполагается: 'Product', 'Item', 'ProductionTool'

        // Универсальная функция для создания записи в General Ledger
        const afterLedger = (msg) => {
            res.status(201).json({ message: msg, salesLine: newSalesLine });
        };

        const createLedgerEntry = (msg) => {
            GeneralLedgerEntry.getLastEntryNo((err, lastentryNo) => {
                if (err) {
                    console.error('Error fetching last entryNo:', err);
                    return res.status(500).json({ error: 'Failed to fetch last entryNo' });
                }
                const nextEntryNo = lastentryNo ? Number(lastentryNo) + 1 : 1;
                const generalLedgerEntry = {
                    entryNo: nextEntryNo,
                    documentType: 'Sale',
                    documentNo: newSalesLine.documentNo,
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
                    afterLedger(msg);
                });
            });
        };

        // В зависимости от типа товара обновляем нужную таблицу
        if (type === 'Product') {
            Product.getProductById(itemNo, (err, products) => {
                if (err) {
                    console.error('Error fetching product:', err);
                    return res.status(500).json({ error: 'Failed to fetch product' });
                }
                if (products && products.length > 0) {
                    const product = products[0];
                    const newInventory = Number(product.inventory || 0) - qty;
                    if (newInventory > 0) {
                        Product.updateProduct(itemNo, { ...product, inventory: newInventory, updated_at: new Date() }, (err) => {
                            if (err) {
                                console.error('Error updating product inventory:', err);
                                return res.status(500).json({ error: 'Failed to update product inventory' });
                            }
                            createLedgerEntry('SalesLine created, product inventory updated');
                        });
                    } else {
                        Product.deleteProduct(itemNo, (err) => {
                            if (err) {
                                console.error('Error deleting product:', err);
                                return res.status(500).json({ error: 'Failed to delete product' });
                            }
                            createLedgerEntry('SalesLine created, product deleted (inventory <= 0)');
                        });
                    }
                } else {
                    createLedgerEntry('SalesLine created, product not found');
                }
            });
        } else if (type === 'ProductionTool') {
            ProductionTool.getProductionToolById(itemNo, (err, tools) => {
                if (err) {
                    console.error('Error fetching production tool:', err);
                    return res.status(500).json({ error: 'Failed to fetch production tool' });
                }
                if (tools && tools.length > 0) {
                    const tool = tools[0];
                    // Например, можно менять статус или архивировать инструмент
                    ProductionTool.updateProductionTool(itemNo, { ...tool, status: 'Used', updated_at: new Date() }, (err) => {
                        if (err) {
                            console.error('Error updating production tool:', err);
                            return res.status(500).json({ error: 'Failed to update production tool' });
                        }
                        createLedgerEntry('SalesLine created, production tool status updated');
                    });
                } else {
                    createLedgerEntry('SalesLine created, production tool not found');
                }
            });
        } else { // По умолчанию — Item
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
                            createLedgerEntry('SalesLine created, item inventory updated');
                        });
                    } else {
                        Item.deleteItem(itemNo, (err) => {
                            if (err) {
                                console.error('Error deleting item:', err);
                                return res.status(500).json({ error: 'Failed to delete item' });
                            }
                            createLedgerEntry('SalesLine created, item deleted (inventory <= 0)');
                        });
                    }
                } else {
                    createLedgerEntry('SalesLine created, item not found');
                }
            });
        }
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
        isArchived: req.body.isArchived || false,
        updated_at: new Date()
    };

    if (!req.params.id) {
        return res.status(400).json({ error: 'SalesLine id is missing' });
    }

    SalesLine.updateSalesLine(req.params.id, updatedSalesLine, (err, result) => {
        if (err) {
            console.error('Error updating salesLine:', err);
            return res.status(500).json({ error: 'Failed to update salesLine' });
        }
        res.json({ message: 'SalesLine updated successfully', salesLine: updatedSalesLine });
    });
};

exports.deleteSalesLine = function (req, res) {
    SalesLine.deleteSalesLine(req.params.id, (err, result) => {
        if (err) {
            console.error('Error deleting salesLine:', err);
            return res.status(500).json({ error: 'Failed to delete salesLine' });
        }
        res.json({ message: 'SalesLine deleted successfully' });
    });
};
