const express = require('express');
const router = express.Router();
const itemLedgerEntryController = require('../controllers/itemLedgerEntryController');

router.get('/', itemLedgerEntryController.getAllItemLedgerEntries);
router.get('/card/:no', itemLedgerEntryController.getItemLedgerEntryById);

router.post('/create', itemLedgerEntryController.createItemLedgerEntry);

router.get('/update/:no', itemLedgerEntryController.getItemLedgerEntryById);
router.put('/update/:no', itemLedgerEntryController.updateItemLedgerEntry);
router.delete('/delete/:no', itemLedgerEntryController.deleteItemLedgerEntry);

module.exports = router;