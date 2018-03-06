var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require('path')
var mongoose = require("mongoose");
const express = require('express')
const app = express()

app.use(express.static('../public'))
app.use(express.static('../node_modules'))

app.get('/', function(req, res) {
    res.sendFile('../public/index.html');

});

app.listen(8080, () => console.log('Example app listening on port 8080'))




mongoose.connect(
  "mongodb://admin:admin@ds023373.mlab.com:23373/allergikartandb",
  {
    useMongoClient: true
  },
  function(error) {
    if (!error) {
      console.log("databas funkar");
    }
  }
);
