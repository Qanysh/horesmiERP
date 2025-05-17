const Report = require('../service/report-service');
const PurchaseHeader = require('../models/purchaseHeader');
const SalesOrder = require('../models/salesOrder');

exports.getPurchaseInvoicePDF = async function (req, res, next) {
    const no = req.params.no;
    try {
        // Fetch purchase order details from the database
        const purchaseHeader = await new Promise((resolve, reject) => {
            PurchaseHeader.getPurchaseHeaderById(no, (err, result) => {
                if (err) return reject(err);
                resolve(result[0]);
            });
        });

        if (!purchaseHeader) {
            throw new Error('Purchase order not found');
        }

        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename=purchase-invoice.pdf`,
        });
        Report.purchaseInvoicePdf(purchaseHeader,
            (chunk) => stream.write(chunk),
            () => stream.end()
        );
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('An error occurred while generating the PDF.');
    }
};

exports.getSalesInvoicePDF = async function (req, res, next) {
    const no = req.params.no;
    try {
        // Fetch sales order details from the database
        const salesOrder = await new Promise((resolve, reject) => {
            SalesOrder.getSalesOrderById(no, (err, result) => {
                if (err) return reject(err);
                resolve(result[0]);
            });
        });
        console.log('Sales Order:', salesOrder);
        if (!salesOrder) {
            throw new Error('Sales order not found');
        }

        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename=sales-invoice.pdf`,
        });
        Report.salesInvoicePdf(salesOrder,
            (chunk) => stream.write(chunk),
            () => stream.end()
        );
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('An error occurred while generating the PDF.');
    }
};