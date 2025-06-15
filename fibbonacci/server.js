const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const fibCache = new Map();

function fibonacci(n) {
    if (fibCache.has(n)) {
        return fibCache.get(n);
    }

    let a = 0, b = 1;
    for (let i = 0; i < n; i++) {
        [a, b] = [b, a + b];
    }

    fibCache.set(n, a);
    return a;
}


app.get('/api/fibonacci', (req, res) => {
    const n = parseInt(req.query.n);
    if (isNaN(n) || n < 0) {
        return res.status(400).json({ error: 'n must be a non-negative number' });
    }

    const result = fibonacci(n);
    res.json({ input: n, fibonacci: result });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
