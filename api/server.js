require('dotenv').config();
const express = require('express');

const app = express();
const port = 3030;

app.use(express.text());

app.post('/igdb/games', async (req, res) => {
        const response = await fetch(
            'https://api.igdb.com/v4/games', {
                method: "POST",
                headers:{ 'Client-ID':process.env.CLIENT_ID, 'Authorization':process.env.AUTHO },
                body: req.body
             }
        )
        const json = await response.json();
        console.log(json);
        res.send(json);
});

app.post('/igdb/genres', async (req, res) => {
        const response = await fetch(
            'https://api.igdb.com/v4/genres', {
                method: "POST",
                headers:{ 'Client-ID':process.env.CLIENT_ID, 'Authorization':process.env.AUTHO },
                body: req.body
             }
        )
        const json = await response.json();
        res.send(json);
});

app.post('/igdb/platforms', async (req, res) => {
        const response = await fetch(
            'https://api.igdb.com/v4/platforms', {
                method: "POST",
                headers:{ 'Client-ID':process.env.CLIENT_ID, 'Authorization':process.env.AUTHO },
                body: req.body
             }
        )
        const json = await response.json();
        res.send(json);
});


app.listen(port, () => {
    console.log("Listening at port " + port);
});

