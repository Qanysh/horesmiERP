const db = require('../../db/database');

exports.getAllVendors = function (callback) {
    db.query('SELECT * FROM vendor', callback);
};

exports.getVendorById = function (vendorNo, callback) {
    db.query('SELECT * FROM vendor WHERE vendorNo = ?', [vendorNo], callback);
};

exports.createVendor = function (newVendor, callback) {
    db.query('INSERT INTO vendor SET ?;', newVendor, callback);
};

exports.updateVendor = function (vendorNo, updatedVendor, callback) {
    db.query('UPDATE vendor SET ? WHERE vendorNo = ?', [updatedVendor, vendorNo], callback);
};

exports.deleteVendor = function (vendorNo, callback) {
    db.query('DELETE FROM vendor WHERE vendorNo = ?', [vendorNo], callback);
};