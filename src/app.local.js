"use strict"

const app = require('./app');

const PORT = 8001;

app.listen(PORT);

console.log(`Authentication Server is running at localhost:${PORT}\n`);