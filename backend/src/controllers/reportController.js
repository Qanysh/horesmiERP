const Report = require('../service/report-service');

exports.getPurchaseInvoicePDF = async function (req, res, next) {
    try {
        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename=purchase-invoice.pdf`,
        });
        Report.purchaseInvoicePdf(
            (chunk) => stream.write(chunk),
            () => stream.end()
        );
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('An error occurred while generating the PDF.');
    }
};

exports.getSalesInvoicePDF = async function (req, res, next) {
    try {
        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename=sales-invoice.pdf`,
        });
        Report.salesInvoicePdf(
            (chunk) => stream.write(chunk),
            () => stream.end()
        );
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('An error occurred while generating the PDF.');
    }
};