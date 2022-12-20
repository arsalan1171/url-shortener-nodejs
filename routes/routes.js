const express = require('express')
const app = express();

const validUrl = require('valid-url')
const nanoid = require('nanoid')

const Url = require('../models/UrlModel')

//@desc     Create short URL
const baseUrl = 'http:localhost:5000'
app.post('/encode', async (req, res) => {
    const { longUrl } = req.body
    //check base url
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL')
    }
    // create url code
    const urlCode = nanoid(10)

    //check long url
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl })
            if (url) {
                res.json(url)
            }
            else {
                const shortUrl = baseUrl + '/' + urlCode
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res.json(url)
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).json('Server Error')
        }
    }
    else {
        res.status(401).json('Invalid longUrl')
    }
})

//@desc  decode short URL
app.get("/decode", async (req, res) => {

    try {
        let url = await Url.findOne(req.body)
        if (url) {
            res.json(url.longUrl)
        }
        else {
            return res.status(404).json('No URL Found')
        }
    }
    // exception handler
    catch (err) {
        console.error(err)
        res.status(500).json('Server Error')
    }
});

module.exports = app;