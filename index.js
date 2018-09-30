const progressiveChecker = require('./ProgressiveChecker');

progressiveChecker.setImage('./test/test1.jpeg')
    .isProgressive()
    .then( (result) => {
        console.log('test1.jpeg :: isProgressive() : ' + result);
    });

progressiveChecker.setImage('./test/test1.jpeg')
    .noOfScan()
    .then( (result) => {
        console.log('test1.jpeg :: noOfScan() : ' + result);
    });

progressiveChecker.setImage('./test/test2.jpeg')
    .isProgressive()
    .then( (result) => {
        console.log('test2.jpeg :: isProgressive() : ' + result);
    });
    
progressiveChecker.setImage('./test/test2.jpeg')
    .noOfScan()
    .then( (result) => {
        console.log('test2.jpeg :: noOfScan() : ' + result);
    });