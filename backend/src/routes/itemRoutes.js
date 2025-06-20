const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const purchaseMiddleware = require('../middlewares/purchaseMiddleware');

router.get('/', itemController.getAllItems);
router.get('/card/:item_no', itemController.getItemById);
router.get('/:item_no', itemController.getItemById);

router.post('/create', purchaseMiddleware, itemController.createItem);

router.put('/update/:item_no', purchaseMiddleware, itemController.updateItem);

router.delete('/delete/:item_no', purchaseMiddleware, itemController.deleteItem);

module.exports = router;