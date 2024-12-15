const Item = require('../models/item');

// Получение всех записей
exports.getAllItems = async function(req, res) {
    try {
        Item.getAllItems((err, items) => {
            res.render('items', { items });
        });
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).send('Error fetching items data');
    }
};

// Получение записи по ID
exports.getItemById = async function(req, res) {
    try {
        Item.getItemById(req.params.item_no, (err, item) => {
            if (err || !item) {
                console.error('Error fetching item:', err);
                return res.status(400).send('Item not found');
            }
            res.render('itemCard', { item: item[0] });
        });
    } catch (err) {
        console.error('Error fetching item:', err);
        res.status(500).send('Error fetching item');
    }
};

// Создание новой записи
exports.createItem = function(req, res) {
    const newItem = {
        item_no: req.body.item_no,
        item_type: req.body.item_type,
        description: req.body.description,
        item_category_code: req.body.item_category_code,
        size: req.body.size,
        weight: req.body.weight,
        quantity: req.body.quantity,
        unit_cost: req.body.unit_cost,
        price: req.body.price
    };

    if (!newItem.item_type || !newItem.description) {
        return res.status(400).send('Missing required fields');
    }

    Item.createItem(newItem, (err, result) => {
        if (err) {
            console.error('Error creating item:', err);
            return res.status(500).send('Failed to create item');
        }
        res.redirect('/items');
    });
};

// Обновление записи
exports.updateItem = function(req, res) {
    const updatedItem = {
        item_type: req.body.item_type,
        description: req.body.description,
        item_category_code: req.body.item_category_code,
        size: req.body.size,
        weight: req.body.weight,
        quantity: req.body.quantity,
        unit_cost: req.body.unit_cost,
        price: req.body.price
    };

    if (!req.params.item_no) {
        return res.status(400).send('Item ID is missing');
    }

    Item.updateItem(req.params.item_no, updatedItem, (err, result) => {
        if (err) {
            console.error('Error updating item:', err);
            return res.status(500).send('Failed to update item');
        }
        res.redirect('/items');
    });
};

// Удаление записи
exports.deleteItem = function(req, res) {
    Item.deleteItem(req.params.item_no, (err, result) => {
        if (err) {
            console.error('Error deleting item:', err);
            return res.status(500).send('Failed to delete item');
        }
        res.redirect('/items');
    });
};
