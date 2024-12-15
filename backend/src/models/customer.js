const db = require('../../db/database');

exports.getAllCustomers = function(callback){
    db.query('SELECT * FROM customers', callback);
};

exports.getCustomerById = function(no, callback){
    db.query('SELECT * FROM customers WHERE no = ?', [no], callback);
};

exports.createCustomer = function(newCustomer, callback){
    db.query('INSERT INTO customers SET ?;', newCustomer, callback);
};

exports.updateCustomer = function(no, updatedCustomer, callback){
    db.query('UPDATE customers SET ? WHERE no = ?', [updatedCustomer, no], callback);
};

exports.deleteCustomer = function(no, callback){
    db.query('DELETE FROM customers WHERE no = ?', [no], callback);
};