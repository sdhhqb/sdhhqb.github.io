var express = require('express');
var app = express();
app.use(express.static('./_site'));

var port = 8088;

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/_site/index.html');
});

app.listen(port, function () {
	console.log("app listening on port \x1b[32m"+port+"\x1b[0m");
});