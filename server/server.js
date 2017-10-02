var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

var lions = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

app.use(morgan('dev'))
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* Error handler in the wrong place. Move it to the bottom.
app.use(function(err, req, res, next) {
  if (err) {
    res.status(500).send(err);
  }
});
*/

app.param('id', function(req, res, next, id) {
  var lion = _.find(lions, {id: id});

  if (lion) {
    req.lion = lion;
    next();
  } else {
    res.send();
  }
});

app.get('/lions', function(req, res){
  res.json(lions);
});

app.get('/lions/:id', function(req, res){
  var lion = req.lion;
  res.json(lion || {});
});

app.post('/lions', updateId, function(req, res) {
  var lion = req.body;

  lions.push(lion);

  res.json(lion);
});


app.put('/lions/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id
  }

  var lion = _.findIndex(lions, {id: req.params.id});
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});

// Moved error handler to the bottom. This is the where it belongs.
// As long as you pass an err into next, i.e. next(err),
// in the middleware function, the error will
// get to this error handling function.
app.use(function(err, req, res, next) {
  if (err) {
    res.status(500).send(err);
  }
});

app.listen(3000);
console.log('on port 3000');
