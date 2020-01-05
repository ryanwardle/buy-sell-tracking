const express = require('express');
const path = require('path');
const items = require('./Items.js');

const app = express();
app.use(express.static(path.join(__dirname)));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use(express.static(path.join(__dirname, '../src')))
console.log(path.join(__dirname))

app.post('/add-item', (req, res) => {
  items.unshift(req.body);
  console.log(items);
  res.status(200).json(items)
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`console started on port ${PORT}`);
});
