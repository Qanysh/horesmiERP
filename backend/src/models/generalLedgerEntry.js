const db = require('../../db/database');

exports.getAllGeneralLedgerEntries = function (callback) {
    db.query('SELECT * FROM generalLedgerEntry', callback);
};

exports.getGeneralLedgerEntryById = function (entryNo, callback) {
    db.query('SELECT * FROM generalLedgerEntry WHERE entryNo = ?', [entryNo], callback);
};

exports.createGeneralLedgerEntry = function (newGeneralLedgerEntry, callback) {
    db.query('INSERT INTO generalLedgerEntry SET ?;', newGeneralLedgerEntry, callback);
};

exports.updateGeneralLedgerEntry = function (entryNo, updatedGeneralLedgerEntry, callback) {
    db.query('UPDATE generalLedgerEntry SET ? WHERE entryNo = ?', [updatedGeneralLedgerEntry, entryNo], callback);
};

exports.deleteGeneralLedgerEntry = function (entryNo, callback) {
    db.query('DELETE FROM generalLedgerEntry WHERE entryNo = ?', [entryNo], callback);
};