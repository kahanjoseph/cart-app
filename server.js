const express = require('express');
const app = express();
const axios = require('axios');
const port = 2410;
const url = "https://dbr-api.palletfly.com/api/filter_product_listings?format=json";

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/", async (req, res) => {
    try {
        console.log("Making axios call");
        const response = await axios.get(url);
        res.status(200).json(response.data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something bad has occurred." });
    }
});


app.listen(port, () =>
    console.log(`app is listening on : http://localhost:${port}`)
);




