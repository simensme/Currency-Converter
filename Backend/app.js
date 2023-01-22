// Tools
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Server listening
app.listen(port, err => {
    if (err) {
        console.log(err);
    } console.log(`Server is listening on port ${port}`);
});

// Exchange Rate API
const apikey = 'kaonU4CnCYM4HbhBDMOkzA7NWPW0rd2d';
const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
        apikey
    }
};

// Access-link for frontend
const accessLink = '/convert/:from/:to/:amount';

// API Interaction
app.get(accessLink, async (req, res) => {
    // params
    const fromCurrency = req.params.from;
    const toCurrency = req.params.to;
    const amount = Number(req.params.amount);
    // JSON
    const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOptions);
    const json = await response.json();
    if (!json.success) {
        res.status(400).sendStatus('There has been an error on the backend');
    } else {
        res.send(json);
    }
});

