const Report = require('../service/report-service');

exports.getPDF = async function (req, res, next) {
    try {
        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename=report.pdf`,
        });
        Report.buildPDF(
            (chunk) => stream.write(chunk),
            () => stream.end()
        );
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('An error occurred while generating the PDF.');
    }
};