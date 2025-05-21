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
    Warehouse.getWarehouseById([req.params.locationCode], (err, warehouse) => {
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
        locationCode: req.body.locationCode,
        name: req.body.name,
        address: req.body.address,
        address2: req.body.address2,
        city: req.body.city,
        country: req.body.country,
        postCode: req.body.postCode,
        countryRegionCode: req.body.countryRegionCode,
        phoneNo: req.body.phoneNo,
        contact: req.body.contact,
        email: req.body.email,
        responsibilityCenter: req.body.responsibilityCenter,
        shipmentMethodCode: req.body.shipmentMethodCode,
        baseCalendarCode: req.body.baseCalendarCode,
        blocked: req.body.blocked,
        lastDateModified: req.body.lastDateModified,
        created_at: new Date(),
        updated_at: new Date()
    };


    if (!newWarehouse.locationCode || !newWarehouse.name) {
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
        locationCode: req.body.locationCode,
        name: req.body.name,
        address: req.body.address,
        address2: req.body.address2,
        city: req.body.city,
        county: req.body.county,
        postCode: req.body.postCode,
        countryRegionCode: req.body.countryRegionCode,
        phoneNo: req.body.phoneNo,
        contact: req.body.contact,
        email: req.body.email,
        responsibilityCenter: req.body.responsibilityCenter,
        shipmentMethodCode: req.body.shipmentMethodCode,
        baseCalendarCode: req.body.baseCalendarCode,
        blocked: req.body.blocked,
        lastDateModified: req.body.lastDateModified,
        created_at: req.body.created_at,
        updated_at: new Date()
    };

    if (!req.params.locationCode) {
        return res.status(400).json({ error: 'Warehouse locationCode is missing' });
    }

    Warehouse.updateWarehouse(req.params.locationCode, updatedWarehouse, (err, result) => {
        if (err) {
            console.error('Error updating warehouse:', err);
            return res.status(500).json({ error: 'Failed to update warehouse' });
        }
        res.json({ message: 'Warehouse updated successfully', warehouse: updatedWarehouse });
    });
};

exports.deleteWarehouse = function (req, res) {
    Warehouse.deleteWarehouse(req.params.locationCode, (err, result) => {
        if (err) {
            console.error('Error deleting warehouse:', err);
            return res.status(500).json({ error: 'Failed to delete warehouse' });
        }
        res.json({ message: 'Warehouse deleted successfully' });
    });
};
