const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var forceSsl = require('force-ssl-heroku');
const csp = require('content-security-policy');
const sts = require('strict-transport-security');
const referrerPolicy = require('referrer-policy');
const permissionsPolicy = require('permissions-policy');
const mongoose = require('mongoose');
const helmet = require('helmet');
const axios = require('axios')

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
    'connect-src': csp.SRC_ANY,
    'child-src': [
        csp.SRC_SELF,
        'https://apis.google.com',
        'https://facebook.com',
        'https://www.googleapis.com/',
        'https://accounts.google.com/'
    ],
    'img-src': [
        csp.SRC_ANY,
        csp.SRC_DATA
    ]
};

const globalCSP = csp.getCSP(cspPolicy);

const globalSTS = sts.getSTS({ 'max-age': 31536000, 'includeSubDomains': true });

app.use(referrerPolicy({ policy: 'same-origin' }));
app.use(globalCSP);
app.use(globalSTS);
app.use(helmet.noSniff());
app.use(helmet.frameguard());
app.use(permissionsPolicy({
    features: {
        fullscreen: ['self']
    }
}));

app.use(express.static(__dirname + '/dist/bbooks'));
app.use(express.static(path.join(__dirname + 'node_modules')));

app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(forceSsl);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 100
}).then(() => {
    console.log("Conectado com o mongo")
}).catch((err) => {
    console.log("Erro ao se conectar: " + err)
})

require('./schema/chat')
const Chat = mongoose.model('chats');

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist/bbooks/index.html'));
});

app.post('/chat', (req, res) => {
    const newChat = new Chat({
        "exchangeId": req.body.exchangeId
    });
    newChat.save().then((saved) => {
        let host = process.env.COMPETITION_API ? process.env.COMPETITION_API : 'http://localhost:8082'
        let url = host +'/exchanges/' + req.body.exchangeId + '/chat/' + saved._id;
        axios.put(url, {})
            .then(response => {
                retorno = {
                    chat: saved,
                    exchange: response.data
                }
                res.json(retorno);
            })
            .catch(error => {
                res.send(error);
            })
    }).catch(err => res.send(err));
});

app.put('/chat', (req, res) => {
    Chat.findOne({ _id: req.body.id }).then((chat) => {
        if (chat) {
            let mes = req.body.message
            mes.data = new Date();
            chat.messages.push(mes);
            chat.save().then((saved) => res.json(saved));
        }
        else
            res.sendStatus(404);

    }).catch(err => res.send(err));
});

app.post('/chat/get', (req, res) => {
    Chat.findOne({ _id: req.body.chat.id }).then((chat) => {
        if (chat) {
            res.json(chat);
        }
        else
            res.sendStatus(404);
    }).catch(err => res.send(err));
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
