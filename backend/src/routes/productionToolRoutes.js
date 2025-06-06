const express = require('express');
const router = express.Router();
const productionToolController = require('../controllers/productionToolController');
const purchaseMiddleware = require('../middlewares/purchaseMiddleware');

// Get all production tools
router.get('/', productionToolController.getAllProductionTools);

// Get a single production tool by ID
router.get('/:tool_no', productionToolController.getProductionToolById);

// Create a new production tool
router.post('/create', purchaseMiddleware, productionToolController.createProductionTool);

// Update a production tool by ID
router.put('/update/:tool_no', purchaseMiddleware, productionToolController.updateProductionTool);

// Delete a production tool by ID
router.delete('/delete/:tool_no', purchaseMiddleware, productionToolController.deleteProductionTool);

module.exports = router;