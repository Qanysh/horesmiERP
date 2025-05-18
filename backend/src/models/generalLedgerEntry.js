const db = require('../../db/database');

exports.getAllGeneralLedgerEntries = function (callback) {
    db.query('SELECT * FROM generalLedgerEntry', callback);
};

exports.getGeneralLedgerEntryById = function (entryNo, callback) {
    db.query('SELECT * FROM generalLedgerEntry WHERE entryNo = ?', [entryNo], callback);
};

exports.getLastEntryNo = function (callback) {
    db.query('SELECT entryNo FROM generalLedgerEntry ORDER BY entryNo DESC LIMIT 1', (err, results) => {
        if (err) return callback(err);
        if (results && results.length > 0) {
            callback(null, results[0].entryNo);
        } else {
            callback(null, 0); // Если записей нет
        }
    });
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