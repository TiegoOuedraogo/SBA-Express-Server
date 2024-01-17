const bodyParser = require('body-parser');
const express = require('express');


const app = express();
const PORT = 8000;
const hostname = "localhost";

app.use(express.json());

app.listen(hostname, PORT, () => {
    console.log(`Server is running at ${hostname}: ${PORT}`);
  });