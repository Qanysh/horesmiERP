const db = require('../../db/database');

// Получение всех элементов
exports.getAllItems = function (callback) {
    db.query('SELECT * FROM item', callback);
};

// Получение элемента по Item No
exports.getItemById = function (itemNo, callback) {
    db.query('SELECT * FROM item WHERE item_no = ?', [itemNo], callback);
};

// Создание нового элемента
exports.createItem = function (newItem, callback) {
    db.query('INSERT INTO item SET ?', newItem, callback);
};

// Обновление элемента по Item No
exports.updateItem = function (itemNo, updatedItem, callback) {
    db.query('UPDATE item SET ? WHERE item_no = ?', [updatedItem, itemNo], callback);
};

// Удаление элемента по Item No
exports.deleteItem = function (itemNo, callback) {
    db.query('UPDATE item SET isArchived = true WHERE item_no = ?', [itemNo], callback);
};
