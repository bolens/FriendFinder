const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

app.get('/', function (req, res) {
  res.send('Hello, World!');
});

app.listen(3000);
