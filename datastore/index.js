const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, counterString) => {
    // id = './data' + counterString + '.txt';
    let tempDir = path.join(this.dataDir, `${counterString}.txt`); // <== modified file path
    // console.log(dataDir);
    fs.writeFile(tempDir, text, (err) => { //
      if (err) {
        throw ('Error at .create:', err);
      } else {
        items.id = counterString;
        items.text = text;
        callback(null, items);
      }
    });
  });
  // items[id] = text;
  // callback(null, { id, text });
  /* Each new todo entry must be saved in its own file.
  Use the unique id generated by getNextUniqueId to create a file path inside the dataDir.
  Each time a POST request is made to the collection route, save a file with the todo item in this folder.
  Only save the todo text in the file, the id of the todo item is encoded into its filename

  path => ./data/id
  */


};

exports.readAll = (callback) => {
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);

  // To do this, you will need to read the dataDir directory and build a list of files.
  let data = [];
  fs.readdir(this.dataDir, (err, files) => {
    if (err) {
      throw ('Error at .readAll:', err);
    } else {
      data = files.map(fileName => { // '00001.txt'
        fileName = fileName.slice(0, 5);
        return {id: fileName, text: fileName};
      });
      callback(null, data);
    }

  });

};

exports.readOne = (id, callback) => {
  let tempDir = path.join(this.dataDir, `${id}.txt`);
  fs.readFile(tempDir, (err, data) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, {id: id, text: data.toString()});
    }
  });

};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
