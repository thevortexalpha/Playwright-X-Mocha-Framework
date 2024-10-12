/** Importing excel class */
const Exceljs = require('exceljs');

class ExcelMethods {

    /**
     * This method will read the excel, find the row and column number of given text and 
     * update the excel with given replace text. If updates needs to be done next to row or column
     * change parameter would help.
     * @param {String} filePath 
     * @param {String} searchText 
     * @param {String} replaceText 
     * @param {Object} change 
     */
    async writeExcel(filePath, searchText, replaceText, change) {
        /** Creating an object for the excel class */
        const workbook = new Exceljs.Workbook();
    
        /** Reading the excel file */
        await workbook.xlsx.readFile(filePath);
    
        /** Deciding the worksheet to work on */
        const worksheet = workbook.getWorksheet('Sheet1');
    
        let output = await this.readExcel(worksheet, searchText, change);
    
        /** Assigning the desired cell with new value */
        const cell = worksheet.getCell(output.row+change.rowChange, output.column+change.colChange);
        cell.value = replaceText;
        
        /** Writing the excel file with updates*/
        await workbook.xlsx.writeFile(filePath);
    }

    /**
     * This method will find and return the row and column number of a cell value.
     * @param {import('exceljs').Worksheet} worksheet 
     * @param {String} searchText 
     * @returns {Object}
     */
    async readExcel(worksheet, searchText) {
        let output = {row : -1, column: -1};
        /** Iterating through each row in the worksheet */
        worksheet.eachRow((row, rowNumber) => {
    
            /**Iterating through each value in the row */
            row.eachCell((cell, colNumber) => {
                
                /** If cell value matches with the search text, it would return the row and column number of the cell value */
                if(cell.value === searchText) {
                    output.row = rowNumber;
                    output.column = colNumber;
                    console.log(`${searchText} is present in ${rowNumber} row and in ${colNumber} column`);
                }
            });
        });
        return output;
    }
}
// writeExcel('./ExcelDownloadTest.xlsx', 'Republic', 'Banana', {rowChange: 0, colChange: 0});

module.exports = { ExcelMethods };
