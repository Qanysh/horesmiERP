const Warehouse = require('../models/warehouse');

exports.getAllWarehouses = async function (req, res) {
    try {
        Warehouse.getAllWarehouses((err, warehouses) => {
            if (err) {
                console.error('Error fetching warehouses:', err);
                return res.status(500).json({ error: 'Error fetching warehouses data' });
            }
            res.json(warehouses); // Send JSON data to the frontend
        });
    } catch (err) {
        console.error('Unexpected error fetching warehouses:', err);
        res.status(500).json({ error: 'Unexpected error' });
    }
};

exports.getWarehouseById = async function (req, res) {
    Warehouse.getWarehouseById([req.params.id], (err, warehouse) => {
        if (err) {
            console.error('Error fetching warehouse:', err);
            return res.status(500).json({ error: 'Error fetching warehouse' });
        }
        if (!warehouse || warehouse.length === 0) {
            return res.status(404).json({ error: 'Warehouse not found' });
        }
        res.json(warehouse[0]); // Send data of a single warehouse as JSON
    });
};

exports.createWarehouse = function (req, res) {
    const newWarehouse = {
        id: req.body.id,
        name: req.body.name,
        location: req.body.location,
        capacity: req.body.capacity,
        manager: req.body.manager,
        contact: req.body.contact
    };

    if (!newWarehouse.id || !newWarehouse.name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    Warehouse.createWarehouse(newWarehouse, (err, result) => {
        if (err) {
            console.error('Error creating warehouse:', err);
            return res.status(500).json({ error: 'Failed to create warehouse' });
        }
        res.status(201).json({ message: 'Warehouse created successfully', warehouse: newWarehouse });
    });
};

exports.updateWarehouse = function (req, res) {
    const updatedWarehouse = {
        name: req.body.name,
        location: req.body.location,
        capacity: req.body.capacity,
        manager: req.body.manager,
        contact: req.body.contact
    };

    if (!req.params.id) {
        return res.status(400).json({ error: 'Warehouse ID is missing' });
    }

    Warehouse.updateWarehouse(req.params.id, updatedWarehouse, (err, result) => {
        if (err) {
            console.error('Error updating warehouse:', err);
            return res.status(500).json({ error: 'Failed to update warehouse' });
        }
        res.json({ message: 'Warehouse updated successfully', warehouse: updatedWarehouse });
    });
};

exports.deleteWarehouse = function (req, res) {
    Warehouse.deleteWarehouse(req.params.id, (err, result) => {
        if (err) {
            console.error('Error deleting warehouse:', err);
            return res.status(500).json({ error: 'Failed to delete warehouse' });
        }
        res.json({ message: 'Warehouse deleted successfully' });
    });
};
