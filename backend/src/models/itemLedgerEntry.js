const db = require('../../db/database');

exports.getAllItemLedgerEntries = function (callback) {
    db.query('SELECT * FROM itemLedgerEntries', callback);
};

exports.getItemLedgerEntryById = function (no, callback) {
    db.query('SELECT * FROM itemLedgerEntries WHERE no = ?', [no], callback);
};

exports.createItemLedgerEntry = function (newItemLedgerEntry, callback) {
    db.query('INSERT INTO itemLedgerEntries SET ?;', newItemLedgerEntry, callback);
};

exports.updateItemLedgerEntry = function (no, updatedItemLedgerEntry, callback) {
    db.query('UPDATE itemLedgerEntries SET ? WHERE no = ?', [updatedItemLedgerEntry, no], callback);
};

exports.deleteItemLedgerEntry = function (no, callback) {
    db.query('DELETE FROM itemLedgerEntries WHERE no = ?', [no], callback);
};