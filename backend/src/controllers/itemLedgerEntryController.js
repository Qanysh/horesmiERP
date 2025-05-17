const ItemLedgerEntry = require('../models/itemLedgerEntry');

exports.getAllItemLedgerEntries = async function (req, res) {
    try {
        ItemLedgerEntry.getAllItemLedgerEntries((err, itemLedgerEntries) => {
            if (err) {
                console.error('Error fetching itemLedgerEntries:', err);
                return res.status(500).json({ error: 'Error fetching itemLedgerEntries data' });
            }
            res.json(itemLedgerEntries); // Отправляем данные JSON на фронтенд
        });
    } catch (err) {
        console.error('Unexpected error fetching itemLedgerEntries:', err);
        res.status(500).json({ error: 'Unexpected error' });
    }
};

exports.getItemLedgerEntryById = async function (req, res) {
    ItemLedgerEntry.getItemLedgerEntryById([req.params.entryNo], (err, itemLedgerEntryCard) => {
        if (err) {
            console.error('Error fetching itemLedgerEntry:', err);
            return res.status(500).json({ error: 'Error fetching itemLedgerEntry' });
        }
        if (!itemLedgerEntryCard || itemLedgerEntryCard.length === 0) {
            return res.status(404).json({ error: 'ItemLedgerEntry not found' });
        }
        res.json(itemLedgerEntryCard[0]); // Отправляем данные одного клиента JSON
    });
};

exports.createItemLedgerEntry = function (req, res) {
    const newItemLedgerEntry = {
        postingDate: req.body.postingDate,
        entryType: req.body.entryType,
        documentType: req.body.documentType,
        documentNo: req.body.documentNo,
        documentLineNo: req.body.documentLineNo,
        itemNo: req.body.itemNo,
        variantCode: req.body.variantCode,
        description: req.body.description,
        returnReasonCode: req.body.returnReasonCode,
        globalDimension1Code: req.body.globalDimension1Code,
        globalDimension2Code: req.body.globalDimension2Code,
        expirationDate: req.body.expirationDate,
        serialNo: req.body.serialNo,
        lotNo: req.body.lotNo,
        packageNo: req.body.packageNo,
        locationCode: req.body.locationCode,
        quantity: req.body.quantity,
        invoicedQuantity: req.body.invoicedQuantity,
        remainingQuantity: req.body.remainingQuantity,
        shippedQtyNotReturned: req.body.shippedQtyNotReturned,
        reservedQuantity: req.body.reservedQuantity,
        qtyPerUnitOfMeasure: req.body.qtyPerUnitOfMeasure,
        unitOfMeasureCode: req.body.unitOfMeasureCode,
        salesAmountExpected: req.body.salesAmountExpected,
        salesAmountActual: req.body.salesAmountActual,
        costAmountExpected: req.body.costAmountExpected,
        costAmountActual: req.body.costAmountActual,
        costAmountNonInvtbl: req.body.costAmountNonInvtbl,
        costAmountExpectedAcy: req.body.costAmountExpectedAcy,
        costAmountActualAcy: req.body.costAmountActualAcy,
        costAmountNonInvtblAcy: req.body.costAmountNonInvtblAcy,
        completelyInvoiced: req.body.completelyInvoiced,
        open: req.body.open,
        dropShipment: req.body.dropShipment,
        assembleToOrder: req.body.assembleToOrder,
        appliedEntryToAdjust: req.body.appliedEntryToAdjust,
        orderType: req.body.orderType,
        orderNo: req.body.orderNo,
        orderLineNo: req.body.orderLineNo,
        prodOrderCompLineNo: req.body.prodOrderCompLineNo,
        entryNo: req.body.entryNo,
        jobNo: req.body.jobNo,
        jobTaskNo: req.body.jobTaskNo,
        dimensionSetId: req.body.dimensionSetId,
        shortcutDimension3Code: req.body.shortcutDimension3Code,
        shortcutDimension4Code: req.body.shortcutDimension4Code,
        shortcutDimension5Code: req.body.shortcutDimension5Code,
        shortcutDimension6Code: req.body.shortcutDimension6Code,
        shortcutDimension7Code: req.body.shortcutDimension7Code,
        shortcutDimension8Code: req.body.shortcutDimension8Code,
        sourceType: req.body.sourceType,
        sourceNo: req.body.sourceNo,
        created_at: new Date(),
        updated_at: new Date()
    };


    if (!newItemLedgerEntry.entryNo || !newItemLedgerEntry.itemNo) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    ItemLedgerEntry.createItemLedgerEntry(newItemLedgerEntry, (err, result) => {
        if (err) {
            console.error('Error creating itemLedgerEntry:', err);
            return res.status(500).json({ error: 'Failed to create itemLedgerEntry' });
        }
        res.status(201).json({ message: 'ItemLedgerEntry created successfully', itemLedgerEntry: newItemLedgerEntry });
    });
};

