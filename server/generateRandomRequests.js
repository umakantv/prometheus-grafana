
const base = 'http://localhost:3011';
const crypto = require('crypto');
const axios = require('axios');


const definiteCount = Number(process.argv[2])

const config = {
    request: 'random', // change to fibonacci or fibonacci-slow
    delay: 200, // internal between each subsequent request
    slowToFastSplitRatio: 1, // increase this to spike the slow requests to say 10
    slowNumbersRange: [1, 45],
    fastNumbersRange: [1, 2001],
}

function getRequest() {

    let {request, fastNumbersRange, slowNumbersRange} = config;

    let urls = ['fibonacci', 'fibonacci-slow'];

    let url = request;

    if (request === 'random') {
        url = urls[Math.random() > (1 / (config.slowToFastSplitRatio + 1)) ? 1 : 0];
    }

    let num = crypto.randomInt(1, 40);

    if (Math.random() < 0.25) {
        num = 'abcd' // roughly 25% will be 4xx
    } else {

        if (url === urls[0]) {

            num = crypto.randomInt(...fastNumbersRange); // Roughly 20% will be 5xx

        } else if (url === urls[1]) {

            num = crypto.randomInt(...slowNumbersRange); // Roughly 20% will be 5xx
        }
    }

    return base + '/' + url + '/' + num;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function executeIndefinitely() {

    while (true) {

        let url = getRequest();

        console.log(url)

        axios.get(url).then(res => console.log(res.data)).catch(err => console.log(err.response?.data));

        await sleep(config.delay);
    }
}

async function executeCount(count) {

    for (let i = 0; i < count; i++) {
        let url = getRequest();
        console.log(url)
        axios.get(url)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data))
        
    }
}

if (isNaN(definiteCount)) {
    executeIndefinitely();
} else {
    console.log('Sending', definiteCount, 'requests')
    executeCount(definiteCount);
}

