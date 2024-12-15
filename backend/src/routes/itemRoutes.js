const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Получить все товары
router.get('/', itemController.getAllItems);

// Получить карточку товара по идентификатору (Item No)
router.get('/card/:item_no', itemController.getItemById);

// Отобразить форму для создания нового товара
router.get('/create', (req, res) => {
    res.render('ItemCard', { item: {} }); // Передаем пустой объект для формы
});

// Создать новый товар
router.post('/create', itemController.createItem);

// Отобразить форму для обновления существующего товара
router.get('/update/:item_no', itemController.getItemById);

// Обновить существующий товар
router.post('/update/:item_no', itemController.updateItem);

// Удалить товар
router.post('/delete/:item_no', itemController.deleteItem);

module.exports = router;