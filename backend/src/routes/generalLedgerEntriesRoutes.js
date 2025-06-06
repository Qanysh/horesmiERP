const express = require('express');
const router = express.Router();
const generalLedgerEntryController = require('../controllers/generalLedgerEntryController');
const managerMiddleware = require('../middlewares/managerMiddleware');

router.get('/', managerMiddleware, generalLedgerEntryController.getAllGeneralLedgerEntries);
router.get('/card/:no', managerMiddleware, generalLedgerEntryController.getGeneralLedgerEntryById);

router.post('/create', managerMiddleware, generalLedgerEntryController.createGeneralLedgerEntry);

router.get('/update/:no', managerMiddleware, generalLedgerEntryController.getGeneralLedgerEntryById);
router.put('/update/:no', managerMiddleware, generalLedgerEntryController.updateGeneralLedgerEntry);
router.delete('/delete/:no', managerMiddleware, generalLedgerEntryController.deleteGeneralLedgerEntry);

module.exports = router;