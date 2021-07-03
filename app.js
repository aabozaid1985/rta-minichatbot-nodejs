var express = require('express'); // app server
const bodyParser = require('body-parser');
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const assistant = new AssistantV2({
    authenticator: new IamAuthenticator({ apikey: 'rdRIPl9iAzrcmk02_fQ5Shl9YAGnaEGaUi6RW_fn_ENu' }),
    serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com',
    version: '2018-09-19'
  });

app.post('/api/message', function(req, res) {
    assistant.message({
        assistantId: "fd0ab1fb-be93-4dd3-a6f5-212a3f987191",
        sessionId: req.body.sessionId,
        input: { text: req.body.message }
    }).then(sessionResponse => {
        res.json(sessionResponse);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/api/session', function(req, res) {
    assistant.createSession({
        assistantId: "fd0ab1fb-be93-4dd3-a6f5-212a3f987191"
    }).then(sessionResponse => {
        res.json(sessionResponse);
    }).catch(err => {
        console.log(err);
    });
});



app.get('/', function(req, res) {
    return res.send("welcome to mini chatbot backend");
});

app.listen(3000, function() {
    // eslint-disable-next-line
    console.log('Server running on port: %d', 3000);
});
