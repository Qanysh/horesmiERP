const db = require('../../db/database');

exports.getAllWarehouses = function (callback) {
    db.query('SELECT * FROM warehouses', callback);
};

exports.getWarehouseById = function (id, callback) {
    db.query('SELECT * FROM warehouses WHERE id = ?', [id], callback);
};

exports.createWarehouse = function (newWarehouse, callback) {
    db.query('INSERT INTO warehouses SET ?;', newWarehouse, callback);
};

exports.updateWarehouse = function (id, updatedWarehouse, callback) {
    db.query('UPDATE warehouses SET ? WHERE id = ?', [updatedWarehouse, id], callback);
};

exports.deleteWarehouse = function (id, callback) {
    db.query('DELETE FROM warehouses WHERE id = ?', [id], callback);
};