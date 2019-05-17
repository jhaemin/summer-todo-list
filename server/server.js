// server testing code
var express = require('express');
var app = express();
app.use(express.static('./public_html'))
var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
})
