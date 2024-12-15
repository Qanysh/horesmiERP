const db = require('../../db/database');

// Получение всех элементов
exports.getAllItems = function(callback) {
    db.query('SELECT * FROM items', callback);
};

// Получение элемента по Item No
exports.getItemById = function(itemNo, callback) {
    db.query('SELECT * FROM items WHERE item_no = ?', [itemNo], callback);
};

// Создание нового элемента
exports.createItem = function(newItem, callback) {
    db.query('INSERT INTO items SET ?', newItem, callback);
};

// Обновление элемента по Item No
exports.updateItem = function(itemNo, updatedItem, callback) {
    db.query('UPDATE items SET ? WHERE item_no = ?', [updatedItem, itemNo], callback);
};

// Удаление элемента по Item No
exports.deleteItem = function(itemNo, callback) {
    db.query('DELETE FROM items WHERE item_no = ?', [itemNo], callback);
};
