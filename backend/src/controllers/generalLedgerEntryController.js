const GeneralLedgerEntry = require('../models/generalLedgerEntry');

exports.getAllGeneralLedgerEntries = async function (req, res) {
    try {
        GeneralLedgerEntry.getAllGeneralLedgerEntries((err, generalLedgerEntries) => {
            if (err) {
                console.error('Error fetching generalLedgerEntries:', err);
                return res.status(500).json({ error: 'Error fetching generalLedgerEntries data' });
            }
            res.json(generalLedgerEntries); // Send JSON data to the frontend
        });
    } catch (err) {
        console.error('Unexpected error fetching generalLedgerEntries:', err);
        res.status(500).json({ error: 'Unexpected error' });
    }
};

exports.getGeneralLedgerEntryById = async function (req, res) {
    GeneralLedgerEntry.getGeneralLedgerEntryById([req.params.no], (err, generalLedgerEntryCard) => {
        if (err) {
            console.error('Error fetching generalLedgerEntry:', err);
            return res.status(500).json({ error: 'Error fetching generalLedgerEntry' });
        }
        if (!generalLedgerEntryCard || generalLedgerEntryCard.length === 0) {
            return res.status(404).json({ error: 'GeneralLedgerEntry not found' });
        }
        res.json(generalLedgerEntryCard[0]); // Send JSON data for a single entry
    });
};

