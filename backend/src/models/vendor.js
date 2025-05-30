const db = require('../../db/database');

exports.getAllVendors = function (callback) {
    db.query('SELECT * FROM vendor', callback);
};

exports.getVendorById = function (BIN, callback) {
    db.query('SELECT * FROM vendor WHERE BIN = ?', [BIN], callback);
};

exports.createVendor = function (newVendor, callback) {
    db.query('INSERT INTO vendor SET ?;', newVendor, callback);
};

exports.updateVendor = function (BIN, updatedVendor, callback) {
    db.query('UPDATE vendor SET ? WHERE BIN = ?', [updatedVendor, BIN], callback);
};

exports.deleteVendor = function (BIN, callback) {
    db.query('UPDATE vendor SET isArchived = true WHERE BIN = ?', [BIN], callback);
};