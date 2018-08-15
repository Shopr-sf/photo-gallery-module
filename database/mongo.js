const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://localhost/assets');

// mongoose.connect('mongodb://database/assets');

// define schema
const assetSchema = mongoose.Schema({
  name: String,
  detail: Number,
  images: Array,
});

// defining model
const Asset = mongoose.model('Asset', assetSchema);

fs.readFile(path.join(__dirname, '/data.csv'), 'utf8', (err, data) => {
  if (err) {
    console.log('Failed to read CSV file: ', err);
    return;
  }
  console.log('Data fetched from CSV file');
  const strAssets = data.split('\n');

  // refactor string entries to object entries
  const objAssets = strAssets.map((str) => {
    const temp = str.split(', ');
    return {
      id: temp[0],
      url: temp[1],
      home_id: temp[2],
      order: temp[3],
      caption: temp[4],
    };
  });

  // insert documents into collection
  Asset.insertMany(objAssets, (error) => {
    if (error) {
      console.log('InsertMany error');
      return;
    }
    console.log('InsertMany success');
  });
});

// fetch function
const fetchRoomPics = (roomId, callback) => {
  Asset.find({ home_id: roomId }, '-_id -__v', (err, docs) => {
    if (err) {
      console.log('Error fetching pics');
      callback(err);
      return;
    }
    console.log('Pics fetched');
    callback(null, docs);
  });
};

module.exports = {
  fetchRoomPics,
};