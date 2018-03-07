
const url = require("url");
const fs = require("fs");
const path = require('path')
const mongoose = require("mongoose");
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.static(path.join(__dirname, '/node_modules/')));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname,'/public/index.html'));
});

app.get('/tipsa', function(req, res) {
    res.sendFile(path.join(__dirname,'/public/tipsa.html'));
});

app.get('/about', function(req, res) {
	res.sendFile(path.join(__dirname,'/public/kontakt.html'));
});

app.listen(8080, () => console.log('Example app listening on port 8080'))




mongoose.connect(
  "mongodb://admin:admin@ds023373.mlab.com:23373/allergikartandb",
  function(error) {
    if (!error) {
      console.log("databas funkar");
    }
  }
);
