const db = require('../../db/database');

exports.getAllUsers = function (callback) {
    db.query('SELECT * FROM users', callback);
};

exports.getUserById = function (id, callback) {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
};

exports.getUserByUsername = function (username, callback) {
    db.query('SELECT * FROM users WHERE username = ?', [username], callback);
};
exports.getUserByEmail = function (email, callback) {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

exports.createUser = function (newUser, callback) {
    db.query('INSERT INTO users SET ?;', newUser, callback);
};

exports.updateUser = function (id, updatedUser, callback) {
    db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id], callback);
};

exports.deleteUser = function (id, callback) {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
};