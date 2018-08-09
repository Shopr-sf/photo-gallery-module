const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
// const db = require('../database/psql.js');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3002;

app.get('/:id', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../client/dist') });
});

app.get('/images/:id/images', (req, res) => {
  db.getImages(req.params.id, (data) => {
    res.status(200).send(data.map(value => value.img_path));
  });
});

app.get('/images/:id/product_info', (req, res) => {
  db.getProductInfo(req.params.id, (data) => {
    res.status(200).send(data[0]);
  });
});

app.post('/post', (req, res) => {
  db.createProduct(req.body.name, req.body.detail, req.body.img_path, req.body.pi, req.body.ii, (data) => {
    res.sendStatus(201);
  });
});

app.put('/update', (req, res) => {
  db.updateProduct(req.body.name, req.body.detail, req.body.id, req.body.pi, req.body.ii, (data) => {
    res.status(201).send();
  });
});

app.delete('/delete', (req, res) => {
  db.deleteProduct(req.body.id, (data) => {
    res.status(200).send();
  });
});
/* eslint-disable no-console */
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
