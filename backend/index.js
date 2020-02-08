const express = require('express');
const path = require('path');
let items = require('./Items.js');
// const Item = require('../src/app/list/item.model.js');

const app = express();
app.use(express.static(path.join(__dirname)));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, itemid');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use(express.static(path.join(__dirname, '../')))

// Gets all items
app.get('/', (req, res) => {
  res.status(200).json(items);
});

// Gets a single item
app.get('/:itemId', (req, res) => {
  // console.log(req);
    items.map(item => {
      if(item.id === req.params.itemId) {res.status(200).json(item);}
    });
});

// Adds a single item
app.post('/add-item', (req, res) => {
  items.unshift(req.body);
  res.status(200).json(items)
});

// Deletes a single item
app.delete('/', (req, res) => {
  items = items.filter(item => {
    return item.id !== req.headers.itemid;
  });
  res.status(200).json(items);
});


app.put('/', (req, res) => {
  items = req.body;
  res.status(200).json(items);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`console started on port ${PORT}`);
});
