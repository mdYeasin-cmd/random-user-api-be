const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;
const hostname = 'http://127.0.0.1';

app.use(cors());

app.use('/user', require('./routes/user.router'));

app.get('/', (req, res) => {
    res.send("Server running successfully...");
})

app.listen(port, () => {
    console.log(`Server is running at ${hostname}:${port}`);
})