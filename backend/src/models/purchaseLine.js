const db = require('../../db/database');

exports.getAllPurchaseLines = function (callback) {
    db.query('SELECT * FROM purchaseLine', callback);
};

exports.getPurchaseLineById = function (no, callback) {
    db.query('SELECT * FROM purchaseLine WHERE id = ?', [id], callback);
};
exports.getPurchaseLineByDocumentNo = function (documentNo, callback) {
    db.query('SELECT * FROM purchaseLine WHERE documentNo = ?', [documentNo], callback);
};

exports.createPurchaseLine = function (newPurchaseLine, callback) {
    db.query('INSERT INTO purchaseLine SET ?', newPurchaseLine, callback);
};

exports.updatePurchaseLine = function (no, updatedPurchaseLine, callback) {
    db.query('UPDATE purchaseLine SET ? WHERE id = ?', [updatedPurchaseLine, no], callback);
};

exports.deletePurchaseLine = function (no, callback) {
    db.query('DELETE FROM purchaseLine WHERE id = ?', [no], callback);
};