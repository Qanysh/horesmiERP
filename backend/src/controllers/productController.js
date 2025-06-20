const Product = require('../models/product');

// Получение всех записей
exports.getAllProducts = async function (req, res) {
    try {
        Product.getAllProducts((err, products) => {
            if (err) {
                console.error('Error fetching products:', err);
                return res.status(500).json({ error: 'Error fetching products data' });
            }
            res.json(products);
        });
    } catch (err) {
        console.error('Unexpected error fetching products:', err);
        res.status(500).json({ error: 'Unexpected error fetching products' });
    }
};

// Получение записи по ID
exports.getProductById = async function (req, res) {
    try {
        Product.getProductById(req.params.product_no, (err, product) => {
            if (err) {
                console.error('Error fetching product:', err);
                return res.status(500).json({ error: 'Error fetching product' });
            }
            if (!product || product.length === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product[0]);
        });
    } catch (err) {
        console.error('Unexpected error fetching product:', err);
        res.status(500).json({ error: 'Unexpected error fetching product' });
    }
};

Product.getLastProductNo = function (callback) {
    db.query(
        "SELECT product_no FROM production ORDER BY product_no DESC LIMIT 1",
        (err, results) => {
            if (err) return callback(err);
            if (results && results.length > 0) {
                callback(null, results[0].product_no);
            } else {
                callback(null, null);
            }
        }
    );
};

// Создание новой записи
exports.createProduct = function (req, res) {
    // Product.getLastProductNo((err, lastProductNo) => {
    //     if (err) {
    //         console.error('Error fetching last product_no:', err);
    //         return res.status(500).json({ error: 'Failed to generate product_no' });
    //     }
    //     let nextProductNo = "PRD-001";
    //     if (lastProductNo) {
    //         const num = parseInt(lastProductNo.replace("PRD-", ""), 10) + 1;
    //         nextProductNo = "PRD-" + String(num).padStart(3, "0");
    //     }
    // });

    const newProduct = {
        product_no: req.body.product_no,
        description: req.body.description,
        description2: req.body.description2,
        type: req.body.type,
        inventory: req.body.inventory,
        createdFromNonstockProduct: req.body.createdFromNonstockProduct,
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
        productDiscGroup: req.body.productDiscGroup,
        vendorNo: req.body.vendorNo,
        vendorProductNo: req.body.vendorProductNo,
        tariffNo: req.body.tariffNo,
        searchDescription: req.body.searchDescription,
        overheadRate: req.body.overheadRate,
        indirectCostPercent: req.body.indirectCostPercent,
        productCategoryCode: req.body.productCategoryCode,
        blocked: req.body.blocked,
        lastDateModified: new Date(),
        salesUnitOfMeasure: req.body.salesUnitOfMeasure,
        replenishmentSystem: req.body.replenishmentSystem,
        purchUnitOfMeasure: req.body.purchUnitOfMeasure,
        leadTimeCalculation: req.body.leadTimeCalculation,
        manufacturingPolicy: req.body.manufacturingPolicy,
        flushingMethod: req.body.flushingMethod,
        assemblyPolicy: req.body.assemblyPolicy,
        productTrackingCode: req.body.productTrackingCode,
        defaultDeferralTemplateCode: req.body.defaultDeferralTemplateCode,
        isArchived: req.body.isArchived || false,
        created_at: new Date(),
        updated_at: new Date()
    };

    if (!newProduct.type || !newProduct.description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    Product.createProduct(newProduct, (err, result) => {
        if (err) {
            console.error('Error creating product:', err);
            return res.status(500).json({ error: 'Failed to create product' });
        }
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    });
};

// Создание нескольких записей
exports.createManyProducts = function (req, res) {
    const products = req.body; // Ожидается массив объектов product

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Request body must be a non-empty array' });
    }

    let created = [];
    let errors = [];

    Promise.all(products.map(product => {
        return new Promise((resolve) => {
            if (!product.product_no || !product.description || !product.type) {
                errors.push({ product, error: 'Missing required fields' });
                return resolve();
            }
            Product.createProduct(
                {
                    ...product,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                (err, result) => {
                    if (err) {
                        errors.push({ product, error: err.message });
                    } else {
                        created.push(product);
                    }
                    resolve();
                }
            );
        });
    })).then(() => {
        res.status(201).json({
            message: 'Batch product creation finished',
            created,
            errors
        });
    });
};

// Обновление записи
exports.updateProduct = function (req, res) {
    const updatedProduct = {
        product_no: req.body.product_no,
        description: req.body.description,
        description2: req.body.description2,
        type: req.body.type,
        inventory: req.body.inventory,
        createdFromNonstockProduct: req.body.createdFromNonstockProduct,
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
        productDiscGroup: req.body.productDiscGroup,
        vendorNo: req.body.vendorNo,
        vendorProductNo: req.body.vendorProductNo,
        tariffNo: req.body.tariffNo,
        searchDescription: req.body.searchDescription,
        overheadRate: req.body.overheadRate,
        indirectCostPercent: req.body.indirectCostPercent,
        productCategoryCode: req.body.productCategoryCode,
        blocked: req.body.blocked,
        lastDateModified: req.body.lastDateModified,
        salesUnitOfMeasure: req.body.salesUnitOfMeasure,
        replenishmentSystem: req.body.replenishmentSystem,
        purchUnitOfMeasure: req.body.purchUnitOfMeasure,
        leadTimeCalculation: req.body.leadTimeCalculation,
        manufacturingPolicy: req.body.manufacturingPolicy,
        flushingMethod: req.body.flushingMethod,
        assemblyPolicy: req.body.assemblyPolicy,
        productTrackingCode: req.body.productTrackingCode,
        defaultDeferralTemplateCode: req.body.defaultDeferralTemplateCode,
        updated_at: new Date()
    };

    if (!req.params.product_no) {
        return res.status(400).json({ error: 'Product ID is missing' });
    }

    Product.updateProduct(req.params.product_no, updatedProduct, (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).json({ error: 'Failed to update product' });
        }
        res.json({ message: 'Product updated successfully', product: updatedProduct });
    });
};

// Удаление записи
exports.deleteProduct = function (req, res) {
    Product.deleteProduct(req.params.product_no, (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).json({ error: 'Failed to delete product' });
        }
        res.json({ message: 'Product deleted successfully' });
    });
};
