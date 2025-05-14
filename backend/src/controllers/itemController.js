const Item = require('../models/item');

// Получение всех записей
exports.getAllItems = async function (req, res) {
    try {
        Item.getAllItems((err, items) => {
            if (err) {
                console.error('Error fetching items:', err);
                return res.status(500).json({ error: 'Error fetching items data' });
            }
            res.json(items); // Отправляем JSON с данными
        });
    } catch (err) {
        console.error('Unexpected error fetching items:', err);
        res.status(500).json({ error: 'Unexpected error fetching items' });
    }
};

// Получение записи по ID
exports.getItemById = async function (req, res) {
    try {
        Item.getItemById(req.params.item_no, (err, item) => {
            if (err) {
                console.error('Error fetching item:', err);
                return res.status(500).json({ error: 'Error fetching item' });
            }
            if (!item || item.length === 0) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.json(item[0]); // Отправляем данные одного элемента JSON
        });
    } catch (err) {
        console.error('Unexpected error fetching item:', err);
        res.status(500).json({ error: 'Unexpected error fetching item' });
    }
};

// Создание новой записи
exports.createItem = function (req, res) {
    const newItem = {
        item_no: req.body.item_no,
        description: req.body.description,
        description2: req.body.description2,
        type: req.body.type,
        inventory: req.body.inventory,
        createdFromNonstockItem: req.body.createdFromNonstockItem,
        substitutesExist: req.body.substitutesExist,
        stockkeepingUnitExists: req.body.stockkeepingUnitExists,
        assemblyBOM: req.body.assemblyBOM,
        productionBOMNo: req.body.productionBOMNo,
        routingNo: req.body.routingNo,
        baseUnitOfMeasure: req.body.baseUnitOfMeasure,
        shelfNo: req.body.shelfNo,
        costingMethod: req.body.costingMethod,
        costIsAdjusted: req.body.costIsAdjusted,
        standardCost: req.body.standardCost,
        unitCost: req.body.unitCost,
        lastDirectCost: req.body.lastDirectCost,
        priceProfitCalculation: req.body.priceProfitCalculation,
        profitPercent: req.body.profitPercent,
        unitPrice: req.body.unitPrice,
        inventoryPostingGroup: req.body.inventoryPostingGroup,
        genProdPostingGroup: req.body.genProdPostingGroup,
        vatProdPostingGroup: req.body.vatProdPostingGroup,
        itemDiscGroup: req.body.itemDiscGroup,
        vendorNo: req.body.vendorNo,
        vendorItemNo: req.body.vendorItemNo,
        tariffNo: req.body.tariffNo,
        searchDescription: req.body.searchDescription,
        overheadRate: req.body.overheadRate,
        indirectCostPercent: req.body.indirectCostPercent,
        itemCategoryCode: req.body.itemCategoryCode,
        blocked: req.body.blocked,
        lastDateModified: req.body.lastDateModified,
        salesUnitOfMeasure: req.body.salesUnitOfMeasure,
        replenishmentSystem: req.body.replenishmentSystem,
        purchUnitOfMeasure: req.body.purchUnitOfMeasure,
        leadTimeCalculation: req.body.leadTimeCalculation,
        manufacturingPolicy: req.body.manufacturingPolicy,
        flushingMethod: req.body.flushingMethod,
        assemblyPolicy: req.body.assemblyPolicy,
        itemTrackingCode: req.body.itemTrackingCode,
        defaultDeferralTemplateCode: req.body.defaultDeferralTemplateCode,
        created_at: new Date(),
        updated_at: new Date()
    };

    if (!newItem.type || !newItem.description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    Item.createItem(newItem, (err, result) => {
        if (err) {
            console.error('Error creating item:', err);
            return res.status(500).json({ error: 'Failed to create item' });
        }
        res.status(201).json({ message: 'Item created successfully', item: newItem });
    });
};

// Обновление записи
exports.updateItem = function (req, res) {
    const updatedItem = {
        item_no: req.body.item_no,
        description: req.body.description,
        description2: req.body.description2,
        type: req.body.type,
        inventory: req.body.inventory,
        createdFromNonstockItem: req.body.createdFromNonstockItem,
        substitutesExist: req.body.substitutesExist,
        stockkeepingUnitExists: req.body.stockkeepingUnitExists,
        assemblyBOM: req.body.assemblyBOM,
        productionBOMNo: req.body.productionBOMNo,
        routingNo: req.body.routingNo,
        baseUnitOfMeasure: req.body.baseUnitOfMeasure,
        shelfNo: req.body.shelfNo,
        costingMethod: req.body.costingMethod,
        costIsAdjusted: req.body.costIsAdjusted,
        standardCost: req.body.standardCost,
        unitCost: req.body.unitCost,
        lastDirectCost: req.body.lastDirectCost,
        priceProfitCalculation: req.body.priceProfitCalculation,
        profitPercent: req.body.profitPercent,
        unitPrice: req.body.unitPrice,
        inventoryPostingGroup: req.body.inventoryPostingGroup,
        genProdPostingGroup: req.body.genProdPostingGroup,
        vatProdPostingGroup: req.body.vatProdPostingGroup,
        itemDiscGroup: req.body.itemDiscGroup,
        vendorNo: req.body.vendorNo,
        vendorItemNo: req.body.vendorItemNo,
        tariffNo: req.body.tariffNo,
        searchDescription: req.body.searchDescription,
        overheadRate: req.body.overheadRate,
        indirectCostPercent: req.body.indirectCostPercent,
        itemCategoryCode: req.body.itemCategoryCode,
        blocked: req.body.blocked,
        lastDateModified: req.body.lastDateModified,
        salesUnitOfMeasure: req.body.salesUnitOfMeasure,
        replenishmentSystem: req.body.replenishmentSystem,
        purchUnitOfMeasure: req.body.purchUnitOfMeasure,
        leadTimeCalculation: req.body.leadTimeCalculation,
        manufacturingPolicy: req.body.manufacturingPolicy,
        flushingMethod: req.body.flushingMethod,
        assemblyPolicy: req.body.assemblyPolicy,
        itemTrackingCode: req.body.itemTrackingCode,
        defaultDeferralTemplateCode: req.body.defaultDeferralTemplateCode,
        created_at: req.body.created_at,
        updated_at: new Date()
    };

    if (!req.params.item_no) {
        return res.status(400).json({ error: 'Item ID is missing' });
    }

    Item.updateItem(req.params.item_no, updatedItem, (err, result) => {
        if (err) {
            console.error('Error updating item:', err);
            return res.status(500).json({ error: 'Failed to update item' });
        }
        res.json({ message: 'Item updated successfully', item: updatedItem });
    });
};

// Удаление записи
exports.deleteItem = function (req, res) {
    Item.deleteItem(req.params.item_no, (err, result) => {
        if (err) {
            console.error('Error deleting item:', err);
            return res.status(500).json({ error: 'Failed to delete item' });
        }
        res.json({ message: 'Item deleted successfully' });
    });
};
