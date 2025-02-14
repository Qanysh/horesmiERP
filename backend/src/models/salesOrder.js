const db = require('../../db/database');

exports.getAllSalesOrders = function (callback) {
    db.query('SELECT * FROM salesOrders', callback);
};

exports.getSalesOrderById = function (id, callback) {
    db.query('SELECT * FROM salesOrders WHERE id = ?', [id], callback);
};

exports.createSalesOrder = function (newSalesOrder, callback) {
    db.query('INSERT INTO salesOrders SET ?;', newSalesOrder, callback);
};

exports.updateSalesOrder = function (id, updatedSalesOrder, callback) {
    db.query('UPDATE salesOrders SET ? WHERE id = ?', [updatedSalesOrder, id], callback);
};

exports.deleteSalesOrder = function (id, callback) {
    db.query('DELETE FROM salesOrders WHERE id = ?', [id], callback);
};