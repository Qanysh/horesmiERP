const db = require('../../db/database');

exports.getAllWarehouses = function (callback) {
    db.query('SELECT * FROM warehouse', callback);
};

exports.getWarehouseById = function (locationCode, callback) {
    db.query('SELECT * FROM warehouse WHERE locationCode = ?', [locationCode], callback);
};

exports.createWarehouse = function (newWarehouse, callback) {
    db.query('INSERT INTO warehouse SET ?;', newWarehouse, callback);
};

exports.updateWarehouse = function (id, updatedWarehouse, callback) {
    db.query('UPDATE warehouse SET ? WHERE locationCode = ?', [updatedWarehouse, locationCode], callback);
};

exports.deleteWarehouse = function (id, callback) {
    db.query('DELETE FROM warehouse WHERE locationCode = ?', [locationCode], callback);
};