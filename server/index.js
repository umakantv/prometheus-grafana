const express = require('express');
const morgan = require('morgan');
const { collectDefaultMetrics, register, Counter, Gauge } = require('prom-client');
const { fibonacci, fibonacciSlow } = require('./fibonacci');

collectDefaultMetrics({ 
    timeout: 5000,
    // prefix: 'node_app_',
    labels: {
        app: 'fibonacci-api'
    }
});

const app = express();

// Customized Http Metrics (Optional)
const httpMetricsLabelNames = ['method', 'route', 'app'];

const totalHttpRequestCount = new Counter({
  name: 'nodejs_http_total_count',
  help: 'Total Requests',
  labelNames: [...httpMetricsLabelNames, 'code']
});

const totalHttpRequestDuration = new Gauge({
  name: 'nodejs_http_total_duration',
  help: 'Response time of the Last Request',
  labelNames: httpMetricsLabelNames
});

app.use(morgan('dev'));
// app.use(morgan(':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));


app.use((req, res, next) => {
    let startTime = new Date().valueOf();
    res.addListener('finish', () => {
        console.log('Route', req.route)
        // console.log(req.method, req.path, res.statusCode);
        totalHttpRequestDuration.labels(req.method, req.route.path, 'fibonacci-api').set(new Date().valueOf() - startTime);
        totalHttpRequestCount.labels(req.method, req.route.path, 'fibonacci-api', res.statusCode).inc();
    })
    next();
})

app.get('/metrics', async (_, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
})

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

app.listen(3010, () => {
    console.log('Listening on http://localhost:3010');
})