exports.createGeneralLedgerEntry = function (req, res) {
    current_user = req.session.userId;
    if (!current_user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const newGeneralLedgerEntry = {
        postingDate: req.body.postingDate,
        documentType: req.body.documentType,
        documentNo: req.body.documentNo,
        accountNo: req.body.accountNo,
        accountName: req.body.accountName,
        description: req.body.description,
        jobNo: req.body.jobNo,
        globalDimension1Code: req.body.globalDimension1Code,
        globalDimension2Code: req.body.globalDimension2Code,
        icPartnerCode: req.body.icPartnerCode,
        genPostingType: req.body.genPostingType,
        genBusPostingGroup: req.body.genBusPostingGroup,
        genProdPostingGroup: req.body.genProdPostingGroup,
        vatBusPostingGroup: req.body.vatBusPostingGroup,
        vatProdPostingGroup: req.body.vatProdPostingGroup,
        quantity: req.body.quantity,
        amount: req.body.amount,
        sourceCurrencyCode: req.body.sourceCurrencyCode,
        sourceCurrencyAmount: req.body.sourceCurrencyAmount,
        sourceCurrencyVatAmount: req.body.sourceCurrencyVatAmount,
        debitAmount: req.body.debitAmount,
        creditAmount: req.body.creditAmount,
        runningBalance: req.body.runningBalance,
        additionalCurrencyAmount: req.body.additionalCurrencyAmount,
        runningBalanceACY: req.body.runningBalanceACY,
        vatAmount: req.body.vatAmount,
        nonDeductibleVatAmount: req.body.nonDeductibleVatAmount,
        balAccountType: req.body.balAccountType,
        balAccountNo: req.body.balAccountNo,
        vatReportingDate: req.body.vatReportingDate,
        userId: req.session.userId,
        sourceCode: req.body.sourceCode,
        sourceType: req.body.sourceType,
        sourceNo: req.body.sourceNo,
        reasonCode: req.body.reasonCode,
        reversed: req.body.reversed,
        reversedByEntryNo: req.body.reversedByEntryNo,
        reversedEntryNo: req.body.reversedEntryNo,
        faEntryType: req.body.faEntryType,
        faEntryNo: req.body.faEntryNo,
        entryNo: req.body.entryNo,
        dimensionSetId: req.body.dimensionSetId,
        externalDocumentNo: req.body.externalDocumentNo,
        businessUnitCode: req.body.businessUnitCode,
        shortcutDimension3Code: req.body.shortcutDimension3Code,
        shortcutDimension4Code: req.body.shortcutDimension4Code,
        shortcutDimension5Code: req.body.shortcutDimension5Code,
        shortcutDimension6Code: req.body.shortcutDimension6Code,
        shortcutDimension7Code: req.body.shortcutDimension7Code,
        shortcutDimension8Code: req.body.shortcutDimension8Code,
        created_at: new Date(),
        updated_at: new Date()
    };

    if (!newGeneralLedgerEntry.entryNo || !newGeneralLedgerEntry.accountNo) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    GeneralLedgerEntry.createGeneralLedgerEntry(newGeneralLedgerEntry, (err, result) => {
        if (err) {
            console.error('Error creating generalLedgerEntry:', err);
            return res.status(500).json({ error: 'Failed to create generalLedgerEntry' });
        }
        res.status(201).json({ message: 'GeneralLedgerEntry created successfully', generalLedgerEntry: newGeneralLedgerEntry });
    });
};

exports.updateGeneralLedgerEntry = function (req, res) {
    const updatedGeneralLedgerEntry = {
        postingDate: req.body.postingDate,
        documentType: req.body.documentType,
        documentNo: req.body.documentNo,
        accountNo: req.body.accountNo,
        accountName: req.body.accountName,
        description: req.body.description,
        jobNo: req.body.jobNo,
        globalDimension1Code: req.body.globalDimension1Code,
        globalDimension2Code: req.body.globalDimension2Code,
        icPartnerCode: req.body.icPartnerCode,
        genPostingType: req.body.genPostingType,
        genBusPostingGroup: req.body.genBusPostingGroup,
        genProdPostingGroup: req.body.genProdPostingGroup,
        vatBusPostingGroup: req.body.vatBusPostingGroup,
        vatProdPostingGroup: req.body.vatProdPostingGroup,
        quantity: req.body.quantity,
        amount: req.body.amount,
        sourceCurrencyCode: req.body.sourceCurrencyCode,
        sourceCurrencyAmount: req.body.sourceCurrencyAmount,
        sourceCurrencyVatAmount: req.body.sourceCurrencyVatAmount,
        debitAmount: req.body.debitAmount,
        creditAmount: req.body.creditAmount,
        runningBalance: req.body.runningBalance,
        additionalCurrencyAmount: req.body.additionalCurrencyAmount,
        runningBalanceACY: req.body.runningBalanceACY,
        vatAmount: req.body.vatAmount,
        nonDeductibleVatAmount: req.body.nonDeductibleVatAmount,
        balAccountType: req.body.balAccountType,
        balAccountNo: req.body.balAccountNo,
        vatReportingDate: req.body.vatReportingDate,
        userId: req.body.userId,
        sourceCode: req.body.sourceCode,
        sourceType: req.body.sourceType,
        sourceNo: req.body.sourceNo,
        reasonCode: req.body.reasonCode,
        reversed: req.body.reversed,
        reversedByEntryNo: req.body.reversedByEntryNo,
        reversedEntryNo: req.body.reversedEntryNo,
        faEntryType: req.body.faEntryType,
        faEntryNo: req.body.faEntryNo,
        entryNo: req.body.entryNo,
        dimensionSetId: req.body.dimensionSetId,
        externalDocumentNo: req.body.externalDocumentNo,
        businessUnitCode: req.body.businessUnitCode,
        shortcutDimension3Code: req.body.shortcutDimension3Code,
        shortcutDimension4Code: req.body.shortcutDimension4Code,
        shortcutDimension5Code: req.body.shortcutDimension5Code,
        shortcutDimension6Code: req.body.shortcutDimension6Code,
        shortcutDimension7Code: req.body.shortcutDimension7Code,
        shortcutDimension8Code: req.body.shortcutDimension8Code,
        created_at: req.body.created_at,
        updated_at: new Date()
    };

    if (!req.params.entryNo) {
        return res.status(400).json({ error: 'GeneralLedgerEntry ID is missing' });
    }

    GeneralLedgerEntry.updateGeneralLedgerEntry(req.params.entryNo, updatedGeneralLedgerEntry, (err, result) => {
        if (err) {
            console.error('Error updating generalLedgerEntry:', err);
            return res.status(500).json({ error: 'Failed to update generalLedgerEntry' });
        }
        res.json({ message: 'GeneralLedgerEntry updated successfully', generalLedgerEntry: updatedGeneralLedgerEntry });
    });
};

exports.deleteGeneralLedgerEntry = function (req, res) {
    GeneralLedgerEntry.deleteGeneralLedgerEntry(req.params.entryNo, (err, result) => {
        if (err) {
            console.error('Error deleting generalLedgerEntry:', err);
            return res.status(500).json({ error: 'Failed to delete generalLedgerEntry' });
        }
        res.json({ message: 'GeneralLedgerEntry deleted successfully' });
    });
};
