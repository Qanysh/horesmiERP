const db = require('../../db/database');

exports.getAllItemLedgerEntries = function (callback) {
    db.query('SELECT * FROM itemLedgerEntry', callback);
};

exports.getItemLedgerEntryById = function (no, callback) {
    db.query('SELECT * FROM itemLedgerEntry WHERE no = ?', [no], callback);
};

exports.createItemLedgerEntry = function (newItemLedgerEntry, callback) {
    db.query('INSERT INTO itemLedgerEntry SET ?;', newItemLedgerEntry, callback);
};

exports.updateItemLedgerEntry = function (no, updatedItemLedgerEntry, callback) {
    db.query('UPDATE itemLedgerEntry SET ? WHERE no = ?', [updatedItemLedgerEntry, no], callback);
};

exports.deleteItemLedgerEntry = function (no, callback) {
    db.query('DELETE FROM itemLedgerEntry WHERE no = ?', [no], callback);
};