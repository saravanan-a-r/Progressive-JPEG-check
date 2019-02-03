const progressiveChecker = require('./src/ProgressiveChecker');

progressiveChecker.setImage('./test/integ-testing/src/test1.jpeg')
    .isProgressive()
    .then( (result) => {
        console.log('test1.jpeg :: isProgressive() : ' + result);
    });

progressiveChecker.setImage('./test/integ-testing/src/test1.jpeg')
    .noOfScan()
    .then( (result) => {
        console.log('test1.jpeg :: noOfScan() : ' + result);
    });

progressiveChecker.setImage('./test/integ-testing/src/test2.jpeg')
    .isProgressive()
    .then( (result) => {
        console.log('test2.jpeg :: isProgressive() : ' + result);
    });
    
progressiveChecker.setImage('./test/integ-testing/src/test2.jpeg')
    .noOfScan()
    .then( (result) => {
        console.log('test2.jpeg :: noOfScan() : ' + result);
    });