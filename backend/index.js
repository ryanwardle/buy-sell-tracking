const express = require('express');
const path = require('path');
const items = require('./Items.js');

const app = express();
app.use(express.static(path.join(__dirname)));

app.use(express.json());

app.use(express.static(path.join(__dirname, '../src')))
console.log(path.join(__dirname))

app.post('/add-item', (req, res) => {
  console.log('This has been triggered')
  items.unshift(req.body);
  res.json(items)
  console.log(res.json(items))
  console.log(items)
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`console started on port ${PORT}`);
});
