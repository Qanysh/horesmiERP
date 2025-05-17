const db = require('../../db/database');

exports.getAllPurchaseHeaders = function (callback) {
    db.query('SELECT * FROM purchaseHeaders', callback);
};

exports.getPurchaseHeaderById = function (no, callback) {
    db.query('SELECT * FROM purchaseHeaders WHERE no = ?', [no], callback);
};

exports.createPurchaseHeader = function (newPurchaseHeader, callback) {
    db.query('INSERT INTO purchaseHeaders SET ?', newPurchaseHeader, callback);
};

exports.updatePurchaseHeader = function (no, updatedPurchaseHeader, callback) {
    db.query('UPDATE purchaseHeaders SET ? WHERE no = ?', [updatedPurchaseHeader, no], callback);
};

exports.deletePurchaseHeader = function (no, callback) {
    db.query('DELETE FROM purchaseHeaders WHERE no = ?', [no], callback);
};