const db = require('../../db/database');

exports.getAllSalesLines = function (callback) {
    db.query('SELECT * FROM salesLine', callback);
};

exports.getSalesLineById = function (id, callback) {
    db.query('SELECT * FROM salesLine WHERE id = ?', [id], callback);
};

exports.getSalesLineByDocumentNo = function (documentNo, callback) {
    db.query('SELECT * FROM salesLine WHERE documentNo = ?', [documentNo], callback);
};

exports.createSalesLine = function (newSalesLine, callback) {
    db.query('INSERT INTO salesLine SET ?', newSalesLine, callback);
};

exports.updateSalesLine = function (id, updatedSalesLine, callback) {
    db.query('UPDATE salesLine SET ? WHERE id = ?', [updatedSalesLine, id], callback);
};

exports.deleteSalesLine = function (id, callback) {
    db.query('DELETE FROM salesLine WHERE id = ?', [id], callback);
};