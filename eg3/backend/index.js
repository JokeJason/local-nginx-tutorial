const express = require('express');
const app = express();
const port = 5000;
const version = '1.0.0';

app.get('/', (req, res) => res.send({ version }));
app.listen(port, () => console.log(`Listening on port ${port}`));