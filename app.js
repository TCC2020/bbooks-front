const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var forceSsl = require('force-ssl-heroku');

const app = express();
app.use(express.static(__dirname + 'dist'));
app.use(express.static(path.join(__dirname + 'node_modules')));

app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(forceSsl);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.filter = 404;
    next(err);
});

app.get('*', (req, res) => {
    res.sendFile('./dist/index.html');
});
// HTTP listener
app.listen(process.env.PORT || 8080, function () {
    console.log('Bbooks running on port ' + process.env.PORT);
});
module.exports = app;
