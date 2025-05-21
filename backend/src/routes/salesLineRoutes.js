const express = require('express');
const router = express.Router();
const salesLineController = require('../controllers/salesLineController');

router.get('/', salesLineController.getAllSalesLines);
router.get('/card/:id', salesLineController.getSalesLineById);
router.get('/byDocumentNo/:documentNo', salesLineController.getSalesLineByDocumentNoForRouter);

router.post('/create', salesLineController.createSalesLine);

router.get('/update/:id', salesLineController.getSalesLineById);
router.put('/update/:id', salesLineController.updateSalesLine);
router.delete('/delete/:id', salesLineController.deleteSalesLine);

module.exports = router;