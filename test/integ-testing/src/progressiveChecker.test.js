const progressiveChecker = require('../../../src/ProgressiveChecker.js');
const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

describe('Integration testing', () => {

    context('Scan count', () => {

        it('Should return scan count as 10', async () => {
            let expectedScanCount = 10;
            let actualScanCount = await progressiveChecker.setImage('./test/integ-testing/src/test1.jpeg').noOfScan();
            expect(actualScanCount).to.equal(expectedScanCount);
        });

        it('Should return scan count as 1', async () => {
            let expectedScanCount = 1;
            let actualScanCount = await progressiveChecker.setImage('./test/integ-testing/src/test2.jpeg').noOfScan();
            expect(actualScanCount).to.equal(expectedScanCount);
        });
    });

    context('Progressive checkness', () => {

        it('Should return isProgressive : true', async () => {
            let expectedResult = true;
            let actualResult = await progressiveChecker.setImage('./test/integ-testing/src/test1.jpeg').isProgressive();
            expect(actualResult).to.equal(expectedResult);
        });

        it('Should return isProgressive : false', async () => {
            let expectedResult = false;
            let actualResult = await progressiveChecker.setImage('./test/integ-testing/src/test2.jpeg').isProgressive();
            expect(actualResult).to.equal(expectedResult);
        });
    });
});