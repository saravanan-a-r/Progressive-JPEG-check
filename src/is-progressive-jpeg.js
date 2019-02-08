/*
    This module will do the following jobs : 
    1) Check whether a given is image is progressive jpeg or not.
    2) It will provide number of scans in given jpeg image.

    THIS MODULE FOLLOWS SINGLETON DESIGN PATTERN
*/

class ProgressiveChecker {
    
    /*
        @imgPath - Path to the source image on which further operations will occur
    */
    setImage(imgPath) {
        this.imgPath = imgPath;
        
        // 0xFFC2 [255, 194] - Start of frame header or progressive jpeg
        this.SOF2 = [255, 194];

        // 0xFFDA [255, 218] - Start of scan
        /*
            Non progressive jpeg has at the max of 1 scan.
            Progressive jpeg has more than 1 scan.
        */
        this.SOS = [255, 218];
        return this;
    }

    /* 
        Async method, it will resolve with either true or false.
        true to denote the given image is progressive jpeg.
        false to denote the given image is not a progressive jpeg.
    */
    isProgressive() {
        return new Promise( (resolve, reject) => {
            try {
                let imgPath = this.imgPath;
                let {createReadStream} = require('fs');   
                let reader = createReadStream(imgPath, {
                    highWaterMark : 500 //Reading file chunk by chunk of size 500byte
                });
                reader.on('data', (chunk) => {
                    let SOF2 = this.SOF2;
                    let len = chunk.length, i = 0;
                    while(i < len) {
                        //0xFFC2
                        if(chunk[i] === SOF2[0] && chunk[i+1] === SOF2[1]) {
                            resolve(true);
                            reader.close();
                        }
                        i++;
                    }
                });

                reader.on('end', () => {
                    resolve(false);
                });

                reader.on('error', () => {
                    resolve(false);
                });
            }
            catch(e) {
                reject(e);
            }
        });
    }

    /*
        Async method, it will resolve with a number which denotes 
        no of scans in the given image.
    */
    noOfScan() {
        return new Promise( (resolve, reject) => {
            let imgPath = this.imgPath;
            let {createReadStream} = require('fs');
            let reader = createReadStream(imgPath);
            let scanCount = 0;

            reader.on('data', (chunk) => {
                let SOS = this.SOS;
                let len = chunk.length, i = 0;
                while(i < len) {
                    //0xFFDA
                    if(chunk[i] === SOS[0] && chunk[i+1] === SOS[1]) {
                        scanCount++;
                    }
                    i++;
                }
            });

            reader.on('end', () => {
                resolve(scanCount);
            });

            reader.on('error', (err) => {
                reject(err);
            });

        });
    }
}

module.exports = new ProgressiveChecker();

