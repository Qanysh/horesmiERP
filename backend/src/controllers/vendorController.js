const Vendor = require('../models/vendor');

exports.getAllVendors = async function (req, res) {
    try {
        Vendor.getAllVendors((err, vendors) => {
            if (err) {
                console.error('Error fetching vendors:', err);
                return res.status(500).json({ error: 'Error fetching vendors data' });
            }
            res.json(vendors); // Отправляем данные JSON на фронтенд
        });
    } catch (err) {
        console.error('Unexpected error fetching vendors:', err);
        res.status(500).json({ error: 'Unexpected error' });
    }
};

exports.getVendorById = async function (req, res) {
    Vendor.getVendorById([req.params.BIN], (err, vendorCard) => {
        if (err) {
            console.error('Error fetching vendor:', err);
            return res.status(500).json({ error: 'Error fetching vendor' });
        }
        if (!vendorCard || vendorCard.length === 0) {
            return res.status(404).json({ error: 'Vendor not found' });
        }
        res.json(vendorCard[0]); // Отправляем данные одного клиента JSON
    });
};

exports.createVendor = function (req, res) {
    const newVendor = {
        BIN: req.body.BIN,
        name: req.body.name,
        name2: req.body.name2,
        responsibilityCenter: req.body.responsibilityCenter,
        locationCode: req.body.locationCode,
        postCode: req.body.postCode,
        countryRegionCode: req.body.countryRegionCode,
        phoneNo: req.body.phoneNo,
        faxNo: req.body.faxNo,
        icPartnerCode: req.body.icPartnerCode,
        contact: req.body.contact,
        purchaserCode: req.body.purchaserCode,
        vendorPostingGroup: req.body.vendorPostingGroup,
        allowMultiplePostingGroups: req.body.allowMultiplePostingGroups,
        genBusPostingGroup: req.body.genBusPostingGroup,
        vatBusPostingGroup: req.body.vatBusPostingGroup,
        paymentTermsCode: req.body.paymentTermsCode,
        finChargeTermsCode: req.body.finChargeTermsCode,
        currencyCode: req.body.currencyCode,
        languageCode: req.body.languageCode,
        searchName: req.body.searchName,
        blocked: req.body.blocked,
        privacyBlocked: req.body.privacyBlocked,
        lastDateModified: req.body.lastDateModified,
        applicationMethod: req.body.applicationMethod,
        locationCode2: req.body.locationCode2,
        shipmentMethodCode: req.body.shipmentMethodCode,
        leadTimeCalculation: req.body.leadTimeCalculation,
        baseCalendarCode: req.body.baseCalendarCode,
        balanceLcy: req.body.balanceLcy,
        balanceDueLcy: req.body.balanceDueLcy,
        paymentsLcy: req.body.paymentsLcy,
        created_at: new Date(),
        updated_at: new Date()
    };


    if (!newVendor.BIN || !newVendor.name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    Vendor.createVendor(newVendor, (err, result) => {
        if (err) {
            console.error('Error creating vendor:', err);
            return res.status(500).json({ error: 'Failed to create vendor' });
        }
        res.status(201).json({ message: 'Vendor created successfully', vendor: newVendor });
    });
};

exports.updateVendor = function (req, res) {
    const updatedVendor = {
        BIN: req.body.BIN,
        name: req.body.name,
        name2: req.body.name2,
        responsibilityCenter: req.body.responsibilityCenter,
        locationCode: req.body.locationCode,
        postCode: req.body.postCode,
        countryRegionCode: req.body.countryRegionCode,
        phoneNo: req.body.phoneNo,
        faxNo: req.body.faxNo,
        icPartnerCode: req.body.icPartnerCode,
        contact: req.body.contact,
        purchaserCode: req.body.purchaserCode,
        vendorPostingGroup: req.body.vendorPostingGroup,
        allowMultiplePostingGroups: req.body.allowMultiplePostingGroups,
        genBusPostingGroup: req.body.genBusPostingGroup,
        vatBusPostingGroup: req.body.vatBusPostingGroup,
        paymentTermsCode: req.body.paymentTermsCode,
        finChargeTermsCode: req.body.finChargeTermsCode,
        currencyCode: req.body.currencyCode,
        languageCode: req.body.languageCode,
        searchName: req.body.searchName,
        blocked: req.body.blocked,
        privacyBlocked: req.body.privacyBlocked,
        lastDateModified: req.body.lastDateModified,
        applicationMethod: req.body.applicationMethod,
        locationCode2: req.body.locationCode2,
        shipmentMethodCode: req.body.shipmentMethodCode,
        leadTimeCalculation: req.body.leadTimeCalculation,
        baseCalendarCode: req.body.baseCalendarCode,
        balanceLcy: req.body.balanceLcy,
        balanceDueLcy: req.body.balanceDueLcy,
        paymentsLcy: req.body.paymentsLcy,
        updated_at: new Date()
    };

    if (!req.params.BIN) {
        return res.status(400).json({ error: 'Vendor ID is missing' });
    }

    Vendor.updateVendor(req.params.BIN, updatedVendor, (err, result) => {
        if (err) {
            console.error('Error updating vendor:', err);
            return res.status(500).json({ error: 'Failed to update vendor' });
        }
        res.json({ message: 'Vendor updated successfully', vendor: updatedVendor });
    });
};

exports.deleteVendor = function (req, res) {
    Vendor.deleteVendor(req.params.BIN, (err, result) => {
        if (err) {
            console.error('Error deleting vendor:', err);
            return res.status(500).json({ error: 'Failed to delete vendor' });
        }
        res.json({ message: 'Vendor deleted successfully' });
    });
};

exports.createManyVendors = function (req, res) {
    const vendors = req.body; // Ожидается массив объектов vendor

    if (!Array.isArray(vendors) || vendors.length === 0) {
        return res.status(400).json({ error: 'Request body must be a non-empty array' });
    }

    let created = [];
    let errors = [];

    Promise.all(vendors.map(vendor => {
        return new Promise((resolve) => {
            if (!vendor.BIN || !vendor.name) {
                errors.push({ vendor, error: 'Missing required fields' });
                return resolve();
            }
            Vendor.createVendor(
                {
                    ...vendor,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                (err, result) => {
                    if (err) {
                        errors.push({ vendor, error: err.message });
                    } else {
                        created.push(vendor);
                    }
                    resolve();
                }
            );
        });
    })).then(() => {
        res.status(201).json({
            message: 'Batch vendor creation finished',
            created,
            errors
        });
    });
};
