// server.js
require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client')));

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webPush.setVapidDetails('mailto:jessyrobinet@gmail.com', publicVapidKey, privateVapidKey);

app.post('/subscribe', (req, res) => {
    const subscription = req.body

    res.status(201).json({});

    const payload = JSON.stringify({
        title: 'Push notifications with Service Workers',
    });
    console.log(JSON.stringify(subscription))
    webPush.sendNotification(subscription, payload)
        .catch(error => console.error(error));
});


app.post('/push', (req, res) => {
    const {subscription, payload} = req.body
    
    const pay = JSON.stringify(payload)
    res.status(201).json({});

    
    webPush.sendNotification(subscription, pay)
        .catch(error => console.error(error));
});
app.set('port', process.env.PORT || 5001);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});
