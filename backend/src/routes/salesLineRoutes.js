const express = require('express');
const router = express.Router();
const salesLineController = require('../controllers/salesLineController');
const salesMiddleware = require('../middlewares/salesMiddleware');

router.get('/', salesLineController.getAllSalesLines);
router.get('/card/:id', salesLineController.getSalesLineById);
router.get('/byDocumentNo/:documentNo', salesLineController.getSalesLineByDocumentNoForRouter);

router.post('/create', salesMiddleware, salesLineController.createSalesLine);

router.get('/update/:id', salesMiddleware, salesLineController.getSalesLineById);
router.put('/update/:id', salesMiddleware, salesLineController.updateSalesLine);
router.delete('/delete/:id', salesMiddleware, salesLineController.deleteSalesLine);

module.exports = router;