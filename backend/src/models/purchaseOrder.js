const db = require('../../db/database');

exports.getAllPurchaseOrders = function (callback) {
    db.query('SELECT * FROM purchaseOrders', callback);
};

exports.getPurchaseOrderById = function (id, callback) {
    db.query('SELECT * FROM purchaseOrders WHERE id = ?', [id], callback);
};

exports.createPurchaseOrder = function (newPurchaseOrder, callback) {
    db.query('INSERT INTO purchaseOrders SET ?;', newPurchaseOrder, callback);
};

exports.updatePurchaseOrder = function (id, updatedPurchaseOrder, callback) {
    db.query('UPDATE purchaseOrders SET ? WHERE id = ?', [updatedPurchaseOrder, id], callback);
};

exports.deletePurchaseOrder = function (id, callback) {
    db.query('DELETE FROM purchaseOrders WHERE id = ?', [id], callback);
};