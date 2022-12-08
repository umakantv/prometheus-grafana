
function fibonacciSlow(n) {
    if (n == 1) {
        return 1;
    } else if (n == 2) {
        return 1;
    } else {
        return fibonacciSlow(n - 1) + fibonacciSlow(n - 2);
    }
}

function fibonacci(n) {
    let arr = [1, 1];

    for (let i = 2; i < n; i++) {
        let a = arr[i - 2];
        let b = arr[i - 1];
        arr.push(a + b);
    }

    return arr[n - 1];
}

module.exports = {
    fibonacci, fibonacciSlow
};