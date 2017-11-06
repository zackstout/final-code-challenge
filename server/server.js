
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var databaseUrl = 'mongodb://localhost:27017/realestate';

var MessageSchema = new Schema({name: String, message: String});
var Message = mongoose.model('whateverThisStringDoesNothing', MessageSchema, 'messages');

var app = express();
var port = process.env.PORT || 6660;

app.use(bodyParser.json());
app.use(express.static('server/public'));

mongoose.connection.on('connected', function() {
  console.log('we in!');
});
mongoose.connection.on('error', function() {
  console.log("aw nuts bro");
});

mongoose.connect(databaseUrl);

app.post('/messages', function(req, res) {
  console.log(req.body);
  var msg = new Message(req.body);
  msg.save(function(err, data) {
    if (err) {
      console.log('aww jeez');
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

app.get('/messages', function(req, res) {
  Message.find({}, function(err, result) {
    if (err) {
      console.log('jeez-o buddy');
      res.sendStatus(500);
    } else {
      res.send(result);
    }
  });
});

app.listen(port, function (req, res) {
  console.log('Listening on port', port);
});
