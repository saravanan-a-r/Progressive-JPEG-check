/*
    **************** ES6 MODULE *********************
    This module will do the following jobs : 
    1) Check whether a given is image is progressive jpeg or not.
    2) It will provide number of scans in given jpeg image.

    THIS MODULE FOLLOWS SINGLETON DESIGN PATTERN
*/

export default class ProgressiveChecker {

    constructor(imgPath) {

        this.imgPath = imgPath;
  
        // 0xFFC2 [255, 194] - Start of frame header or progressive jpeg
        this.SOF2 = [255, 194];
    
        // 0xFFDA [255, 218] - Start of scan
        /*
            Non progressive jpeg has at the max of 1 scan.
            Progressive jpeg has more than 1 scan.
        */
        this.SOS = [255, 218];
    }
  
    /*
        @imgPath - Path to the source image on which further operations will occur
    */
    setImage(imgPath) {
        this.imgPath = imgPath;
        return this;
    }
  
    /* 
        Async method, it will resolve with either true or false.
        true to denote the given image is progressive jpeg.
        false to denote the given image is not a progressive jpeg.
    */
    isProgressive() {

        return new Promise(async (resolve, reject) => {
        
            let imgBytes = await this.toIntegerArray();

            let imgBytesLength = imgBytes.length;
    
            let SOF2 = this.SOF2;
    
            //0xFFC2
            for (let i = 0; i < imgBytesLength; i = i + 2) {
                //0xFFC2
                if (imgBytes[i] === SOF2[0] && imgBytes[i + 1] === SOF2[1]) {
                    resolve(true);
                    return;
                }
            }
    
            resolve(false);
        });
    }
  
    /*
        Async method, it will resolve with a number which denotes 
        no of scans in the given image.
    */
    noOfScan() {

        return new Promise(async (resolve, reject) => {

            let imgBytes = await this.toIntegerArray();

            let scanCount = 0;
            
            let SOS = this.SOS;

            let imgBytesLength = imgBytes.length;
    
            //0xFFDA
            for (let i = 0; i < imgBytesLength; i = i + 2) {
                //0xFFDA
                if (imgBytes[i] === SOS[0] && imgBytes[i + 1] === SOS[1]) {
                    scanCount++;
                }
            }
  
            resolve(scanCount);
        });
    }

    toIntegerArray(imgPath) {
        
        return new Promise((resolve, reject) => {

            if(this.imgBytes && this.imgBytes.length) {
                resolve(this.imgBytes);
                return;
            }

            if(!imgPath) {
                imgPath = this.imgPath;
            }

            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                let reader = new FileReader();
                reader.onloadend = function () {
                    let arrayBuffer = reader.result;
                    let bytes = new Uint8Array(arrayBuffer);
                    resolve(bytes);
                    return;
                };
                reader.readAsArrayBuffer(xhr.response);
            };
            xhr.open("GET", imgPath);
            xhr.responseType = "blob";
            xhr.send();
        });
    }
}
  