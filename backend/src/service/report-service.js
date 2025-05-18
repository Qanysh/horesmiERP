const PDFDocument = require('pdfkit');
const PurchaseLine = require('../models/purchaseLine');
const SalesLine = require('../models/salesLine');
const path = require('path');

async function purchaseInvoicePdf(purchaseHeader, dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, margin: 50 });
    const fontPath = path.join(__dirname, '../../fonts/DejaVuSans.ttf');
    const fontPathBold = path.join(__dirname, '../../fonts/DejaVuSans-Bold.ttf');
    doc.registerFont('DejaVu', fontPath);
    doc.font('DejaVu');
    doc.registerFont('DejaVu-Bold', fontPathBold);

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    try {
        const purchaseLines = await new Promise((resolve, reject) => {
            PurchaseLine.getPurchaseLineByDocumentNo(purchaseHeader.no, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        // Header
        doc.fontSize(14).font('DejaVu-Bold').text('Purchase - Invoice', { align: 'center' });
        doc.moveDown(1.5);

        // Vendor & Company Details (левая и правая колонка)
        doc.fontSize(9).font('DejaVu');
        const leftX = 50;
        const rightX = 350;
        let y = 80;
        doc.text('Wide World Importers', leftX, y);
        doc.text('Toby Rhode', leftX, y + 15);
        doc.text('Aviator Way, 3000', leftX, y + 30);
        doc.text('Manchester Business Park', leftX, y + 45);
        doc.text('Manchester, M22 5TG', leftX, y + 60);
        doc.text('Great Britain', leftX, y + 75);

        doc.text('CRONUS International Ltd.', rightX, y);
        doc.text('5 The Ring', rightX, y + 15);
        doc.text('Westminster', rightX, y + 30);
        doc.text('London, W2 8HG', rightX, y + 45);
        doc.text('Great Britain', rightX, y + 60);

        // Invoice Information (две колонки)
        const detailsTop = 170;
        doc.font('DejaVu-Bold').text('Invoice Details', leftX, detailsTop);
        doc.font('DejaVu');
        doc.text(`Pay-to Vendor No.: ${purchaseHeader.vendorNo || ''}`, leftX, detailsTop + 18);
        doc.text(`Invoice No.: ${purchaseHeader.no || ''}`, leftX, detailsTop + 33);
        doc.text(`Order No.: ${purchaseHeader.no || ''}`, leftX, detailsTop + 48);
        doc.text(`Document Date: ${formatDate(purchaseHeader.documentDate)}`, leftX, detailsTop + 63);
        doc.text(`Posting Date: ${formatDate(purchaseHeader.postingDate)}`, leftX, detailsTop + 78);
        doc.text(`Due Date: ${formatDate(purchaseHeader.dueDate)}`, leftX, detailsTop + 93);

        doc.text(`Phone No.: ${purchaseHeader.phoneNo || ''}`, rightX, detailsTop + 18);
        doc.text(`VAT Registration No.: ${purchaseHeader.vatNo || ''}`, rightX, detailsTop + 33);
        doc.text(`Giro No.: ${purchaseHeader.giroNo || ''}`, rightX, detailsTop + 48);
        doc.text(`Bank: ${purchaseHeader.bankName || ''}`, rightX, detailsTop + 63);
        doc.text(`Account No.: ${purchaseHeader.accountNo || ''}`, rightX, detailsTop + 78);
        doc.text(`Purchaser: ${purchaseHeader.purchaser || ''}`, rightX, detailsTop + 93);

        doc.text(`Your Reference: ${purchaseHeader.reference || ''}`, leftX, detailsTop + 120);
        doc.text(`Payment Terms: ${purchaseHeader.paymentTerms || ''}`, leftX, detailsTop + 135);
        doc.text(`Shipment Method: ${purchaseHeader.shipmentMethod || ''}`, leftX, detailsTop + 150);
        doc.text(`Prices Including VAT: ${purchaseHeader.includeVAT ? 'Yes' : 'No'}`, leftX, detailsTop + 165);

        // Table Header (размеры и расположение как в salesInvoicePdf)
        y = detailsTop + 190;
        doc.font('DejaVu-Bold');
        doc.text('No.', 50, y);
        doc.text('Description', 120, y);
        doc.text('Quantity', 200, y, { width: 40, align: 'right' });
        doc.text('Unit', 250, y, { width: 40, align: 'right' });
        doc.text('Unit Cost', 300, y, { width: 60, align: 'right' });
        doc.text('Discount %', 370, y, { width: 50, align: 'right' });
        doc.text('VAT', 430, y, { width: 40, align: 'right' });
        doc.text('Amount', 480, y, { width: 80, align: 'right' });
        y += 30;
        doc.moveTo(50, y).lineTo(560, y).stroke();
        y += 10;
        doc.font('DejaVu');

        // Table Body
        let total = 0;
        for (const line of purchaseLines) {
            if (y > 700) { // simple page break
                doc.addPage();
                y = 50; // отступ сверху для новой страницы
                // Повторяем заголовок таблицы на новой странице
                doc.font('DejaVu-Bold');
                doc.text('No.', 50, y);
                doc.text('Description', 120, y);
                doc.text('Quantity', 200, y, { width: 40, align: 'right' });
                doc.text('Unit', 250, y, { width: 40, align: 'right' });
                doc.text('Unit Cost', 300, y, { width: 60, align: 'right' });
                doc.text('Discount %', 370, y, { width: 50, align: 'right' });
                doc.text('VAT', 430, y, { width: 40, align: 'right' });
                doc.text('Amount', 480, y, { width: 80, align: 'right' });
                y += 30;
                doc.moveTo(50, y).lineTo(560, y).stroke();
                y += 10;
                doc.font('DejaVu');
            }
            doc.text(line.no || '', 50, y);
            doc.text(line.description || '', 120, y, { width: 70 });
            doc.text(line.quantity != null ? line.quantity : '', 200, y, { width: 40, align: 'right' });
            doc.text(line.unitOfMeasureCode || '', 250, y, { width: 40, align: 'right' });
            doc.text(line.directUnitCost != null ? line.directUnitCost.toFixed(2) : '', 300, y, { width: 60, align: 'right' });
            doc.text(line.discountPercent != null ? line.discountPercent.toFixed(2) : '0.00', 370, y, { width: 50, align: 'right' });
            doc.text(line.vatIdentifier || '', 430, y, { width: 40, align: 'right' });
            doc.text(line.lineAmount != null ? line.lineAmount.toFixed(2) : '', 480, y, { width: 80, align: 'right' });
            y += 20;
            total += Number(line.lineAmount) || 0;
        }

        // Totals
        y += 25;
        doc.moveTo(50, y).lineTo(560, y).stroke();
        doc.font('DejaVu-Bold');
        doc.text(`Total GBP Excl. VAT`, 350, y + 10, { width: 130, align: 'right' });
        doc.text(total.toFixed(2), 480, y + 10, { width: 80, align: 'right' });
        const vatAmount = total * 0.25;
        doc.text(`25% VAT`, 350, y + 30, { width: 130, align: 'right' });
        doc.text(vatAmount.toFixed(2), 480, y + 30, { width: 80, align: 'right' });
        doc.text(`Total GBP Incl. VAT`, 350, y + 50, { width: 130, align: 'right' });
        doc.text((total + vatAmount).toFixed(2), 480, y + 50, { width: 80, align: 'right' });

        doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}

async function salesInvoicePdf(salesOrder, dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, margin: 50 });
    const fontPath = path.join(__dirname, '../../fonts/DejaVuSans.ttf');
    const fontPathBold = path.join(__dirname, '../../fonts/DejaVuSans-Bold.ttf');
    doc.registerFont('DejaVu', fontPath);
    doc.font('DejaVu');
    doc.registerFont('DejaVu-Bold', fontPathBold);

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    try {

        const salesLine = await new Promise((resolve, reject) => {
            SalesLine.getSalesLineByDocumentNo(salesOrder.no, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        // Header
        doc.fontSize(14).font('DejaVu-Bold').text('Sales - Invoice', { align: 'center' });
        doc.moveDown(1.5);

        // Customer & Company Details (левая и правая колонка)
        doc.fontSize(9).font('DejaVu');
        const leftX = 50;
        const rightX = 350;
        let y = 80;
        doc.text('Customer:', leftX, y);
        doc.text(salesOrder.customerName || '', leftX, y + 15);
        doc.text(salesOrder.customerNo || '', leftX, y + 30);
        doc.text(salesOrder.customerAddress || '', leftX, y + 45);
        doc.text(salesOrder.customerCity || '', leftX, y + 60);
        doc.text(salesOrder.customerCountry || '', leftX, y + 75);

        doc.text('Bill-to:', rightX, y);
        doc.text(salesOrder.billToName || '', rightX, y + 15);
        doc.text(salesOrder.billToAddress || '', rightX, y + 30);
        doc.text(salesOrder.billToCity || '', rightX, y + 45);
        doc.text(salesOrder.billToCountry || '', rightX, y + 60);

        // Invoice Information (две колонки)
        const detailsTop = 170;
        doc.font('DejaVu-Bold').text('Invoice Details', leftX, detailsTop);
        doc.font('DejaVu');
        doc.text(`Invoice No.: ${salesOrder.invoiceNo || ''}`, leftX, detailsTop + 18);
        doc.text(`Order No.: ${salesOrder.orderNo || ''}`, leftX, detailsTop + 33);
        doc.text(`Document Date: ${formatDate(salesOrder.documentDate)}`, leftX, detailsTop + 48);
        doc.text(`Posting Date: ${formatDate(salesOrder.postingDate)}`, leftX, detailsTop + 63);
        doc.text(`Due Date: ${formatDate(salesOrder.dueDate)}`, leftX, detailsTop + 78);

        doc.text(`Phone No.: ${salesOrder.phoneNo || ''}`, rightX, detailsTop + 18);
        doc.text(`VAT Registration No.: ${salesOrder.vatNo || ''}`, rightX, detailsTop + 33);
        doc.text(`Bank: ${salesOrder.bankName || ''}`, rightX, detailsTop + 48);
        doc.text(`Account No.: ${salesOrder.accountNo || ''}`, rightX, detailsTop + 63);
        doc.text(`Salesperson: ${salesOrder.salesperson || ''}`, rightX, detailsTop + 78);

        doc.text(`Your Reference: ${salesOrder.reference || ''}`, leftX, detailsTop + 105);
        doc.text(`Payment Terms: ${salesOrder.paymentTerms || ''}`, leftX, detailsTop + 120);
        doc.text(`Shipment Method: ${salesOrder.shipmentMethod || ''}`, leftX, detailsTop + 135);
        doc.text(`Prices Including VAT: ${salesOrder.includeVAT ? 'Yes' : 'No'}`, leftX, detailsTop + 150);

        // Table Header
        y = detailsTop + 190;
        doc.font('DejaVu-Bold');
        doc.text('No.', 50, y);
        doc.text('Description', 120, y);
        doc.text('Quantity', 200, y, { width: 40, align: 'right' });
        doc.text('Unit', 250, y, { width: 40, align: 'right' });
        doc.text('Unit Price', 300, y, { width: 60, align: 'right' });
        doc.text('Discount %', 370, y, { width: 50, align: 'right' });
        doc.text('VAT', 430, y, { width: 40, align: 'right' });
        doc.text('Amount', 480, y, { width: 80, align: 'right' });
        y += 30;
        doc.moveTo(50, y).lineTo(560, y).stroke();
        y += 10;
        doc.font('DejaVu');

        // Table Body
        let total = 0;
        for (const line of salesLine || []) {
            if (y > 700) { // simple page break
                doc.addPage();
                y = 50;
                doc.font('DejaVu-Bold');
                doc.text('No.', 50, y);
                doc.text('Description', 120, y);
                doc.text('Quantity', 200, y, { width: 40, align: 'right' });
                doc.text('Unit', 250, y, { width: 40, align: 'right' });
                doc.text('Unit Price', 300, y, { width: 60, align: 'right' });
                doc.text('Discount %', 370, y, { width: 50, align: 'right' });
                doc.text('VAT', 430, y, { width: 40, align: 'right' });
                doc.text('Amount', 480, y, { width: 80, align: 'right' });
                y += 30;
                doc.moveTo(50, y).lineTo(560, y).stroke();
                y += 10;
                doc.font('DejaVu');
            }
            doc.text(line.no || '', 50, y);
            doc.text(line.description || '', 120, y, { width: 70 });
            doc.text(line.quantity != null ? line.quantity : '', 200, y, { width: 40, align: 'right' });
            doc.text(line.unitOfMeasureCode || '', 250, y, { width: 40, align: 'right' });
            doc.text(line.unitPrice != null ? line.unitPrice.toFixed(2) : '', 300, y, { width: 60, align: 'right' });
            doc.text(line.discountPercent != null ? line.discountPercent.toFixed(2) : '0.00', 370, y, { width: 50, align: 'right' });
            doc.text(line.vatIdentifier || '', 430, y, { width: 40, align: 'right' });
            doc.text(line.amount != null ? line.amount.toFixed(2) : '', 480, y, { width: 80, align: 'right' });
            y += 20;
            total += Number(line.amount) || 0;
        }

        // Totals
        y += 25;
        doc.moveTo(50, y).lineTo(560, y).stroke();
        doc.font('DejaVu-Bold');
        doc.text(`Total Excl. VAT`, 350, y + 10, { width: 130, align: 'right' });
        doc.text(total.toFixed(2), 480, y + 10, { width: 80, align: 'right' });
        const vatAmount = total * 0.25;
        doc.text(`25% VAT`, 350, y + 30, { width: 130, align: 'right' });
        doc.text(vatAmount.toFixed(2), 480, y + 30, { width: 80, align: 'right' });
        doc.text(`Total Incl. VAT`, 350, y + 50, { width: 130, align: 'right' });
        doc.text((total + vatAmount).toFixed(2), 480, y + 50, { width: 80, align: 'right' });

        doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}

async function generalLedgerReportPdf(entries, dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, margin: 50 });
    const fontPath = path.join(__dirname, '../../fonts/DejaVuSans.ttf');
    const fontPathBold = path.join(__dirname, '../../fonts/DejaVuSans-Bold.ttf');
    doc.registerFont('DejaVu', fontPath);
    doc.font('DejaVu');
    doc.registerFont('DejaVu-Bold', fontPathBold);

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    try {
        doc.fontSize(16).font('DejaVu-Bold').text('General Ledger Report', { align: 'center' });
        doc.moveDown(1.5);

        // Table Header
        doc.fontSize(9).font('DejaVu-Bold');
        let y = 90;
        doc.text('Date', 50, y);
        doc.text('Type', 110, y);
        doc.text('Doc No.', 170, y);
        doc.text('Item No.', 240, y);
        doc.text('Description', 310, y);
        doc.text('Qty', 420, y, { width: 40, align: 'right' });
        doc.text('Amount', 470, y, { width: 70, align: 'right' });
        y += 20;
        doc.moveTo(50, y).lineTo(540, y).stroke();
        y += 10;
        doc.font('DejaVu');

        let totalPurchase = 0;
        let totalSale = 0;

        for (const entry of entries) {
            if (y > 700) { // simple page break
                doc.addPage();
                y = 50;
                doc.fontSize(9).font('DejaVu-Bold');
                doc.text('Date', 50, y);
                doc.text('Type', 110, y);
                doc.text('Doc No.', 170, y);
                doc.text('Item No.', 240, y);
                doc.text('Description', 310, y);
                doc.text('Qty', 420, y, { width: 40, align: 'right' });
                doc.text('Amount', 470, y, { width: 70, align: 'right' });
                y += 20;
                doc.moveTo(50, y).lineTo(540, y).stroke();
                y += 10;
                doc.font('DejaVu');
            }
            doc.text(formatDate(entry.postingDate), 50, y);
            doc.text(entry.documentType || '', 110, y);
            doc.text(entry.documentNo || '', 170, y);
            doc.text(entry.itemNo || '', 240, y);
            doc.text(entry.description || '', 310, y, { width: 100 });
            doc.text(entry.quantity != null ? entry.quantity : '', 420, y, { width: 40, align: 'right' });
            doc.text(entry.amount != null ? Number(entry.amount).toFixed(2) : '', 470, y, { width: 70, align: 'right' });

            // Суммируем для итогов
            if (entry.documentType === 'Purchase') totalPurchase += Number(entry.amount) || 0;
            if (entry.documentType === 'Sale') totalSale += Number(entry.amount) || 0;

            y += 20;
        }

        // Totals
        y += 20;
        doc.font('DejaVu-Bold');
        doc.text('Total Purchases:', 310, y, { width: 100, align: 'right' });
        doc.text(totalPurchase.toFixed(2), 470, y, { width: 70, align: 'right' });
        y += 15;
        doc.text('Total Sales:', 310, y, { width: 100, align: 'right' });
        doc.text(totalSale.toFixed(2), 470, y, { width: 70, align: 'right' });
        y += 15;
        doc.text('Net Result:', 310, y, { width: 100, align: 'right' });
        doc.text((totalPurchase + totalSale).toFixed(2), 470, y, { width: 70, align: 'right' });

        doc.end();
    } catch (error) {
        console.error('Error generating General Ledger PDF:', error);
        throw error;
    }
}

async function generalLedgerReportPdfSales(entries, dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, margin: 50 });
    const fontPath = path.join(__dirname, '../../fonts/DejaVuSans.ttf');
    const fontPathBold = path.join(__dirname, '../../fonts/DejaVuSans-Bold.ttf');
    doc.registerFont('DejaVu', fontPath);
    doc.font('DejaVu');
    doc.registerFont('DejaVu-Bold', fontPathBold);

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    try {
        doc.fontSize(16).font('DejaVu-Bold').text('General Ledger Report - Sales', { align: 'center' });
        doc.moveDown(1.5);

        // Table Header
        doc.fontSize(9).font('DejaVu-Bold');
        let y = 90;
        doc.text('Date', 50, y);
        doc.text('Type', 110, y);
        doc.text('Doc No.', 170, y);
        doc.text('Item No.', 240, y);
        doc.text('Description', 310, y);
        doc.text('Qty', 420, y, { width: 40, align: 'right' });
        doc.text('Amount', 470, y, { width: 70, align: 'right' });
        y += 20;
        doc.moveTo(50, y).lineTo(540, y).stroke();
        y += 10;
        doc.font('DejaVu');

        let totalSale = 0;

        for (const entry of entries) {
            if (y > 750) { // simple page break
                doc.addPage();
                y = 50;
                doc.fontSize(9).font('DejaVu-Bold');
                doc.text('Date', 50, y);
                doc.text('Type', 110, y);
                doc.text('Doc No.', 170, y);
                doc.text('Item No.', 240, y);
                doc.text('Description', 310, y);
                doc.text('Qty', 420, y, { width: 40, align: 'right' });
                doc.text('Amount', 470, y, { width: 70, align: 'right' });
                y += 20;
                doc.moveTo(50, y).lineTo(540, y).stroke();
                y += 10;
                doc.font('DejaVu');

            }
            if (entry.documentType === 'Sale') {
                doc.text(formatDate(entry.postingDate), 50, y);
                doc.text(entry.documentType || '', 110, y);
                doc.text(entry.documentNo || '', 170, y);
                doc.text(entry.itemNo || '', 240, y);
                doc.text(entry.description || '', 310, y, { width: 100 });
                doc.text(entry.quantity != null ? entry.quantity : '', 420, y, { width: 40, align: 'right' });
                doc.text(entry.amount != null ? Number(entry.amount).toFixed(2) : '', 470, y, { width: 70, align: 'right' });
                // Суммируем для итогов
                totalSale += Number(entry.amount) || 0;
                y += 20;
            }
        }


        // Totals
        y += 20;
        doc.font('DejaVu-Bold');
        doc.text('Total Sales:', 310, y, { width: 100, align: 'right' });
        doc.text(totalSale.toFixed(2), 470, y, { width: 70, align: 'right' });

        doc.end();
    } catch (error) {
        console.error('Error generating General Ledger PDF:', error);
        throw error;
    }
}

async function generalLedgerReportPdfPurchase(entries, dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, margin: 50 });
    const fontPath = path.join(__dirname, '../../fonts/DejaVuSans.ttf');
    const fontPathBold = path.join(__dirname, '../../fonts/DejaVuSans-Bold.ttf');
    doc.registerFont('DejaVu', fontPath);
    doc.font('DejaVu');
    doc.registerFont('DejaVu-Bold', fontPathBold);

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    try {
        doc.fontSize(16).font('DejaVu-Bold').text('General Ledger Report - Purchases', { align: 'center' });
        doc.moveDown(1.5);

        // Table Header
        doc.fontSize(9).font('DejaVu-Bold');
        let y = 90;
        doc.text('Date', 50, y);
        doc.text('Type', 110, y);
        doc.text('Doc No.', 170, y);
        doc.text('Item No.', 240, y);
        doc.text('Description', 310, y);
        doc.text('Qty', 420, y, { width: 40, align: 'right' });
        doc.text('Amount', 470, y, { width: 70, align: 'right' });
        y += 20;
        doc.moveTo(50, y).lineTo(540, y).stroke();
        y += 10;
        doc.font('DejaVu');

        let totalPurchase = 0;

        for (const entry of entries) {
            if (y > 750) { // simple page break
                doc.addPage();
                y = 50;
                doc.fontSize(9).font('DejaVu-Bold');
                doc.text('Date', 50, y);
                doc.text('Type', 110, y);
                doc.text('Doc No.', 170, y);
                doc.text('Item No.', 240, y);
                doc.text('Description', 310, y);
                doc.text('Qty', 420, y, { width: 40, align: 'right' });
                doc.text('Amount', 470, y, { width: 70, align: 'right' });
                y += 20;
                doc.moveTo(50, y).lineTo(540, y).stroke();
                y += 10;
                doc.font('DejaVu');
            }
            if (entry.documentType === 'Purchase') {
                doc.text(formatDate(entry.postingDate), 50, y);
                doc.text(entry.documentType || '', 110, y);
                doc.text(entry.documentNo || '', 170, y);
                doc.text(entry.itemNo || '', 240, y);
                doc.text(entry.description || '', 310, y, { width: 100 });
                doc.text(entry.quantity != null ? entry.quantity : '', 420, y, { width: 40, align: 'right' });
                doc.text(entry.amount != null ? Number(entry.amount).toFixed(2) : '', 470, y, { width: 70, align: 'right' });
                // Суммируем для итогов
                totalPurchase += Number(entry.amount) || 0;
                y += 20;
            }
        }
        // Totals
        y += 20;
        doc.font('DejaVu-Bold');
        doc.text('Total Purchases:', 310, y, { width: 100, align: 'right' });
        doc.text(totalPurchase.toFixed(2), 470, y, { width: 70, align: 'right' });
        doc.end();
    } catch (error) {
        console.error('Error generating General Ledger PDF:', error);
        throw error;
    }
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

module.exports = { purchaseInvoicePdf, salesInvoicePdf, generalLedgerReportPdf, generalLedgerReportPdfSales, generalLedgerReportPdfPurchase };