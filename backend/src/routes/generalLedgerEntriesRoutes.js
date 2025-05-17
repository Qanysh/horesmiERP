const express = require('express');
const router = express.Router();
const generalLedgerEntryController = require('../controllers/generalLedgerEntryController');

router.get('/', generalLedgerEntryController.getAllGeneralLedgerEntries);
router.get('/card/:no', generalLedgerEntryController.getGeneralLedgerEntryById);

router.post('/create', generalLedgerEntryController.createGeneralLedgerEntry);

router.get('/update/:no', generalLedgerEntryController.getGeneralLedgerEntryById);
router.put('/update/:no', generalLedgerEntryController.updateGeneralLedgerEntry);
router.delete('/delete/:no', generalLedgerEntryController.deleteGeneralLedgerEntry);

module.exports = router;