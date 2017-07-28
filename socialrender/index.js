/**
 * Created by superdev on 7/28/2017.
 */
var express = require('express');
var app = express();
app.get('/', function(req, res) {
  res.send('hello!');
});
module.exports = app;
