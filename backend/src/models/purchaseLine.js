const db = require('../../db/database');

exports.getAllPurchaseLines = function (callback) {
    db.query('SELECT * FROM purchaseLine', callback);
};

exports.getPurchaseLineById = function (id, callback) {
    db.query('SELECT * FROM purchaseLine WHERE id = ?', [id], callback);
};
exports.getPurchaseLineByDocumentNo = function (documentNo, callback) {
    db.query('SELECT * FROM purchaseLine WHERE documentNo = ?', [documentNo], callback);
};

exports.createPurchaseLine = function (newPurchaseLine, callback) {
    db.query('INSERT INTO purchaseLine SET ?', newPurchaseLine, callback);
};

exports.updatePurchaseLine = function (id, updatedPurchaseLine, callback) {
    db.query('UPDATE purchaseLine SET ? WHERE id = ?', [updatedPurchaseLine, id], callback);
};

exports.deletePurchaseLine = function (id, callback) {
    db.query('UPDATE purchaseLine SET isArchived = true WHERE id = ?', [id], callback);
};