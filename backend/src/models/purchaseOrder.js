const db = require('../../db/database');

exports.getAllPurchaseOrders = function (callback) {
    db.query('SELECT * FROM purchaseOrder', callback);
};

exports.getPurchaseOrderById = function (no, callback) {
    db.query('SELECT * FROM purchaseOrder WHERE no = ?', [no], callback);
};

exports.createPurchaseOrder = function (newPurchaseOrder, callback) {
    db.query('INSERT INTO purchaseOrder SET ?;', newPurchaseOrder, callback);
};

exports.updatePurchaseOrder = function (no, updatedPurchaseOrder, callback) {
    db.query('UPDATE purchaseOrder SET ? WHERE no = ?', [updatedPurchaseOrder, no], callback);
};

exports.deletePurchaseOrder = function (no, callback) {
    db.query('UPDATE purchaseOrder SET isArchived = true WHERE no = ?', [no], callback);
};