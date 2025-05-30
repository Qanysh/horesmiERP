const db = require('../../db/database');

// Получение всех продуктов
exports.getAllProducts = function (callback) {
    db.query('SELECT * FROM product', callback);
};

// Получение продукта по Product No
exports.getProductById = function (productNo, callback) {
    db.query('SELECT * FROM product WHERE product_no = ?', [productNo], callback);
};

// Создание нового продукта
exports.createProduct = function (newProduct, callback) {
    db.query('INSERT INTO product SET ?', newProduct, callback);
};

// Обновление продукта по Product No
exports.updateProduct = function (productNo, updatedProduct, callback) {
    db.query('UPDATE product SET ? WHERE product_no = ?', [updatedProduct, productNo], callback);
};

// Архивация продукта по Product No
exports.deleteProduct = function (productNo, callback) {
    db.query('UPDATE product SET isArchived = true WHERE product_no = ?', [productNo], callback);
};
