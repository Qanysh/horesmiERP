const PDFDocument = require('pdfkit');
const PurchaseOrder = require('../models/purchaseOrder'); // Assuming a model for purchaseOrders

async function purchaseInvoicePdf(orderId, dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, margin: 50 });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    try {
        // Fetch purchase order details from the database
        const purchaseOrder = await new Promise((resolve, reject) => {
            PurchaseOrder.getPurchaseOrderById(orderId, (err, result) => {
                if (err) return reject(err);
                resolve(result[0]);
            });
        });

        if (!purchaseOrder) {
            throw new Error('Purchase order not found');
        }

        // Header
        doc.fontSize(20).text('Purchase - Invoice', { align: 'center' });
        doc.moveDown();

        // Vendor and Ship-to Information
        doc.fontSize(10);
        doc.text('Vendor:', 50, 100);
        doc.text(purchaseOrder.supplierNo, 50, 115);
        doc.text(purchaseOrder.description, 50, 130);
        doc.moveDown();

        doc.text('Ship-to Address:', 350, 100);
        doc.text('CRONUS International Ltd.', 350, 115);
        doc.text('5 The Ring', 350, 130);
        doc.text('Westminster', 350, 145);
        doc.text('London, W2 8HG', 350, 160);
        doc.text('Great Britain', 350, 175);

        // Invoice details
        doc.moveDown();
        doc.text(`Invoice No.: ${purchaseOrder.orderNo}`, 50, 200);
        doc.text(`Order Date: ${purchaseOrder.orderDate}`, 50, 215);
        doc.text(`Status: ${purchaseOrder.status}`, 50, 230);
        doc.text(`Total Amount: ${purchaseOrder.totalAmount}`, 50, 245);

        doc.moveDown().moveTo(50, 270).lineTo(550, 270).stroke();

        // Table header
        doc.font('Helvetica-Bold');
        doc.text('No.', 50, 280);
        doc.text('Description', 90, 280);
        doc.text('Quantity', 230, 280);
        doc.text('Unit Cost', 290, 280);
        doc.text('Amount', 360, 280);
        doc.font('Helvetica');

        // Table row (example row, replace with actual data if available)
        doc.text('1', 50, 300);
        doc.text(purchaseOrder.description, 90, 300);
        doc.text('1', 230, 300);
        doc.text(purchaseOrder.totalAmount, 290, 300);
        doc.text(purchaseOrder.totalAmount, 360, 300);

        // Total
        doc.moveDown();
        doc.text(`Total: ${purchaseOrder.totalAmount}`, { align: 'right' });

        // Footer
        doc.moveDown().text('Account No.: 99-99-888');
        doc.text('Bank: World Wide Bank');
        doc.text('Giro No.: 888-9999');
        doc.text('VAT Registration No.: 777777777');
        doc.text('Phone No.: 0666-666-6666');
        doc.text('Email: -');
        doc.text('Pay-to Vendor No.: 10000');
        doc.text('Home Page: -');

        doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}
async function salesInvoicePdf(orderId, dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, margin: 50 });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    try {
        // Fetch sales order details from the database
        const salesOrder = await new Promise((resolve, reject) => {
            PurchaseOrder.getSalesOrderById(orderId, (err, result) => {
                if (err) return reject(err);
                resolve(result[0]);
            });
        });

        if (!salesOrder) {
            throw new Error('Sales order not found');
        }

        // Header
        doc.fontSize(20).text('Sales - Invoice', { align: 'center' });
        doc.moveDown();

        // Customer and Bill-to Information
        doc.fontSize(10);
        doc.text('Customer:', 50, 100);
        doc.text(salesOrder.customerNo, 50, 115);
        doc.text(salesOrder.customerName, 50, 130);
        doc.moveDown();

        doc.text('Bill-to Address:', 350, 100);
        doc.text(salesOrder.billToAddress, 350, 115);
        doc.text(salesOrder.billToCity, 350, 130);
        doc.text(salesOrder.billToPostalCode, 350, 145);
        doc.text(salesOrder.billToCountry, 350, 160);

        // Invoice details
        doc.moveDown();
        doc.text(`Invoice No.: ${salesOrder.invoiceNo}`, 50, 200);
        doc.text(`Order Date: ${salesOrder.orderDate}`, 50, 215);
        doc.text(`Status: ${salesOrder.status}`, 50, 230);
        doc.text(`Total Amount: ${salesOrder.totalAmount}`, 50, 245);

        doc.moveDown().moveTo(50, 270).lineTo(550, 270).stroke();

        // Table header
        doc.font('Helvetica-Bold');
        doc.text('No.', 50, 280);
        doc.text('Description', 90, 280);
        doc.text('Quantity', 230, 280);
        doc.text('Unit Price', 290, 280);
        doc.text('Amount', 360, 280);
        doc.font('Helvetica');

        // Table rows (example row, replace with actual data if available)
        salesOrder.items.forEach((item, index) => {
            const y = 300 + index * 20;
            doc.text(index + 1, 50, y);
            doc.text(item.description, 90, y);
            doc.text(item.quantity, 230, y);
            doc.text(item.unitPrice, 290, y);
            doc.text(item.amount, 360, y);
        });

        // Total
        doc.moveDown();
        doc.text(`Total: ${salesOrder.totalAmount}`, { align: 'right' });

        // Footer
        doc.moveDown().text('Account No.: 99-99-888');
        doc.text('Bank: World Wide Bank');
        doc.text('Giro No.: 888-9999');
        doc.text('VAT Registration No.: 777777777');
        doc.text('Phone No.: 0666-666-6666');
        doc.text('Email: -');
        doc.text('Pay-to Vendor No.: 10000');
        doc.text('Home Page: -');

        doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}
module.exports = { purchaseInvoicePdf, salesInvoicePdf };