const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getAllItems);
router.get('/card/:item_no', itemController.getItemById);
router.get('/:item_no', itemController.getItemById);

router.post('/create', itemController.createItem);

router.put('/update/:item_no', itemController.updateItem);

router.delete('/delete/:item_no', itemController.deleteItem);

module.exports = router;