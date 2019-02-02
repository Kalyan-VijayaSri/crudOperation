var mongoose = require('mongoose');
mongoose.connect('mongodb://18.216.164.233/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("connection created");
});
