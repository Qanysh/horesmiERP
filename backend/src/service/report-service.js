const PDFDocument = require('pdfkit');

function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    doc.fontSize(20).text(`HoresmiERP`);

    doc
        .fontSize(12)
        .text(
            `Aslan 4ort Simple kotak Donk ebanyi shkolnik Semen Bakin top`
        );
    doc.end();
}

module.exports = { buildPDF };