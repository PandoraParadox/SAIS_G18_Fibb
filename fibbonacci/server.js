const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

function fibbonaci(n) {
    if (n <= 1)
        return n;
    return fibbonaci(n - 1) + fibbonaci(n - 2);
}

app.get('/api/fibbonaci', (req, res) => {
    const n = parseInt(req.query.n);
    if (isNaN(n)) {
        return res.status(400).json({ error: 'n must be number' });
    }
    const rs = fibbonaci(n);
    res.json({ input: n, fibbonaci: rs });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});