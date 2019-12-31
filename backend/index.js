const express = require('express');
const items = require('./Items.js');

const app = express();

app.use(express.json());

app.post('/add-item', (req, res) => {
  // items.unshift(req.body);
  // res.json(items)
  console.log(req.body)
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`console started on port ${PORT}`);
});
