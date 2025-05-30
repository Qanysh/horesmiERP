const db = require('../../db/database');

// Получение всех инструментов производства
exports.getAllProductionTools = function (callback) {
    db.query('SELECT * FROM production_tool', callback);
};

// Получение инструмента производства по Tool No
exports.getProductionToolById = function (toolNo, callback) {
    db.query('SELECT * FROM production_tool WHERE tool_no = ?', [toolNo], callback);
};

// Создание нового инструмента производства
exports.createProductionTool = function (newTool, callback) {
    db.query('INSERT INTO production_tool SET ?', newTool, callback);
};

// Обновление инструмента производства по Tool No
exports.updateProductionTool = function (toolNo, updatedTool, callback) {
    db.query('UPDATE production_tool SET ? WHERE tool_no = ?', [updatedTool, toolNo], callback);
};

// Архивация инструмента производства по Tool No
exports.deleteProductionTool = function (toolNo, callback) {
    db.query('UPDATE production_tool SET isArchived = true WHERE tool_no = ?', [toolNo], callback);
};
