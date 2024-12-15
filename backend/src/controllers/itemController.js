const Item = require('../models/item');

// Получение всех записей
exports.getAllItems = async function(req, res) {
    try {
        Item.getAllItems((err, items) => {
            if (err) {
                console.error('Error fetching items:', err);
                return res.status(500).json({ error: 'Error fetching items data' });
            }
            res.json(items); // Отправляем JSON с данными
        });
    } catch (err) {
        console.error('Unexpected error fetching items:', err);
        res.status(500).json({ error: 'Unexpected error fetching items' });
    }
};

// Получение записи по ID
exports.getItemById = async function(req, res) {
    try {
        Item.getItemById(req.params.item_no, (err, item) => {
            if (err) {
                console.error('Error fetching item:', err);
                return res.status(500).json({ error: 'Error fetching item' });
            }
            if (!item || item.length === 0) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.json(item[0]); // Отправляем данные одного элемента JSON
        });
    } catch (err) {
        console.error('Unexpected error fetching item:', err);
        res.status(500).json({ error: 'Unexpected error fetching item' });
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
        return res.status(400).json({ error: 'Missing required fields' });
    }

    Item.createItem(newItem, (err, result) => {
        if (err) {
            console.error('Error creating item:', err);
            return res.status(500).json({ error: 'Failed to create item' });
        }
        res.status(201).json({ message: 'Item created successfully', item: newItem });
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
        return res.status(400).json({ error: 'Item ID is missing' });
    }

    Item.updateItem(req.params.item_no, updatedItem, (err, result) => {
        if (err) {
            console.error('Error updating item:', err);
            return res.status(500).json({ error: 'Failed to update item' });
        }
        res.json({ message: 'Item updated successfully', item: updatedItem });
    });
};

// Удаление записи
exports.deleteItem = function(req, res) {
    Item.deleteItem(req.params.item_no, (err, result) => {
        if (err) {
            console.error('Error deleting item:', err);
            return res.status(500).json({ error: 'Failed to delete item' });
        }
        res.json({ message: 'Item deleted successfully' });
    });
};
