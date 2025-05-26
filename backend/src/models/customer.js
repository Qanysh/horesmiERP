const db = require('../../db/database');

exports.getAllCustomers = function (callback) {
    db.query('SELECT * FROM customer', callback);
};

exports.getCustomerById = function (customer_no, callback) {
    db.query('SELECT * FROM customer WHERE customer_no = ?', [customer_no], callback);
};

exports.createCustomer = function (newCustomer, callback) {
    db.query('INSERT INTO customer SET ?;', newCustomer, callback);
};

exports.updateCustomer = function (customer_no, updatedCustomer, callback) {
    db.query('UPDATE customer SET ? WHERE customer_no = ?', [updatedCustomer, customer_no], callback);
};

exports.deleteCustomer = function (customer_no, callback) {
    db.query('UPDATE customer SET IsArchived = true WHERE customer_no = ?', [customer_no], callback);
};