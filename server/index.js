const express = require('express');
const morgan = require('morgan');
const { fibonacci, fibonacciSlow } = require('./fibonacci');
const { metricsServer, updateMetrics } = require('./metrics');

const app = express();
app.use(morgan('dev'));

app.use(updateMetrics);

app.get('/fibonacci/:num', (req, res) => {

    let num = Number(req.params.num);

    console.log('Input', num);

    if (isNaN(num)) {
        return res.status(400).send('Bad Input');
    }

    if (num > 1476) {
        return res.status(500).send('Number must be less than 1476 as JS can\'t add further than that');
    }

    res.status(200).send(String(fibonacci(num)));
})

app.get('/fibonacci-slow/:num', (req, res) => {

    let num = Number(req.params.num);

    console.log('Input', num);

    if (isNaN(num)) {
        return res.status(400).send('Bad Input');
    }

    if (num > 45) {
        return res.status(500).send('Number must be less than 46');
    }

    res.status(200).send(String(fibonacciSlow(num)));
})

metricsServer.listen(3010, () => {
    console.log('Prometheus Metrics server listening on http://localhost:3010');
})

app.listen(3011, () => {
    console.log('Fibonacci API Server listening on http://localhost:3011');
})