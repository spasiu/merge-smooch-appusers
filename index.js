require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const jwt = require('jsonwebtoken');
const Smooch = require('smooch-core');

const smooch = new Smooch({
    scope: 'app',
    keyId: process.env.KEY_ID,
    secret: process.env.SECRET
});

express()
    .use(express.static('public'))
    .use(bodyParser.json())
    .post('/merge', merge)
    .listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`));

    async function merge(req, res) {
        const id = req.body.userId;
        const appId = process.env.APP_ID;
        const token = jwt.sign({
            scope: 'appUser',
            userId: id
        }, process.env.SECRET, { header: { kid: process.env.KEY_ID }});

        for (const user of req.body.users) {
            const data = await smooch.appUsers.getAuthCode(user);
            const code = data.authCode;
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(`${process.env.SERVICE_URL}/merge?appId=${appId}&id=${id}&token=${token}&authCode=${code}`);
            await page.waitForSelector('#login-complete');
            await browser.close();
        }

        res.status(200).json();
    }
