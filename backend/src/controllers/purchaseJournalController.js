const PurchaseJournal = require('../models/purchaseJournal');

exports.getAllPurchaseJournals = async function (req, res) {
    try {
        PurchaseJournal.getAllPurchaseJournals((err, purchaseJournals) => {
            if (err) {
                console.error('Error fetching purchaseJournals:', err);
                return res.status(500).json({ error: 'Error fetching purchaseJournals data' });
            }
            res.json(purchaseJournals);
        });
    } catch (err) {
        console.error('Unexpected error fetching purchaseJournals:', err);
        res.status(500).json({ error: 'Unexpected error' });
    }
};

exports.getPurchaseJournalById = function (req, res) {
    PurchaseJournal.getPurchaseJournalById([req.params.id], (err, purchaseJournal) => {
        if (err) {
            console.error('Error fetching purchaseJournal:', err);
            return res.status(500).json({ error: 'Error fetching purchaseJournal' });
        }
        if (!purchaseJournal || purchaseJournal.length === 0) {
            return res.status(404).json({ error: 'PurchaseJournal not found' });
        }
        res.json(purchaseJournal[0]);
    });
};

exports.createPurchaseJournal = function (req, res) {
    const newPurchaseJournal = {
        journalNo: req.body.journalNo,
        journalTemplateName: req.body.journalTemplateName,
        journalBatchName: req.body.journalBatchName,
        description: req.body.description,
        postingDate: req.body.postingDate,
        documentNo: req.body.documentNo,
        externalDocumentNo: req.body.externalDocumentNo,
        buyFromVendorNo: req.body.buyFromVendorNo,
        buyFromVendorName: req.body.buyFromVendorName,
        buyFromAddress: req.body.buyFromAddress,
        buyFromAddress2: req.body.buyFromAddress2,
        buyFromCity: req.body.buyFromCity,
        buyFromCounty: req.body.buyFromCounty,
        buyFromPostCode: req.body.buyFromPostCode,
        buyFromCountryRegionCode: req.body.buyFromCountryRegionCode,
        buyFromEmail: req.body.buyFromEmail,
        buyFromPhoneNo: req.body.buyFromPhoneNo,
        invoiceNo: req.body.invoiceNo,
        invoiceDate: req.body.invoiceDate,
        orderNo: req.body.orderNo,
        orderDate: req.body.orderDate,
        documentDate: req.body.documentDate,
        postingDate: req.body.postingDate,
        dueDate: req.body.dueDate,
        shipmentMethodCode: req.body.shipmentMethodCode,
        pricesIncludingVAT: req.body.pricesIncludingVAT,

        created_at: new Date(),
        updated_at: new Date()
    };

    if (!newPurchaseJournal.journalNo) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    PurchaseJournal.createPurchaseJournal(newPurchaseJournal, (err, result) => {
        if (err) {
            console.error('Error creating purchaseJournal:', err);
            return res.status(500).json({ error: 'Failed to create purchaseJournal' });
        }
        res.status(201).json({ message: 'PurchaseJournal created successfully', purchaseJournal: newPurchaseJournal });
    });
};

exports.updatePurchaseJournal = function (req, res) {
    const updatedPurchaseJournal = {
        // Fill with your purchaseJournal fields
        // journalNo: req.body.journalNo,
        // description: req.body.description,
        created_at: req.body.created_at,
        updated_at: new Date()
    };

    if (!req.params.id) {
        return res.status(400).json({ error: 'PurchaseJournal ID is missing' });
    }

    PurchaseJournal.updatePurchaseJournal(req.params.id, updatedPurchaseJournal, (err, result) => {
        if (err) {
            console.error('Error updating purchaseJournal:', err);
            return res.status(500).json({ error: 'Failed to update purchaseJournal' });
        }
        res.json({ message: 'PurchaseJournal updated successfully', purchaseJournal: updatedPurchaseJournal });
    });
};

exports.deletePurchaseJournal = function (req, res) {
    PurchaseJournal.deletePurchaseJournal(req.params.id, (err, result) => {
        if (err) {
            console.error('Error deleting purchaseJournal:', err);
            return res.status(500).json({ error: 'Failed to delete purchaseJournal' });
        }
        res.json({ message: 'PurchaseJournal deleted successfully' });
    });
};
