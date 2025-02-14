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
    ItemLedgerEntry.getItemLedgerEntryById([req.params.no], (err, itemLedgerEntryCard) => {
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
        entryNo: req.body.entryNo,
        itemNo: req.body.itemNo,
        postingDate: req.body.postingDate,
        entryType: req.body.entryType,
        sourceNo: req.body.sourceNo,
        documentNo: req.body.documentNo,
        quantity: req.body.quantity,
        itemCategoryCode: req.body.itemCategoryCode,
        description: req.body.description,
    };

    if (!newItemLedgerEntry.no || !newItemLedgerEntry.name) {
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
        entryNo: req.body.entryNo,
        itemNo: req.body.itemNo,
        postingDate: req.body.postingDate,
        entryType: req.body.entryType,
        sourceNo: req.body.sourceNo,
        documentNo: req.body.documentNo,
        quantity: req.body.quantity,
        itemCategoryCode: req.body.itemCategoryCode,
        description: req.body.description,
    };

    if (!req.params.no) {
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
    ItemLedgerEntry.deleteItemLedgerEntry(req.params.no, (err, result) => {
        if (err) {
            console.error('Error deleting itemLedgerEntry:', err);
            return res.status(500).json({ error: 'Failed to delete itemLedgerEntry' });
        }
        res.json({ message: 'ItemLedgerEntry deleted successfully' });
    });
};
