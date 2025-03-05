import PDFDocument from "pdfkit";
import fs from "fs";

const generatePDF = (text, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(filePath))
      .on('finish', () => {
        resolve(filePath);
      })
      .on('error', (err) => {
        reject(err);
      });

    doc.fontSize(12).text(text, {
      align: 'left'
    });

    doc.end();
  });
};

export default generatePDF;