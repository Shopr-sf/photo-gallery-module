const path = require('path');
const fakerSchema = require('./faker-schema.js');
const fs = require('fs');


const spl = ','



const renderNamesToIds = (num = 10 ** 7) => {
  const names = [
    'product',
    'item',
    'listing',
    'page',
    'sku',
    'info',
    'number',
    'element',
    'asset',
    'which',
  ];
  let keys = [];
  const renderKey = (string) => {
    const index = string[string.length - 1];
    return names[index] + string;
  };

  fs.appendFileSync(path.join(__dirname,'../images.csv'), getImages(50), 'utf8', (err) => {
    if (err) throw err;
    console.log('The images file has been saved!');
  });

  const func = (num, num2) => {
    let count;
    for (let i = num; i < num + 100000; i++) {
      count = i;
      keys.push(fakerSchema(6, 50, renderKey(i.toString())));
    }
    console.log(count)
    fs.appendFileSync(path.join(__dirname,'../products.csv'), getProducts(keys, num), 'utf8', (err) => {
      if (err) throw err;
      console.log('The products file has been saved!');
    });
    fs.appendFileSync(path.join(__dirname,'../product_images.csv'), getProductImages(keys, num), 'utf8', (err) => {
      if (err) throw err;
      console.log('The images file has been saved!');
    });
    keys = [];
    if (count === 9999999) {
      return;
    } else {
      func(count + 1);
    }
  };

  func(0, 0)
  // for (let i = 0; i < num; i++) {
  //   keys.push(fakerSchema(50, 6, renderKey(i.toString())));
  //   if (i % 99999 === 0) {
  //     console.log(i);
  //     fs.appendFile(path.join(__dirname,'../products.csv'), getProducts(keys), 'utf8', (err) => {
  //       if (err) throw err;
  //       console.log('The products file has been saved!');
  //     });
  //     fs.appendFile(path.join(__dirname,'../product_images.csv'), getProductImages(keys), 'utf8', (err) => {
  //       if (err) throw err;
  //       console.log('The images file has been saved!');
  //     });
  //     fs.appendFile(path.join(__dirname,'../images.csv'), getImages(50), 'utf8', (err) => {
  //       if (err) throw err;
  //       console.log('The images file has been saved!');
  //     });
  //     keys = [];
  //   }
  // }
  // return keys;
};

const getProducts = (data, num) => {
  let result = "";
  for(var i in data) {
    let arr = [];
    for(var key in data[i]) {
      if(key !== 'image') {
        arr.push(data[i][key]);
      }
    }
    result += (num++) +spl+arr.join(spl)+'\n';
  }
  return result;
};

const getProductImages = (data, num) => {
  let result = "";
  // let count = num;
  for(var i in data) {
    for(var img of data[i]['image']) {
      let arr = [JSON.parse(i) + num, img];
      result += arr.join(spl)+'\n';
    }
  }
  return result;
}

const getImages = (totImages) => {
  let result = "";
  for(var i = 1; i <= totImages; i++) {
    result += i+spl+`${i}.jpg\n`;
  }
  return result;
}

renderNamesToIds();