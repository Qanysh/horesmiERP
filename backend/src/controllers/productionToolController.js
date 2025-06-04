const ProductionTool = require('../models/productionTool');

// Получение всех записей
exports.getAllProductionTools = async function (req, res) {
    try {
        ProductionTool.getAllProductionTools((err, productionTools) => {
            if (err) {
                console.error('Error fetching production tools:', err);
                return res.status(500).json({ error: 'Error fetching production tools data' });
            }
            res.json(productionTools);
        });
    } catch (err) {
        console.error('Unexpected error fetching production tools:', err);
        res.status(500).json({ error: 'Unexpected error fetching production tools' });
    }
};

// Получение записи по ID
exports.getProductionToolById = async function (req, res) {
    try {
        ProductionTool.getProductionToolById(req.params.tool_no, (err, productionTool) => {
            if (err) {
                console.error('Error fetching production tool:', err);
                return res.status(500).json({ error: 'Error fetching production tool' });
            }
            if (!productionTool || productionTool.length === 0) {
                return res.status(404).json({ error: 'Production tool not found' });
            }
            res.json(productionTool[0]);
        });
    } catch (err) {
        console.error('Unexpected error fetching production tool:', err);
        res.status(500).json({ error: 'Unexpected error fetching production tool' });
    }
};

// Создание новой записи
exports.createProductionTool = function (req, res) {
    const newProductionTool = {
        tool_no: req.body.tool_no,
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        locationCode: req.body.locationCode,
        status: req.body.status,
        isArchived: req.body.isArchived || false,
        created_at: new Date(),
        updated_at: new Date()
    };

    if (!newProductionTool.type || !newProductionTool.name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    ProductionTool.createProductionTool(newProductionTool, (err, result) => {
        if (err) {
            console.error('Error creating production tool:', err);
            return res.status(500).json({ error: 'Failed to create production tool' });
        }
        res.status(201).json({ message: 'Production tool created successfully', productionTool: newProductionTool });
    });
};

// Обновление записи
exports.updateProductionTool = function (req, res) {
    const updatedProductionTool = {
        tool_no: req.body.tool_no,
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        locationCode: req.body.locationCode,
        status: req.body.status,
        isArchived: req.body.isArchived || false,
        updated_at: new Date()
    };

    if (!req.params.tool_no) {
        return res.status(400).json({ error: 'Tool ID is missing' });
    }

    ProductionTool.updateProductionTool(req.params.tool_no, updatedProductionTool, (err, result) => {
        if (err) {
            console.error('Error updating production tool:', err);
            return res.status(500).json({ error: 'Failed to update production tool' });
        }
        res.json({ message: 'Production tool updated successfully', productionTool: updatedProductionTool });
    });
};

// Удаление записи
exports.deleteProductionTool = function (req, res) {
    ProductionTool.deleteProductionTool(req.params.tool_no, (err, result) => {
        if (err) {
            console.error('Error deleting production tool:', err);
            return res.status(500).json({ error: 'Failed to delete production tool' });
        }
        res.json({ message: 'Production tool deleted successfully' });
    });
};