exports.updateItemLedgerEntry = function (req, res) {
    const updatedItemLedgerEntry = {
        postingDate: req.body.postingDate,
        entryType: req.body.entryType,
        documentType: req.body.documentType,
        documentNo: req.body.documentNo,
        documentLineNo: req.body.documentLineNo,
        itemNo: req.body.itemNo,
        variantCode: req.body.variantCode,
        description: req.body.description,
        returnReasonCode: req.body.returnReasonCode,
        globalDimension1Code: req.body.globalDimension1Code,
        globalDimension2Code: req.body.globalDimension2Code,
        expirationDate: req.body.expirationDate,
        serialNo: req.body.serialNo,
        lotNo: req.body.lotNo,
        packageNo: req.body.packageNo,
        locationCode: req.body.locationCode,
        quantity: req.body.quantity,
        invoicedQuantity: req.body.invoicedQuantity,
        remainingQuantity: req.body.remainingQuantity,
        shippedQtyNotReturned: req.body.shippedQtyNotReturned,
        reservedQuantity: req.body.reservedQuantity,
        qtyPerUnitOfMeasure: req.body.qtyPerUnitOfMeasure,
        unitOfMeasureCode: req.body.unitOfMeasureCode,
        salesAmountExpected: req.body.salesAmountExpected,
        salesAmountActual: req.body.salesAmountActual,
        costAmountExpected: req.body.costAmountExpected,
        costAmountActual: req.body.costAmountActual,
        costAmountNonInvtbl: req.body.costAmountNonInvtbl,
        costAmountExpectedAcy: req.body.costAmountExpectedAcy,
        costAmountActualAcy: req.body.costAmountActualAcy,
        costAmountNonInvtblAcy: req.body.costAmountNonInvtblAcy,
        completelyInvoiced: req.body.completelyInvoiced,
        open: req.body.open,
        dropShipment: req.body.dropShipment,
        assembleToOrder: req.body.assembleToOrder,
        appliedEntryToAdjust: req.body.appliedEntryToAdjust,
        orderType: req.body.orderType,
        orderNo: req.body.orderNo,
        orderLineNo: req.body.orderLineNo,
        prodOrderCompLineNo: req.body.prodOrderCompLineNo,
        entryNo: req.body.entryNo,
        jobNo: req.body.jobNo,
        jobTaskNo: req.body.jobTaskNo,
        dimensionSetId: req.body.dimensionSetId,
        shortcutDimension3Code: req.body.shortcutDimension3Code,
        shortcutDimension4Code: req.body.shortcutDimension4Code,
        shortcutDimension5Code: req.body.shortcutDimension5Code,
        shortcutDimension6Code: req.body.shortcutDimension6Code,
        shortcutDimension7Code: req.body.shortcutDimension7Code,
        shortcutDimension8Code: req.body.shortcutDimension8Code,
        sourceType: req.body.sourceType,
        sourceNo: req.body.sourceNo,
        created_at: req.body.created_at,
        updated_at: new Date()
    };


    if (!req.params.entryNo) {
        return res.status(400).json({ error: 'ItemLedgerEntry ID is missing' });
    }

    ItemLedgerEntry.updateItemLedgerEntry(req.params.no, updatedItemLedgerEntry, (err, result) => {
        if (err) {
            console.error('Error updating itemLedgerEntry:', err);
            return res.status(500).json({ error: 'Failed to update itemLedgerEntry' });
        }
        res.json({ message: 'ItemLedgerEntry updated successfully', itemLedgerEntry: updatedItemLedgerEntry });
    });
};

exports.deleteItemLedgerEntry = function (req, res) {
    ItemLedgerEntry.deleteItemLedgerEntry(req.params.entryNo, (err, result) => {
        if (err) {
            console.error('Error deleting itemLedgerEntry:', err);
            return res.status(500).json({ error: 'Failed to delete itemLedgerEntry' });
        }
        res.json({ message: 'ItemLedgerEntry deleted successfully' });
    });
};
