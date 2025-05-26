const db = require('../../db/database');

exports.getAllSalesLines = function (callback) {
    db.query('SELECT * FROM salesLine', callback);
};

exports.getSalesLineById = function (no, callback) {
    db.query('SELECT * FROM salesLine WHERE no = ?', [no], callback);
};

exports.getSalesLineByDocumentNo = function (documentNo, callback) {
    db.query('SELECT * FROM salesLine WHERE documentNo = ?', [documentNo], callback);
};

exports.createSalesLine = function (newSalesLine, callback) {
    db.query('INSERT INTO salesLine SET ?', newSalesLine, callback);
};

exports.updateSalesLine = function (no, updatedSalesLine, callback) {
    db.query('UPDATE salesLine SET ? WHERE no = ?', [updatedSalesLine, no], callback);
};

exports.deleteSalesLine = function (no, callback) {
    db.query('UPDATE salesLine SET IsArchived = true WHERE no = ?', [no], callback);
};