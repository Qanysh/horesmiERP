const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');

router.get('/', warehouseController.getAllWarehouses);
router.get('/card/:id', warehouseController.getWarehouseById);

router.post('/create', warehouseController.createWarehouse);

router.get('/update/:id', warehouseController.getWarehouseById);
router.put('/update/:id', warehouseController.updateWarehouse);
router.delete('/delete/:id', warehouseController.deleteWarehouse);

module.exports = router;