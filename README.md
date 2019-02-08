# is-progressive-jpeg

A utility module which will check a image is progressive jpeg or not and provide scan count of the given image.

# Installation
You can use `npm` to download and install:

> npm install is-progressive-jpeg

# API Documentation

This module built using Builder design pattern. For more information about the Builder design pattern, [click here](https://medium.com/@sararavi14/builder-design-pattern-in-node-js-c942ac7354a9)

    1) <module_instance>.setImage(<path to an image>)
   This method **setImage()** will set an image that we are going to process.

    2) <module_instance>.isProgressive()
   This method **isProgressive()** will return promise object which will resolve with true if the given image is progressive. Otherwise, resolve with false.

 

    3) <module_instance>.noOfScan()

This method **noOfScan()** will return promise object which will resolve with scan count. For baseline image, count will be 1. 
    
   
    
# Example

Using Builder design pattern,

	const progressiveChecker = require('ProgressiveChecker');
	let checker = progressiveChecker.setImage('test1.jpeg');
	checker.isProgressive().then( (result) => {
		console.log('test1.jpeg :: isProgressive() : ' + result);
	});
	checker.noOfScan().then( (result) => {
		console.log('test1.jpeg :: noOfScan() : ' + result);
	});
