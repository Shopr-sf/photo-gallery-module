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

  const func = (num, num2) => {
    let count;
    for (let i = num; i < num + 100000; i++) {
      count = i;
      var data = fakerSchema(6, 50, renderKey(i.toString()));
      data.id = i;
      keys.push(data);

    }
    console.log(count)
    fs.appendFileSync(path.join(__dirname,'../products.json'), getProducts(keys, num), 'utf8', (err) => {
      if (err) throw err;
      console.log('The products file has been saved!');
    });
    keys = [];
    if (count === 9999999) {
      return;
    } else {
      func(count + 1);
    }
  };

  func(0, 0)
};

const getProducts = (data, num) => {
  let result = '';
  for (var i in data) {
    result += JSON.stringify(data[i]) + '\n';
  }
  return result;
};

const getImages = (totImages) => {
  let result = "";
  for(var i = 1; i <= totImages; i++) {
    result += i+spl+`${i}.jpg\n`;
  }
  return result;
}

renderNamesToIds();