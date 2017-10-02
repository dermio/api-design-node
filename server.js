// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data

const express = require("express");
const app = express();

// "file-system" module not needed.
// Scott says res.sendFile has its own internal readFile.
// const fs = require("file-system");

var jsonData = {count: 12, message: 'hey'};

app.get("/", function (req, res) {
  //Using "file-system" module and fs.readFile
  /* fs.readFile("index.html", function (err, buffer) {
    let html = buffer.toString();
    res.setHeader("Content-Type", "text/html");
    res.send(html);
  }); */

  // Using res.sendFile
  res.sendFile(__dirname + "/index.html", function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
  
});

app.get("/data", (req, res) => {
  res.send(jsonData);
});

app.listen(3000, function () {
  console.log("listening on port: 3000");
});