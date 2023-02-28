const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0); // then( (err, data) => { do something(data)}
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  readCounter((err, data) => {
    data++;
    writeCounter(data, callback);
  });
};
// get counter from txt file
// const promise = new Promise((resolve, reject) => {
//   readCounter((err, data) => (resolve(data)));
// });

// promise
//   .then((result) => {
//     counter = result;
//     // increment counter
//     counter = counter + 1;
//     return counter;
//     // update the counter on the txt file on the local database
//     //writeCounter(counter, console.log);
//     // return 1;
//   })
//   .then((result) => {
//     // console.log('result',result);
//     // update the counter on the txt file on the local database
//     writeCounter(result, () => (console.log));
//     // return the zero padded number
//     return zeroPaddedNumber(result);
//   });
//   .catch(() => { console.log('failed'); });
// counter = readCounter((err, counter) => { return counter});

// debugger;



// increase by one with callback function
// counter = counter + 1;
// update the counter on the txt file on the local database

// return the zero padded number
// return resultOut;

// testing====

// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');