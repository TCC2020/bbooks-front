const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var forceSsl = require('force-ssl-heroku');
const csp = require('content-security-policy');

const app = express();

const cspPolicy = {
    'default-src': csp.SRC_ANY,
    'style-src': [  
        csp.SRC_SELF,
        csp.SRC_USAFE_INLINE,
        'https://fonts.googleapis.com/',
        'https://use.typekit.net'
    ],
    'script-src': [ 
        csp.SRC_SELF,
        csp.SRC_USAFE_INLINE,
        csp.SRC_UNSAFE_EVAL,
        'https://fonts.googleapis.com/',
        'http://apis.google.com/',
        'http://connect.facebook.net/',
        '*.facebook.com'
    ],
    'connect-src': [ 
        csp.SRC_SELF,
        'ws://localhost:*',
        'http://localhost:*',
        '${process.env.USERS_API}',
        '${process.env.FEED_API}',
        '${process.env.COMPETITION_API}',
        '${process.env.APICEP}',
        'https://www.googleapis.com',
        '*.facebook.com',
        'facebook.com'
        ],
    'child-src': [
        csp.SRC_SELF,
        'https://apis.google.com',
        'https://facebook.com',
        'https://www.googleapis.com/'
        ]
};

const globalCSP = csp.getCSP(cspPolicy);

app.use(globalCSP);


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
const PORT = process.env.PORT || 3030;
app.listen(PORT, function () {
    console.log('Bbooks running on port ' + PORT);
});




module.exports = app;
