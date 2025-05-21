const db = require('../../db/database');

exports.getAllSalesOrders = function (callback) {
    db.query('SELECT * FROM salesOrder', callback);
};

exports.getSalesOrderById = function (no, callback) {
    db.query('SELECT * FROM salesOrder WHERE no = ?', [no], callback);
};

exports.createSalesOrder = function (newSalesOrder, callback) {
    db.query('INSERT INTO salesOrder SET ?;', newSalesOrder, callback);
};

exports.updateSalesOrder = function (no, updatedSalesOrder, callback) {
    db.query('UPDATE salesOrder SET ? WHERE no = ?', [updatedSalesOrder, no], callback);
};

exports.deleteSalesOrder = function (no, callback) {
    db.query('DELETE FROM salesOrder WHERE no = ?', [no], callback);
};