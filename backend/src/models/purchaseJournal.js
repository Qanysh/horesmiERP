const db = require('../../db/database');

exports.getAllPurchaseJournals = function (callback) {
    db.query('SELECT * FROM purchaseJournal', callback);
};

exports.getPurchaseJournalById = function (id, callback) {
    db.query('SELECT * FROM purchaseJournal WHERE id = ?', [id], callback);
};

exports.createPurchaseJournal = function (newPurchaseJournal, callback) {
    db.query('INSERT INTO purchaseJournal SET ?', newPurchaseJournal, callback);
};

exports.updatePurchaseJournal = function (id, updatedPurchaseJournal, callback) {
    db.query('UPDATE purchaseJournal SET ? WHERE id = ?', [updatedPurchaseJournal, id], callback);
};

exports.deletePurchaseJournal = function (id, callback) {
    db.query('UPDATE purchaseJournal SET IsArchived = true WHERE id = ?', [id], callback);
};