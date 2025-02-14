const db = require('../../db/database');

exports.getAllVendors = function (callback) {
    db.query('SELECT * FROM vendors', callback);
};

exports.getVendorById = function (no, callback) {
    db.query('SELECT * FROM vendors WHERE no = ?', [no], callback);
};

exports.createVendor = function (newVendor, callback) {
    db.query('INSERT INTO vendors SET ?;', newVendor, callback);
};

exports.updateVendor = function (no, updatedVendor, callback) {
    db.query('UPDATE vendors SET ? WHERE no = ?', [updatedVendor, no], callback);
};

exports.deleteVendor = function (no, callback) {
    db.query('DELETE FROM vendors WHERE no = ?', [no], callback);
};