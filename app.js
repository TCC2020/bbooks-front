const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var forceSsl = require('force-ssl-heroku');

const app = express();
app.use(express.static(__dirname + '/dist/bbooks'));
app.use(express.static(path.join(__dirname + 'node_modules')));

app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(forceSsl);

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist/bbooks/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.filter = 404;
    next(err);
});

// HTTP listener
const PORT = process.env.PORT ?? 3030;
app.listen(PORT, function () {
    console.log('Bbooks running on port ' + PORT);
});

module.exports = app;
