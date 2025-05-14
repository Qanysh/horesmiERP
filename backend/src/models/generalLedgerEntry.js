const db = require('../../db/database');

exports.getAllGeneralLedgerEntries = function (callback) {
    db.query('SELECT * FROM generalLedgerEntries', callback);
};

exports.getGeneralLedgerEntryById = function (id, callback) {
    db.query('SELECT * FROM generalLedgerEntries WHERE id = ?', [id], callback);
};

exports.createGeneralLedgerEntry = function (newGeneralLedgerEntry, callback) {
    db.query('INSERT INTO generalLedgerEntries SET ?;', newGeneralLedgerEntry, callback);
};

exports.updateGeneralLedgerEntry = function (id, updatedGeneralLedgerEntry, callback) {
    db.query('UPDATE generalLedgerEntries SET ? WHERE id = ?', [updatedGeneralLedgerEntry, id], callback);
};

exports.deleteGeneralLedgerEntry = function (id, callback) {
    db.query('DELETE FROM generalLedgerEntries WHERE id = ?', [id], callback);
};