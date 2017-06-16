'use strict';

var express = require('express'),
    app = express(),
    path = require('path'),
    projectRoot = __dirname;
app.use(express.static(projectRoot));

app.get('*', function (req, res) {
  res.sendFile(path.join(projectRoot + '/index.html'));
});

app.listen((process.env.PORT || 5000), function () {
    console.log('Server listening on port 3000!');
});
