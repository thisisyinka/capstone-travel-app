const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const cors = require('cors');
app.use(cors());


// const axios = require('axios').default;

app.use(express.static('dist'));

app.get('/', function(req, res) {
    res.sendFile('dist/index.html');
})

const port = 8001;
const server = app.listen(port, () => console.log(`Server successfully running on port ${port}`));