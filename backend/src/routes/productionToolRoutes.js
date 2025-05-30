const express = require('express');
const router = express.Router();
const productionToolController = require('../controllers/productionToolController');

// Get all production tools
router.get('/', productionToolController.getAllProductionTools);

// Get a single production tool by ID
router.get('/:tool_no', productionToolController.getProductionToolById);

// Create a new production tool
router.post('/create', productionToolController.createProductionTool);

// Update a production tool by ID
router.put('/update/:tool_no', productionToolController.updateProductionTool);

// Delete a production tool by ID
router.delete('/delete/:tool_no', productionToolController.deleteProductionTool);

module.exports = router;