const express = require('express');
const router = express.Router();
const purchaseJournalController = require('../controllers/purchaseJournalController');

router.get('/', purchaseJournalController.getAllPurchaseJournals);
router.get('/card/:no', purchaseJournalController.getPurchaseJournalById);

router.post('/create', purchaseJournalController.createPurchaseJournal);

router.get('/update/:no', purchaseJournalController.getPurchaseJournalById);
router.put('/update/:no', purchaseJournalController.updatePurchaseJournal);
router.delete('/delete/:no', purchaseJournalController.deletePurchaseJournal);

module.exports = router;